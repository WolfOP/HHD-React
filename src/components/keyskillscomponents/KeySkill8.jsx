import { useState, useEffect } from 'react';

const healthyEatingInitiatives = [
  {
    id: 'adg',
    name: 'Australian Dietary Guidelines (ADGs)',
    category: 'National Guidelines',
    type: 'Evidence-Based',
    evaluation: 'Provides evidence-based dietary advice. Generalised language and lack of visual aids are limitations. No outcome data in sources.',
    strengths: ['Evidence-based', 'Comprehensive', 'Regular updates'],
    challenges: ['Generalised language', 'Limited visual aids', 'Complex for general public']
  },
  {
    id: 'aghe',
    name: 'Australian Guide to Healthy Eating (AGHE)',
    category: 'Visual Guide',
    type: 'Educational Tool',
    evaluation: 'Visual tool for dietary guidance. Useful for Guidelines 2 and 3. Hard to classify mixed foods. No outcome data in sources.',
    strengths: ['Visual representation', 'Easy to understand', 'Government endorsed'],
    challenges: ['Mixed food classification', 'Limited outcome data', 'May oversimplify']
  },
  {
    id: 'hep',
    name: 'Healthy Eating Pyramid (HEP)',
    category: 'Visual Guide',
    type: 'Educational Model',
    evaluation: 'Visual model by Nutrition Australia. Includes lifestyle tips. Adapted for various cultures. Hard to classify foods.',
    strengths: ['Cultural adaptations', 'Lifestyle integration', 'Visual hierarchy'],
    challenges: ['Food classification', 'Industry influence', 'Competing messages']
  },
  {
    id: 'nutritionaus',
    name: 'Nutrition Australia',
    category: 'Organization',
    type: 'Resource Provider',
    evaluation: 'Provides multiple resources and programs. Includes Healthy Eating Advisory Service and National Nutrition Week. No impact data in sources.',
    strengths: ['Multiple programs', 'Advisory services', 'National reach'],
    challenges: ['Limited impact data', 'Funding dependencies', 'Resource coordination']
  },
  {
    id: 'hsrs',
    name: 'Health Star Rating System (HSRS)',
    category: 'Food Labeling',
    type: 'Consumer Tool',
    evaluation: 'Rates packaged foods. Not detailed in sources. May have low awareness or manipulation issues.',
    strengths: ['Simple rating system', 'Point-of-sale information', 'Industry adoption'],
    challenges: ['Low consumer awareness', 'Potential manipulation', 'Limited scope']
  },
  {
    id: 'atsiguide',
    name: 'Aboriginal and Torres Strait Islander Guide to Healthy Eating',
    category: 'Cultural Adaptation',
    type: 'Targeted Resource',
    evaluation: 'Culturally tailored version of AGHE. Aims to support healthy eating in Indigenous communities. No impact data provided.',
    strengths: ['Cultural appropriateness', 'Community relevance', 'Targeted approach'],
    challenges: ['Limited evaluation', 'Distribution challenges', 'Resource accessibility']
  },
];

export default function KeySkill8() {
  const [responses, setResponses] = useState(() => {
    const stored = localStorage.getItem('keySkill8Responses');
    return stored ? JSON.parse(stored) : {};
  });
  const [submitted, setSubmitted] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('keySkill8Favorites');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('keySkill8Responses', JSON.stringify(responses));
  }, [responses]);

  useEffect(() => {
    localStorage.setItem('keySkill8Favorites', JSON.stringify(favorites));
  }, [favorites]);

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

  const handleSubmit = () => {
    setSubmitted(!submitted);
  };

  const handleReset = () => {
    setResponses({});
    setSubmitted(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center text-2xl font-bold text-white shadow-lg">
              8
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-200">Healthy Eating Initiatives</h2>
              <p className="text-slate-400">Evaluate national and targeted nutrition promotion strategies</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-slate-400">Progress</div>
            <div className="text-xl font-bold text-yellow-400">{Object.keys(responses).length}/{healthyEatingInitiatives.length}</div>
            <div className="text-xs text-slate-500">initiatives evaluated</div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={handleSubmit}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-green-400 ${
                  submitted 
                    ? 'bg-green-500 text-white shadow-lg' 
                    : 'bg-slate-700 text-slate-300 hover:bg-green-600 hover:text-white'
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
      </div>

      {/* Initiative Cards */}
      <div className="space-y-6">
        {healthyEatingInitiatives.map((initiative) => {
          const isFavorite = favorites.includes(initiative.id);
          const wordCount = getWordCount(initiative.id);
          
          return (
            <div key={initiative.id} className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 border border-slate-600 hover:border-yellow-400 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {initiative.category}
                  </span>
                  <span className="bg-slate-600 text-slate-300 px-2 py-1 rounded text-xs">
                    {initiative.type}
                  </span>
                </div>
                
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

              <h3 className="text-xl font-bold text-yellow-300 mb-4">{initiative.name}</h3>
              
              {/* Strengths & Challenges */}
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                  <h4 className="font-semibold text-green-300 mb-2">✅ Strengths</h4>
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
                  <h4 className="font-semibold text-yellow-300 mb-2">⚠️ Challenges</h4>
                  <ul className="space-y-1">
                    {initiative.challenges.map((challenge, i) => (
                      <li key={i} className="text-sm text-slate-300 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-slate-300">Your Evaluation:</label>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>{wordCount} words</span>
                    {wordCount >= 30 && (
                      <span className="text-green-400">✓ Complete</span>
                    )}
                  </div>
                </div>
                <textarea
                  className="w-full p-4 rounded-lg bg-slate-700 text-slate-200 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all"
                  rows={4}
                  placeholder="Evaluate this initiative's effectiveness, strengths, and limitations. Consider its impact on healthy eating behaviors and population health outcomes..."
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

      {/* Study Tips */}
      <div className="mt-8 bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
          📚 Nutrition Initiative Evaluation Framework
        </h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm text-slate-300 leading-relaxed">
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-yellow-300 mb-1">Effectiveness Criteria:</h4>
              <ul className="space-y-1 ml-4">
                <li>• Evidence base and scientific rigor</li>
                <li>• Accessibility to target populations</li>
                <li>• Measurable behavior change outcomes</li>
                <li>• Cultural appropriateness and relevance</li>
              </ul>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-green-300 mb-1">Implementation Factors:</h4>
              <ul className="space-y-1 ml-4">
                <li>• Resource requirements and sustainability</li>
                <li>• Stakeholder engagement and support</li>
                <li>• Integration with existing health systems</li>
                <li>• Evaluation and monitoring mechanisms</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
