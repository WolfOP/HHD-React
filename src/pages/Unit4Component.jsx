import React, { useState, useEffect } from "react";

export default function Unit4Component() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAOS, setSelectedAOS] = useState("all");
  const [completedTopics, setCompletedTopics] = useState(() => {
    const saved = localStorage.getItem('unit4-progress');
    return saved ? JSON.parse(saved) : {};
  });
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('unit4-favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeTab, setActiveTab] = useState("overview");

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('unit4-progress', JSON.stringify(completedTopics));
  }, [completedTopics]);

  useEffect(() => {
    localStorage.setItem('unit4-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const unit4Topics = [
    {
      id: "human-dev-concepts",
      title: "Human Development Concepts",
      aos: "aos1",
      difficulty: "beginner",
      icon: "👥",
      description: "Understanding human development, capabilities approach, and measuring development",
      keyPoints: [
        "Human development as expansion of people's choices and freedoms",
        "Capabilities approach and functionings",
        "Human Development Index (HDI) components",
        "Comparing different development measures",
        "Limitations of traditional economic measures"
      ]
    },
    {
      id: "global-trends",
      title: "Global Health and Development Trends",
      aos: "aos1",
      difficulty: "intermediate",
      icon: "🌍",
      description: "Analysis of global patterns in health status and human development",
      keyPoints: [
        "Global burden of disease patterns",
        "Epidemiological transition in different regions",
        "Demographic transition stages",
        "Double burden of disease in developing countries",
        "Emerging health challenges globally"
      ]
    },
    {
      id: "health-inequities",
      title: "Global Health Inequities",
      aos: "aos1", 
      difficulty: "intermediate",
      icon: "⚖️",
      description: "Examining differences in health outcomes between and within countries",
      keyPoints: [
        "Social determinants of health globally",
        "Income inequality and health outcomes",
        "Gender disparities in health and development",
        "Urban vs rural health disparities",
        "Indigenous health inequities worldwide"
      ]
    },
    {
      id: "factors-health-dev",
      title: "Factors Affecting Global Health",
      aos: "aos1",
      difficulty: "advanced",
      icon: "🔗",
      description: "Complex interactions between social, economic, and environmental factors",
      keyPoints: [
        "Climate change and health impacts",
        "Conflict and displacement effects",
        "Trade policies and health outcomes",
        "Technology and digital health divide",
        "Governance and health system strengthening"
      ]
    },
    {
      id: "sdg-introduction",
      title: "Sustainable Development Goals Overview",
      aos: "aos2",
      difficulty: "beginner", 
      icon: "🎯",
      description: "Understanding the UN's 2030 Agenda and the 17 SDGs",
      keyPoints: [
        "History and context of SDGs",
        "17 goals and their interconnections",
        "Targets and indicators framework",
        "Leave no one behind principle",
        "Progress monitoring and reporting"
      ]
    },
    {
      id: "sdg-health",
      title: "SDG 3: Good Health and Wellbeing",
      aos: "aos2",
      difficulty: "intermediate",
      icon: "🏥",
      description: "Deep dive into health-focused sustainable development goal",
      keyPoints: [
        "Maternal and child health targets",
        "Communicable disease elimination goals",
        "Non-communicable disease prevention",
        "Mental health and substance abuse",
        "Universal health coverage objectives"
      ]
    },
    {
      id: "health-related-sdgs",
      title: "Health-Related SDGs",
      aos: "aos2",
      difficulty: "intermediate",
      icon: "🔄",
      description: "How other SDGs contribute to health and wellbeing outcomes",
      keyPoints: [
        "SDG 1: No Poverty and health connections",
        "SDG 2: Zero Hunger and nutrition",
        "SDG 6: Clean Water and Sanitation",
        "SDG 11: Sustainable Cities and health",
        "Cross-cutting themes and synergies"
      ]
    },
    {
      id: "australia-global-health",
      title: "Australia's Role in Global Health",
      aos: "aos2",
      difficulty: "intermediate",
      icon: "🇦🇺",
      description: "Australia's contributions to global health and development",
      keyPoints: [
        "Australian aid and development assistance",
        "Regional health initiatives in the Pacific",
        "Research and innovation contributions",
        "Multilateral organization participation",
        "Global health diplomacy"
      ]
    }
  ];

  const filteredTopics = unit4Topics.filter(topic => {
    const matchesSearch = topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         topic.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAOS = selectedAOS === "all" || topic.aos === selectedAOS || topic.aos === "both";
    return matchesSearch && matchesAOS;
  });

  const toggleFavorite = (topicId) => {
    setFavorites(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  const toggleCompleted = (topicId) => {
    setCompletedTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
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

  const progressPercentage = Math.round((Object.values(completedTopics).filter(Boolean).length / unit4Topics.length) * 100);
  const aos1Topics = unit4Topics.filter(t => t.aos === "aos1" || t.aos === "both");
  const aos2Topics = unit4Topics.filter(t => t.aos === "aos2" || t.aos === "both");

  const tabOptions = [
    { id: "overview", label: "Overview", icon: "📋" },
    { id: "aos1", label: "AOS 1: Global Health", icon: "🌍" },
    { id: "aos2", label: "AOS 2: SDGs", icon: "🎯" },
    { id: "topics", label: "All Topics", icon: "📚" }
  ];

  const conceptCards = [
    { title: "Human Development", icon: "👥", desc: "Understanding development beyond economic measures" },
    { title: "Global Health Patterns", icon: "📊", desc: "Analyzing worldwide health trends and disparities" },
    { title: "Sustainable Development", icon: "🎯", desc: "UN's framework for global development goals" },
    { title: "Health Inequities", icon: "⚖️", desc: "Examining unfair differences in health outcomes" },
    { title: "International Cooperation", icon: "🤝", desc: "Partnerships and aid in global health" },
    { title: "Australia's Role", icon: "🇦🇺", desc: "How Australia contributes to global health" }
  ];

  const filterOptions = [
    { value: "all", label: "All Topics", icon: "📚" },
    { value: "aos1", label: "AOS 1", icon: "🌍" },
    { value: "aos2", label: "AOS 2", icon: "🎯" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              🌍 Unit 4: Global Health & Development
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-6 max-w-4xl mx-auto">
              Explore health and human development in a global context, from measuring development to achieving the Sustainable Development Goals
            </p>
            
            {/* Progress Indicator */}
            <div className="max-w-md mx-auto mb-6">
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Unit Progress</span>
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
                <div className="text-2xl font-bold">{unit4Topics.length}</div>
                <div className="text-sm text-green-100">Topics</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="text-2xl font-bold">{aos1Topics.length}</div>
                <div className="text-sm text-green-100">AOS 1</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="text-2xl font-bold">{aos2Topics.length}</div>  
                <div className="text-sm text-green-100">AOS 2</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="text-2xl font-bold">{favorites.length}</div>
                <div className="text-sm text-green-100">Favorites</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-200 dark:bg-slate-800/95 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 py-3">
            {tabOptions.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-green-100 text-green-800 border-2 border-green-300 dark:bg-green-900 dark:text-green-200'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50 dark:text-slate-400 dark:hover:text-green-400 dark:hover:bg-green-900/20'
                }`}
              >
                <span className="mr-1">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <section className="content-section space-y-8">
            {/* Unit Introduction */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🌍</div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    Health and Human Development in a Global Context
                  </h2>
                  <p className="text-gray-600 dark:text-slate-300 leading-relaxed mb-4">
                    Unit 4 examines health and human development from a global perspective, exploring how different 
                    countries experience varying levels of health status and human development. Students investigate 
                    the complex factors that contribute to these differences and analyze international efforts to 
                    improve global health outcomes.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                      <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">Area of Study 1</h3>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Global Health and Human Development - Focus on concepts, trends, and factors affecting 
                        global health disparities
                      </p>
                    </div>
                    <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-4">
                      <h3 className="font-semibold text-teal-800 dark:text-teal-200 mb-2">Area of Study 2</h3>
                      <p className="text-sm text-teal-700 dark:text-teal-300">
                        Health and the Sustainable Development Goals - Examination of the UN's SDGs and their 
                        relationship to global health
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Concepts Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {conceptCards.map((concept, index) => (
                <div key={index} className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6 hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-3">{concept.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{concept.title}</h3>
                  <p className="text-gray-600 dark:text-slate-300 text-sm">{concept.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Topics Tab */}
        {activeTab === "topics" && (
          <section className="content-section space-y-6">
            {/* Search and Filter Bar */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="Search Unit 4 topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                    aria-label="Search Unit 4 topics"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">🔍</span>
                  </div>
                </div>
                
                <div className="flex gap-2 flex-wrap">
                  {filterOptions.map(filter => (
                    <button
                      key={filter.value}
                      onClick={() => setSelectedAOS(filter.value)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        selectedAOS === filter.value
                          ? 'bg-green-100 text-green-800 border-2 border-green-300 dark:bg-green-900 dark:text-green-200'
                          : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600'
                      }`}
                      aria-pressed={selectedAOS === filter.value}
                    >
                      <span className="mr-1">{filter.icon}</span>
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mt-2 text-sm text-gray-600 dark:text-slate-400">
                Showing {filteredTopics.length} of {unit4Topics.length} topics
                {searchTerm && (
                  <span className="ml-2 text-green-600 dark:text-green-400">
                    for "{searchTerm}"
                  </span>
                )}
              </div>
            </div>

            {/* Topics Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="group bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Card Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-3xl group-hover:scale-110 transition-transform">
                        {topic.icon}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleFavorite(topic.id)}
                          className={`p-2 rounded-full transition-colors ${
                            favorites.includes(topic.id)
                              ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                              : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                          }`}
                          aria-label={favorites.includes(topic.id) ? 'Remove from favorites' : 'Add to favorites'}
                        >
                          {favorites.includes(topic.id) ? '❤️' : '🤍'}
                        </button>
                        <button
                          onClick={() => toggleCompleted(topic.id)}
                          className={`p-2 rounded-full transition-colors ${
                            completedTopics[topic.id]
                              ? 'text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20'
                              : 'text-gray-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20'
                          }`}
                          aria-label={completedTopics[topic.id] ? 'Mark as incomplete' : 'Mark as complete'}
                        >
                          {completedTopics[topic.id] ? '✅' : '⭕'}
                        </button>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      {topic.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed mb-3">
                      {topic.description}
                    </p>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(topic.difficulty)}`}>
                        {topic.difficulty}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        topic.aos === "aos1" ? "bg-green-100 text-green-800 border border-green-200" :
                        topic.aos === "aos2" ? "bg-teal-100 text-teal-800 border border-teal-200" :
                        "bg-purple-100 text-purple-800 border border-purple-200"
                      }`}>
                        {topic.aos === "aos1" ? "AOS 1" : topic.aos === "aos2" ? "AOS 2" : "Both"}
                      </span>
                    </div>
                  </div>

                  {/* Key Points Preview */}
                  <div className="px-6 pb-6">
                    <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2 text-sm">Key Learning Points</h4>
                      <div className="space-y-1">
                        {topic.keyPoints.slice(0, 3).map((point, index) => (
                          <div key={index} className="flex items-start gap-2 text-xs text-gray-600 dark:text-slate-400">
                            <span className="text-green-500 mt-1">•</span>
                            <span>{point}</span>
                          </div>
                        ))}
                        {topic.keyPoints.length > 3 && (
                          <div className="text-xs text-gray-500 dark:text-slate-500 mt-2">
                            +{topic.keyPoints.length - 3} more points...
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results Message */}
            {filteredTopics.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No topics found
                </h3>
                <p className="text-gray-600 dark:text-slate-400 mb-4">
                  Try adjusting your search terms or filters
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedAOS("all");
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
