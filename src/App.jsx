// src/App.jsx
import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

import Home from './pages/HomeComponent.jsx';
import Unit3 from './pages/Unit3Component.jsx';
import Unit4 from './pages/Unit4Component.jsx';
import AssessmentPrep from './pages/AssessmentPrepComponent.jsx';
import Glossary from './pages/GlossaryComponent.jsx';
import Unit3SAC2Prep from './components/Unit3SAC2PrepComponent.jsx';
import Unit3Quiz from './pages/Unit3QuizComponent.jsx';
import Unit3Flashcards from './pages/Unit3FlashcardsComponent.jsx';
import Unit3PracticeQuestions from './pages/Unit3PracticeQuestionsComponent.jsx';
import KeySkillsHub from './pages/key-skills-hub.jsx';
import Progress from './pages/ProgressComponent.jsx';
import SearchBar from './components/SearchBar.jsx';
import HelpModal from './components/HelpModal.jsx';
import NotFound from './pages/NotFoundComponent.jsx';

import './App.css';

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 100);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return visible ? (
    <button onClick={scrollTop} className="fixed bottom-5 right-5 bg-purple-600 hover:bg-purple-700 text-white font-bold p-3 rounded-full shadow-lg z-40 transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  ) : null;
}

function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    try {
      localStorage.setItem('visited_' + pathname, 'true');
    } catch {
      // ignore storage errors
    }
  }, [pathname]);
  return null;
}

// Navigation component with active page highlighting
function NavLink({ to, children, onClick, className = "" }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`nav-link transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 ${
        isActive
          ? 'text-purple-400 bg-purple-900/30 border-b-2 border-purple-400 font-semibold'
          : 'text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400'
      } ${className}`}
    >
      {children}
    </Link>
  );
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem('theme') === 'dark'
  );
  const sidebarRef = useRef(null);
  const hamburgerButtonRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    if (mobileMenuOpen) {
      const focusableElementsQuery = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
      const focusableElements = sidebarRef.current?.querySelectorAll(focusableElementsQuery);

      if (focusableElements && focusableElements.length > 0) {
        // Filter for visible elements before focusing
        const visibleFocusableElements = Array.from(focusableElements).filter(el => {
          const style = window.getComputedStyle(el);
          return style.display !== 'none' && style.visibility !== 'hidden' && el.offsetHeight > 0 && el.offsetWidth > 0;
        });
        if (visibleFocusableElements.length > 0) {
          visibleFocusableElements[0].focus();
        }
      }

      const handleKeyDown = (event) => {
        if (event.key === 'Tab') {
          const focusableElements = sidebarRef.current?.querySelectorAll(focusableElementsQuery);
          if (!focusableElements || focusableElements.length === 0) return;

          const visibleFocusableElements = Array.from(focusableElements).filter(el => {
            const style = window.getComputedStyle(el);
            return style.display !== 'none' && style.visibility !== 'hidden' && el.offsetHeight > 0 && el.offsetWidth > 0;
          });
          if (visibleFocusableElements.length === 0) return;


          const firstElement = visibleFocusableElements[0];
          const lastElement = visibleFocusableElements[visibleFocusableElements.length - 1];

          if (event.shiftKey) { // Shift + Tab
            if (document.activeElement === firstElement) {
              lastElement.focus();
              event.preventDefault();
            }
          } else { // Tab
            if (document.activeElement === lastElement) {
              firstElement.focus();
              event.preventDefault();
            }
          }
        }
      };

      const currentSidebarRef = sidebarRef.current;
      currentSidebarRef?.addEventListener('keydown', handleKeyDown);

      return () => {
        currentSidebarRef?.removeEventListener('keydown', handleKeyDown);
        // Only return focus if the active element is still within the sidebar or if the sidebar itself had focus
        if (hamburgerButtonRef.current && (sidebarRef.current?.contains(document.activeElement) || document.activeElement === sidebarRef.current)) {
            hamburgerButtonRef.current.focus();
        }
      };
    } else {
        // If sidebar is closing and focus was inside, return to hamburger
        // This handles cases like Escape key closing when focus is in sidebar
        if (hamburgerButtonRef.current && sidebarRef.current?.contains(document.activeElement)) {
            hamburgerButtonRef.current.focus();
        }
    }
  }, [mobileMenuOpen]);


  return (
    <Router>
      <ScrollToTopOnRouteChange />

      <div className="font-sans antialiased min-h-screen bg-gradient-to-b from-outer to-surface text-gray-100">

        <header className="bg-surface/70 backdrop-blur border-b border-slate-600/40 shadow-lg sticky top-0 z-50">

          <nav className="w-full px-6 md:px-8 py-4 flex items-center justify-between space-x-6">
            <Link to="/" className="text-2xl font-bold text-purple-400 hover:text-purple-300 transition-colors">HHD Hub</Link>
            <div className="flex items-center space-x-3">
              <div className="hidden md:block">
                <SearchBar />
              </div>
              <HelpModal />
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="hidden md:inline-block text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"


 
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              <button
                ref={hamburgerButtonRef}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
                aria-label="Toggle mobile menu"
                aria-expanded={mobileMenuOpen}
                aria-controls="sidebar-container"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                  )}
                </svg>
              </button>
            </div>

            <ul className="hidden md:flex space-x-6">
              <li><Link to="/" className="nav-link text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Home</Link></li>
              <li><Link to="/unit3" className="nav-link text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Unit 3</Link></li>
              <li><Link to="/unit4" className="nav-link text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Unit 4</Link></li>
              <li><Link to="/assessment-prep" className="nav-link text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Assessment Prep</Link></li>
              <li><Link to="/glossary" className="nav-link text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Glossary</Link></li>

            </ul>
          </nav>
        </header>

        {/* Sidebar Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-55 md:hidden" // md:hidden if sidebar is only for mobile
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Sidebar */}
        <div
          id="sidebar-container"
          ref={sidebarRef}
          className={`fixed top-0 left-0 h-screen w-64 bg-outer text-slate-100 p-5 z-60 transform transition-transform duration-300 ease-in-out shadow-xl
                     ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="sidebar-title"
          // Add tabindex="-1" to make the div focusable for the keydown listener, if needed,
          // or attach listener to document/window and check if sidebar is open.
          // For now, attaching to the sidebar div itself. It should receive focus programmatically or via its children.
        >
          <div className="flex justify-between items-center mb-6">
            <h2 id="sidebar-title" className="text-xl font-semibold text-purple-400">Menu</h2>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-purple-400 transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav>
            <ul className="space-y-3">
              <li><Link to="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded-md hover:bg-purple-700/50 transition-colors w-full text-left nav-link">Home</Link></li>
              <li><Link to="/unit3" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded-md hover:bg-purple-700/50 transition-colors w-full text-left nav-link">Unit 3</Link></li>
              <li><Link to="/unit4" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded-md hover:bg-purple-700/50 transition-colors w-full text-left nav-link">Unit 4</Link></li>
              <li><Link to="/assessment-prep" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded-md hover:bg-purple-700/50 transition-colors w-full text-left nav-link">Assessment Prep</Link></li>
              <li><Link to="/glossary" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded-md hover:bg-purple-700/50 transition-colors w-full text-left nav-link">Glossary</Link></li>
            </ul>
          </nav>

          <div className="mt-8 pt-4 border-t border-slate-700">
            <button
              onClick={() => {
                setDarkMode(!darkMode);
                // setMobileMenuOpen(false); // Optionally close menu on toggle
              }}
              className="flex items-center justify-between w-full py-2 px-3 rounded-md text-slate-300 hover:bg-purple-700/50 hover:text-purple-300 transition-colors"
            >
              <span>{darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</span>
              {darkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
              )}
            </button>
          </div>
        </div>

        <main id="app-content" className="w-full px-6 md:px-8 py-8 min-h-[calc(100vh-160px)]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/unit3" element={<Unit3 />} />
            <Route path="/unit4" element={<Unit4 />} />
            <Route path="/assessment-prep" element={<AssessmentPrep />} />
            <Route path="/glossary" element={<Glossary />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/keyskillshub" element={<KeySkillsHub />} />
            <Route path="/unit3-sac2-prep" element={<Unit3SAC2Prep />} />
            <Route path="/unit3-quiz" element={<Unit3Quiz />} />
            <Route path="/unit3-flashcards" element={<Unit3Flashcards />} />
            <Route path="/unit3-practice" element={<Unit3PracticeQuestions />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <ScrollToTopButton />

        <footer className="bg-surface/70 backdrop-blur border-t border-slate-600/40 text-slate-500 dark:text-slate-300 text-center p-6 shadow-top transition-colors">


          <p>&copy; {new Date().getFullYear()} VCE HHD Study Hub. All rights reserved.</p>
          <p className="text-sm mt-1">Unofficial study support. Always refer to official VCAA materials.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
