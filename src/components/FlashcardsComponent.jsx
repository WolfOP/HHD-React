import React, { useState } from "react";
import { Button, Group } from "@mantine/core";

const flashcards = [
  { term: 'Health and Wellbeing', definition: "The overall state of a person's physical, social, emotional, mental and spiritual existence." },
  { term: 'Biomedical Approach', definition: 'Focuses on the physical or biological aspects of disease and illness, emphasising diagnosis and treatment.' },
  { term: 'Social Model of Health', definition: 'Framework that addresses broader social, cultural and environmental determinants of health to reduce inequities.' },
  { term: 'Ottawa Charter', definition: 'A World Health Organization framework for health promotion outlining five action areas.' },
  { term: 'Medicare', definition: "Australia's universal health insurance scheme providing affordable healthcare." },
  { term: 'Private Health Insurance', definition: 'Optional insurance for healthcare costs not fully covered by Medicare or for private hospital care.' },
  { term: 'National Disability Insurance Scheme (NDIS)', definition: 'Provides support to Australians under 65 with a permanent and significant disability.' },
  { term: 'Burden of Disease', definition: 'A measure of the impact of disease and injury, expressed as the gap between current health status and ideal health.' },
  { term: 'DALY', definition: 'Disability Adjusted Life Year – one year of healthy life lost due to illness, injury or premature death.' },
  { term: 'Health-Adjusted Life Expectancy (HALE)', definition: 'The average number of healthy years a person can expect to live, free from serious disease or disability.' },
  { term: 'Incidence', definition: 'The number or rate of new cases of a disease or condition during a specified period.' },
  { term: 'Prevalence', definition: 'The total number or proportion of cases of a disease or condition in a population at a given time.' }
];

export default function FlashcardsComponent() {
  const [current, setCurrent] = useState(0);
  const [showDef, setShowDef] = useState(false);

  const card = flashcards[current];

  const handleToggle = () => setShowDef((v) => !v);
  const handlePrev = () => {
    setCurrent((c) => (c === 0 ? flashcards.length - 1 : c - 1));
    setShowDef(false);
  };
  const handleNext = () => {
    setCurrent((c) => (c === flashcards.length - 1 ? 0 : c + 1));
    setShowDef(false);
  };

  return (
    <div className="p-4 bg-slate-800 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-purple-300">Unit 3 Glossary Flashcards</h2>
      <div className="text-2xl font-bold mb-2">{card.term}</div>
      {showDef && <div className="mb-4">{card.definition}</div>}
      <Button className="mb-4" onClick={handleToggle} color="grape">
        {showDef ? 'Hide Definition' : 'Show Definition'}
      </Button>
      <Group position="center" spacing="sm">
        <Button variant="outline" color="grape" onClick={handlePrev}>Previous</Button>
        <Button variant="outline" color="grape" onClick={handleNext}>Next</Button>
      </Group>
    </div>
  );
}
