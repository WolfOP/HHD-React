import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Sidebar from './components/Sidebar';

const Home = lazy(() => import('./pages/HomeComponent.jsx'));
const Unit3 = lazy(() => import('./pages/Unit3Component.jsx'));
const Unit4 = lazy(() => import('./pages/Unit4Component.jsx'));
const AssessmentPrep = lazy(() => import('./pages/AssessmentPrepComponent.jsx'));
const Glossary = lazy(() => import('./pages/GlossaryComponent.jsx'));
const Unit3SAC2Prep = lazy(() => import('./components/Unit3SAC2PrepComponent.jsx'));
const Unit3Quiz = lazy(() => import('./pages/Unit3QuizComponent.jsx'));
const Unit3Flashcards = lazy(() => import('./pages/Unit3FlashcardsComponent.jsx'));
const Unit3PracticeQuestions = lazy(() => import('./pages/Unit3PracticeQuestionsComponent.jsx'));
const KeySkillsHub = lazy(() => import('./pages/key-skills-hub.jsx'));
const Progress = lazy(() => import('./pages/ProgressComponent.jsx'));
const NotFound = lazy(() => import('./pages/NotFoundComponent.jsx'));

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-900 text-white">
        <Sidebar />
        <main className="flex-1 p-4">
          <Suspense fallback={<div>Loading...</div>}>
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
          </Suspense>
        </main>
      </div>
    </Router>
  );
}
