import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (window.innerWidth >= 768) {
      setIsOpen(true);
    }
  }, []);

  return (
    <aside
      className={`bg-gray-800 text-white transition-all duration-300 h-screen overflow-y-auto flex flex-col z-20 fixed md:static top-0 left-0 ${
        isOpen ? 'w-64' : 'w-16'
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar"
        className="p-3 w-16 h-16 flex items-center justify-center focus:outline-none hover:bg-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M3.75 5.25a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75zm0 6a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75zm0 6a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <nav className="flex flex-col space-y-4 p-4" aria-label="Primary">
          <Link to="/">Home</Link>
          <Link to="/unit3">Unit 3</Link>
          <Link to="/unit4">Unit 4</Link>
          <Link to="/assessment-prep">Assessment Prep</Link>
          <Link to="/glossary">Glossary</Link>
        </nav>
      )}
    </aside>
  );
}
