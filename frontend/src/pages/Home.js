import { Stack, Text } from "@fluentui/react";

export default function Home() {
  return (
    <Stack
      horizontalAlign="center"
      verticalAlign="center"
      verticalFill
      styles={{
        root: { width: "100%", margin: "0 auto", textAlign: "center" },
      }}
    >
      <Text variant="xxLarge" styles={{ root: { fontWeight: "bold" } }}>
        Home Page
      </Text>
    </Stack>
  );
}
