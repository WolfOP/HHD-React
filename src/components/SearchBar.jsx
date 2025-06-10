import React, { useState } from 'react'

const glossary = [
  { term: 'Health and Wellbeing', definition: "The overall state of a person's physical, social, emotional, mental and spiritual existence." },
  { term: 'Biomedical Approach', definition: 'Focuses on the physical or biological aspects of disease and illness, emphasising diagnosis and treatment.' },
  { term: 'Social Model of Health', definition: 'Framework that addresses broader social, cultural and environmental determinants of health to reduce inequities.' },
  { term: 'Ottawa Charter', definition: 'A World Health Organization framework for health promotion outlining five action areas.' },
  { term: 'Medicare', definition: "Australia's universal health insurance scheme providing affordable healthcare." },
  { term: 'Burden of Disease', definition: 'A measure of the impact of disease and injury expressed as the gap between current health status and ideal health.' },
  { term: 'DALY', definition: 'Disability Adjusted Life Year – one year of healthy life lost due to illness, injury or premature death.' },
  { term: 'Incidence', definition: 'The number or rate of new cases of a disease or condition during a specified period.' },
  { term: 'Prevalence', definition: 'The total number or proportion of cases of a disease or condition in a population at a given time.' },
]

export default function SearchBar() {
  const [query, setQuery] = useState('')

  const results =
    query.length > 0
      ? glossary.filter(g =>
          g.term.toLowerCase().includes(query.toLowerCase())
        )
      : []

  return (
    <div className="relative w-full max-w-xs">
      <input
        type="text"
        className="w-full border border-slate-300 dark:border-slate-700 rounded-md py-1 px-2 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm transition-colors"
        placeholder="Search glossary..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      {results.length > 0 && (
        <ul className="absolute left-0 right-0 w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 mt-1 rounded-md shadow-lg max-h-60 overflow-y-auto z-50">
          {results.map(item => (
            <li
              key={item.term}
              className="px-3 py-2 hover:bg-purple-600 hover:text-white cursor-pointer text-sm transition-colors"
              onClick={() => setQuery(item.term)}
            >
              <span className="font-semibold">{item.term}</span>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {item.definition}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
