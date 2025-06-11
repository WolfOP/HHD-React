import { useState, useEffect } from 'react';

const initiatives = [
  {
    id: 'naccho',
    name: 'NACCHO',
    fullName: 'National Aboriginal Community Controlled Health Organisation',
    category: 'Health Services',
    type: 'Community-Controlled',
    description: 'Peak body representing Aboriginal Community Controlled Health Services, advocating for Indigenous health rights and self-determination.',
    evaluation: 'Federal funding increased Aboriginal participation in health policy. Seen as a model for self-determination. Improves holistic, culturally respectful care.',
    strengths: ['Community ownership', 'Cultural appropriateness', 'Self-determination', 'Advocacy power'],
    challenges: ['Funding limitations', 'Capacity building needs', 'Geographic coverage'],
    outcomes: ['Increased health service access', 'Better health outcomes', 'Policy influence'],
    difficulty: 'Advanced'
  },
  {
    id: 'closegap',
    name: 'Close the Gap',
    fullName: 'Closing the Gap Strategy',
    category: 'Government Policy',
    type: 'National Strategy',
    description: 'National framework aiming to reduce disadvantage among Aboriginal and Torres Strait Islander peoples across health, education, and employment.',
    evaluation: 'Mixed success. Year 12 attainment improved. Child mortality declined 33%. Life expectancy and cancer outcomes still lagging.',
    strengths: ['Government commitment', 'Measurable targets', 'Multi-sector approach', 'Long-term focus'],
    challenges: ['Slow progress on life expectancy', 'Cancer outcome gaps', 'Implementation challenges'],
    outcomes: ['Improved education outcomes', 'Reduced child mortality', 'Enhanced policy focus'],
    difficulty: 'Intermediate'
  },
  {
    id: 'goodhealth',
    name: 'Aboriginal Road to Good Health',
    fullName: 'Aboriginal Road to Good Health Program',
    category: 'Health Education',
    type: 'Prevention Program',
    description: 'Free diabetes prevention program teaching nutrition and lifestyle skills to Aboriginal communities.',
    evaluation: 'Well received. Participants report weight loss and health improvements. Positively impacts physical, mental and social wellbeing.',
    strengths: ['Community engagement', 'Practical skills', 'Holistic approach', 'Free access'],
    challenges: ['Limited reach', 'Sustainability concerns', 'Follow-up support'],
    outcomes: ['Weight management', 'Improved nutrition knowledge', 'Better health behaviors'],
    difficulty: 'Beginner'
  },
  {
    id: 'careears',
    name: "Care for Kids' Ears",
    fullName: "Care for Kids' Ears Campaign",
    category: 'Health Promotion',
    type: 'Awareness Campaign',
    description: 'Media campaign raising awareness about ear health and hearing problems in Indigenous children.',
    evaluation: 'High awareness. 40% of mothers identified campaign. Participants showed improved symptom knowledge and behaviours.',
    strengths: ['High recognition', 'Behavior change', 'Targeted messaging', 'Cultural relevance'],
    challenges: ['Limited geographic reach', 'Need for sustained messaging', 'Resource requirements'],
    outcomes: ['Increased awareness', 'Earlier detection', 'Improved care-seeking behavior'],
    difficulty: 'Beginner'
  },
  {
    id: 'moveitmob',
    name: 'Move it Mob Style',
    fullName: 'Move it Mob Style Physical Activity Program',
    category: 'Physical Activity',
    type: 'Community Program',
    description: 'TV show and community program promoting physical activity and healthy lifestyles for Indigenous communities.',
    evaluation: 'Positive feedback. In fourth season, community events well attended. Seen as culturally appropriate and engaging.',
    strengths: ['Cultural appropriateness', 'Community engagement', 'Media reach', 'Sustained program'],
    challenges: ['Measuring long-term impact', 'Scaling to all communities', 'Funding sustainability'],
    outcomes: ['Increased physical activity', 'Community participation', 'Positive role models'],
    difficulty: 'Intermediate'
  },
  {
    id: 'caac',
    name: 'Central Australian Aboriginal Congress (CAAC)',
    fullName: 'Central Australian Aboriginal Congress Health Service',
    category: 'Health Services',
    type: 'Community-Controlled',
    description: 'Aboriginal community-controlled health service providing comprehensive primary health care to Indigenous people in Central Australia.',
    evaluation: 'High participation due to community-run model. Offers relevant education and care. Promotes equity and engagement.',
    strengths: ['Community control', 'Comprehensive care', 'Cultural competency', 'Local employment'],
    challenges: ['Remote area challenges', 'Staff recruitment', 'Funding pressures'],
    outcomes: ['Improved health access', 'Community empowerment', 'Better health outcomes'],
    difficulty: 'Advanced'
  },
];

const categories = ['All Categories', ...new Set(initiatives.map(init => init.category))];
const difficulties = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

export default function KeySkill6() {
  const [responses, setResponses] = useState(() => {
    const stored = localStorage.getItem('keySkill6Responses');
    return stored ? JSON.parse(stored) : {};
  });
  const [submitted, setSubmitted] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [difficultyFilter, setDifficultyFilter] = useState('All Levels');
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('keySkill6Favorites');
    return stored ? JSON.parse(stored) : [];
  });
  const [expandedInitiative, setExpandedInitiative] = useState(null);
  const [evaluationCriteria, setEvaluationCriteria] = useState({
    effectiveness: true,
    equity: true,
    appropriateness: true,
    sustainability: true
  });

  useEffect(() => {
    localStorage.setItem('keySkill6Responses', JSON.stringify(responses));
  }, [responses]);

  useEffect(() => {
    localStorage.setItem('keySkill6Favorites', JSON.stringify(favorites));
  }, [favorites]);

  const filteredInitiatives = initiatives.filter(init => {
    const categoryMatch = categoryFilter === 'All Categories' || init.category === categoryFilter;
    const difficultyMatch = difficultyFilter === 'All Levels' || init.difficulty === difficultyFilter;
    return categoryMatch && difficultyMatch;
  });

  const handleChange = (id, value) => {
    setResponses({ ...responses, [id]: value });
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const getWordCount = (id) => {
    const text = responses[id] || '';
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const getCompletionRate = () => {
    const completed = Object.values(responses).filter(response => 
      response && response.length > 50
    ).length;
    return Math.round((completed / initiatives.length) * 100);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500';
      case 'Intermediate': return 'bg-yellow-500';
      case 'Advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleReset = () => {
    setResponses({});
    setSubmitted(false);
    setExpandedInitiative(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center text-2xl font-bold text-white shadow-lg">
              6
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-200">Initiative Evaluation</h2>
              <p className="text-slate-400">Critically evaluate Indigenous health initiatives for effectiveness and impact</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-slate-400">Completion</div>
            <div className="text-xl font-bold text-green-400">{getCompletionRate()}%</div>
            <div className="text-xs text-slate-500">{Object.keys(responses).length}/{initiatives.length} evaluated</div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 bg-slate-700 text-slate-200 rounded-lg text-sm border border-slate-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="px-3 py-2 bg-slate-700 text-slate-200 rounded-lg text-sm border border-slate-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                {difficulties.map(diff => (
                  <option key={diff} value={diff}>{diff}</option>
                ))}
              </select>
              
              <button
                onClick={handleSubmit}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  submitted 
                    ? 'bg-blue-500 text-white shadow-lg' 
                    : 'bg-slate-700 text-slate-300 hover:bg-blue-600 hover:text-white'
                }`}
              >
                📊 {submitted ? 'Hide Evaluations' : 'Show Sample Evaluations'}
              </button>
              
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-slate-600 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                🔄 Reset All
              </button>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-400">
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.382 2.46a1 1 0 00-.364 1.118l1.286 3.966c.3.922-.755 1.688-1.54 1.119l-3.382-2.46a1 1 0 00-1.176 0l-3.382 2.46c-.784.57-1.838-.197-1.54-1.119l1.286-3.966a1 1 0 00-.364-1.118l-3.382-2.46c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
              </svg>
              {favorites.length} favorited
            </div>
          </div>
        </div>

        {/* Evaluation Criteria Guide */}
        <div className="bg-gradient-to-r from-green-900/20 to-teal-900/20 border border-green-500/30 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-green-300 mb-4 flex items-center gap-2">
            📋 Evaluation Framework
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries({
              effectiveness: 'Does it achieve intended health outcomes?',
              equity: 'Does it reduce health inequities?',
              appropriateness: 'Is it culturally appropriate and relevant?',
              sustainability: 'Can it be maintained long-term?'
            }).map(([criterion, description]) => (
              <div key={criterion} className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={evaluationCriteria[criterion]}
                    onChange={(e) => setEvaluationCriteria(prev => ({
                      ...prev,
                      [criterion]: e.target.checked
                    }))}
                    className="text-green-500 focus:ring-green-400"
                  />
                  <h4 className="font-medium text-slate-200 capitalize">{criterion}</h4>
                </div>
                <p className="text-xs text-slate-400">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Initiative Cards */}
      <div className="space-y-6">
        {filteredInitiatives.map((initiative) => {
          const isFavorite = favorites.includes(initiative.id);
          const wordCount = getWordCount(initiative.id);
          const isExpanded = expandedInitiative === initiative.id;
          
          return (
            <div key={initiative.id} className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 border border-slate-600 hover:border-green-400 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {initiative.category}
                  </span>
                  <span className={`${getDifficultyColor(initiative.difficulty)} text-white px-2 py-1 rounded text-xs font-semibold`}>
                    {initiative.difficulty}
                  </span>
                  <span className="bg-slate-600 text-slate-300 px-2 py-1 rounded text-xs">
                    {initiative.type}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setExpandedInitiative(isExpanded ? null : initiative.id)}
                    className="p-1 rounded-full text-slate-400 hover:text-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
                    title={isExpanded ? 'Collapse details' : 'Expand details'}
                  >
                    <svg className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={() => toggleFavorite(initiative.id)}
                    className={`p-1 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                      isFavorite ? 'text-yellow-400 scale-110' : 'text-slate-400 hover:text-yellow-400 hover:scale-110'
                    }`}
                  >
                    <svg className="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.036 6.29a1 1 0 00.95.69h6.6c.969 0 1.371 1.24.588 1.81l-5.347 3.89a1 1 0 00-.364 1.118l2.036 6.29c.3.921-.755 1.688-1.54 1.118l-5.347-3.89a1 1 0 00-1.176 0l-5.347 3.89c-.784.57-1.838-.197-1.54-1.118l2.036-6.29a1 1 0 00-.364-1.118l-5.347-3.89c-.783-.57-.38-1.81.588-1.81h6.6a1 1 0 00.95-.69l2.036-6.29z" />
                    </svg>
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-bold text-green-300 mb-1">{initiative.name}</h3>
              <p className="text-slate-400 text-sm mb-3">{initiative.fullName}</p>
              
              <p className="text-slate-300 mb-4 leading-relaxed">{initiative.description}</p>

              {isExpanded && (
                <div className="mb-4 grid md:grid-cols-3 gap-4">
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                    <h4 className="font-semibold text-green-300 mb-2">Strengths</h4>
                    <ul className="space-y-1">
                      {initiative.strengths.map((strength, i) => (
                        <li key={i} className="text-sm text-slate-300 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                    <h4 className="font-semibold text-yellow-300 mb-2">Challenges</h4>
                    <ul className="space-y-1">
                      {initiative.challenges.map((challenge, i) => (
                        <li key={i} className="text-sm text-slate-300 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                    <h4 className="font-semibold text-blue-300 mb-2">Outcomes</h4>
                    <ul className="space-y-1">
                      {initiative.outcomes.map((outcome, i) => (
                        <li key={i} className="text-sm text-slate-300 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-slate-300">Your Evaluation:</label>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>{wordCount} words</span>
                    {wordCount >= 50 && (
                      <span className="text-green-400">✓ Substantial</span>
                    )}
                  </div>
                </div>
                <textarea
                  className="w-full p-4 rounded-lg bg-slate-700 text-slate-200 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all"
                  rows={5}
                  placeholder="Evaluate this initiative considering effectiveness, equity, cultural appropriateness, and sustainability. How does it improve health outcomes and promote social justice for Indigenous communities?"
                  value={responses[initiative.id] || ''}
                  onChange={(e) => handleChange(initiative.id, e.target.value)}
                />
              </div>
              
              {submitted && (
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
                    📊 Sample Evaluation:
                  </h4>
                  <p className="text-blue-200 text-sm leading-relaxed">
                    {initiative.evaluation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredInitiatives.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <svg className="w-16 h-16 mx-auto mb-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.488.901-6.077 2.378l-.096.074c-.487.365-.896.833-1.208 1.386C4.392 19.394 4.259 20 4.5 20.5S5.606 21 6.162 21h11.676c.556 0 1.054-.606.792-1.122a7.929 7.929 0 00-1.208-1.386l-.096-.074z" />
          </svg>
          <p>No initiatives found with current filters.</p>
        </div>
      )}

      {/* Study Tips */}
      <div className="mt-8 bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
          📚 Evaluation Tips for VCE HHD
        </h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm text-slate-300 leading-relaxed">
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-green-300 mb-1">Effectiveness Questions:</h4>
              <ul className="space-y-1 ml-4">
                <li>• Does it achieve its stated goals?</li>
                <li>• What evidence supports its success?</li>
                <li>• Are there measurable health improvements?</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-300 mb-1">Equity Considerations:</h4>
              <ul className="space-y-1 ml-4">
                <li>• Does it reduce health gaps?</li>
                <li>• Who benefits most/least?</li>
                <li>• Are barriers to access addressed?</li>
              </ul>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-purple-300 mb-1">Cultural Appropriateness:</h4>
              <ul className="space-y-1 ml-4">
                <li>• Is it designed with community input?</li>
                <li>• Does it respect Indigenous values?</li>
                <li>• Are cultural practices integrated?</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-orange-300 mb-1">Sustainability Factors:</h4>
              <ul className="space-y-1 ml-4">
                <li>• Is funding secure long-term?</li>
                <li>• Can the community maintain it?</li>
                <li>• Are there succession plans?</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
