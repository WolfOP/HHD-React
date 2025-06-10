import React from 'react'

const pages = [
  { path: '/', label: 'Home' },
  { path: '/unit3', label: 'Unit 3' },
  { path: '/unit4', label: 'Unit 4' },
  { path: '/assessment-prep', label: 'Assessment Prep' },
  { path: '/glossary', label: 'Glossary' },
  { path: '/unit3-flashcards', label: 'Flashcards' },
  { path: '/unit3-practice', label: 'Practice Questions' },
  { path: '/unit3-quiz', label: 'Quiz' },
]

export default function ProgressComponent() {
  return (
    <section className="content-section">
      <h1 className="mb-6">Your Study Progress</h1>
      <ul className="space-y-3">
        {pages.map(p => {
          const visited = localStorage.getItem('visited_' + p.path)
          return (
            <li key={p.path} className="flex items-center justify-between">
              <span>{p.label}</span>
              {visited ? (
                <span className="text-green-500">✔</span>
              ) : (
                <span className="text-slate-500">✖</span>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
