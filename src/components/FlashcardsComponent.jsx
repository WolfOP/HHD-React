import React, { useState } from "react";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [showInfo, setShowInfo] = useState(false);

  const filteredCards = flashcards.filter(card => 
    card.term.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const card = filteredCards[current];

  const handleToggle = () => setShowDef((v) => !v);
  const handlePrev = () => {
    setCurrent((c) => (c === 0 ? filteredCards.length - 1 : c - 1));
    setShowDef(false);
  };
  const handleNext = () => {
    setCurrent((c) => (c === filteredCards.length - 1 ? 0 : c + 1));
    setShowDef(false);
  };
  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleFavorite = () => {
    if (favorites.includes(card)) {
      setFavorites(favorites.filter(fav => fav !== card));
    } else {
      setFavorites([...favorites, card]);
    }
  };
  const handleInfoToggle = () => setShowInfo((v) => !v);

  return (
    <div className="p-4 bg-slate-800 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-purple-300">Unit 3 Glossary Flashcards</h2>
      
      <div className="mb-4">
        <input 
          type="text" 
          placeholder="Search terms..." 
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {filteredCards.length > 0 ? (
        <div>
          <div className="text-2xl font-bold mb-2">{card.term}</div>
          {showDef && (
            <div className="mb-4">{card.definition}</div>
          )}
          <div className="flex justify-between items-center mb-4">
            <button 
              className={`button-style ${favorites.includes(card) ? 'text-yellow-300' : ''}`} 
              onClick={handleFavorite}
              aria-label="Toggle favorite"
            >
              {favorites.includes(card) ? '★ Favorited' : '☆ Favorite'}
            </button>
            <button 
              className="text-purple-300 underline" 
              onClick={handleInfoToggle}
              aria-label="Toggle info"
            >
              {showInfo ? 'Hide Info' : 'Show Info'}
            </button>
          </div>
          {showInfo && (
            <div className="text-sm text-gray-400 mb-4">
              Use arrow keys to navigate, spacebar to toggle definition, and enter to favorite.
            </div>
          )}
          <button className="button-style mb-4" onClick={handleToggle}>
            {showDef ? 'Hide Definition' : 'Show Definition'}
          </button>
          <div className="space-x-4">
            <button className="button-style" onClick={handlePrev}>Previous</button>
            <button className="button-style" onClick={handleNext}>Next</button>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-400 py-4">
          No results found for "<span className="text-white">{searchTerm}</span>".
        </div>
      )}
    </div>
  );
}
