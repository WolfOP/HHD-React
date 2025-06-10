import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const lifeExpectancyData = {
  labels: ['1900', '1920', '1940', '1960', '1980', '2000', '2022'],
  datasets: [
    {
      label: 'Male Life Expectancy',
      data: [50, 57, 63, 68, 72, 76, 80],
      borderColor: 'rgba(59, 130, 246, 1)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
      tension: 0.4,
    },
    {
      label: 'Female Life Expectancy',
      data: [55, 60, 67, 72, 78, 82, 84],
      borderColor: 'rgba(236, 72, 153, 1)',
      backgroundColor: 'rgba(236, 72, 153, 0.1)',
      fill: true,
      tension: 0.4,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: { 
        color: '#64748b',
        usePointStyle: true,
        padding: 20,
        font: {
          size: 14,
          weight: 'bold'
        }
      },
    },
    tooltip: {
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      titleColor: '#fff',
      bodyColor: '#fff',
      borderColor: 'rgba(59, 130, 246, 0.5)',
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: true,
      callbacks: {
        label: function(context) {
          return `${context.dataset.label}: ${context.parsed.y} years`;
        }
      }
    },
  },
  scales: {
    x: { 
      ticks: { 
        color: '#64748b',
        font: { size: 12 }
      },
      grid: {
        color: 'rgba(148, 163, 184, 0.1)',
      }
    },
    y: { 
      ticks: { 
        color: '#64748b',
        font: { size: 12 },
        callback: function(value) {
          return value + ' years';
        }
      },
      grid: {
        color: 'rgba(148, 163, 184, 0.1)',
      }
    },
  },
};

const analysisPrompts = [
  "What overall trend do you observe in life expectancy over time?",
  "Compare the life expectancy patterns between males and females.",
  "What factors might have contributed to the increases in different time periods?",
  "How might social determinants of health explain these changes?",
  "What predictions could you make about future life expectancy trends?"
];

const keyPoints = [
  "Life expectancy has increased dramatically over the past century",
  "Females consistently have higher life expectancy than males",
  "The steepest increases occurred between 1940-1980",
  "Improvements reflect advances in healthcare, nutrition, and living conditions",
  "The gap between male and female life expectancy has remained relatively stable"
];

export default function KeySkill1() {
  const [response, setResponse] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  // Load saved state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('keyskill1-response');
    const savedFavorite = localStorage.getItem('keyskill1-favorite');
    const savedCompleted = localStorage.getItem('keyskill1-completed');
    
    if (saved) setResponse(saved);
    if (savedFavorite) setIsFavorited(JSON.parse(savedFavorite));
    if (savedCompleted) setIsCompleted(JSON.parse(savedCompleted));
  }, []);

  // Save to localStorage when response changes
  useEffect(() => {
    localStorage.setItem('keyskill1-response', response);
    setWordCount(response.trim().split(/\s+/).filter(word => word.length > 0).length);
  }, [response]);

  useEffect(() => {
    localStorage.setItem('keyskill1-favorite', JSON.stringify(isFavorited));
  }, [isFavorited]);

  useEffect(() => {
    localStorage.setItem('keyskill1-completed', JSON.stringify(isCompleted));
  }, [isCompleted]);

  const clearResponse = () => {
    setResponse('');
    setWordCount(0);
  };

  return (
    <div className="modern-component">
      {/* Header */}
      <div className="content-card">
        <div className="card-header">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="skill-icon">📈</div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Data Analysis Skills
                </h2>
                <p className="text-gray-600 dark:text-slate-300">
                  Interpret trends from charts and describe health impacts
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsFavorited(!isFavorited)}
                className={`action-button ${isFavorited ? 'favorited' : ''}`}
                aria-label="Toggle favorite"
              >
                {isFavorited ? '❤️' : '🤍'}
              </button>
              <button
                onClick={() => setIsCompleted(!isCompleted)}
                className={`action-button ${isCompleted ? 'completed' : ''}`}
                aria-label="Toggle completed"
              >
                {isCompleted ? '✅' : '⭕'}
              </button>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Australian Life Expectancy Trends (1900-2022)
          </h3>
          <div className="chart-container bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-700">
            <div style={{ height: '400px' }}>
              <Line data={lifeExpectancyData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Analysis Prompts */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Analysis Prompts
          </h3>
          <div className="grid gap-2">
            {analysisPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => setSelectedPrompt(index)}
                className={`text-left p-3 rounded-lg border transition-all ${
                  selectedPrompt === index
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200'
                    : 'border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 text-gray-700 dark:text-slate-300'
                }`}
              >
                <span className="font-medium">Prompt {index + 1}:</span> {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Response Area */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Your Analysis
            </h3>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-slate-400">
                {wordCount} words
              </span>
              <button
                onClick={() => setShowHints(!showHints)}
                className="text-sm px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200 rounded-full hover:bg-yellow-200 dark:hover:bg-yellow-900/30 transition-colors"
              >
                💡 {showHints ? 'Hide' : 'Show'} Hints
              </button>
              <button
                onClick={clearResponse}
                className="text-sm px-3 py-1 bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200 rounded-full hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors"
              >
                🗑️ Clear
              </button>
            </div>
          </div>
          
          <textarea
            placeholder={`Address: ${analysisPrompts[selectedPrompt]}`}
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            className="w-full h-32 p-4 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            aria-label="Analysis response"
          />
        </div>

        {/* Hints Section */}
        {showHints && (
          <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
              💡 Key Points to Consider:
            </h4>
            <ul className="space-y-2">
              {keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2 text-yellow-700 dark:text-yellow-300">
                  <span className="text-yellow-500 mt-1">•</span>
                  <span className="text-sm">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Progress Indicator */}
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span>Progress:</span>
            <div className="w-32 bg-gray-200 dark:bg-slate-700 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((wordCount / 100) * 100, 100)}%` }}
              ></div>
            </div>
            <span>{Math.min(Math.round((wordCount / 100) * 100), 100)}%</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Target: 100+ words</span>
            {isCompleted && <span className="text-green-600 dark:text-green-400">✅ Completed</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
