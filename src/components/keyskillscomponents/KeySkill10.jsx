import { useState, useEffect } from 'react';

const components = [
  {
    id: 'medicare',
    name: 'Medicare',
    category: 'Universal Healthcare',
    priority: 'Critical',
    details: 'Universal health insurance scheme. Covers public hospital care and subsidises medical services.',
    keyFeatures: ['Bulk billing', 'Medicare Safety Net', 'Universal coverage', 'GP services'],
    coverage: '25+ million Australians',
    established: '1984'
  },
  {
    id: 'pbs',
    name: 'Pharmaceutical Benefits Scheme (PBS)',
    category: 'Medicine Access',
    priority: 'High',
    details: 'Subsidises the cost of essential medications. Aims to make medicines affordable and accessible.',
    keyFeatures: ['Co-payment system', 'Concession rates', 'Safety net', 'Essential medicines list'],
    coverage: '900+ medicines',
    established: '1950'
  },
  {
    id: 'ndis',
    name: 'National Disability Insurance Scheme (NDIS)',
    category: 'Disability Support',
    priority: 'High',
    details: 'Supports people with permanent and significant disabilities. Offers services, equipment, and financial support.',
    keyFeatures: ['Individual packages', 'Choice and control', 'Early intervention', 'Lifetime support'],
    coverage: '500,000+ participants',
    established: '2013'
  },
  {
    id: 'phi',
    name: 'Private Health Insurance',
    category: 'Supplementary Care',
    priority: 'Medium',
    details: 'Optional insurance providing access to private hospitals, choice of doctor, and extras like dental or physio.',
    keyFeatures: ['Hospital cover', 'Extras cover', 'Government rebates', 'Lifetime health cover'],
    coverage: '55% of population',
    established: '1953'
  }
];

const criteria = [
  {
    name: 'Funding',
    icon: '💰',
    description: 'How is it financially supported and sustained?'
  },
  {
    name: 'Sustainability',
    icon: '🔄',
    description: 'What ensures its long-term viability?'
  },
  {
    name: 'Access',
    icon: '🚪',
    description: 'How does it provide healthcare access?'
  },
  {
    name: 'Equity',
    icon: '⚖️',
    description: 'How does it promote fairness and equality?'
  }
];

const sampleData = {
  medicare: {
    Funding: 'Financed through general taxation and the Medicare levy, allowing services without direct payment.',
    Sustainability: 'Schedule fees and bulk billing help control costs so services remain affordable long term.',
    Access: 'Provides universal coverage for Australian residents to receive treatment in public hospitals.',
    Equity: 'Medicare Safety Nets reduce out-of-pocket expenses for low‑income and frequent service users.'
  },
  pbs: {
    Funding: 'Federal government subsidises medicines so patients pay only a co‑payment.',
    Sustainability: 'Bulk purchasing of medicines keeps prices low into the future.',
    Access: 'Essential medications are available at local pharmacies at an affordable price.',
    Equity: 'Concession card holders pay a reduced co‑payment, supporting those with greater need.'
  },
  ndis: {
    Funding: 'Jointly funded by federal and state governments, including the Medicare levy surcharge.',
    Sustainability: 'Invests in early intervention to reduce long‑term care costs.',
    Access: 'Provides people with permanent disability access to supports and services.',
    Equity: 'Packages are tailored to individual needs, promoting equal opportunity.'
  },
  phi: {
    Funding: 'Funded by member premiums and supported by government rebates.',
    Sustainability: 'Helps relieve pressure on the public system by encouraging private treatment.',
    Access: 'Allows choice of doctor and hospital with typically shorter waiting times.',
    Equity: 'Income‑tested rebates and Lifetime Health Cover loading encourage broad membership.'
  }
};

export default function KeySkill10() {
  const [responses, setResponses] = useState(() => {
    const stored = localStorage.getItem('keySkill10Responses');
    return stored ? JSON.parse(stored) : {};
  });
  const [submitted, setSubmitted] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('keySkill10Favorites');
    return stored ? JSON.parse(stored) : [];
  });
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [comparisonMode, setComparisonMode] = useState(false);

  useEffect(() => {
    localStorage.setItem('keySkill10Responses', JSON.stringify(responses));
  }, [responses]);

  useEffect(() => {
    localStorage.setItem('keySkill10Favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleChange = (componentId, criterion, value) => {
    setResponses((prev) => ({
      ...prev,
      [componentId]: {
        ...prev[componentId],
        [criterion]: value,
      },
    }));
  };

  const toggleFavorite = (componentId) => {
    setFavorites(prev => 
      prev.includes(componentId) 
        ? prev.filter(id => id !== componentId)
        : [...prev, componentId]
    );
  };

  const getCompletionRate = () => {
    const totalFields = components.length * criteria.length;
    let completedFields = 0;
    
    components.forEach(component => {
      criteria.forEach(criterion => {
        if (responses[component.id]?.[criterion.name] && responses[component.id][criterion.name].length > 20) {
          completedFields++;
        }
      });
    });
    
    return Math.round((completedFields / totalFields) * 100);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'bg-red-500';
      case 'High': return 'bg-orange-500';
      case 'Medium': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getWordCount = (componentId, criterion) => {
    const text = responses[componentId]?.[criterion] || '';
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const handleSubmit = () => setSubmitted(!submitted);
  const handleReset = () => {
    setResponses({});
    setSubmitted(false);
    setSelectedComponent(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-2xl font-bold text-white shadow-lg">
              10
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-200">Health System Analysis</h2>
              <p className="text-slate-400">Analyze Australia's health system components for funding, sustainability, access, and equity</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-slate-400">Completion</div>
            <div className="text-xl font-bold text-blue-400">{getCompletionRate()}%</div>
            <div className="text-xs text-slate-500">analysis complete</div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 mb-6">
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
                📊 {submitted ? 'Hide Sample Responses' : 'Show Sample Responses'}
              </button>
              
              <button
                onClick={() => setComparisonMode(!comparisonMode)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  comparisonMode 
                    ? 'bg-blue-500 text-white shadow-lg' 
                    : 'bg-slate-700 text-slate-300 hover:bg-blue-600 hover:text-white'
                }`}
              >
                🔄 {comparisonMode ? 'Exit Comparison' : 'Compare Components'}
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

        {/* Analysis Framework */}
        <div className="bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border border-blue-500/30 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-blue-300 mb-4 flex items-center gap-2">
            🏥 Analysis Framework
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {criteria.map((criterion, index) => (
              <div key={index} className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                <h4 className="font-medium text-blue-200 mb-2 flex items-center gap-2">
                  {criterion.icon} {criterion.name}
                </h4>
                <p className="text-xs text-slate-400">{criterion.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Component Analysis Cards */}
      <div className="space-y-8">
        {components.map((component) => {
          const isFavorite = favorites.includes(component.id);
          const isSelected = selectedComponent === component.id;
          
          return (
            <div key={component.id} className={`bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 border transition-all ${
              isSelected ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-600 hover:border-blue-400'
            }`}>
              {/* Component Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {component.category}
                      </span>
                      <span className={`${getPriorityColor(component.priority)} text-white px-2 py-1 rounded text-xs font-semibold`}>
                        {component.priority}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-blue-300 mb-1">{component.name}</h3>
                    <p className="text-slate-400 mb-3">{component.details}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span>📅 Est. {component.established}</span>
                      <span>👥 {component.coverage}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => toggleFavorite(component.id)}
                  className={`p-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                    isFavorite ? 'text-yellow-400 scale-110' : 'text-slate-400 hover:text-yellow-400 hover:scale-110'
                  }`}
                >
                  <svg className="w-6 h-6" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.036 6.29a1 1 0 00.95.69h6.6c.969 0 1.371 1.24.588 1.81l-5.347 3.89a1 1 0 00-.364 1.118l2.036 6.29c.3.921-.755 1.688-1.54 1.118l-5.347-3.89a1 1 0 00-1.176 0l-5.347 3.89c-.784.57-1.838-.197-1.54-1.118l2.036-6.29a1 1 0 00-.364-1.118l-5.347-3.89c-.783-.57-.38-1.81.588-1.81h6.6a1 1 0 00.95-.69l2.036-6.29z" />
                  </svg>
                </button>
              </div>

              {/* Key Features */}
              <div className="mb-6">
                <h4 className="font-semibold text-slate-200 mb-3">🔑 Key Features</h4>
                <div className="flex flex-wrap gap-2">
                  {component.keyFeatures.map((feature, i) => (
                    <span key={i} className="bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full text-sm border border-blue-700">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Analysis Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                {criteria.map((criterion) => {
                  const wordCount = getWordCount(component.id, criterion.name);
                  
                  return (
                    <div key={criterion.name} className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-slate-200 flex items-center gap-2">
                          {criterion.icon} {criterion.name}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <span>{wordCount} words</span>
                          {wordCount >= 15 && (
                            <span className="text-green-400">✓</span>
                          )}
                        </div>
                      </div>
                      
                      <textarea
                        className="w-full p-3 rounded-lg bg-slate-700 text-slate-200 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all text-sm"
                        rows={3}
                        placeholder={`Describe how ${component.name} promotes ${criterion.name.toLowerCase()}...`}
                        value={responses[component.id]?.[criterion.name] || ''}
                        onChange={(e) => handleChange(component.id, criterion.name, e.target.value)}
                      />
                      
                      {submitted && sampleData[component.id]?.[criterion.name] && (
                        <div className="mt-3 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                          <h5 className="font-semibold text-green-300 mb-1 text-sm">💡 Sample Response:</h5>
                          <p className="text-green-200 text-sm leading-relaxed">
                            {sampleData[component.id][criterion.name]}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Study Tips */}
      <div className="mt-8 bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
          📚 Health System Analysis Tips
        </h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm text-slate-300 leading-relaxed">
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-blue-300 mb-1">Funding Analysis:</h4>
              <ul className="space-y-1 ml-4">
                <li>• Identify revenue sources (taxes, levies, premiums)</li>
                <li>• Consider cost-sharing mechanisms</li>
                <li>• Evaluate affordability for users</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-300 mb-1">Sustainability Factors:</h4>
              <ul className="space-y-1 ml-4">
                <li>• Long-term financial viability</li>
                <li>• Cost control mechanisms</li>
                <li>• Adaptation to changing needs</li>
              </ul>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-purple-300 mb-1">Access Considerations:</h4>
              <ul className="space-y-1 ml-4">
                <li>• Geographic availability</li>
                <li>• Financial barriers</li>
                <li>• Service comprehensiveness</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-orange-300 mb-1">Equity Measures:</h4>
              <ul className="space-y-1 ml-4">
                <li>• Support for disadvantaged groups</li>
                <li>• Reduced financial barriers</li>
                <li>• Fair distribution of resources</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
