import React, { useState } from "react";

export default function Unit3PracticeQuestionsComponent() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const questionCategories = [
    { id: 'all', name: 'All Questions' },
    { id: 'outcome1', name: 'Outcome 1: Understanding H&W' },
    { id: 'outcome2', name: 'Outcome 2: Promoting Health' },
    { id: 'short', name: 'Short Answer (1-4 marks)' },
    { id: 'extended', name: 'Extended Response (6-12 marks)' }
  ];

  const practiceQuestions = [
    // Outcome 1 Questions
    {
      id: 1,
      category: 'outcome1',
      type: 'short',
      marks: 2,
      question: 'Define health and wellbeing according to the WHO definition.',
      keywords: ['Define', 'Health and wellbeing', 'WHO']
    },
    {
      id: 2,
      category: 'outcome1',
      type: 'short',
      marks: 3,
      question: 'Explain one strength and one limitation of the biomedical model of health.',
      keywords: ['Explain', 'Biomedical model', 'Strength', 'Limitation']
    },
    {
      id: 3,
      category: 'outcome1',
      type: 'short',
      marks: 4,
      question: 'Outline two biological factors and two sociocultural factors that influence health and wellbeing.',
      keywords: ['Outline', 'Biological factors', 'Sociocultural factors']
    },
    {
      id: 4,
      category: 'outcome1',
      type: 'extended',
      marks: 8,
      question: 'Analyse the dynamic and subjective nature of health and wellbeing, using examples to support your response.',
      keywords: ['Analyse', 'Dynamic', 'Subjective', 'Examples']
    },
    {
      id: 5,
      category: 'outcome1',
      type: 'short',
      marks: 3,
      question: 'Distinguish between incidence and prevalence in relation to health status indicators.',
      keywords: ['Distinguish', 'Incidence', 'Prevalence']
    },
    {
      id: 6,
      category: 'outcome1',
      type: 'short',
      marks: 4,
      question: 'Explain what is meant by burden of disease and identify its two components.',
      keywords: ['Explain', 'Burden of disease', 'DALY', 'YLL', 'YLD']
    },
    {
      id: 7,
      category: 'outcome1',
      type: 'extended',
      marks: 10,
      question: 'Using relevant health status data, analyse variations in health status between different population groups in Australia. In your response, discuss at least two factors that contribute to these variations.',
      keywords: ['Analyse', 'Health status data', 'Variations', 'Population groups', 'Contributing factors']
    },
    
    // Outcome 2 Questions
    {
      id: 8,
      category: 'outcome2',
      type: 'short',
      marks: 2,
      question: 'Define health promotion according to the Ottawa Charter.',
      keywords: ['Define', 'Health promotion', 'Ottawa Charter']
    },
    {
      id: 9,
      category: 'outcome2',
      type: 'short',
      marks: 5,
      question: 'Outline the five action areas of the Ottawa Charter for Health Promotion.',
      keywords: ['Outline', 'Five action areas', 'Ottawa Charter']
    },
    {
      id: 10,
      category: 'outcome2',
      type: 'short',
      marks: 4,
      question: 'Explain how the social model of health differs from the biomedical model in addressing health issues.',
      keywords: ['Explain', 'Social model', 'Biomedical model', 'Differences']
    },
    {
      id: 11,
      category: 'outcome2',
      type: 'extended',
      marks: 8,
      question: 'Evaluate the effectiveness of ONE health promotion program in addressing the health needs of a specific population group.',
      keywords: ['Evaluate', 'Health promotion program', 'Effectiveness', 'Specific population']
    },
    {
      id: 12,
      category: 'outcome2',
      type: 'short',
      marks: 3,
      question: 'Describe how "old" public health differs from "new" public health approaches.',
      keywords: ['Describe', 'Old public health', 'New public health']
    },
    {
      id: 13,
      category: 'outcome2',
      type: 'extended',
      marks: 12,
      question: 'Analyse how the Ottawa Charter action areas are reflected in a current Australian health promotion initiative. Discuss the strengths and limitations of this approach.',
      keywords: ['Analyse', 'Ottawa Charter', 'Action areas', 'Health promotion initiative', 'Strengths', 'Limitations']
    },
    
    // Indigenous Health Questions
    {
      id: 14,
      category: 'outcome2',
      type: 'short',
      marks: 4,
      question: 'Outline two initiatives aimed at improving the health and wellbeing of Aboriginal and Torres Strait Islander peoples.',
      keywords: ['Outline', 'Indigenous health', 'Initiatives', 'ATSI']
    },
    {
      id: 15,
      category: 'outcome2',
      type: 'extended',
      marks: 10,
      question: 'Evaluate the progress of the "Close the Gap" strategy in addressing health inequities experienced by Aboriginal and Torres Strait Islander peoples.',
      keywords: ['Evaluate', 'Close the Gap', 'Progress', 'Health inequities']
    },
    
    // Health System Questions
    {
      id: 16,
      category: 'outcome1',
      type: 'short',
      marks: 3,
      question: 'Outline the key features of Medicare in Australia.',
      keywords: ['Outline', 'Medicare', 'Key features']
    },
    {
      id: 17,
      category: 'outcome1',
      type: 'short',
      marks: 4,
      question: 'Explain how the NDIS promotes access and equity in healthcare.',
      keywords: ['Explain', 'NDIS', 'Access', 'Equity']
    },
    {
      id: 18,
      category: 'outcome1',
      type: 'extended',
      marks: 8,
      question: 'Discuss the role of private health insurance in Australia\'s health system, including its impact on sustainability and equity.',
      keywords: ['Discuss', 'Private health insurance', 'Sustainability', 'Equity']
    },
    
    // Data Analysis Questions
    {
      id: 19,
      category: 'outcome1',
      type: 'extended',
      marks: 6,
      question: 'Using the data provided, analyse trends in life expectancy for males and females in Australia over the past 20 years. Suggest two factors that may have contributed to these trends.',
      keywords: ['Analyse', 'Data', 'Life expectancy trends', 'Contributing factors']
    },
    {
      id: 20,
      category: 'outcome1',
      type: 'short',
      marks: 3,
      question: 'Calculate the DALY for a condition given: YLL = 150 and YLD = 75. Explain what this result indicates.',
      keywords: ['Calculate', 'DALY', 'YLL', 'YLD']
    },
    
    // Health Promotion Evaluation
    {
      id: 21,
      category: 'outcome2',
      type: 'extended',
      marks: 10,
      question: 'Evaluate the "Quit" smoking campaign using the Ottawa Charter action areas. Discuss how this campaign addresses both individual and population-level factors.',
      keywords: ['Evaluate', 'Quit campaign', 'Ottawa Charter', 'Individual', 'Population-level']
    },
    {
      id: 22,
      category: 'outcome2',
      type: 'extended',
      marks: 12,
      question: 'Analyse the role of VicHealth in promoting health and wellbeing in Victoria. In your response, discuss how VicHealth\'s approach reflects the principles of the social model of health.',
      keywords: ['Analyse', 'VicHealth', 'Social model', 'Health promotion']
    },
    
    // Complex Analysis Questions
    {
      id: 23,
      category: 'outcome1',
      type: 'extended',
      marks: 12,
      question: 'Compare and contrast the health status of Aboriginal and Torres Strait Islander peoples with non-Indigenous Australians. Analyse the factors contributing to these differences and evaluate current strategies to address health inequities.',
      keywords: ['Compare', 'Contrast', 'Indigenous health', 'Health status', 'Health inequities', 'Strategies']
    },
    {
      id: 24,
      category: 'outcome2',
      type: 'extended',
      marks: 10,
      question: 'Discuss the concept of "optimal health as a resource" and analyse how this understanding can benefit individuals and the nation.',
      keywords: ['Discuss', 'Optimal health as resource', 'Benefits', 'Individual', 'National']
    }
  ];

  const filteredQuestions = selectedCategory === 'all' 
    ? practiceQuestions 
    : practiceQuestions.filter(q => q.category === selectedCategory || q.type === selectedCategory);

  return (
    <section className="content-section">
      <h1>Unit 3 Practice Questions</h1>
      <p className="mb-6 text-slate-300">
        Comprehensive practice questions covering all key knowledge areas of Unit 3. Questions are categorized by outcome and difficulty level, with suggested mark allocations and key command words highlighted.
      </p>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-purple-300">Filter by Category:</h3>
        <div className="flex flex-wrap gap-2">
          {questionCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category.id 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-slate-700 text-purple-200 hover:bg-slate-600'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {filteredQuestions.map((q, index) => (
          <div key={q.id} className="bg-slate-700 p-6 rounded-lg shadow-md">
            <div className="flex flex-wrap items-center gap-4 mb-3">
              <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Question {q.id}
              </span>
              <span className="bg-slate-600 text-slate-200 px-3 py-1 rounded-full text-sm">
                {q.marks} mark{q.marks !== 1 ? 's' : ''}
              </span>
              <span className="bg-slate-600 text-slate-200 px-3 py-1 rounded-full text-sm">
                {q.category === 'outcome1' ? 'Outcome 1' : 'Outcome 2'}
              </span>
              <span className="bg-slate-600 text-slate-200 px-3 py-1 rounded-full text-sm">
                {q.type === 'short' ? 'Short Answer' : 'Extended Response'}
              </span>
            </div>
            
            <p className="text-lg mb-4 text-slate-100">{q.question}</p>
            
            <div className="border-t border-slate-600 pt-3">
              <p className="text-sm text-slate-400 mb-2">
                <strong>Key terms to focus on:</strong>
              </p>
              <div className="flex flex-wrap gap-2">
                {q.keywords.map((keyword, i) => (
                  <span key={i} className="bg-purple-800 text-purple-200 px-2 py-1 rounded text-xs">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-slate-700 rounded-lg">
        <h3 className="text-lg font-semibold text-purple-300 mb-3">Study Tips:</h3>
        <ul className="list-disc pl-6 space-y-2 text-slate-300">
          <li><strong>Command Words:</strong> Pay attention to command words (define, explain, analyse, evaluate, discuss) as they indicate the depth of response required.</li>
          <li><strong>Mark Allocation:</strong> Use mark allocation as a guide for response length - typically 1-2 key points per mark.</li>
          <li><strong>Examples:</strong> Always support your responses with relevant, specific examples from Australian health initiatives or data.</li>
          <li><strong>Structure:</strong> For extended responses, plan your answer with clear introduction, body paragraphs, and conclusion.</li>
          <li><strong>Link to Theory:</strong> Connect your answers to key concepts like the Ottawa Charter, social model of health, and health status indicators.</li>
        </ul>
      </div>

      <div className="mt-6 text-center">
        <p className="text-slate-400 text-sm">
          <em>Showing {filteredQuestions.length} of {practiceQuestions.length} questions. 
          For more practice, try the Unit 3 Quiz and SAC 2 Prep tools.</em>
        </p>
      </div>
    </section>
  );
}
