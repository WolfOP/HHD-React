import React from "react";
import { Container, Title, Text, Button } from "@mantine/core";

export default function NotFoundComponent() {
  return (
    <Container className="content-section text-center">
      <Title order={2} mb="md">404 - Page Not Found</Title>
      <Text mb="lg">Sorry, the page you are looking for does not exist.</Text>
      <Button component="a" href="#home" color="grape">
        Go Home
      </Button>
    </Container>
  );
}
