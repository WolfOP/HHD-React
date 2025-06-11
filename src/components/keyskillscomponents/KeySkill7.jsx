import { useState, useEffect } from 'react';

const initiatives = [
  {
    id: 'naccho',
    name: 'NACCHO',
    fullName: 'National Aboriginal Community Controlled Health Organisation',
    category: 'Health Services',
    priority: 'High',
    description: 'Represents 142 Aboriginal Community Controlled Health Services (ACCHS), offering culturally appropriate, holistic healthcare.',
    targets: ['Health service access', 'Cultural competency', 'Community control', 'Self-determination'],
    socialJustice: {
      access: 'Expands provision of health and wellbeing services with culturally respectful approaches.',
      equity: 'Focuses on needs-based, culturally relevant healthcare for Aboriginal communities.',
      participation: 'Initiated and operated by the Aboriginal community, fostering self-determination.'
    },
    evaluation: 'Federal funding in 1997 increased Aboriginal participation in national health policy. NACCHO is seen as a living embodiment of self-determination.',
    outcomes: ['Increased community participation', 'Improved cultural competency', 'Enhanced self-determination'],
    challenges: ['Funding sustainability', 'Geographic coverage', 'Capacity building'],
    impact: 'High'
  },
  {
    id: 'close-the-gap',
    name: 'Close the Gap',
    fullName: 'Closing the Gap Strategy',
    category: 'Government Policy',
    priority: 'Critical',
    description: 'Aims to close health/life expectancy gaps between Indigenous and non-Indigenous Australians with seven key targets.',
    targets: ['Life expectancy', 'Child mortality', 'Education', 'Employment', 'Health outcomes'],
    socialJustice: {
      access: 'Improves access to early childhood education, employment, and services.',
      equity: 'Directly targets systemic health inequalities with national action.',
      participation: 'Developed in collaboration with communities.'
    },
    evaluation: 'Only 1/7 targets met. Some improvement in Year 12 attainment and child mortality. Life expectancy gap widening.',
    outcomes: ['Improved education outcomes', 'Reduced child mortality', 'Mixed life expectancy results'],
    challenges: ['Complex implementation', 'Slow progress', 'Resource allocation'],
    impact: 'Mixed'
  },
  {
    id: 'good-health',
    name: 'Road to Good Health',
    fullName: 'Aboriginal Road to Good Health Program',
    category: 'Health Education',
    priority: 'Medium',
    description: 'A 6-week free diabetes prevention program promoting healthy eating and physical activity for Indigenous Australians.',
    targets: ['Diabetes prevention', 'Lifestyle modification', 'Health education', 'Community engagement'],
    socialJustice: {
      access: 'Free program, allows participants to bring family/friends.',
      equity: 'Targets a group with high diabetes prevalence.',
      participation: 'Encourages community participation through culturally relevant education.'
    },
    evaluation: 'Positive participant feedback. Reported weight loss and lifestyle changes.',
    outcomes: ['Weight management', 'Improved nutrition knowledge', 'Behavior change'],
    challenges: ['Limited reach', 'Long-term sustainability', 'Follow-up support'],
    impact: 'Medium'
  },
  {
    id: 'kids-ears',
    name: "Care for Kids' Ears",
    fullName: "Care for Kids' Ears Campaign",
    category: 'Health Promotion',
    priority: 'Medium',
    description: 'Raises awareness of otitis media and hearing loss using apps, posters, and media in 22 Indigenous languages.',
    targets: ['Hearing health', 'Early detection', 'Parent education', 'Health awareness'],
    socialJustice: {
      access: 'Broad information distribution via schools, kiosks, media, and multiple languages.',
      equity: 'Targets a health condition highly prevalent among Aboriginal children.',
      participation: 'Resources developed for communities and schools.'
    },
    evaluation: '40% of mothers recognized the campaign. Knowledge of symptoms and prevention increased.',
    outcomes: ['Increased awareness', 'Better symptom recognition', 'Improved care-seeking'],
    challenges: ['Sustained messaging', 'Geographic reach', 'Behavior translation'],
    impact: 'Medium'
  },
  {
    id: 'move-it-mob-style',
    name: 'Move It Mob Style',
    fullName: 'Move It Mob Style Physical Activity Program',
    category: 'Physical Activity',
    priority: 'Medium',
    description: 'TV and online fitness program featuring Indigenous dancers and music promoting physical activity in communities.',
    targets: ['Physical activity', 'Cultural celebration', 'Youth engagement', 'Community participation'],
    socialJustice: {
      access: 'Free and widely distributed online and on TV.',
      equity: 'Culturally tailored with Indigenous role models.',
      participation: 'Led by Indigenous youth and showcases culture.'
    },
    evaluation: 'Award-nominated, well-received, running for multiple seasons. Positive community feedback.',
    outcomes: ['Increased physical activity', 'Cultural pride', 'Youth leadership'],
    challenges: ['Measuring impact', 'Program sustainability', 'Scaling reach'],
    impact: 'Medium'
  }
];

const categories = ['All Categories', ...new Set(initiatives.map(init => init.category))];
const priorities = ['All Priorities', 'Critical', 'High', 'Medium'];

export default function KeySkill7() {
  const [expandedId, setExpandedId] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [priorityFilter, setPriorityFilter] = useState('All Priorities');
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('keySkill7Favorites');
    return stored ? JSON.parse(stored) : [];
  });
  const [comparisonMode, setComparisonMode] = useState(false);
  const [selectedForComparison, setSelectedForComparison] = useState([]);
  const [studyNotes, setStudyNotes] = useState(() => {
    const stored = localStorage.getItem('keySkill7Notes');
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    localStorage.setItem('keySkill7Favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('keySkill7Notes', JSON.stringify(studyNotes));
  }, [studyNotes]);

  const filteredInitiatives = initiatives.filter(init => {
    const categoryMatch = categoryFilter === 'All Categories' || init.category === categoryFilter;
    const priorityMatch = priorityFilter === 'All Priorities' || init.priority === priorityFilter;
    return categoryMatch && priorityMatch;
  });

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const toggleComparison = (id) => {
    if (selectedForComparison.includes(id)) {
      setSelectedForComparison(prev => prev.filter(item => item !== id));
    } else if (selectedForComparison.length < 3) {
      setSelectedForComparison(prev => [...prev, id]);
    }
  };

  const updateStudyNotes = (id, notes) => {
    setStudyNotes(prev => ({
      ...prev,
      [id]: notes
    }));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'bg-red-500';
      case 'High': return 'bg-orange-500';
      case 'Medium': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'High': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'Mixed': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl font-bold text-white shadow-lg">
              7
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-200">Social Justice Evaluation</h2>
              <p className="text-slate-400">Evaluate how initiatives promote social justice and health outcomes</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-slate-400">Initiatives</div>
            <div className="text-xl font-bold text-purple-400">{filteredInitiatives.length}</div>
            <div className="text-xs text-slate-500">available for study</div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 bg-slate-700 text-slate-200 rounded-lg text-sm border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-3 py-2 bg-slate-700 text-slate-200 rounded-lg text-sm border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                {priorities.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
              
              <button
                onClick={() => setComparisonMode(!comparisonMode)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  comparisonMode 
                    ? 'bg-blue-500 text-white shadow-lg' 
                    : 'bg-slate-700 text-slate-300 hover:bg-blue-600 hover:text-white'
                }`}
              >
                📊 {comparisonMode ? 'Exit Comparison' : 'Compare Mode'}
              </button>
            </div>

            <div className="flex items-center gap-4">
              {comparisonMode && (
                <div className="text-sm text-slate-400">
                  {selectedForComparison.length}/3 selected
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.382 2.46a1 1 0 00-.364 1.118l1.286 3.966c.3.922-.755 1.688-1.54 1.119l-3.382-2.46a1 1 0 00-1.176 0l-3.382 2.46c-.784.57-1.838-.197-1.54-1.119l1.286-3.966a1 1 0 00-.364-1.118l-3.382-2.46c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                </svg>
                {favorites.length} favorited
              </div>
            </div>
          </div>
        </div>

        {/* Social Justice Framework */}
        <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-purple-300 mb-4 flex items-center gap-2">
            ⚖️ Social Justice Framework
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
              <h4 className="font-medium text-purple-200 mb-2">🔓 Access</h4>
              <p className="text-sm text-slate-400">Equal opportunity to access health services and resources regardless of background or circumstances.</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
              <h4 className="font-medium text-purple-200 mb-2">⚖️ Equity</h4>
              <p className="text-sm text-slate-400">Fair distribution of resources and opportunities, with additional support for disadvantaged groups.</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
              <h4 className="font-medium text-purple-200 mb-2">🤝 Participation</h4>
              <p className="text-sm text-slate-400">Meaningful involvement of communities in decisions affecting their health and wellbeing.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Initiative Cards */}
      <div className="space-y-6">
        {filteredInitiatives.map((initiative) => {
          const isFavorite = favorites.includes(initiative.id);
          const isExpanded = expandedId === initiative.id;
          const isSelectedForComparison = selectedForComparison.includes(initiative.id);
          
          return (
            <div key={initiative.id} className={`bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 border transition-all ${
              isSelectedForComparison ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-600 hover:border-purple-400'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {initiative.category}
                  </span>
                  <span className={`${getPriorityColor(initiative.priority)} text-white px-2 py-1 rounded text-xs font-semibold`}>
                    {initiative.priority}
                  </span>
                  <span className={`${getImpactColor(initiative.impact)} text-xs font-semibold`}>
                    Impact: {initiative.impact}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  {comparisonMode && (
                    <button
                      onClick={() => toggleComparison(initiative.id)}
                      disabled={!isSelectedForComparison && selectedForComparison.length >= 3}
                      className={`p-2 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                        isSelectedForComparison 
                          ? 'bg-blue-500 text-white' 
                          : selectedForComparison.length >= 3 
                            ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                            : 'bg-slate-700 text-slate-300 hover:bg-blue-600 hover:text-white'
                      }`}
                    >
                      📊
                    </button>
                  )}
                  
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

              <button
                className="w-full text-left mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-lg"
                onClick={() => setExpandedId(expandedId === initiative.id ? null : initiative.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-purple-300 mb-1">{initiative.name}</h3>
                    <p className="text-slate-400 text-sm">{initiative.fullName}</p>
                  </div>
                  <svg className={`w-6 h-6 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              <p className="text-slate-300 leading-relaxed mb-4">{initiative.description}</p>

              {isExpanded && (
                <div className="space-y-6">
                  {/* Key Targets */}
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                    <h4 className="font-semibold text-purple-300 mb-3">🎯 Key Targets</h4>
                    <div className="flex flex-wrap gap-2">
                      {initiative.targets.map((target, i) => (
                        <span key={i} className="bg-purple-900/30 text-purple-300 px-3 py-1 rounded-full text-sm border border-purple-700">
                          {target}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Social Justice Analysis */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                      <h4 className="font-semibold text-green-300 mb-2 flex items-center gap-2">
                        🔓 Access
                      </h4>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {initiative.socialJustice.access}
                      </p>
                    </div>
                    
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                      <h4 className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
                        ⚖️ Equity
                      </h4>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {initiative.socialJustice.equity}
                      </p>
                    </div>
                    
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                      <h4 className="font-semibold text-orange-300 mb-2 flex items-center gap-2">
                        🤝 Participation
                      </h4>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {initiative.socialJustice.participation}
                      </p>
                    </div>
                  </div>

                  {/* Outcomes & Challenges */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                      <h4 className="font-semibold text-green-300 mb-3">✅ Outcomes</h4>
                      <ul className="space-y-2">
                        {initiative.outcomes.map((outcome, i) => (
                          <li key={i} className="text-sm text-slate-300 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                      <h4 className="font-semibold text-yellow-300 mb-3">⚠️ Challenges</h4>
                      <ul className="space-y-2">
                        {initiative.challenges.map((challenge, i) => (
                          <li key={i} className="text-sm text-slate-300 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                            {challenge}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Evaluation Data */}
                  <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
                      📊 Evaluation Data
                    </h4>
                    <p className="text-blue-200 text-sm leading-relaxed">
                      {initiative.evaluation}
                    </p>
                  </div>

                  {/* Study Notes */}
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                    <h4 className="font-semibold text-slate-200 mb-3">📝 Your Study Notes</h4>
                    <textarea
                      className="w-full p-3 rounded-lg bg-slate-700 text-slate-200 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all"
                      rows={3}
                      placeholder="Add your own analysis and study notes here..."
                      value={studyNotes[initiative.id] || ''}
                      onChange={(e) => updateStudyNotes(initiative.id, e.target.value)}
                    />
                  </div>
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

      {/* Comparison View */}
      {comparisonMode && selectedForComparison.length > 0 && (
        <div className="mt-8 bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-2">
            📊 Initiative Comparison
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {selectedForComparison.map(id => {
              const initiative = initiatives.find(init => init.id === id);
              return (
                <div key={id} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                  <h4 className="font-bold text-purple-300 mb-2">{initiative.name}</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium text-slate-300">Impact:</span>
                      <span className={`ml-2 ${getImpactColor(initiative.impact)}`}>{initiative.impact}</span>
                    </div>
                    <div>
                      <span className="font-medium text-slate-300">Access:</span>
                      <p className="text-slate-400 mt-1">{initiative.socialJustice.access}</p>
                    </div>
                    <div>
                      <span className="font-medium text-slate-300">Equity:</span>
                      <p className="text-slate-400 mt-1">{initiative.socialJustice.equity}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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
              <h4 className="font-semibold text-purple-300 mb-1">Social Justice Analysis:</h4>
              <ul className="space-y-1 ml-4">
                <li>• How does it improve access to health services?</li>
                <li>• What equity measures are implemented?</li>
                <li>• How are communities involved in decision-making?</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-300 mb-1">Health Outcome Assessment:</h4>
              <ul className="space-y-1 ml-4">
                <li>• What measurable health improvements occurred?</li>
                <li>• Are there both short and long-term benefits?</li>
                <li>• How sustainable are the outcomes?</li>
              </ul>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-blue-300 mb-1">Critical Evaluation:</h4>
              <ul className="space-y-1 ml-4">
                <li>• What evidence supports the initiative's success?</li>
                <li>• What are the limitations or challenges?</li>
                <li>• How could it be improved or scaled?</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-orange-300 mb-1">Cultural Considerations:</h4>
              <ul className="space-y-1 ml-4">
                <li>• Is it culturally appropriate and sensitive?</li>
                <li>• Does it respect Indigenous values and practices?</li>
                <li>• Are community leaders and elders involved?</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
