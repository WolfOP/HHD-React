import React, { useState } from "react";

const quizQuestions = [
  {
    id: 1,
    category: "Health Models",
    question: 'Which model of health focuses on the broader determinants of health?',
    options: ['Biomedical model', 'Social model', 'Ottawa Charter', 'NDIS'],
    answer: 1,
    explanation: "The Social model of health addresses broader social, cultural, and environmental determinants of health to reduce inequities."
  },
  {
    id: 2,
    category: "Health Indicators",
    question: 'What does DALY stand for?',
    options: ['Disability Adjusted Life Year', 'Daily Activity Level Yield', 'Disease Affected Life Year', 'Dynamic and Latent Youth'],
    answer: 0,
    explanation: "DALY stands for Disability Adjusted Life Year - one year of healthy life lost due to illness, injury or premature death."
  },
  {
    id: 3,
    category: "Ottawa Charter",
    question: 'Which action area is part of the Ottawa Charter?',
    options: ['Improve Medicare', 'Create Supportive Environments', 'Increase Taxation', 'Subsidise Medicines'],
    answer: 1,
    explanation: "Create Supportive Environments is one of the five action areas of the Ottawa Charter for Health Promotion."
  },
  {
    id: 4,
    category: "Health System",
    question: 'Which level of government primarily funds Medicare?',
    options: ['Local', 'Federal', 'State', 'Private'],
    answer: 1,
    explanation: "Medicare is primarily funded by the Federal government through taxation and the Medicare levy."
  },
  {
    id: 5,
    category: "Health Indicators",
    question: 'Which indicator measures years of life lost due to premature death?',
    options: ['YLL', 'YLD', 'HALE', 'BoD'],
    answer: 0,
    explanation: "YLL (Years of Life Lost) measures the fatal component of DALYs - years lost due to premature death."
  },
  {
    id: 6,
    category: "Health Models",
    question: 'What is the main focus of the biomedical model of health?',
    options: ['Prevention of illness', 'Social determinants', 'Diagnosis and treatment', 'Spiritual wellbeing'],
    answer: 2,
    explanation: "The biomedical approach focuses on diagnosis, treatment, and prevention using scientific and medical tools."
  },
  {
    id: 7,
    category: "Health System",
    question: 'NDIS stands for?',
    options: ['National Disability Insurance Scheme', 'National Disease Intervention System', 'Northern District Health Scheme', 'National Drugs Information Service'],
    answer: 0,
    explanation: "NDIS (National Disability Insurance Scheme) provides support to Australians with permanent and significant disabilities."
  },
  {
    id: 8,
    category: "Health Factors",
    question: 'Which of the following is a sociocultural factor influencing health?',
    options: ['Age', 'Income', 'Blood pressure', 'Genetics'],
    answer: 1,
    explanation: "Income is a sociocultural factor that affects access to resources and opportunities for health."
  },
  {
    id: 9,
    category: "Health Equity",
    question: 'Which statement best reflects equity in health?',
    options: ['Treating everyone exactly the same', 'Providing extra support to those with greater need', 'Only focusing on individual responsibility', 'Charging all patients the same fee'],
    answer: 1,
    explanation: "Equity involves providing additional support to disadvantaged groups to ensure fair access to resources and opportunities."
  },
  {
    id: 10,
    category: "Ottawa Charter",
    question: 'Which Ottawa Charter action area relates to education and skill building?',
    options: ['Create Supportive Environments', 'Develop Personal Skills', 'Strengthen Community Action', 'Reorient Health Services'],
    answer: 1,
    explanation: "Develop Personal Skills focuses on education and enhancing individual capabilities for health decision-making."
  }
];

const categories = ["All Categories", ...new Set(quizQuestions.map(q => q.category))];

export default function QuizComponent() {
  const [selected, setSelected] = useState(Array(quizQuestions.length).fill(null));
  const [score, setScore] = useState(null);
  const [showExplanations, setShowExplanations] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("quizFavorites");
    return stored ? JSON.parse(stored) : [];
  });
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const filteredQuestions = useMemo(() => {
    let questions = quizQuestions;
    
    if (categoryFilter !== "All Categories") {
      questions = questions.filter(q => q.category === categoryFilter);
    }
    
    if (showOnlyFavorites) {
      questions = questions.filter(q => favorites.includes(q.id));
    }
    
    return questions;
  }, [categoryFilter, showOnlyFavorites, favorites]);

  const toggleFavorite = (questionId) => {
    setFavorites(prev => {
      const updated = prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId];
      localStorage.setItem("quizFavorites", JSON.stringify(updated));
      return updated;
    });
  };

  const handleOptionChange = (qIdx, optIdx) => {
    const updated = [...selected];
    updated[qIdx] = optIdx;
    setSelected(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let s = 0;
    filteredQuestions.forEach((q, i) => {
      if (selected[i] === q.answer) s++;
    });
    setScore(s);
    setShowExplanations(true);
  };

  const handleReset = () => {
    setSelected(Array(quizQuestions.length).fill(null));
    setScore(null);
    setShowExplanations(false);
  };

  const correctAnswers = filteredQuestions.filter((q, i) => selected[i] === q.answer).length;
  const totalAnswered = selected.filter(answer => answer !== null).length;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-purple-400 mb-2">Unit 3 Self-Check Quiz</h2>
        <p className="text-slate-400 max-w-2xl">
          Test your understanding of key VCE HHD concepts. Filter by category and favorite challenging questions for review.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4 sticky top-0 z-30 bg-slate-900/80 backdrop-blur-md py-4 rounded-xl shadow-md">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 rounded-md bg-slate-800 text-slate-200 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
          aria-label="Filter by category"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
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
          {showOnlyFavorites ? "Show All Questions" : "Show Favorites"}
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

          {totalAnswered > 0 && (
            <div className="text-xs text-slate-400">
              Progress: {totalAnswered}/{filteredQuestions.length} answered
            </div>
          )}

          <button
            className="p-1 rounded-full bg-slate-800 text-slate-400 hover:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            aria-label="Quiz help"
            title="How to use the quiz"
            onClick={() =>
              alert(
                "Answer all questions and click Submit to see your score. Use the star to favorite challenging questions for review. Filter by category to focus on specific topics."
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

      {/* Quiz Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {filteredQuestions.map((q, i) => {
          const isFavorite = favorites.includes(q.id);
          const isAnswered = selected[i] !== null;
          const isCorrect = showExplanations && selected[i] === q.answer;
          const isIncorrect = showExplanations && selected[i] !== null && selected[i] !== q.answer;

          return (
            <div
              key={q.id}
              className={`quiz-card bg-gradient-to-br from-slate-800 to-slate-700 p-6 rounded-xl shadow-lg border transition-all ${
                isCorrect ? 'border-green-500 bg-green-900/20' :
                isIncorrect ? 'border-red-500 bg-red-900/20' :
                'border-slate-600 hover:border-purple-400'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Q{q.id}
                  </span>
                  <span className="bg-slate-700 text-purple-200 px-2 py-1 rounded text-xs">
                    {q.category}
                  </span>
                </div>
                
                <button
                  type="button"
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

              <h3 className="text-lg font-semibold text-purple-200 mb-4">{q.question}</h3>
              
              <div className="space-y-2">
                {q.options.map((opt, j) => {
                  const isSelected = selected[i] === j;
                  const isCorrectOption = j === q.answer;
                  
                  return (
                    <label
                      key={j}
                      className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                        showExplanations && isCorrectOption ? 'border-green-500 bg-green-900/20' :
                        showExplanations && isSelected && !isCorrectOption ? 'border-red-500 bg-red-900/20' :
                        isSelected ? 'border-purple-500 bg-purple-900/30' :
                        'border-slate-600 hover:border-slate-500 hover:bg-slate-700/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q${i}`}
                        value={j}
                        checked={isSelected}
                        onChange={() => handleOptionChange(i, j)}
                        className="mr-3 text-purple-500 focus:ring-purple-400"
                        disabled={showExplanations}
                      />
                      <span className={`${isSelected ? 'font-medium' : ''}`}>
                        {opt}
                      </span>
                      {showExplanations && isCorrectOption && (
                        <svg className="w-5 h-5 text-green-400 ml-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      {showExplanations && isSelected && !isCorrectOption && (
                        <svg className="w-5 h-5 text-red-400 ml-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </label>
                  );
                })}
              </div>

              {showExplanations && (
                <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-600">
                  <h4 className="font-semibold text-purple-300 mb-2">Explanation:</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}

        {filteredQuestions.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <svg className="w-16 h-16 mx-auto mb-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.488.901-6.077 2.378l-.096.074c-.487.365-.896.833-1.208 1.386C4.392 19.394 4.259 20 4.5 20.5S5.606 21 6.162 21h11.676c.556 0 1.054-.606.792-1.122a7.929 7.929 0 00-1.208-1.386l-.096-.074z" />
            </svg>
            <p>No questions found with current filters.</p>
          </div>
        )}

        {filteredQuestions.length > 0 && !showExplanations && (
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-lg"
            >
              Submit Quiz
            </button>
          </div>
        ))}
        <button type="submit" className="button-style mt-4">Submit Answers</button>
      </form>

      {/* Results */}
      {score !== null && (
        <div className="mt-8 p-6 bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl shadow-lg border border-slate-600">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-purple-300 mb-2">Quiz Complete!</h3>
            <div className="text-4xl font-bold mb-2">
              <span className={score >= filteredQuestions.length * 0.8 ? "text-green-400" : score >= filteredQuestions.length * 0.6 ? "text-yellow-400" : "text-red-400"}>
                {score}/{filteredQuestions.length}
              </span>
            </div>
            <p className="text-slate-400 mb-4">
              {score >= filteredQuestions.length * 0.8 ? "Excellent work! 🎉" :
               score >= filteredQuestions.length * 0.6 ? "Good effort! Keep studying! 📚" :
               "Keep practicing! Review the explanations below. 💪"}
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleReset}
                className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

      <p className="mt-8 text-slate-500 text-xs text-center">
        <em>
          Quiz questions cover key VCE HHD Unit 3 concepts. Explanations help reinforce learning.
        </em>
      </p>
    </div>
  );
}
