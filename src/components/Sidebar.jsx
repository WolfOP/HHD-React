import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`transition-all duration-300 bg-gray-800 text-white h-screen overflow-hidden ${isOpen ? 'w-64' : 'w-0'}`}>
      <button onClick={() => setIsOpen(!isOpen)} className="p-2 focus:outline-none">
        🍔
      </button>
      {isOpen && (
        <nav className="flex flex-col space-y-4 p-4">
          <Link to="/">Home</Link>
          <Link to="/unit3">Unit 3</Link>
          <Link to="/unit4">Unit 4</Link>
          <Link to="/assessment-prep">Assessment Prep</Link>
          <Link to="/glossary">Glossary</Link>
        </nav>
      )}
    </div>
  );
}
