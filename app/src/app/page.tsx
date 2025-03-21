import {
  CHORE_LIST,
  getDeadline,
  getStartDate,
  getWeek,
} from "@/chores/chores";
import { getName } from "@/chores/rooms";
import LogoutButton from "@/components/main/logout";
import { RoomsModal } from "@/components/rooms/room-modal";
import { Text, Container, For, Flex, DataList } from "@chakra-ui/react";
import { add, format, formatDistance, formatRelative } from "date-fns";
import { cookies } from "next/headers";

export default async function Home() {
  const chores = ["sink room", "shower", "toilet", "hallway"];
  const roomNr = (await cookies()).get("roomNr")?.value;
  const name = roomNr && (await getName(roomNr));
  const weekNr = await getWeek();
  const chore_list = CHORE_LIST;
  const currChores = chore_list[weekNr % chore_list.length];
  const names = { _: "" };
  const deadline = await getDeadline();

  for (const chore of Object.entries(currChores)) {
    const [choreName, choreRoom] = chore;
    const name = await getName(choreRoom);
    if (!name) continue;
    names[choreRoom as keyof typeof names] = name;
  }
  return (
    <Container mx={[1, null, "40"]} my={1}>
      <Text fontSize="2xl">Chores-o-mat</Text>
      <Text fontSize="md">#98 - 1st floor</Text>
      <Flex>
        <Text fontSize="md">
          Welcome back {name} ({roomNr})
        </Text>
        <LogoutButton />
      </Flex>
      <Text fontSize="xl" mb={2}>
        This weeks chores
      </Text>
      <DataList.Root orientation="horizontal" mb={2}>
        <For each={chores}>
          {(chore) => {
            const roomie = currChores[chore as keyof typeof currChores];
            const roomieName = names[roomie as keyof typeof names];
            return (
              <DataList.Item key={chore}>
                <DataList.ItemLabel
                  fontWeight={roomie === roomNr ? "bold" : undefined}
                >
                  {chore}
                </DataList.ItemLabel>
                <DataList.ItemValue
                  fontWeight={roomie === roomNr ? "bold" : undefined}
                >
                  {roomieName ?? roomie}
                </DataList.ItemValue>
              </DataList.Item>
            );
          }}
        </For>
      </DataList.Root>
      <Flex>
        <Text>Deadline: </Text>
        <Text ml={1} fontWeight="bold">
          {format(deadline, "MMMM dd. ")}(
          {formatDistance(add(deadline, { days: 1 }), new Date(), {
            addSuffix: true,
          })}
          )
        </Text>
      </Flex>
      <RoomsModal />
    </Container>
  );
}
