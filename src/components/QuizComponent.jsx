import React, { useState } from "react";

const quizQuestions = [
  {
    question: 'Which model of health focuses on the broader determinants of health?',
    options: ['Biomedical model', 'Social model', 'Ottawa Charter', 'NDIS'],
    answer: 1
  },
  {
    question: 'What does DALY stand for?',
    options: ['Disability Adjusted Life Year', 'Daily Activity Level Yield', 'Disease Affected Life Year', 'Dynamic and Latent Youth'],
    answer: 0
  },
  {
    question: 'Which action area is part of the Ottawa Charter?',
    options: ['Improve Medicare', 'Create Supportive Environments', 'Increase Taxation', 'Subsidise Medicines'],
    answer: 1
  },
  {
    question: 'Which level of government primarily funds Medicare?',
    options: ['Local', 'Federal', 'State', 'Private'],
    answer: 1
  },
  {
    question: 'Which indicator measures years of life lost due to premature death?',
    options: ['YLL', 'YLD', 'HALE', 'BoD'],
    answer: 0
  },
  {
    question: 'What is the main focus of the biomedical model of health?',
    options: ['Prevention of illness', 'Social determinants', 'Diagnosis and treatment', 'Spiritual wellbeing'],
    answer: 2
  },
  {
    question: 'NDIS stands for?',
    options: ['National Disability Insurance Scheme', 'National Disease Intervention System', 'Northern District Health Scheme', 'National Drugs Information Service'],
    answer: 0
  },
  {
    question: 'Which of the following is a sociocultural factor influencing health?',
    options: ['Age', 'Income', 'Blood pressure', 'Genetics'],
    answer: 1
  },
  {
    question: 'Which statement best reflects equity in health?',
    options: ['Treating everyone exactly the same', 'Providing extra support to those with greater need', 'Only focusing on individual responsibility', 'Charging all patients the same fee'],
    answer: 1
  },
  {
    question: 'Which Ottawa Charter action area relates to education and skill building?',
    options: ['Create Supportive Environments', 'Develop Personal Skills', 'Strengthen Community Action', 'Reorient Health Services'],
    answer: 1
  }
];

export default function QuizComponent() {
  const [selected, setSelected] = useState(Array(quizQuestions.length).fill(null));
  const [score, setScore] = useState(null);

  const handleOptionChange = (qIdx, optIdx) => {
    const updated = [...selected];
    updated[qIdx] = optIdx;
    setSelected(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let s = 0;
    quizQuestions.forEach((q, i) => {
      if (selected[i] === q.answer) s++;
    });
    setScore(s);
  };

  return (
    <div className="p-4 bg-slate-800 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-purple-300">Unit 3 Self-Check Quiz</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {quizQuestions.map((q, i) => (
          <div key={i}>
            <p className="mb-2">{q.question}</p>
            {q.options.map((opt, j) => (
              <label className="block" key={j}>
                <input
                  type="radio"
                  name={`q${i}`}
                  value={j}
                  checked={selected[i] === j}
                  onChange={() => handleOptionChange(i, j)}
                  className="mr-2"
                />
                {opt}
              </label>
            ))}
          </div>
        ))}
        <button type="submit" className="button-style mt-4">Submit Answers</button>
      </form>
      <div className="mt-4 text-lg font-semibold">
        {score !== null && `You scored ${score}/${quizQuestions.length}!`}
      </div>
    </div>
  );
}
