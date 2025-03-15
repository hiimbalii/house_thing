"use client";

import { Button } from "@chakra-ui/react";
import { deleteCookie } from "cookies-next/client";

export default function LogoutButton() {
  return (
    <Button
      onClick={() => {
        deleteCookie("roomNr");
        deleteCookie("pin");
      }}
    >
      Log out
    </Button>
  );
}
