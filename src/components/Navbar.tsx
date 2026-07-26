import React from 'react';
import { ModuleTab } from '../types';
import { Volume2, GitFork, Puzzle, BookOpen, Bot, Award, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: ModuleTab;
  setActiveTab: (tab: ModuleTab) => void;
  onOpenQuiz: () => void;
  onOpenAi: () => void;
  completedQuizzesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenQuiz,
  onOpenAi,
  completedQuizzesCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('phonetics')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20">
              IPA
            </div>
            <div>
              <span className="text-lg font-bold bg-gradient-to-r from-indigo-300 via-purple-200 to-pink-300 bg-clip-text text-transparent">
                Linguistics Academy
              </span>
              <span className="hidden sm:block text-xs text-slate-400 font-medium">
                Interactive Science of Human Language
              </span>
            </div>
          </div>

          {/* Module Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60">
            <button
              onClick={() => setActiveTab('phonetics')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'phonetics'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span>Phonetics</span>
            </button>

            <button
              onClick={() => setActiveTab('syntax')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'syntax'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <GitFork className="w-4 h-4" />
              <span>Syntax Trees</span>
            </button>

            <button
              onClick={() => setActiveTab('morphology')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'morphology'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Puzzle className="w-4 h-4" />
              <span>Morphology</span>
            </button>

            <button
              onClick={() => setActiveTab('linguists')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'linguists'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Linguists & History</span>
            </button>
          </nav>

          {/* Action Buttons: Quiz & Gemini AI Assistant */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenQuiz}
              className="relative flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 text-xs font-semibold transition-all"
              title="Practice Linguistics Exercises & Quizzes"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Quizzes</span>
              {completedQuizzesCount > 0 && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px]">
                  {completedQuizzesCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenAi}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-500/20 transition-all border border-purple-400/30"
              title="AI Linguistics Assistant (Gemini)"
            >
              <Sparkles className="w-4 h-4 animate-pulse text-amber-300" />
              <span>AI Linguist</span>
            </button>
          </div>
        </div>

        {/* Mobile Tab Bar */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('phonetics')}
            className={`flex flex-col items-center py-1 px-2 ${
              activeTab === 'phonetics' ? 'text-indigo-400 font-bold' : 'text-slate-400'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span>Phonetics</span>
          </button>
          <button
            onClick={() => setActiveTab('syntax')}
            className={`flex flex-col items-center py-1 px-2 ${
              activeTab === 'syntax' ? 'text-indigo-400 font-bold' : 'text-slate-400'
            }`}
          >
            <GitFork className="w-4 h-4" />
            <span>Syntax</span>
          </button>
          <button
            onClick={() => setActiveTab('morphology')}
            className={`flex flex-col items-center py-1 px-2 ${
              activeTab === 'morphology' ? 'text-indigo-400 font-bold' : 'text-slate-400'
            }`}
          >
            <Puzzle className="w-4 h-4" />
            <span>Morphology</span>
          </button>
          <button
            onClick={() => setActiveTab('linguists')}
            className={`flex flex-col items-center py-1 px-2 ${
              activeTab === 'linguists' ? 'text-indigo-400 font-bold' : 'text-slate-400'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>History</span>
          </button>
        </div>
      </div>
    </header>
  );
};
