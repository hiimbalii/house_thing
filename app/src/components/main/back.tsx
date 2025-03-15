"use client";
import { Box, Flex, Button } from "@chakra-ui/react";
import Link from "next/link";

export const BackButtonWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Box>
      <Flex flexDir="column" gap={4}>
        <Button variant="ghost" asChild>
          <Link href="/">{"< Back"}</Link>
        </Button>
        <Box>{children}</Box>
      </Flex>
    </Box>
  );
};
