import React, { useState, useEffect } from 'react';

const healthModels = {
  biomedical: {
    name: "Biomedical Model",
    icon: "🏥",
    color: "blue",
    description: "Focuses on the physical aspects of health, treating disease through medical intervention",
    coreBeliefs: [
      "Health is the absence of disease",
      "Disease has biological or physical causes", 
      "Treatment focuses on symptoms and pathology",
      "Individual responsibility for health outcomes"
    ],
    strengths: [
      'Highly effective for treating acute conditions and medical emergencies',
      'Relies on evidence-based medical technologies and interventions',
      'Provides measurable, immediate health improvements',
      'Excellent for surgical procedures and pharmaceutical treatments',
      'Strong scientific foundation with rigorous testing protocols'
    ],
    limitations: [
      'Does not address broader social determinants of health',
      'Often expensive and resource-intensive for healthcare systems',
      'Focuses primarily on treatment rather than prevention',
      'May not consider cultural, social, or environmental factors',
      'Can create dependency on medical intervention rather than empowerment'
    ],
    examples: [
      "Hospital emergency departments treating trauma patients",
      "Surgical procedures for cancer treatment",
      "Pharmaceutical interventions for diabetes management",
      "Diagnostic imaging and laboratory testing",
      "Intensive care units for critical illness"
    ],
    healthOutcomes: [
      "Increased survival rates for acute conditions",
      "Reduced mortality from treatable diseases",
      "Improved quality of life through symptom management",
      "Extended life expectancy through medical advances"
    ]
  },
  social: {
    name: "Social Model of Health",
    icon: "🤝",
    color: "green", 
    description: "Addresses the social, economic, and environmental determinants that influence health outcomes",
    coreBeliefs: [
      "Health is influenced by social determinants",
      "Community and environmental factors affect wellbeing",
      "Prevention is better than treatment",
      "Health equity and social justice are fundamental"
    ],
    strengths: [
      'Addresses root causes and broader determinants of health',
      'Focuses on prevention and health promotion strategies',
      'Encourages community participation and empowerment',
      'Cost-effective long-term approach to population health',
      'Promotes health equity and reduces health disparities'
    ],
    limitations: [
      'May not provide immediate solutions for acute medical conditions',
      'Requires long-term commitment with less visible short-term impact',
      'Needs intersectoral collaboration which can be complex to coordinate',
      'Difficult to measure immediate health outcomes',
      'May face resistance from established medical systems'
    ],
    examples: [
      "Community-based health promotion programs",
      "Policy changes to improve housing and education",
      "Environmental interventions for cleaner air and water",
      "Social support programs for vulnerable populations",
      "Workplace health and safety initiatives"
    ],
    healthOutcomes: [
      "Reduced health inequities across populations",
      "Lower rates of preventable chronic diseases",
      "Improved mental health and social cohesion",
      "Enhanced community resilience and empowerment"
    ]
  }
};

const comparisonScenarios = [
  {
    id: 1,
    title: "Addressing Type 2 Diabetes",
    description: "How would each model approach the rising rates of Type 2 diabetes in Australia?",
    biomedicalApproach: "Focus on medical management with medication, blood glucose monitoring, regular check-ups, and specialist referrals. Emphasize individual compliance with treatment regimens.",
    socialApproach: "Address underlying causes through community education, food security programs, urban planning for physical activity, addressing socioeconomic inequalities, and culturally appropriate health promotion."
  },
  {
    id: 2, 
    title: "Indigenous Health Disparities",
    description: "How would each model address the health gap between Indigenous and non-Indigenous Australians?",
    biomedicalApproach: "Increase medical services in remote communities, mobile health clinics, specialist visits, and focus on treating higher rates of chronic diseases through clinical interventions.",
    socialApproach: "Address historical trauma, improve education and economic opportunities, support community-controlled health services, respect cultural practices, and tackle systemic discrimination."
  },
  {
    id: 3,
    title: "Mental Health Crisis",
    description: "How would each model address increasing rates of anxiety and depression in young people?",
    biomedicalApproach: "Increase access to psychiatrists and psychologists, develop new medications, improve diagnostic tools, and expand mental health hospital services.",
    socialApproach: "Create supportive school environments, address cyberbullying, improve social media literacy, strengthen community connections, and tackle underlying social pressures."
  }
];

export default function KeySkill3() {
  const [activeView, setActiveView] = useState('comparison');
  const [selectedModel, setSelectedModel] = useState('biomedical');
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [completedScenarios, setCompletedScenarios] = useState([]);
  const [isFavorited, setIsFavorited] = useState(false);
  const [reflectionNotes, setReflectionNotes] = useState('');

  // Load saved state from localStorage
  useEffect(() => {
    const savedCompleted = localStorage.getItem('keyskill3-completed');
    const savedFavorite = localStorage.getItem('keyskill3-favorite');
    const savedNotes = localStorage.getItem('keyskill3-notes');
    
    if (savedCompleted) setCompletedScenarios(JSON.parse(savedCompleted));
    if (savedFavorite) setIsFavorited(JSON.parse(savedFavorite));
    if (savedNotes) setReflectionNotes(savedNotes);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('keyskill3-completed', JSON.stringify(completedScenarios));
  }, [completedScenarios]);

  useEffect(() => {
    localStorage.setItem('keyskill3-favorite', JSON.stringify(isFavorited));
  }, [isFavorited]);

  useEffect(() => {
    localStorage.setItem('keyskill3-notes', reflectionNotes);
  }, [reflectionNotes]);

  const toggleScenarioCompleted = (scenarioId) => {
    if (completedScenarios.includes(scenarioId)) {
      setCompletedScenarios(completedScenarios.filter(id => id !== scenarioId));
    } else {
      setCompletedScenarios([...completedScenarios, scenarioId]);
    }
  };

  return (
    <div className="modern-component">
      {/* Header */}
      <div className="content-card">
        <div className="card-header">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="skill-icon">🔬</div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Health Model Comparison
                </h2>
                <p className="text-gray-600 dark:text-slate-300">
                  Compare biomedical and social models of health in different contexts
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsFavorited(!isFavorited)}
                className={`action-button ${isFavorited ? 'favorited' : ''}`}
                aria-label="Toggle favorite"
              >
                {isFavorited ? '❤️' : '🤍'}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveView('comparison')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeView === 'comparison'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600'
            }`}
          >
            📊 Model Comparison
          </button>
          <button
            onClick={() => setActiveView('scenarios')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeView === 'scenarios'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600'
            }`}
          >
            🎯 Practice Scenarios
          </button>
          <button
            onClick={() => setActiveView('reflection')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeView === 'reflection'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600'
            }`}
          >
            📝 Reflection
          </button>
        </div>

        {/* Model Comparison View */}
        {activeView === 'comparison' && (
          <div className="space-y-6">
            {/* Model Selection */}
            <div className="flex gap-4">
              <button
                onClick={() => setSelectedModel('biomedical')}
                className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                  selectedModel === 'biomedical'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{healthModels.biomedical.icon}</span>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {healthModels.biomedical.name}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-slate-300 text-left">
                  {healthModels.biomedical.description}
                </p>
              </button>
              
              <button
                onClick={() => setSelectedModel('social')}
                className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                  selectedModel === 'social'
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : 'border-gray-200 dark:border-slate-700 hover:border-green-300 dark:hover:border-green-600'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{healthModels.social.icon}</span>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {healthModels.social.name}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-slate-300 text-left">
                  {healthModels.social.description}
                </p>
              </button>
            </div>

            {/* Detailed Model Information */}
            <div className={`p-6 rounded-lg border ${
              selectedModel === 'biomedical' 
                ? 'border-blue-200 bg-blue-50 dark:bg-blue-900/10 dark:border-blue-800'
                : 'border-green-200 bg-green-50 dark:bg-green-900/10 dark:border-green-800'
            }`}>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Core Beliefs */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Core Beliefs:</h4>
                  <ul className="space-y-2">
                    {healthModels[selectedModel].coreBeliefs.map((belief, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className={`mt-1 ${selectedModel === 'biomedical' ? 'text-blue-500' : 'text-green-500'}`}>
                          •
                        </span>
                        <span className="text-sm text-gray-700 dark:text-slate-300">{belief}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Examples */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Examples:</h4>
                  <ul className="space-y-2">
                    {healthModels[selectedModel].examples.map((example, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className={`mt-1 ${selectedModel === 'biomedical' ? 'text-blue-500' : 'text-green-500'}`}>
                          •
                        </span>
                        <span className="text-sm text-gray-700 dark:text-slate-300">{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Strengths */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Strengths:</h4>
                  <ul className="space-y-2">
                    {healthModels[selectedModel].strengths.map((strength, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span className="text-sm text-gray-700 dark:text-slate-300">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Limitations */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Limitations:</h4>
                  <ul className="space-y-2">
                    {healthModels[selectedModel].limitations.map((limitation, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">⚠</span>
                        <span className="text-sm text-gray-700 dark:text-slate-300">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Practice Scenarios View */}
        {activeView === 'scenarios' && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Practice Scenarios
              </h3>
              <p className="text-gray-600 dark:text-slate-300">
                Explore how each model would approach different health challenges
              </p>
            </div>

            <div className="grid gap-4">
              {comparisonScenarios.map((scenario) => (
                <div
                  key={scenario.id}
                  className={`border rounded-lg transition-all ${
                    selectedScenario?.id === scenario.id
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-gray-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-600'
                  }`}
                >
                  <div
                    className="p-4 cursor-pointer"
                    onClick={() => setSelectedScenario(selectedScenario?.id === scenario.id ? null : scenario)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {scenario.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-slate-300">
                          {scenario.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleScenarioCompleted(scenario.id);
                          }}
                          className={`action-button ${completedScenarios.includes(scenario.id) ? 'completed' : ''}`}
                          aria-label="Toggle completed"
                        >
                          {completedScenarios.includes(scenario.id) ? '✅' : '⭕'}
                        </button>
                        <span className="text-gray-400">
                          {selectedScenario?.id === scenario.id ? '▼' : '▶'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {selectedScenario?.id === scenario.id && (
                    <div className="px-4 pb-4">
                      <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <h5 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                            🏥 Biomedical Approach
                          </h5>
                          <p className="text-sm text-blue-700 dark:text-blue-300">
                            {scenario.biomedicalApproach}
                          </p>
                        </div>
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <h5 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                            🤝 Social Model Approach
                          </h5>
                          <p className="text-sm text-green-700 dark:text-green-300">
                            {scenario.socialApproach}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reflection View */}
        {activeView === 'reflection' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Reflection & Analysis
              </h3>
              <textarea
                placeholder="Reflect on the key differences between the biomedical and social models of health. Consider when each model might be most appropriate and how they could work together..."
                value={reflectionNotes}
                onChange={(e) => setReflectionNotes(e.target.value)}
                className="w-full h-40 p-4 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                aria-label="Reflection notes"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
                  💡 Reflection Prompts:
                </h4>
                <ul className="space-y-2 text-sm text-yellow-700 dark:text-yellow-300">
                  <li>• Which model do you think is more effective for preventing disease?</li>
                  <li>• How might both models work together in healthcare delivery?</li>
                  <li>• What are the cost implications of each approach?</li>
                  <li>• How do cultural factors influence the effectiveness of each model?</li>
                </ul>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800 rounded-lg">
                <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-3">
                  📊 Your Progress:
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-700 dark:text-purple-300">Scenarios Completed:</span>
                    <span className="text-purple-600 dark:text-purple-400 font-medium">
                      {completedScenarios.length}/{comparisonScenarios.length}
                    </span>
                  </div>
                  <div className="w-full bg-purple-200 dark:bg-purple-800 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(completedScenarios.length / comparisonScenarios.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
