import { Box, Container } from "@chakra-ui/react";

export default function ResponsiveContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
    >
      <Container
        w={{ base: "100vw", sm: "20vw" }} // Full width on mobile, 1/5th on desktop
        h={{ base: "100vh", sm: "auto" }} // Full height on mobile, auto on desktop
        bg="white"
        boxShadow="lg"
        borderRadius="xl"
        p={6}
      >
        {children}
      </Container>
    </Box>
  );
}
