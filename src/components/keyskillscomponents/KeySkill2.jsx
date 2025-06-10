import React, { useState, useEffect } from 'react';

const healthInitiatives = [
  {
    id: 1,
    name: 'Provision of Clean Drinking Water',
    category: "Old Public Health",
    icon: "💧",
    period: "1800s-1900s",
    explanation: 'Government intervention to provide clean water supply and sewage systems. Dramatically reduced waterborne diseases like cholera and typhoid, leading to significant improvements in life expectancy.',
    keyFeatures: [
      "Government-led infrastructure development",
      "Population-wide intervention",
      "Focus on environmental health determinants",
      "Biomedical approach to disease prevention"
    ],
    healthOutcomes: [
      "Reduced waterborne disease mortality by 80%",
      "Increased average life expectancy by 10-15 years",
      "Improved child survival rates",
      "Enhanced overall population health"
    ]
  },
  {
    id: 2,
    name: 'Mass Immunisation Programs',
    category: "Old Public Health / Health Promotion",
    icon: "💉",
    period: "1950s-present",
    explanation: 'Systematic vaccination programs targeting infectious diseases. Combines old public health (government-led) with health promotion (education and community engagement) approaches.',
    keyFeatures: [
      "Evidence-based medical intervention",
      "Population-wide implementation",
      "Education and awareness campaigns",
      "Community health engagement"
    ],
    healthOutcomes: [
      "Eliminated polio and smallpox in Australia",
      "Reduced childhood infectious disease by 95%",
      "Prevented thousands of deaths annually",
      "Achieved herd immunity for multiple diseases"
    ]
  },
  {
    id: 3,
    name: 'Quitline Smoking Cessation',
    category: "Social Model of Health / Health Promotion",
    icon: "🚭",
    period: "1990s-present",
    explanation: 'Telephone counselling service supporting smoking cessation. Addresses multiple social determinants and empowers individuals to make health behaviour changes.',
    keyFeatures: [
      "Individual and community-level support",
      "Addresses social and psychological factors",
      "Culturally appropriate services",
      "Focus on empowerment and choice"
    ],
    healthOutcomes: [
      "Smoking rates reduced from 35% to 11%",
      "Prevented 700,000 deaths since 1990",
      "Reduced cardiovascular disease by 30%",
      "Decreased healthcare costs by $8 billion"
    ]
  },
  {
    id: 4,
    name: 'Australian Dietary Guidelines',
    category: "Health Promotion",
    icon: "🥗",
    period: "1980s-present",
    explanation: 'Evidence-based nutrition recommendations promoting healthy eating patterns. Uses education, policy, and environmental strategies to improve population nutrition.',
    keyFeatures: [
      "Education and awareness strategies",
      "Policy development and implementation",
      "Environmental changes (food labelling)",
      "Community-based programs"
    ],
    healthOutcomes: [
      "Increased fruit/vegetable consumption by 25%",
      "Reduced diet-related disease risk",
      "Improved nutritional knowledge",
      "Enhanced food security programs"
    ]
  },
  {
    id: 5,
    name: 'Aboriginal Road to Good Health Program',
    category: "Social Model / Indigenous Health",
    icon: "🏃‍♀️",
    period: "2000s-present",
    explanation: 'Culturally appropriate physical activity program for Aboriginal and Torres Strait Islander communities. Addresses social determinants and promotes cultural strength.',
    keyFeatures: [
      "Community-controlled and led",
      "Culturally safe and appropriate",
      "Addresses multiple social determinants",
      "Incorporates traditional knowledge"
    ],
    healthOutcomes: [
      "Increased physical activity participation by 40%",
      "Improved mental health and wellbeing",
      "Strengthened cultural connections",
      "Reduced chronic disease risk factors"
    ]
  },
  {
    id: 6,
    name: 'SunSmart Campaign',
    category: "Health Promotion",
    icon: "☀️",
    period: "1980s-present", 
    explanation: 'Comprehensive skin cancer prevention campaign using education, policy, and environmental strategies. "Slip, Slop, Slap, Seek, Slide" messaging promotes sun protection behaviours.',
    keyFeatures: [
      "Mass media education campaigns",
      "School-based programs",
      "Policy advocacy (shade structures)",
      "Community engagement"
    ],
    healthOutcomes: [
      "Melanoma rates stabilized despite high UV",
      "Sunscreen use increased from 10% to 70%",
      "Reduced skin cancer in younger generations",
      "Enhanced sun protection awareness"
    ]
  }
];

const healthModels = [
  {
    name: "Old Public Health",
    description: "Government-led interventions targeting disease prevention through medical and environmental approaches",
    characteristics: ["Top-down approach", "Focus on disease", "Biomedical focus", "Population-wide interventions"],
    color: "blue"
  },
  {
    name: "Social Model of Health",
    description: "Addresses social determinants of health and empowers communities to improve their health",
    characteristics: ["Community empowerment", "Addresses social factors", "Prevention focus", "Equity emphasis"],
    color: "green"
  },
  {
    name: "Health Promotion",
    description: "Ottawa Charter-based approach using multiple strategies to enable healthy choices",
    characteristics: ["Education and awareness", "Policy development", "Environmental changes", "Community action"],
    color: "purple"
  }
];

export default function KeySkill2() {
  const [selectedInitiative, setSelectedInitiative] = useState(null);
  const [selectedModel, setSelectedModel] = useState('all');
  const [showComparison, setShowComparison] = useState(false);
  const [completedInitiatives, setCompletedInitiatives] = useState([]);
  const [isFavorited, setIsFavorited] = useState(false);
  const [notes, setNotes] = useState('');

  // Load saved state from localStorage
  useEffect(() => {
    const savedCompleted = localStorage.getItem('keyskill2-completed');
    const savedFavorite = localStorage.getItem('keyskill2-favorite');
    const savedNotes = localStorage.getItem('keyskill2-notes');
    
    if (savedCompleted) setCompletedInitiatives(JSON.parse(savedCompleted));
    if (savedFavorite) setIsFavorited(JSON.parse(savedFavorite));
    if (savedNotes) setNotes(savedNotes);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('keyskill2-completed', JSON.stringify(completedInitiatives));
  }, [completedInitiatives]);

  useEffect(() => {
    localStorage.setItem('keyskill2-favorite', JSON.stringify(isFavorited));
  }, [isFavorited]);

  useEffect(() => {
    localStorage.setItem('keyskill2-notes', notes);
  }, [notes]);

  const filteredInitiatives = selectedModel === 'all' 
    ? healthInitiatives 
    : healthInitiatives.filter(init => init.category.toLowerCase().includes(selectedModel.toLowerCase()));

  const toggleCompleted = (initiativeId) => {
    if (completedInitiatives.includes(initiativeId)) {
      setCompletedInitiatives(completedInitiatives.filter(id => id !== initiativeId));
    } else {
      setCompletedInitiatives([...completedInitiatives, initiativeId]);
    }
  };

  const getModelColor = (category) => {
    if (category.includes('Old Public Health')) return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-300';
    if (category.includes('Social Model')) return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-300';
    if (category.includes('Health Promotion')) return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20 dark:text-purple-300';
    return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-300';
  };

  return (
    <div className="modern-component">
      {/* Header */}
      <div className="content-card">
        <div className="card-header">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="skill-icon">🏛️</div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Health Initiatives & Models
                </h2>
                <p className="text-gray-600 dark:text-slate-300">
                  Explore how different health initiatives apply various health models and approaches
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
              <button
                onClick={() => setShowComparison(!showComparison)}
                className="px-3 py-1 bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-200 rounded-full text-sm hover:bg-indigo-200 dark:hover:bg-indigo-900/30 transition-colors"
              >
                {showComparison ? 'Hide' : 'Show'} Model Comparison
              </button>
            </div>
          </div>
        </div>

        {/* Model Comparison */}
        {showComparison && (
          <div className="mb-6 p-4 bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-200 dark:border-indigo-800 rounded-lg">
            <h3 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-4">Health Model Comparison</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {healthModels.map((model, index) => (
                <div key={index} className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-gray-200 dark:border-slate-700">
                  <h4 className={`font-semibold mb-2 ${
                    model.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                    model.color === 'green' ? 'text-green-600 dark:text-green-400' :
                    'text-purple-600 dark:text-purple-400'
                  }`}>
                    {model.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-slate-300 mb-2">{model.description}</p>
                  <ul className="text-xs space-y-1">
                    {model.characteristics.map((char, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-gray-400 mt-0.5">•</span>
                        <span className="text-gray-600 dark:text-slate-400">{char}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filter Controls */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedModel('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedModel === 'all'
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                  : 'bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600'
              }`}
            >
              All Models ({healthInitiatives.length})
            </button>
            {healthModels.map((model) => (
              <button
                key={model.name}
                onClick={() => setSelectedModel(model.name)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedModel === model.name
                    ? `${model.color === 'blue' ? 'bg-blue-600 text-white' :
                        model.color === 'green' ? 'bg-green-600 text-white' :
                        'bg-purple-600 text-white'}`
                    : 'bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                }`}
              >
                {model.name} ({healthInitiatives.filter(init => init.category.includes(model.name)).length})
              </button>
            ))}
          </div>
        </div>

        {/* Initiatives Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {filteredInitiatives.map((initiative) => (
            <div
              key={initiative.id}
              className={`group p-4 border rounded-lg transition-all cursor-pointer ${
                selectedInitiative?.id === initiative.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-gray-50 dark:hover:bg-slate-800/50'
              }`}
              onClick={() => setSelectedInitiative(initiative)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{initiative.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {initiative.name}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-slate-400">{initiative.period}</span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCompleted(initiative.id);
                  }}
                  className={`action-button ${completedInitiatives.includes(initiative.id) ? 'completed' : ''}`}
                  aria-label="Toggle completed"
                >
                  {completedInitiatives.includes(initiative.id) ? '✅' : '⭕'}
                </button>
              </div>
              
              <div className="mb-3">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getModelColor(initiative.category)}`}>
                  {initiative.category}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-slate-300 line-clamp-2">
                {initiative.explanation}
              </p>
            </div>
          ))}
        </div>

        {/* Detailed Initiative View */}
        {selectedInitiative && (
          <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{selectedInitiative.icon}</span>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {selectedInitiative.name}
                </h3>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getModelColor(selectedInitiative.category)}`}>
                  {selectedInitiative.category}
                </span>
              </div>
            </div>
            
            <p className="text-gray-700 dark:text-slate-300 mb-6 leading-relaxed">
              {selectedInitiative.explanation}
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Features:</h4>
                <ul className="space-y-2">
                  {selectedInitiative.keyFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span className="text-sm text-gray-700 dark:text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Health Outcomes:</h4>
                <ul className="space-y-2">
                  {selectedInitiative.healthOutcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span className="text-sm text-gray-700 dark:text-slate-300">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Notes Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
            Your Notes & Reflections
          </h3>
          <textarea
            placeholder="Record your insights about how different health models are applied in these initiatives..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full h-32 p-4 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            aria-label="Notes and reflections"
          />
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-slate-400 mt-4">
          <div className="flex items-center gap-2">
            <span>Progress:</span>
            <div className="w-32 bg-gray-200 dark:bg-slate-700 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedInitiatives.length / healthInitiatives.length) * 100}%` }}
              ></div>
            </div>
            <span>{Math.round((completedInitiatives.length / healthInitiatives.length) * 100)}%</span>
          </div>
          <div>
            <span>Explored: {completedInitiatives.length}/{healthInitiatives.length} initiatives</span>
          </div>
        </div>
      </div>
    </div>
  );
}
