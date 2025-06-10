import React from "react";

export default function HomeComponent() {
  const features = [
    {
      icon: "📚",
      title: "Comprehensive Glossary",
      description: "Searchable, interactive glossary with favorites and progress tracking",
      link: "/glossary"
    },
    {
      icon: "🧠",
      title: "Interactive Quiz",
      description: "Test your knowledge with categorized questions and instant feedback",
      link: "/unit3-quiz"
    },
    {
      icon: "🎯",
      title: "Practice Questions",
      description: "Exam-style questions with difficulty levels and study tips",
      link: "/unit3-practice"
    },
    {
      icon: "🔄",
      title: "Flashcards",
      description: "Spaced repetition learning with favorites and progress tracking",
      link: "/unit3-flashcards"
    },
    {
      icon: "🎪",
      title: "Key Skills Hub",
      description: "Interactive activities covering all essential VCE HHD skills",
      link: "/keyskillshub"
    },
    {
      icon: "📝",
      title: "SAC 2 Prep",
      description: "Advanced preparation tools with annotation and mapping features",
      link: "/unit3-sac2-prep"
    }
  ];

  const quickStats = [
    { number: "80+", label: "Glossary Terms", icon: "📖" },
    { number: "24", label: "Practice Questions", icon: "❓" },
    { number: "10", label: "Quiz Questions", icon: "🧠" },
    { number: "12", label: "Flashcards", icon: "🔄" }
  ];

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
      <div className="mt-10">
        <a href="#unit3" className="button-style">
          Explore Unit 3
        </a>
      </div>
    </section>
  );
}
