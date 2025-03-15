import { CHORE_LIST, getStartDate, getWeek } from "@/chores/chores";
import { getName } from "@/chores/rooms";
import LogoutButton from "@/components/main/logout";
import { RoomsModal } from "@/components/rooms/room-modal";
import { Text, Container, For, Flex, DataList } from "@chakra-ui/react";
import { add, format } from "date-fns";
import { cookies } from "next/headers";

export default async function Home() {
  const chores = ["sink room", "shower", "toilet", "hallway"];
  const roomNr = (await cookies()).get("roomNr")?.value;
  const name = roomNr && (await getName(roomNr));
  const weekNr = await getWeek();
  const chore_list = CHORE_LIST;
  const currChores = chore_list[weekNr];
  const startDate = await getStartDate();

  for (const chore of Object.entries(currChores)) {
    const [choreName, choreRoom] = chore;
    const name = await getName(choreRoom);
    if (name) currChores[choreName as keyof typeof currChores] = name;
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
          {(chore) => (
            <DataList.Item key={chore}>
              <DataList.ItemLabel>{chore}</DataList.ItemLabel>
              <DataList.ItemValue>
                {currChores[chore as keyof typeof currChores]}
              </DataList.ItemValue>
            </DataList.Item>
          )}
        </For>
      </DataList.Root>
      <Flex>
        <Text>Deadline: </Text>
        <Text ml={1} fontWeight="bold">
          {format(
            add(startDate, { weeks: (weekNr + 1) * 2 }),
            "MMMM dd. (eee)"
          )}{" "}
        </Text>
      </Flex>
      <RoomsModal />
    </Container>
  );
}
