import { useState, useEffect } from 'react';

const caseStudies = [
  {
    id: 1,
    title: 'Fit 4 Life Initiative',
    subtitle: 'Physical Activity Program for Indigenous Youth',
    prompt: 'Which Ottawa Charter area is reflected most in this initiative, and how does it improve health outcomes?',
    context: 'This program provides sports and recreation facilities in remote Indigenous communities, employing local youth as mentors and coaches.',
    sampleResponse: 'Fit 4 Life reflects the action area "Create supportive environments" by offering safe spaces for physical activity. This improves physical health by increasing fitness and reducing risk of chronic disease.',
    keyPoints: ['Safe recreational spaces', 'Community-based approach', 'Youth leadership', 'Cultural integration'],
    difficulty: 'Intermediate',
    category: 'Environmental Health'
  },
  {
    id: 2,
    title: 'Deadly Choices Program',
    subtitle: 'Health Lifestyle Campaign',
    prompt: 'How does Deadly Choices demonstrate the use of Ottawa Charter action areas to promote health?',
    context: 'A media campaign featuring Indigenous role models promoting healthy lifestyle choices, delivered through community health services.',
    sampleResponse: 'Deadly Choices uses "Reorient health services" by partnering with Aboriginal Medical Services to deliver culturally appropriate health promotion, improving access and trust.',
    keyPoints: ['Cultural appropriateness', 'Role model influence', 'Service integration', 'Community trust'],
    difficulty: 'Advanced',
    category: 'Health Education'
  },
  {
    id: 3,
    title: 'Aboriginal Road to Good Health',
    subtitle: 'Diabetes Prevention Program',
    prompt: 'Explain how this program uses Ottawa Charter action areas to lead to improved health outcomes.',
    context: 'A free education program that teaches Indigenous communities about nutrition, cooking skills, and physical activity to prevent Type 2 diabetes.',
    sampleResponse: 'This program uses "Develop personal skills" through education about nutrition and exercise, which helps reduce diabetes risk and promote healthy lifestyles.',
    keyPoints: ['Skill development', 'Disease prevention', 'Community education', 'Behavioral change'],
    difficulty: 'Beginner',
    category: 'Disease Prevention'
  },
  {
    id: 4,
    title: 'Closing the Gap Strategy',
    subtitle: 'National Health Equity Initiative',
    prompt: 'Analyze how Closing the Gap uses multiple Ottawa Charter action areas to address Indigenous health inequities.',
    context: 'A comprehensive government strategy targeting life expectancy, child mortality, and chronic disease rates among Indigenous Australians through policy and funding.',
    sampleResponse: 'Closing the Gap primarily uses "Build healthy public policy" through government commitments and funding allocation, while also "Strengthening community action" by involving Indigenous organizations in planning and delivery.',
    keyPoints: ['Policy framework', 'Government commitment', 'Community partnership', 'Health equity focus'],
    difficulty: 'Advanced',
    category: 'Health Policy'
  }
];

const categories = ['All Categories', ...new Set(caseStudies.map(study => study.category))];
const difficulties = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

export default function KeySkill5() {
  const [responses, setResponses] = useState(() => {
    const stored = localStorage.getItem('keySkill5Responses');
    return stored ? JSON.parse(stored) : caseStudies.map(() => '');
  });
  const [showExamples, setShowExamples] = useState(false);
  const [, setSelectedCase] = useState(null); // selectedCase state value is not used
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [difficultyFilter, setDifficultyFilter] = useState('All Levels');
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('keySkill5Favorites');
    return stored ? JSON.parse(stored) : [];
  });
  const [progress, setProgress] = useState(() => {
    const stored = localStorage.getItem('keySkill5Progress');
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    localStorage.setItem('keySkill5Responses', JSON.stringify(responses));
  }, [responses]);

  useEffect(() => {
    localStorage.setItem('keySkill5Favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('keySkill5Progress', JSON.stringify(progress));
  }, [progress]);

  const filteredCaseStudies = caseStudies.filter(study => {
    const categoryMatch = categoryFilter === 'All Categories' || study.category === categoryFilter;
    const difficultyMatch = difficultyFilter === 'All Levels' || study.difficulty === difficultyFilter;
    return categoryMatch && difficultyMatch;
  });

  const handleChange = (index, value) => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);

    // Update progress
    const caseId = caseStudies[index].id;
    const newProgress = { ...progress };
    newProgress[caseId] = {
      completed: value.length > 50, // Consider completed if response is substantial
      lastUpdated: Date.now(),
      wordCount: value.trim().split(/\s+/).length
    };
    setProgress(newProgress);
  };

  const toggleFavorite = (caseId) => {
    setFavorites(prev => 
      prev.includes(caseId) 
        ? prev.filter(id => id !== caseId)
        : [...prev, caseId]
    );
  };

  const getCompletionRate = () => {
    const completed = Object.values(progress).filter(p => p.completed).length;
    return Math.round((completed / caseStudies.length) * 100);
  };

  const getWordCount = (index) => {
    const text = responses[index] || '';
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500';
      case 'Intermediate': return 'bg-yellow-500';
      case 'Advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const handleReset = () => {
    setResponses(caseStudies.map(() => ''));
    setShowExamples(false);
    setSelectedCase(null);
    setProgress({});
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-2xl font-bold text-white shadow-lg">
              5
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-200">Health Promotion Analysis</h2>
              <p className="text-slate-400">Analyze real-world health initiatives using Ottawa Charter frameworks</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-slate-400">Completion</div>
            <div className="text-xl font-bold text-blue-400">{getCompletionRate()}%</div>
            <div className="text-xs text-slate-500">{Object.values(progress).filter(p => p.completed).length}/{caseStudies.length} cases</div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 bg-slate-700 text-slate-200 rounded-lg text-sm border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="px-3 py-2 bg-slate-700 text-slate-200 rounded-lg text-sm border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {difficulties.map(diff => (
                  <option key={diff} value={diff}>{diff}</option>
                ))}
              </select>
              
              <button
                onClick={() => setShowExamples(!showExamples)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-green-400 ${
                  showExamples 
                    ? 'bg-green-500 text-white shadow-lg' 
                    : 'bg-slate-700 text-slate-300 hover:bg-green-600 hover:text-white'
                }`}
              >
                💡 {showExamples ? 'Hide Examples' : 'Show Examples'}
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

      {/* Case Studies */}
      <div className="space-y-6">
        {filteredCaseStudies.map((study, index) => {
          const isFavorite = favorites.includes(study.id);
          const wordCount = getWordCount(index);
          const isCompleted = progress[study.id]?.completed || false;
          
          return (
            <div key={study.id} className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 border border-slate-600 hover:border-blue-400 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Case {study.id}
                    </span>
                    <span className={`${getDifficultyColor(study.difficulty)} text-white px-2 py-1 rounded text-xs font-semibold`}>
                      {study.difficulty}
                    </span>
                    <span className="bg-slate-600 text-slate-300 px-2 py-1 rounded text-xs">
                      {study.category}
                    </span>
                  </div>
                  {isCompleted && (
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                
                <button
                  onClick={() => toggleFavorite(study.id)}
                  className={`p-1 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                    isFavorite ? 'text-yellow-400 scale-110' : 'text-slate-400 hover:text-yellow-400 hover:scale-110'
                  }`}
                >
                  <svg className="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.036 6.29a1 1 0 00.95.69h6.6c.969 0 1.371 1.24.588 1.81l-5.347 3.89a1 1 0 00-.364 1.118l2.036 6.29c.3.921-.755 1.688-1.54 1.118l-5.347-3.89a1 1 0 00-1.176 0l-5.347 3.89c-.784.57-1.838-.197-1.54-1.118l2.036-6.29a1 1 0 00-.364-1.118l-5.347-3.89c-.783-.57-.38-1.81.588-1.81h6.6a1 1 0 00.95-.69l2.036-6.29z" />
                  </svg>
                </button>
              </div>

              <h3 className="text-xl font-bold text-blue-300 mb-1">{study.title}</h3>
              <p className="text-slate-400 text-sm mb-3">{study.subtitle}</p>
              
              <div className="bg-slate-800/50 rounded-lg p-4 mb-4 border border-slate-600">
                <h4 className="font-semibold text-slate-200 mb-2">Context:</h4>
                <p className="text-slate-300 text-sm leading-relaxed mb-3">{study.context}</p>
                
                <div className="flex flex-wrap gap-2">
                  {study.keyPoints.map((point, i) => (
                    <span key={i} className="bg-blue-900/30 text-blue-300 px-2 py-1 rounded text-xs border border-blue-700">
                      {point}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
                  ❓ Analysis Question:
                </h4>
                <p className="text-slate-300 italic bg-slate-800/30 p-3 rounded-lg border border-slate-600">
                  {study.prompt}
                </p>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-slate-300">Your Response:</label>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>{wordCount} words</span>
                    {wordCount >= 50 && (
                      <span className="text-green-400">✓ Substantial</span>
                    )}
                  </div>
                </div>
                <textarea
                  className="w-full p-4 rounded-lg bg-slate-700 text-slate-200 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                  rows={6}
                  placeholder="Write your analysis here... Consider: Which Ottawa Charter action areas are used? How do they improve health outcomes? What makes this approach effective for the target population?"
                  value={responses[index]}
                  onChange={(e) => handleChange(index, e.target.value)}
                />
              </div>
              
              {showExamples && (
                <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-green-300 mb-2 flex items-center gap-2">
                    💡 Example Response:
                  </h4>
                  <p className="text-green-200 text-sm leading-relaxed">
                    {study.sampleResponse}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredCaseStudies.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <svg className="w-16 h-16 mx-auto mb-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.488.901-6.077 2.378l-.096.074c-.487.365-.896.833-1.208 1.386C4.392 19.394 4.259 20 4.5 20.5S5.606 21 6.162 21h11.676c.556 0 1.054-.606.792-1.122a7.929 7.929 0 00-1.208-1.386l-.096-.074z" />
          </svg>
          <p>No case studies found with current filters.</p>
        </div>
      )}

      {/* Study Tips */}
      <div className="mt-8 bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
          📚 Analysis Tips for VCE Success
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-300 leading-relaxed">
          <div className="space-y-2">
            <p>• <strong>Identify Action Areas:</strong> Clearly state which Ottawa Charter action area(s) are being used</p>
            <p>• <strong>Explain the Connection:</strong> Show how the initiative demonstrates the action area in practice</p>
            <p>• <strong>Link to Outcomes:</strong> Explain how the approach leads to improved health outcomes</p>
          </div>
          <div className="space-y-2">
            <p>• <strong>Use Evidence:</strong> Reference specific details from the case study to support your analysis</p>
            <p>• <strong>Consider Context:</strong> Acknowledge the target population and their specific needs</p>
            <p>• <strong>Be Comprehensive:</strong> Address both immediate and long-term health improvements</p>
          </div>
        </div>
      </div>
    </div>
  );
}