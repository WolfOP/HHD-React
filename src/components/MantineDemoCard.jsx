import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';

export default function MantineDemoCard() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src="https://placekitten.com/300/160" height={160} alt="Demo" />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>Demo Card</Text>
        <Badge color="pink" variant="light">
          New
        </Badge>
      </Group>

      <Text size="sm" color="dimmed">
        This is a sample card from Mantine.
      </Text>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        Click me
      </Button>
    </Card>
  );
}
