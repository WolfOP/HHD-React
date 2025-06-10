import React from "react";
import { Link } from "react-router-dom";

export default function HomeComponent() {
  const features = [
    {
      icon: "📚",
      title: "Comprehensive Glossary",
      description: "Searchable, interactive glossary with favorites and progress tracking",
      link: "/glossary"
    },
    {
      icon: "🧠",
      title: "Interactive Quiz",
      description: "Test your knowledge with categorized questions and instant feedback",
      link: "/unit3-quiz"
    },
    {
      icon: "🎯",
      title: "Practice Questions",
      description: "Exam-style questions with difficulty levels and study tips",
      link: "/unit3-practice"
    },
    {
      icon: "🔄",
      title: "Flashcards",
      description: "Spaced repetition learning with favorites and progress tracking",
      link: "/unit3-flashcards"
    },
    {
      icon: "🎪",
      title: "Key Skills Hub",
      description: "Interactive activities covering all essential VCE HHD skills",
      link: "/keyskillshub"
    },
    {
      icon: "📝",
      title: "SAC 2 Prep",
      description: "Advanced preparation tools with annotation and mapping features",
      link: "/unit3-sac2-prep"
    }
  ];

  const quickStats = [
    { number: "80+", label: "Glossary Terms", icon: "📖" },
    { number: "24", label: "Practice Questions", icon: "❓" },
    { number: "10", label: "Quiz Questions", icon: "🧠" },
    { number: "12", label: "Flashcards", icon: "🔄" }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="content-section text-center mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/10 rounded-xl"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent animate-fade-in">
            VCE HHD Study Hub
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Your comprehensive resource for VCE Health and Human Development success. 
            Interactive tools, practice materials, and expert guidance all in one place.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
            <Link 
              to="/unit3" 
              className="button-style bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg transform hover:scale-105 transition-all"
            >
              🚀 Start Unit 3
            </Link>
            <Link 
              to="/glossary" 
              className="button-style bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 text-lg border border-slate-600 hover:border-purple-400"
            >
              📚 Browse Glossary
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {quickStats.map((stat, index) => (
              <div key={index} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 hover:border-purple-400 transition-colors animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-2xl font-bold text-purple-300">{stat.number}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mb-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-purple-300">
          🎯 Study Tools & Features
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.link}
              className="feature-card bg-gradient-to-br from-slate-800 to-slate-700 p-6 rounded-xl shadow-lg border border-slate-600 hover:border-purple-400 transition-all group block no-underline animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-purple-200 group-hover:text-purple-100 transition-colors mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed group-hover:text-slate-200 transition-colors">
                {feature.description}
              </p>
              <div className="mt-4 inline-flex items-center text-sm text-purple-400 group-hover:text-purple-300 transition-colors">
                Explore <span className="ml-1 transform group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Updates */}
      <section className="content-section mb-8">
        <h2 className="text-2xl font-bold mb-6 text-purple-300 flex items-center gap-2">
          ✨ What's New
        </h2>
        
        <div className="space-y-4">
          <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-green-600 text-green-100 px-2 py-1 rounded text-xs font-semibold">NEW</span>
              <span className="text-sm text-slate-400">June 2025</span>
            </div>
            <h3 className="font-semibold text-green-300 mb-2">Enhanced UI/UX with Modern Design</h3>
            <p className="text-sm text-slate-300">Complete redesign with improved accessibility, search/filter capabilities, favorites system, and responsive layouts across all components.</p>
          </div>
          
          <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-600 text-blue-100 px-2 py-1 rounded text-xs font-semibold">IMPROVED</span>
              <span className="text-sm text-slate-400">June 2025</span>
            </div>
            <h3 className="font-semibold text-blue-300 mb-2">Advanced Practice Questions</h3>
            <p className="text-sm text-slate-300">Added difficulty levels, better categorization, and comprehensive study tips for all practice questions.</p>
          </div>
        </div>
      </section>

      {/* Study Path */}
      <section className="content-section">
        <h2 className="text-2xl font-bold mb-6 text-purple-300 flex items-center gap-2">
          🗺️ Recommended Study Path
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">1</div>
            <div className="flex-1">
              <h3 className="font-semibold text-purple-200">Start with the Glossary</h3>
              <p className="text-sm text-slate-400">Build your vocabulary foundation with key VCE HHD terms</p>
            </div>
            <Link to="/glossary" className="text-purple-400 hover:text-purple-300 text-sm font-medium">
              Begin →
            </Link>
          </div>
          
          <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</div>
            <div className="flex-1">
              <h3 className="font-semibold text-purple-200">Practice with Flashcards</h3>
              <p className="text-sm text-slate-400">Reinforce learning through spaced repetition</p>
            </div>
            <Link to="/unit3-flashcards" className="text-purple-400 hover:text-purple-300 text-sm font-medium">
              Practice →
            </Link>
          </div>
          
          <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">3</div>
            <div className="flex-1">
              <h3 className="font-semibold text-purple-200">Test Understanding with Quizzes</h3>
              <p className="text-sm text-slate-400">Quick knowledge checks with instant feedback</p>
            </div>
            <Link to="/unit3-quiz" className="text-purple-400 hover:text-purple-300 text-sm font-medium">
              Quiz →
            </Link>
          </div>
          
          <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">4</div>
            <div className="flex-1">
              <h3 className="font-semibold text-purple-200">Master with Practice Questions</h3>
              <p className="text-sm text-slate-400">Exam-style questions with detailed guidance</p>
            </div>
            <Link to="/unit3-practice" className="text-purple-400 hover:text-purple-300 text-sm font-medium">
              Practice →
            </Link>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg border border-purple-700/50">
          <h3 className="font-semibold text-purple-200 mb-2">💡 Pro Tip</h3>
          <p className="text-sm text-slate-300">
            Use the favorites feature across all tools to create your personalized study collection. 
            Focus on challenging areas and track your progress as you prepare for assessments.
          </p>
        </div>
      </section>
    </div>
  );
}
