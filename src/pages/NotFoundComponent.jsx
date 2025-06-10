import React from "react";

export default function NotFoundComponent() {
  const handleGoHome = () => {
    window.location.hash = '#home';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const quickLinks = [
    { label: "Home", path: "/", icon: "🏠", description: "Return to the main page" },
    { label: "Glossary", path: "/glossary", icon: "📚", description: "Browse key terms and definitions" },
    { label: "Flashcards", path: "/flashcards", icon: "🗂️", description: "Study with interactive flashcards" },
    { label: "Quiz", path: "/quiz", icon: "🧠", description: "Test your knowledge" },
    { label: "Key Skills", path: "/keyskillshub", icon: "🛠️", description: "Practice essential VCE skills" },
    { label: "Assessment Prep", path: "/assessment-prep", icon: "📋", description: "Prepare for SACs and exams" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* 404 Animation */}
        <div className="mb-8">
          <div className="text-8xl md:text-9xl font-bold text-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text animate-pulse">
            404
          </div>
          <div className="text-6xl animate-bounce mx-auto w-fit mt-4">
            🔍
          </div>
        </div>

        {/* Main Message */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-lg text-gray-600 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
            The page you're looking for seems to have wandered off like a student during a fire drill. 
            Don't worry though - we'll help you find your way back to your VCE Health and Human Development studies!
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGoHome}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span className="mr-2">🏠</span>
              Go to Home
            </button>
            <button
              onClick={handleGoBack}
              className="inline-flex items-center px-6 py-3 bg-white dark:bg-slate-800 text-gray-700 dark:text-white font-semibold rounded-lg border border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span className="mr-2">⬅️</span>
              Go Back
            </button>
          </div>
        </div>

        {/* Quick Links Grid */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            🎯 Quick Links to Continue Your Studies
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickLinks.map((link, index) => (
              <a
                key={index}
                href={`#${link.path.substring(1) || 'home'}`}
                className="group block p-4 rounded-lg border border-gray-200 dark:border-slate-600 hover:border-purple-300 dark:hover:border-purple-500 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl group-hover:scale-110 transition-transform">
                    {link.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {link.label}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
                      {link.description}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-3xl">💡</span>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Need Help Finding Something?
            </h3>
          </div>
          <p className="text-gray-600 dark:text-slate-300 mb-4">
            If you were looking for specific content, try using our search features or browse by topic. 
            All our study materials are organized to help you master VCE Health and Human Development!
          </p>
          
          {/* Search Suggestions */}
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              "Unit 3 content", "Health definitions", "Practice questions", 
              "Assessment preparation", "Key skills", "Study guides"
            ].map((suggestion, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white dark:bg-slate-700 text-gray-700 dark:text-slate-300 rounded-full text-sm border border-gray-200 dark:border-slate-600"
              >
                {suggestion}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Message */}
        <div className="mt-8 text-sm text-gray-500 dark:text-slate-400">
          <p>
            Having trouble? Remember that consistent study and practice are key to VCE success! 
            <br />
            <span className="inline-block mt-2">📚 Keep calm and study on! 🎓</span>
          </p>
        </div>
      </div>
    </div>
  );
}
