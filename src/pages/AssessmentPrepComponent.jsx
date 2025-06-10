import React, { useState, useEffect } from "react";

export default function AssessmentPrepComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [completedSections, setCompletedSections] = useState(() => {
    const saved = localStorage.getItem('assessment-prep-progress');
    return saved ? JSON.parse(saved) : {};
  });
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('assessment-prep-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('assessment-prep-progress', JSON.stringify(completedSections));
  }, [completedSections]);

  useEffect(() => {
    localStorage.setItem('assessment-prep-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const assessmentSections = [
    {
      id: "overview",
      title: "Assessment Overview",
      category: "structure",
      difficulty: "beginner",
      icon: "📊",
      description: "Understanding the VCE HHD assessment structure and weightings",
      content: {
        heading: "VCE HHD Assessment Breakdown",
        items: [
          { label: "Unit 3 SACs", value: "25%", description: "School-Assessed Coursework" },
          { label: "Unit 4 SACs", value: "25%", description: "School-Assessed Coursework" },
          { label: "End-of-Year Exam", value: "50%", description: "External examination covering Units 3 & 4" }
        ],
        note: "To receive a study score, students must achieve an 'S' (Satisfactory) for both Units 3 and 4."
      }
    },
    {
      id: "unit3-sacs",
      title: "Unit 3 SACs Guide",
      category: "sacs",
      difficulty: "intermediate",
      icon: "📝",
      description: "Detailed breakdown of Unit 3 outcomes and assessment tasks",
      content: {
        heading: "Unit 3: Australia's Health in a Globalised World",
        outcomes: [
          {
            title: "Outcome 1: Understanding Health and Wellbeing",
            marks: "50 marks",
            description: "Explain the complex, dynamic, and global nature of health and wellbeing, interpret Australia's health status data, and analyse variations."
          },
          {
            title: "Outcome 2: Promoting Health in Australia", 
            marks: "50 marks",
            description: "Explain changes to public health approaches, analyse improvements in population health, and evaluate health promotion strategies."
          }
        ]
      }
    },
    {
      id: "sac-tasks",
      title: "SAC Task Types",
      category: "sacs",
      difficulty: "intermediate",
      icon: "📋",
      description: "Overview of suitable SAC task formats and requirements",
      content: {
        heading: "Suitable SAC Tasks for Unit 3",
        tasks: [
          { type: "Written Report", examples: "Media analysis, research investigation, blog post, case study analysis" },
          { type: "Extended Response", examples: "Analysing various stimuli (text, data, visuals)" },
          { type: "Oral Presentation", examples: "Debate, podcast" },
          { type: "Visual Presentation", examples: "Concept map, annotated poster, digital presentation" },
          { type: "Structured Questions", examples: "Data analysis or case study analysis" }
        ],
        note: "Each task type can generally only be selected once across Outcome 1 and Outcome 2 in Unit 3."
      }
    },
    {
      id: "exam-prep",
      title: "Exam Preparation Strategy",
      category: "exam",
      difficulty: "advanced",
      icon: "🎯",
      description: "Comprehensive guide for preparing for the end-of-year examination",
      content: {
        heading: "End-of-Year Examination (2 hours)",
        strategies: [
          { skill: "Command Words", description: "Master terms like 'explain', 'analyse', 'evaluate', 'discuss', 'identify', 'describe'" },
          { skill: "Key Knowledge", description: "Thoroughly review all content from the Study Design" },
          { skill: "Key Skills Practice", description: "Apply knowledge to different scenarios, data, and question types" },
          { skill: "Data Analysis", description: "Interpret tables, graphs, and health status data" },
          { skill: "Extended Responses", description: "Structure well-reasoned arguments with evidence" },
          { skill: "Past Papers", description: "Work through VCAA past examination papers" },
          { skill: "Time Management", description: "Practice answering questions under timed conditions" }
        ]
      }
    },
    {
      id: "study-techniques",
      title: "Effective Study Techniques",
      category: "study",
      difficulty: "beginner",
      icon: "📚",
      description: "Proven methods for mastering VCE HHD content and skills",
      content: {
        heading: "Study Strategies for Success",
        techniques: [
          { method: "Active Recall", description: "Test yourself regularly without looking at notes" },
          { method: "Spaced Repetition", description: "Review content at increasing intervals" },
          { method: "Mind Mapping", description: "Create visual connections between concepts" },
          { method: "Practice Essays", description: "Write timed responses to past exam questions" },
          { method: "Study Groups", description: "Explain concepts to peers and discuss interpretations" },
          { method: "Case Study Analysis", description: "Apply theories to real-world health scenarios" }
        ]
      }
    },
    {
      id: "time-management",
      title: "Assessment Time Management",
      category: "study",
      difficulty: "intermediate",
      icon: "⏰",
      description: "Strategies for managing your time effectively during assessments",
      content: {
        heading: "Time Management in Assessments",
        tips: [
          { phase: "Before Assessment", advice: "Create a study schedule, practice past papers, identify weak areas" },
          { phase: "During SACs", advice: "Read questions carefully, plan responses, allocate time per question" },
          { phase: "During Exams", advice: "Scan all questions first, start with confident answers, check remaining time regularly" },
          { phase: "Extended Responses", advice: "5 minutes planning, write continuously, 5 minutes checking" }
        ]
      }
    }
  ];

  const filteredSections = assessmentSections.filter(section => {
    const matchesSearch = section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         section.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || section.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const toggleFavorite = (sectionId) => {
    setFavorites(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const toggleCompleted = (sectionId) => {
    setCompletedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const progressPercentage = Math.round((Object.values(completedSections).filter(Boolean).length / assessmentSections.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              📋 Assessment Preparation
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-6 max-w-3xl mx-auto">
              Master your VCE Health and Human Development assessments with comprehensive preparation strategies
            </p>
            
            {/* Progress Indicator */}
            <div className="max-w-md mx-auto mb-6">
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Your Progress</span>
                <span>{progressPercentage}% Complete</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="text-2xl font-bold">{assessmentSections.length}</div>
                <div className="text-sm text-blue-100">Sections</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="text-2xl font-bold">{Object.values(completedSections).filter(Boolean).length}</div>
                <div className="text-sm text-blue-100">Completed</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="text-2xl font-bold">{favorites.length}</div>
                <div className="text-sm text-blue-100">Favorites</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm text-blue-100">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200 dark:bg-slate-800/95 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search assessment topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                aria-label="Search assessment preparation topics"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">🔍</span>
              </div>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {[
                { value: "all", label: "All Topics", icon: "📚" },
                { value: "structure", label: "Structure", icon: "📊" },
                { value: "sacs", label: "SACs", icon: "📝" },
                { value: "exam", label: "Exam", icon: "🎯" },
                { value: "study", label: "Study Tips", icon: "💡" }
              ].map(filter => (
                <button
                  key={filter.value}
                  onClick={() => setSelectedFilter(filter.value)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    selectedFilter === filter.value
                      ? 'bg-purple-100 text-purple-800 border-2 border-purple-300 dark:bg-purple-900 dark:text-purple-200'
                      : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600'
                  }`}
                  aria-pressed={selectedFilter === filter.value}
                >
                  <span className="mr-1">{filter.icon}</span>
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Results count */}
          <div className="mt-2 text-sm text-gray-600 dark:text-slate-400">
            Showing {filteredSections.length} of {assessmentSections.length} sections
            {searchTerm && (
              <span className="ml-2 text-purple-600 dark:text-purple-400">
                for "{searchTerm}"
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Introduction Card */}
        <div className="mb-8 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
          <div className="flex items-start gap-4">
            <div className="text-4xl">🎓</div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Assessment Success Strategy
              </h2>
              <p className="text-gray-600 dark:text-slate-300 leading-relaxed">
                Understanding how you'll be assessed is key to success in VCE Health and Human Development. 
                This comprehensive guide covers assessment structure, preparation strategies, and practical tips 
                for excelling in both SACs and the end-of-year examination.
              </p>
            </div>
          </div>
        </div>

        {/* Assessment Sections Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSections.map((section) => (
            <div
              key={section.id}
              className="group bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Card Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl group-hover:scale-110 transition-transform">
                    {section.icon}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleFavorite(section.id)}
                      className={`p-2 rounded-full transition-colors ${
                        favorites.includes(section.id)
                          ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                          : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                      }`}
                      aria-label={favorites.includes(section.id) ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      {favorites.includes(section.id) ? '❤️' : '🤍'}
                    </button>
                    <button
                      onClick={() => toggleCompleted(section.id)}
                      className={`p-2 rounded-full transition-colors ${
                        completedSections[section.id]
                          ? 'text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20'
                          : 'text-gray-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20'
                      }`}
                      aria-label={completedSections[section.id] ? 'Mark as incomplete' : 'Mark as complete'}
                    >
                      {completedSections[section.id] ? '✅' : '⭕'}
                    </button>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {section.title}
                </h3>
                
                <p className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed mb-3">
                  {section.description}
                </p>
                
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(section.difficulty)}`}>
                    {section.difficulty}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-900 dark:text-blue-200">
                    {section.category}
                  </span>
                </div>
              </div>

              {/* Card Content Preview */}
              <div className="px-6 pb-6">
                <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2 text-sm">
                    {section.content.heading}
                  </h4>
                  <div className="text-xs text-gray-600 dark:text-slate-400">
                    {section.content.items && `${section.content.items.length} key points`}
                    {section.content.outcomes && `${section.content.outcomes.length} outcomes`}
                    {section.content.tasks && `${section.content.tasks.length} task types`}
                    {section.content.strategies && `${section.content.strategies.length} strategies`}
                    {section.content.techniques && `${section.content.techniques.length} techniques`}
                    {section.content.tips && `${section.content.tips.length} tips`}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Tools Section */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-xl shadow-lg text-white p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-3">🛠️ Interactive Preparation Tools</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Access specialized tools designed to help you excel in your assessments
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors">
              <h3 className="text-xl font-semibold mb-2">Unit 3 SAC 2 Prep</h3>
              <p className="text-blue-100 mb-4 text-sm">
                Interactive tools for deconstructing questions, annotating stimuli, mapping relationships, and planning extended responses.
              </p>
              <a 
                href="#unit3-sac2-prep" 
                className="inline-flex items-center px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
              >
                Launch Tool →
              </a>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors">
              <h3 className="text-xl font-semibold mb-2">Key Skills Hub</h3>
              <p className="text-blue-100 mb-4 text-sm">
                Master essential VCE HHD skills with interactive exercises, practice scenarios, and skill assessments.
              </p>
              <a 
                href="#keyskillshub" 
                className="inline-flex items-center px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
              >
                Explore Skills →
              </a>
            </div>
          </div>
        </div>

        {/* No Results Message */}
        {filteredSections.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No sections found
            </h3>
            <p className="text-gray-600 dark:text-slate-400 mb-4">
              Try adjusting your search terms or filters
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedFilter("all");
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
