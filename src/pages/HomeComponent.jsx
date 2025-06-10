import React from "react";
import MantineDemoCard from "../components/MantineDemoCard.jsx";

export default function HomeComponent() {
  return (
    <section className="content-section text-center">
      <h1 className="text-5xl font-bold mb-6">Welcome to the HHD Study Hub!</h1>
      <p className="text-xl mb-8">Your central resource for VCE Health and Human Development.</p>
      <img
        src="https://placehold.co/800x400/1e293b/e2e8f0?text=HHD+Concept+Image"
        alt="HHD Concept Image"
        className="mx-auto rounded-lg shadow-lg mb-8"
        onError={(e) => {
          e.target.src = 'https://placehold.co/800x400/1e293b/e2e8f0?text=Image+Not+Available';
          e.target.alt = 'Image Not Available';
        }}
      />
      <p className="mb-4">This website is designed to help you navigate the complexities of the VCE HHD curriculum, starting with Unit 3 and expanding to Unit 4.</p>
      <p>Explore key knowledge, practice skills, and prepare for your assessments with our curated content.</p>
      <div className="my-8 flex justify-center">
        <MantineDemoCard />
      </div>
      <div className="mt-10">
        <a href="#unit3" className="button-style">
          Explore Unit 3
        </a>
      </div>
    </section>
  );
}
