import { getName } from "@/chores/rooms";
import {
  Dialog,
  Button,
  Portal,
  SimpleGrid,
  For,
  CloseButton,
  Link,
  Card,
  Flex,
} from "@chakra-ui/react";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import LogoutButton from "../main/logout";
async function RoomCard({ roomNumber }: { roomNumber: string }) {
  const name = await getName(roomNumber);
  const title = name ?? roomNumber;
  const description = name ? roomNumber : "";
  return (
    <Card.Root>
      <Card.Body gap="2">
        <Card.Title mt="2">{title}</Card.Title>
        <Card.Description>{description}</Card.Description>
        <Card.Footer>
          <Link href={roomNumber}>
            <Button>Open</Button>
          </Link>
        </Card.Footer>
      </Card.Body>
    </Card.Root>
  );
}
export async function RoomsModal() {
  const roomNumbers = ["349", "350", "351", "352", "353", "354"];
  const roomNr = (await cookies()).get("roomNr")?.value;
  return (
    <Dialog.Root size="xl">
      <Dialog.Trigger asChild>
        <Button>Edit your info</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Which room are you in?</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              {roomNr ? (
                <Flex flexDir="column" alignItems="center" gap={3}>
                  <RoomCard roomNumber={roomNr} />
                  <LogoutButton />
                </Flex>
              ) : (
                <SimpleGrid columns={[2, null, 3]} gap="10px">
                  <For each={roomNumbers}>
                    {(item) => <RoomCard key={item} roomNumber={item} />}
                  </For>
                </SimpleGrid>
              )}
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
