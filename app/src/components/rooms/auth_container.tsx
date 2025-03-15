"use client";

import { logInApi, setPinApi } from "@/sdk/pin";
import {
  Button,
  Container,
  Flex,
  Input,
  PinInput,
  Switch,
  Text,
} from "@chakra-ui/react";
import { useGetCookies, useSetCookie } from "cookies-next";
import { useParams } from "next/navigation";
import { useState } from "react";

function AuthContainer({
  mainLine,
  callback,
}: {
  mainLine: string;
  callback: (
    onSuccess?: () => void
  ) => (roomNumber: string, pin: string) => Promise<void>;
}) {
  const setCookie = useSetCookie();
  const getCookies = useGetCookies();
  const [isHidden, setHidden] = useState(true);
  const toggleShown = () => setHidden(!isHidden);
  const [pin, setPin] = useState("");
  const { roomNumber } = useParams();
  if (!roomNumber) throw new Error("Expected roomnumber");
  if (typeof roomNumber !== "string")
    throw new Error("malformatted roomnumber");
  const handleButton = () =>
    callback(async () => {
      location.reload();
    })(roomNumber, pin);

  return (
    <Container>
      <Flex flexDir="column" gap={3}>
        <Text mb={3}>{mainLine}</Text>
        <Input
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          type={isHidden ? "password" : "number"}
        />
        <Switch.Root onChange={toggleShown}>
          <Switch.HiddenInput />
          <Switch.Control />
          <Switch.Label>Show pin</Switch.Label>
        </Switch.Root>
        <Button onClick={handleButton} mt={1}>
          Log in
        </Button>
      </Flex>
    </Container>
  );
}
export const LoginContainer = () =>
  AuthContainer({ mainLine: "Please log in for me :)", callback: logInApi });

export const SetPinContainer = () =>
  AuthContainer({ mainLine: "Set your pin", callback: setPinApi });
