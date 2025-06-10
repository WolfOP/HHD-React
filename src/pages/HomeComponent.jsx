import React from "react";
import { Container, Title, Text, Image, Button } from "@mantine/core";
import MantineDemoCard from "../components/MantineDemoCard.jsx";

export default function HomeComponent() {
  return (
    <Container className="content-section text-center">
      <Title order={1} mb="lg">Welcome to the HHD Study Hub!</Title>
      <Text size="lg" mb="lg">Your central resource for VCE Health and Human Development.</Text>
      <Image
        src="https://placehold.co/800x400/1e293b/e2e8f0?text=HHD+Concept+Image"
        alt="HHD Concept Image"
        className="mx-auto rounded-lg shadow-lg mb-8"
        onError={(e) => {
          e.target.src =
            "https://placehold.co/800x400/1e293b/e2e8f0?text=Image+Not+Available";
          e.target.alt = "Image Not Available";
        }}
      />
      <Text mb="sm">
        This website is designed to help you navigate the complexities of the
        VCE HHD curriculum, starting with Unit 3 and expanding to Unit 4.
      </Text>
      <Text>
        Explore key knowledge, practice skills, and prepare for your assessments
        with our curated content.
      </Text>
      <div className="my-8 flex justify-center">
        <MantineDemoCard />
      </div>
      <Button component="a" href="#unit3" color="grape" mt="lg">
        Explore Unit 3
      </Button>
    </Container>
  );
}
