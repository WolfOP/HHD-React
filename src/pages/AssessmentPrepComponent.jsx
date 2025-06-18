import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AssessmentPrepComponent() {
  // const [, setSearchTerm] = useState(""); // Unused
  // const [, setSelectedFilter] = useState("all"); // Unused
  const [completedSections] = useState(() => { // setCompletedSections is unused
    const saved = localStorage.getItem('assessment-prep-progress');
    return saved ? JSON.parse(saved) : {};
  });
  const [favorites] = useState(() => { // setFavorites is unused
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

  /*
  const assessmentSections = [ // This variable is unused
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
  */

  // const filteredSections = assessmentSections.filter(section => {
  //   const matchesSearch = section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //                        section.description.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesFilter = selectedFilter === "all" || section.category === selectedFilter;
  //   return matchesSearch && matchesFilter;
  // });

  // const toggleFavorite = (sectionId) => {
  //   setFavorites(prev =>
  //     prev.includes(sectionId)
  //       ? prev.filter(id => id !== sectionId)
  //       : [...prev, sectionId]
  //   );
  // };

  // const toggleCompleted = (sectionId) => {
  //   setCompletedSections(prev => ({
  //     ...prev,
  //     [sectionId]: !prev[sectionId]
  //   }));
  // };

  // const getDifficultyColor = (difficulty) => {
  //   switch(difficulty) {
  //     case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
  //     case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  //     case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
  //     default: return 'bg-gray-100 text-gray-800 border-gray-200';
  //   }
  // };

  // const progressPercentage = Math.round((Object.values(completedSections).filter(Boolean).length / assessmentSections.length) * 100);

  return (
    <section className="content-section">
      <h1>Assessment Preparation</h1>
      <p>
        Understanding how you'll be assessed is key to success in VCE Health and Human Development. This section provides an overview of the assessment structure for Unit 3 and general tips for preparing for SACs and the end-of-year examination.
      </p>

      <h2>VCE HHD Assessment Overview</h2>
      <p>
        Your final study score for VCE Health and Human Development is determined by a combination of School-Assessed Coursework (SACs) and an external end-of-year examination.
      </p>
      <ul>
        <li>
          <strong>Unit 3 School-Assessed Coursework (SACs):</strong> Contributes 25% to your final study score.
        </li>
        <li>
          <strong>Unit 4 School-Assessed Coursework (SACs):</strong> Contributes 25% to your final study score.
        </li>
        <li>
          <strong>End-of-Year Examination (covers Units 3 & 4):</strong> Contributes 50% to your final study score.
        </li>
      </ul>
      <p>
        To receive a study score, students must achieve an 'S' (Satisfactory) for both Units 3 and 4.
      </p>

      <h2>Unit 3 School-Assessed Coursework (SACs)</h2>
      <p>
        For Unit 3, "Australia's health in a globalised world," your performance on two outcomes will be assessed through SACs. Each outcome is typically allocated 50 marks, contributing to a total of 100 marks for the Unit 3 SACs.
      </p>
      <ul>
        <li>
          <strong>Outcome 1 (Understanding health and wellbeing):</strong> On completion, students should be able to explain the complex, dynamic, and global nature of health and wellbeing, interpret and apply Australia's health status data, and analyse variations in health status.
        </li>
        <li>
          <strong>Outcome 2 (Promoting health in Australia):</strong> On completion, students should be able to explain changes to public health approaches, analyse improvements in population health over time, and evaluate health promotion strategies and initiatives.
        </li>
      </ul>
      <p>
        SAC tasks are school-based and must be part of your regular teaching program, completed mainly in class within a limited timeframe. Work submitted must be your own.
      </p>

      <div id="unit3-sac2-prep" className="my-6 p-4 bg-slate-700 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-purple-300 mb-2">Unit 3 SAC 2 - Interactive Preparation Tools</h3>
        <p className="text-slate-300 mb-3">
          Access interactive tools for deconstructing questions, annotating stimuli, mapping relationships, and planning your extended responses for the Unit 3 Outcome 2 SAC.
        </p>
        <Link
          to="#unit3-sac2-prep"
          onClick={(e) => {
            if (window.location.pathname === '/assessment-prep') {
              e.preventDefault();
              document.getElementById('unit3-sac2-prep')?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="button-style"
        >
          Go to Unit 3 SAC 2 Prep
        </Link>
        <Link
          to="#keyskillshub"
          onClick={(e) => {
            if (window.location.pathname === '/assessment-prep') {
              e.preventDefault();
              document.getElementById('keyskillshub')?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="mt-4 inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl shadow-md transition"
        >
          🛠️ Go to Key Skills Hub
        </Link>
      </div>

      <div id="keyskillshub"></div>

      <h4>Suitable SAC Tasks for Unit 3:</h4>
      <p>
        Your school will select tasks from the following list. Each task type can generally only be selected once across Outcome 1 and Outcome 2 in Unit 3.
      </p>
      <ul>
        <li>A written report (e.g., media analysis, research investigation, blog post, case study analysis).</li>
        <li>An extended response question analysing various stimuli (text, data, visuals).</li>
        <li>An oral presentation (e.g., debate, podcast).</li>
        <li>A visual presentation (e.g., concept map, annotated poster, digital presentation).</li>
        <li>Structured questions (including data analysis or case study analysis).</li>
      </ul>
      <p>
        <em>(Specific details about your school's SAC tasks will be provided by your teacher.)</em>
      </p>

      <h2>General Exam Preparation (Units 3 & 4)</h2>
      <p>
        The end-of-year examination is 2 hours long and assesses all Key Knowledge and Key Skills from both Unit 3 and Unit 4.
      </p>
      <h4>Key Tips for Preparation:</h4>
      <ul>
        <li>
          <strong>Understand Command Words:</strong> Know what's expected for terms like 'explain', 'analyse', 'evaluate', 'discuss', 'identify', 'describe'.
        </li>
        <li>
          <strong>Master Key Knowledge:</strong> Thoroughly review all content from the Study Design.
        </li>
        <li>
          <strong>Practice Key Skills:</strong> Regularly practice applying your knowledge to different scenarios, data, and question types.
        </li>
        <li>
          <strong>Data Analysis:</strong> Develop strong skills in interpreting tables, graphs, and other data related to health status.
        </li>
        <li>
          <strong>Extended Responses:</strong> Practice structuring well-reasoned arguments, using evidence, and linking back to the question.
        </li>
        <li>
          <strong>Past Papers:</strong> Work through VCAA past examination papers (keeping in mind any Study Design changes).
        </li>
        <li>
          <strong>Time Management:</strong> Practice answering questions under timed conditions.
        </li>
      </ul>
      <p className="mt-6">
        <em>More detailed strategies, practice questions, and specific Unit 3 SAC guidance will be added here.</em>
      </p>
    </section>
  );
}
