import React, { useState } from 'react';
import { ModuleTab } from './types';
import { Navbar } from './components/Navbar';
import { PhoneticsModule } from './components/PhoneticsModule';
import { SyntaxModule } from './components/SyntaxModule';
import { MorphologyModule } from './components/MorphologyModule';
import { LinguistsModule } from './components/LinguistsModule';
import { AiAssistant } from './components/AiAssistant';
import { QuizModal } from './components/QuizModal';
import { BookOpen, Sparkles, Volume2, GitFork, Puzzle, Award } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ModuleTab>('phonetics');
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [completedQuizzesCount, setCompletedQuizzesCount] = useState(0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Sticky Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenAi={() => setIsAiOpen(true)}
        completedQuizzesCount={completedQuizzesCount}
      />

      {/* Main Content View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'phonetics' && <PhoneticsModule />}
        {activeTab === 'syntax' && <SyntaxModule />}
        {activeTab === 'morphology' && <MorphologyModule />}
        {activeTab === 'linguists' && (
          <LinguistsModule onNavigateToModule={(tab) => setActiveTab(tab)} />
        )}
      </main>

      {/* Modals & AI Drawer */}
      <AiAssistant isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onCompleteQuiz={() => setCompletedQuizzesCount((c) => c + 1)}
      />

      {/* App Footer */}
      <footer className="bg-slate-900 border-t border-slate-800/80 py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
              L
            </div>
            <span className="font-bold text-slate-200">Linguistics Academy</span>
            <span>— Interactive Science of Language</span>
          </div>

          <div className="flex items-center space-x-6 text-slate-400">
            <button onClick={() => setActiveTab('phonetics')} className="hover:text-indigo-300">Phonetics</button>
            <button onClick={() => setActiveTab('syntax')} className="hover:text-indigo-300">Syntax Trees</button>
            <button onClick={() => setActiveTab('morphology')} className="hover:text-indigo-300">Morphology</button>
            <button onClick={() => setActiveTab('linguists')} className="hover:text-indigo-300">Linguists</button>
            <button onClick={() => setIsAiOpen(true)} className="hover:text-amber-300 font-bold text-indigo-300 flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask AI</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
