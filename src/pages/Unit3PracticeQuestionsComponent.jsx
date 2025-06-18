import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";

export default function Unit3PracticeQuestionsComponent() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("practiceQuestionsFavorites");
    return stored ? JSON.parse(stored) : [];
  });
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [sortBy, setSortBy] = useState('id'); // 'id', 'marks', 'category'

  const questionCategories = [
    { id: 'all', name: 'All Questions' },
    { id: 'outcome1', name: 'Outcome 1: Understanding H&W' },
    { id: 'outcome2', name: 'Outcome 2: Promoting Health' },
    { id: 'short', name: 'Short Answer (1-4 marks)' },
    { id: 'extended', name: 'Extended Response (6-12 marks)' }
  ];

  const toggleFavorite = (questionId) => {
    setFavorites(prev => {
      const updated = prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId];
      localStorage.setItem("practiceQuestionsFavorites", JSON.stringify(updated));
      return updated;
    });
  };

  const practiceQuestions = useMemo(() => [
    // Outcome 1 Questions
    {
      id: 1,
      category: 'outcome1',
      type: 'short',
      marks: 2,
      question: 'Define health and wellbeing according to the WHO definition.',
      keywords: ['Define', 'Health and wellbeing', 'WHO'],
      difficulty: 'easy'
    },
    {
      id: 2,
      category: 'outcome1',
      type: 'short',
      marks: 3,
      question: 'Explain one strength and one limitation of the biomedical model of health.',
      keywords: ['Explain', 'Biomedical model', 'Strength', 'Limitation'],
      difficulty: 'medium'
    },
    {
      id: 3,
      category: 'outcome1',
      type: 'short',
      marks: 4,
      question: 'Outline two biological factors and two sociocultural factors that influence health and wellbeing.',
      keywords: ['Outline', 'Biological factors', 'Sociocultural factors'],
      difficulty: 'medium'
    },
    {
      id: 4,
      category: 'outcome1',
      type: 'extended',
      marks: 8,
      question: 'Analyse the dynamic and subjective nature of health and wellbeing, using examples to support your response.',
      keywords: ['Analyse', 'Dynamic', 'Subjective', 'Examples'],
      difficulty: 'hard'
    },
    {
      id: 5,
      category: 'outcome1',
      type: 'short',
      marks: 3,
      question: 'Distinguish between incidence and prevalence in relation to health status indicators.',
      keywords: ['Distinguish', 'Incidence', 'Prevalence'],
      difficulty: 'medium'
    },
    {
      id: 6,
      category: 'outcome1',
      type: 'short',
      marks: 4,
      question: 'Explain what is meant by burden of disease and identify its two components.',
      keywords: ['Explain', 'Burden of disease', 'DALY', 'YLL', 'YLD'],
      difficulty: 'medium'
    },
    {
      id: 7,
      category: 'outcome1',
      type: 'extended',
      marks: 10,
      question: 'Using relevant health status data, analyse variations in health status between different population groups in Australia. In your response, discuss at least two factors that contribute to these variations.',
      keywords: ['Analyse', 'Health status data', 'Variations', 'Population groups', 'Contributing factors'],
      difficulty: 'hard'
    },
    
    // Outcome 2 Questions
    {
      id: 8,
      category: 'outcome2',
      type: 'short',
      marks: 2,
      question: 'Define health promotion according to the Ottawa Charter.',
      keywords: ['Define', 'Health promotion', 'Ottawa Charter'],
      difficulty: 'easy'
    },
    {
      id: 9,
      category: 'outcome2',
      type: 'short',
      marks: 5,
      question: 'Outline the five action areas of the Ottawa Charter for Health Promotion.',
      keywords: ['Outline', 'Five action areas', 'Ottawa Charter'],
      difficulty: 'medium'
    },
    {
      id: 10,
      category: 'outcome2',
      type: 'short',
      marks: 4,
      question: 'Explain how the social model of health differs from the biomedical model in addressing health issues.',
      keywords: ['Explain', 'Social model', 'Biomedical model', 'Differences'],
      difficulty: 'medium'
    },
    {
      id: 11,
      category: 'outcome2',
      type: 'extended',
      marks: 8,
      question: 'Evaluate the effectiveness of ONE health promotion program in addressing the health needs of a specific population group.',
      keywords: ['Evaluate', 'Health promotion program', 'Effectiveness', 'Specific population'],
      difficulty: 'hard'
    },
    {
      id: 12,
      category: 'outcome2',
      type: 'short',
      marks: 3,
      question: 'Describe how "old" public health differs from "new" public health approaches.',
      keywords: ['Describe', 'Old public health', 'New public health'],
      difficulty: 'medium'
    },
    {
      id: 13,
      category: 'outcome2',
      type: 'extended',
      marks: 12,
      question: 'Analyse how the Ottawa Charter action areas are reflected in a current Australian health promotion initiative. Discuss the strengths and limitations of this approach.',
      keywords: ['Analyse', 'Ottawa Charter', 'Action areas', 'Health promotion initiative', 'Strengths', 'Limitations'],
      difficulty: 'hard'
    },
    
    // Indigenous Health Questions
    {
      id: 14,
      category: 'outcome2',
      type: 'short',
      marks: 4,
      question: 'Outline two initiatives aimed at improving the health and wellbeing of Aboriginal and Torres Strait Islander peoples.',
      keywords: ['Outline', 'Indigenous health', 'Initiatives', 'ATSI'],
      difficulty: 'medium'
    },
    {
      id: 15,
      category: 'outcome2',
      type: 'extended',
      marks: 10,
      question: 'Evaluate the progress of the "Close the Gap" strategy in addressing health inequities experienced by Aboriginal and Torres Strait Islander peoples.',
      keywords: ['Evaluate', 'Close the Gap', 'Progress', 'Health inequities'],
      difficulty: 'hard'
    },
    
    // Health System Questions
    {
      id: 16,
      category: 'outcome1',
      type: 'short',
      marks: 3,
      question: 'Outline the key features of Medicare in Australia.',
      keywords: ['Outline', 'Medicare', 'Key features'],
      difficulty: 'easy'
    },
    {
      id: 17,
      category: 'outcome1',
      type: 'short',
      marks: 4,
      question: 'Explain how the NDIS promotes access and equity in healthcare.',
      keywords: ['Explain', 'NDIS', 'Access', 'Equity'],
      difficulty: 'medium'
    },
    {
      id: 18,
      category: 'outcome1',
      type: 'extended',
      marks: 8,
      question: 'Discuss the role of private health insurance in Australia\'s health system, including its impact on sustainability and equity.',
      keywords: ['Discuss', 'Private health insurance', 'Sustainability', 'Equity'],
      difficulty: 'hard'
    },
    
    // Data Analysis Questions
    {
      id: 19,
      category: 'outcome1',
      type: 'extended',
      marks: 6,
      question: 'Using the data provided, analyse trends in life expectancy for males and females in Australia over the past 20 years. Suggest two factors that may have contributed to these trends.',
      keywords: ['Analyse', 'Data', 'Life expectancy trends', 'Contributing factors'],
      difficulty: 'hard'
    },
    {
      id: 20,
      category: 'outcome1',
      type: 'short',
      marks: 3,
      question: 'Calculate the DALY for a condition given: YLL = 150 and YLD = 75. Explain what this result indicates.',
      keywords: ['Calculate', 'DALY', 'YLL', 'YLD'],
      difficulty: 'medium'
    },
    
    // Health Promotion Evaluation
    {
      id: 21,
      category: 'outcome2',
      type: 'extended',
      marks: 10,
      question: 'Evaluate the "Quit" smoking campaign using the Ottawa Charter action areas. Discuss how this campaign addresses both individual and population-level factors.',
      keywords: ['Evaluate', 'Quit campaign', 'Ottawa Charter', 'Individual', 'Population-level'],
      difficulty: 'hard'
    },
    {
      id: 22,
      category: 'outcome2',
      type: 'extended',
      marks: 12,
      question: 'Analyse the role of VicHealth in promoting health and wellbeing in Victoria. In your response, discuss how VicHealth\'s approach reflects the principles of the social model of health.',
      keywords: ['Analyse', 'VicHealth', 'Social model', 'Health promotion'],
      difficulty: 'hard'
    },
    
    // Complex Analysis Questions
    {
      id: 23,
      category: 'outcome1',
      type: 'extended',
      marks: 12,
      question: 'Compare and contrast the health status of Aboriginal and Torres Strait Islander peoples with non-Indigenous Australians. Analyse the factors contributing to these differences and evaluate current strategies to address health inequities.',
      keywords: ['Compare', 'Contrast', 'Indigenous health', 'Health status', 'Health inequities', 'Strategies'],
      difficulty: 'hard'
    },
    {
      id: 24,
      category: 'outcome2',
      type: 'extended',
      marks: 10,
      question: 'Discuss the concept of "optimal health as a resource" and analyse how this understanding can benefit individuals and the nation.',
      keywords: ['Discuss', 'Optimal health as resource', 'Benefits', 'Individual', 'National'],
      difficulty: 'hard'
    }
  ], []); // Empty dependency array because it's a constant

  const filteredQuestions = useMemo(() => {
    let questions = practiceQuestions;

    // Apply category filter
    if (selectedCategory !== 'all') {
      questions = questions.filter(q => q.category === selectedCategory || q.type === selectedCategory);
    }

    // Apply search filter
    if (searchTerm) {
      questions = questions.filter(q =>
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply favorites filter
    if (showOnlyFavorites) {
      questions = questions.filter(q => favorites.includes(q.id));
    }

    // Apply sorting
    questions.sort((a, b) => {
      if (sortBy === 'marks') return b.marks - a.marks;
      if (sortBy === 'category') return a.category.localeCompare(b.category);
      return a.id - b.id; // default: sort by ID
    });

    return questions;
  }, [selectedCategory, searchTerm, showOnlyFavorites, favorites, sortBy, practiceQuestions]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-600 text-green-100';
      case 'medium': return 'bg-yellow-600 text-yellow-100';
      case 'hard': return 'bg-red-600 text-red-100';
      default: return 'bg-slate-600 text-slate-200';
    }
  };

  return (
    <section className="content-section max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-purple-400 mb-2">Unit 3 Practice Questions</h1>
        <p className="text-slate-400 max-w-3xl">
          Comprehensive practice questions covering all key knowledge areas of Unit 3. Questions are categorized by outcome and difficulty level, with suggested mark allocations and key command words highlighted.
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-6 flex flex-col lg:flex-row lg:items-center gap-4 sticky top-0 z-30 bg-slate-900/80 backdrop-blur-md py-4 rounded-xl shadow-md">
        <input
          type="text"
          placeholder="Search questions or keywords..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full lg:w-80 px-4 py-2 rounded-md bg-slate-800 text-slate-200 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
          aria-label="Search practice questions"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 rounded-md bg-slate-800 text-slate-200 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
          aria-label="Filter by category"
        >
          {questionCategories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 rounded-md bg-slate-800 text-slate-200 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
          aria-label="Sort questions by"
        >
          <option value="id">Sort by Question #</option>
          <option value="marks">Sort by Marks</option>
          <option value="category">Sort by Category</option>
        </select>

        <button
          className={`px-3 py-2 rounded-md text-xs font-semibold border transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 ${
            showOnlyFavorites
              ? "bg-purple-700 text-white border-purple-500"
              : "bg-slate-800 text-slate-300 border-slate-600 hover:bg-purple-900 hover:text-purple-200"
          }`}
          onClick={() => setShowOnlyFavorites(f => !f)}
          aria-pressed={showOnlyFavorites}
          aria-label="Show only favorite questions"
        >
          {showOnlyFavorites ? "Show All" : "Show Favorites"}
        </button>

        <span className="text-xs text-slate-500" aria-live="polite">
          {filteredQuestions.length} questions
        </span>

        <div className="ml-auto flex items-center gap-4">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.382 2.46a1 1 0 00-.364 1.118l1.286 3.966c.3.922-.755 1.688-1.54 1.119l-3.382-2.46a1 1 0 00-1.176 0l-3.382 2.46c-.784.57-1.838-.197-1.54-1.119l1.286-3.966a1 1 0 00-.364-1.118l-3.382-2.46c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
            </svg>
            <span className="text-xs text-yellow-300" title="Favorited questions">
              {favorites.length} favorited
            </span>
          </div>

          <button
            className="p-1 rounded-full bg-slate-800 text-slate-400 hover:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            aria-label="Practice questions help"
            title="How to use practice questions"
            onClick={() =>
              alert(
                "Practice questions are organized by outcome and difficulty. Use command words as guides for response depth. Mark allocation suggests response length (1-2 points per mark). Favorite challenging questions for review."
              )
            }
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
          </button>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <svg className="w-16 h-16 mx-auto mb-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.488.901-6.077 2.378l-.096.074c-.487.365-.896.833-1.208 1.386C4.392 19.394 4.259 20 4.5 20.5S5.606 21 6.162 21h11.676c.556 0 1.054-.606.792-1.122a7.929 7.929 0 00-1.208-1.386l-.096-.074z" />
            </svg>
            <p>No questions found with current filters.</p>
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const isFavorite = favorites.includes(q.id);
            
            return (
              <div
                key={q.id}
                className="question-card bg-gradient-to-br from-slate-800 to-slate-700 p-6 rounded-xl shadow-lg border border-slate-600 hover:border-purple-400 focus-within:ring-2 focus-within:ring-purple-400 transition-all group animate-fade-in"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Question {q.id}
                    </span>
                    <span className="bg-slate-700 text-slate-200 px-3 py-1 rounded-full text-sm">
                      {q.marks} mark{q.marks !== 1 ? 's' : ''}
                    </span>
                    <span className="bg-slate-700 text-slate-200 px-3 py-1 rounded-full text-sm">
                      {q.category === 'outcome1' ? 'Outcome 1' : 'Outcome 2'}
                    </span>
                    <span className="bg-slate-700 text-slate-200 px-3 py-1 rounded-full text-sm">
                      {q.type === 'short' ? 'Short Answer' : 'Extended Response'}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(q.difficulty)}`}>
                      {q.difficulty?.charAt(0).toUpperCase() + q.difficulty?.slice(1) || 'Medium'}
                    </span>
                  </div>
                  
                  <button
                    className={`p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-transform duration-150 ${
                      isFavorite
                        ? "text-yellow-400 scale-110"
                        : "text-slate-400 hover:text-yellow-400 hover:scale-110"
                    }`}
                    onClick={() => toggleFavorite(q.id)}
                    aria-label={isFavorite ? `Remove question ${q.id} from favorites` : `Add question ${q.id} to favorites`}
                    title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    <svg className="w-5 h-5" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.036 6.29a1 1 0 00.95.69h6.6c.969 0 1.371 1.24.588 1.81l-5.347 3.89a1 1 0 00-.364 1.118l2.036 6.29c.3.921-.755 1.688-1.54 1.118l-5.347-3.89a1 1 0 00-1.176 0l-5.347 3.89c-.784.57-1.838-.197-1.54-1.118l2.036-6.29a1 1 0 00-.364-1.118l-5.347-3.89c-.783-.57-.38-1.81.588-1.81h6.6a1 1 0 00.95-.69l2.036-6.29z" />
                    </svg>
                  </button>
                </div>
                
                <p className="text-lg mb-4 text-slate-100 leading-relaxed group-hover:text-slate-50 transition-colors">
                  {q.question}
                </p>
                
                <div className="border-t border-slate-600 pt-4">
                  <p className="text-sm text-slate-400 mb-2 font-medium">
                    Key terms to focus on:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {q.keywords.map((keyword, i) => (
                      <span key={i} className="bg-purple-800/50 text-purple-200 px-2 py-1 rounded text-xs border border-purple-700/50 hover:bg-purple-700/50 transition-colors">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Study Tips */}
      <div className="mt-8 p-6 bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl shadow-lg border border-slate-600">
        <h3 className="text-xl font-semibold text-purple-300 mb-4 flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Study Tips & Strategy
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-purple-200 mb-3">Response Strategy:</h4>
            <ul className="list-disc pl-5 space-y-2 text-slate-300 text-sm">
              <li><strong>Command Words:</strong> Pay attention to command words (define, explain, analyse, evaluate, discuss) as they indicate the depth of response required.</li>
              <li><strong>Mark Allocation:</strong> Use mark allocation as a guide for response length - typically 1-2 key points per mark.</li>
              <li><strong>Structure:</strong> For extended responses, plan your answer with clear introduction, body paragraphs, and conclusion.</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-purple-200 mb-3">Content Tips:</h4>
            <ul className="list-disc pl-5 space-y-2 text-slate-300 text-sm">
              <li><strong>Examples:</strong> Always support your responses with relevant, specific examples from Australian health initiatives or data.</li>
              <li><strong>Link to Theory:</strong> Connect your answers to key concepts like the Ottawa Charter, social model of health, and health status indicators.</li>
              <li><strong>Current Context:</strong> Reference recent Australian health data and contemporary health promotion initiatives.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 text-center">
        <p className="text-slate-500 text-xs">
          <em>Showing {filteredQuestions.length} of {practiceQuestions.length} questions.
          For more practice, try the <Link to="/unit3-quiz" className="text-purple-400 hover:text-purple-300 transition-colors">Unit 3 Quiz</Link> and <Link to="/unit3-sac2-prep" className="text-purple-400 hover:text-purple-300 transition-colors">SAC 2 Prep</Link> tools.</em>
        </p>
      </div>
    </section>
  );
}
