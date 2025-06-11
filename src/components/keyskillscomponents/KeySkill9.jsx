import { useState, useEffect } from 'react';

// Modern, consistent barriers array
const barriers = [
  {
    id: 'education',
    name: 'Low Education & Cooking Skills',
    category: 'Knowledge',
    severity: 'High',
    example: 'Lack of knowledge makes it hard to interpret food labels and plan healthy meals.',
    solutions: ['Nutrition education programs', 'Cooking skill workshops', 'Simple recipe resources']
  },
  {
    id: 'marketing',
    name: 'Food Marketing & Media',
    category: 'Environmental',
    severity: 'High',
    example: 'Junk food ads influence children to overconsume high-calorie snacks.',
    solutions: ['Marketing restrictions', 'Health promotion campaigns', 'Media literacy education']
  },
  {
    id: 'time',
    name: 'Time Constraints',
    category: 'Lifestyle',
    severity: 'Medium',
    example: 'Busy lifestyles lead to reliance on takeaway foods that are high in fat and salt.',
    solutions: ['Meal preparation services', 'Quick healthy recipe resources', 'Workplace wellness programs']
  },
  {
    id: 'income',
    name: 'Low Income & Food Security',
    category: 'Economic',
    severity: 'Critical',
    example: 'Families may skip meals or rely on cheap, processed foods due to financial constraints.',
    solutions: ['Food assistance programs', 'Community gardens', 'Subsidized healthy food initiatives']
  },
  {
    id: 'geography',
    name: 'Geographic Location',
    category: 'Access',
    severity: 'High',
    example: 'Rural communities have limited access to fresh produce and variety of healthy food options.',
    solutions: ['Mobile food services', 'Community food cooperatives', 'Online grocery delivery']
  },
  {
    id: 'culture',
    name: 'Cultural & Social Factors',
    category: 'Social',
    severity: 'Medium',
    example: 'Traditional food practices may conflict with modern dietary guidelines.',
    solutions: ['Culturally adapted nutrition guidance', 'Community-led programs', 'Peer support groups']
  }
];

export default function KeySkill9() {
  const [responses, setResponses] = useState(() => {
    const stored = localStorage.getItem('keySkill9Responses');
    return stored ? JSON.parse(stored) : {};
  });
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('keySkill9Favorites');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('keySkill9Responses', JSON.stringify(responses));
  }, [responses]);

  useEffect(() => {
    localStorage.setItem('keySkill9Favorites', JSON.stringify(favorites));
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

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'bg-red-500';
      case 'High': return 'bg-orange-500';
      case 'Medium': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getWordCount = (id) => {
    const text = responses[id] || '';
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl font-bold text-white shadow-lg">
            9
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-200">Healthy Eating Barriers</h2>
            <p className="text-slate-400">Identify and analyze barriers to healthy eating in the Australian population</p>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-400">
              {barriers.length} barriers to analyze
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

      {/* Barrier Cards */}
      <div className="space-y-6">
        {barriers.map((barrier) => {
          const isFavorite = favorites.includes(barrier.id);
          const wordCount = getWordCount(barrier.id);
          
          return (
            <div key={barrier.id} className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 border border-slate-600 hover:border-red-400 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {barrier.category}
                  </span>
                  <span className={`${getSeverityColor(barrier.severity)} text-white px-2 py-1 rounded text-xs font-semibold`}>
                    {barrier.severity}
                  </span>
                </div>
                
                <button
                  onClick={() => toggleFavorite(barrier.id)}
                  className={`p-1 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                    isFavorite ? 'text-yellow-400 scale-110' : 'text-slate-400 hover:text-yellow-400 hover:scale-110'
                  }`}
                >
                  <svg className="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.036 6.29a1 1 0 00.95.69h6.6c.969 0 1.371 1.24.588 1.81l-5.347 3.89a1 1 0 00-.364 1.118l2.036 6.29c.3.921-.755 1.688-1.54 1.118l-5.347-3.89a1 1 0 00-1.176 0l-5.347 3.89c-.784.57-1.838-.197-1.54-1.118l2.036-6.29a1 1 0 00-.364-1.118l-5.347-3.89c-.783-.57-.38-1.81.588-1.81h6.6a1 1 0 00.95-.69l2.036-6.29z" />
                  </svg>
                </button>
              </div>

              <h3 className="text-xl font-bold text-red-300 mb-3">{barrier.name}</h3>
              
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600 mb-4">
                <h4 className="font-semibold text-red-300 mb-2">Example:</h4>
                <p className="text-slate-300 text-sm leading-relaxed">{barrier.example}</p>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-green-300 mb-2">Potential Solutions:</h4>
                <div className="flex flex-wrap gap-2">
                  {barrier.solutions.map((solution, i) => (
                    <span key={i} className="bg-green-900/30 text-green-300 px-3 py-1 rounded-full text-sm border border-green-700">
                      {solution}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-slate-300">Your Analysis:</label>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>{wordCount} words</span>
                    {wordCount >= 30 && (
                      <span className="text-green-400">✓ Complete</span>
                    )}
                  </div>
                </div>
                <textarea
                  className="w-full p-4 rounded-lg bg-slate-700 text-slate-200 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all"
                  rows={4}
                  placeholder="Analyze this barrier: Who does it affect most? What are the underlying causes? How could it be addressed through health promotion strategies?"
                  value={responses[barrier.id] || ''}
                  onChange={(e) => handleChange(barrier.id, e.target.value)}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Study Tips */}
      <div className="mt-8 bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
          📚 Barrier Analysis Framework
        </h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm text-slate-300 leading-relaxed">
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-red-300 mb-1">Impact Assessment:</h4>
              <ul className="space-y-1 ml-4">
                <li>• Who is most affected by this barrier?</li>
                <li>• How does it influence food choices?</li>
                <li>• What are the health consequences?</li>
              </ul>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-green-300 mb-1">Solution Strategies:</h4>
              <ul className="space-y-1 ml-4">
                <li>• What health promotion approaches could help?</li>
                <li>• Which Ottawa Charter action areas apply?</li>
                <li>• How can barriers be reduced or eliminated?</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
