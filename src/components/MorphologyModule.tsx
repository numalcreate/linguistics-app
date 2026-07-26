import React, { useState } from 'react';
import { MORPHEME_DATABASE, LEIPZIG_GLOSS_RULES } from '../data/morphologyData';
import { MorphemeProcess } from '../types';
import { Puzzle, Search, Filter, BookOpen, Layers, Sparkles, Check, Copy } from 'lucide-react';

export const MorphologyModule: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSubTab, setActiveSubTab] = useState<'database' | 'glossing-workbench' | 'leipzig-rules'>('database');

  // Interactive Interlinear Gloss Generator State
  const [glossWord, setGlossWord] = useState('watoto wadogo wanasoma');
  const [glossSegmentation, setGlossSegmentation] = useState('wa-toto wa-dogo wa-na-soma');
  const [glossLabels, setGlossLabels] = useState('CL2-child CL2-small CL2-PRES-read');
  const [glossTranslation, setGlossTranslation] = useState('the small children are reading');
  const [copied, setCopied] = useState(false);

  const filteredProcesses = MORPHEME_DATABASE.filter((item) => {
    const matchesSearch =
      item.processName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.language.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.exampleWord.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || item.processCategory === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Affixation', 'Reduplication', 'Ablaut / Apophony', 'Suppletion', 'Compounding', 'Infixation', 'Agglutination', 'Fusional / Cumulative'];

  const handleCopyFormattedGloss = () => {
    const text = `Word: ${glossWord}\nSegmentation: ${glossSegmentation}\nGloss: ${glossLabels}\nTranslation: "${glossTranslation}"`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-500/20 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <Puzzle className="w-3.5 h-3.5" />
            <span>Subfield: Morphology & Interlinear Glossing</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Cross-Linguistic Morphology Database & Glossing Workbench
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Explore world morphological processes (Agglutination, Infixation, Reduplication, Templatic Root/Pattern, Suppletion). Segment words and format paper-ready Leipzig Interlinear Glossing tables.
          </p>
        </div>

        {/* Sub Navigation */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-800/80 pt-4">
          <button
            onClick={() => setActiveSubTab('database')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeSubTab === 'database'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-800/70 text-slate-300 hover:bg-slate-700/60'
            }`}
          >
            Morpheme & Process Database
          </button>
          <button
            onClick={() => setActiveSubTab('glossing-workbench')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeSubTab === 'glossing-workbench'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-800/70 text-slate-300 hover:bg-slate-700/60'
            }`}
          >
            Leipzig Interlinear Gloss Generator
          </button>
          <button
            onClick={() => setActiveSubTab('leipzig-rules')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeSubTab === 'leipzig-rules'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-800/70 text-slate-300 hover:bg-slate-700/60'
            }`}
          >
            Leipzig Glossing Rules Reference
          </button>
        </div>
      </div>

      {/* Main Tab 1: Morphology Database */}
      {activeSubTab === 'database' && (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search processes, languages (e.g., Tagalog, Turkish, Swahili)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              <Filter className="w-4 h-4 text-slate-400 shrink-0 mr-1" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Database Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProcesses.map((proc) => (
              <div
                key={proc.id}
                className="bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between hover:border-indigo-500/40 transition-all shadow-lg space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">
                        {proc.processCategory}
                      </span>
                      <h3 className="text-base font-bold text-white">{proc.processName}</h3>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 text-[11px] font-semibold">
                      {proc.language}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{proc.definition}</p>

                  {/* Example Morpheme Box */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Word:</span>
                      <span className="font-bold text-amber-300">{proc.exampleWord}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Segmentation:</span>
                      <span className="text-indigo-300 font-semibold">{proc.segmentation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Gloss:</span>
                      <span className="text-emerald-300 font-semibold">{proc.gloss}</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-slate-800">
                      <span className="text-slate-400">Translation:</span>
                      <span className="text-slate-200 font-sans italic">"{proc.englishTranslation}"</span>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed border-t border-slate-800/80 pt-3 italic">
                  💡 {proc.notes}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Tab 2: Interlinear Glossing Workbench */}
      {activeSubTab === 'glossing-workbench' && (
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-white">4-Line Leipzig Interlinear Gloss Generator</h2>
              <p className="text-xs text-slate-400">
                Format academic 4-line interlinear gloss tables for papers and assignments.
              </p>
            </div>
            <button
              onClick={handleCopyFormattedGloss}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied Table!' : 'Copy Formatted Gloss'}</span>
            </button>
          </div>

          {/* Form Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Line 1: Original Language Word / Phrase</label>
              <input
                type="text"
                value={glossWord}
                onChange={(e) => setGlossWord(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-medium focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Line 2: Morpheme Segmentation (hyphenated)</label>
              <input
                type="text"
                value={glossSegmentation}
                onChange={(e) => setGlossSegmentation(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-indigo-300 font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Line 3: Leipzig Interlinear Gloss Tags</label>
              <input
                type="text"
                value={glossLabels}
                onChange={(e) => setGlossLabels(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-emerald-300 font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Line 4: Free English Translation</label>
              <input
                type="text"
                value={glossTranslation}
                onChange={(e) => setGlossTranslation(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Live Formatted Paper Output Preview */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-indigo-500/30 space-y-3 font-mono text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block font-sans">
              Paper Publication Preview (Interlinear Glossing Format):
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 pt-2 border-t border-slate-800">
              {glossSegmentation.split(' ').map((seg, idx) => {
                const tag = glossLabels.split(' ')[idx] || '';
                return (
                  <div key={idx} className="space-y-1">
                    <p className="font-bold text-amber-300">{seg}</p>
                    <p className="text-emerald-400 font-semibold">{tag}</p>
                  </div>
                );
              })}
            </div>
            <p className="text-slate-300 font-sans italic pt-3 border-t border-slate-800">
              "{glossTranslation}"
            </p>
          </div>
        </div>
      )}

      {/* Main Tab 3: Leipzig Glossing Reference */}
      {activeSubTab === 'leipzig-rules' && (
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
          <h2 className="text-base font-bold text-white mb-2">Leipzig Glossing Rules Quick Reference</h2>
          <div className="divide-y divide-slate-800 text-xs">
            {LEIPZIG_GLOSS_RULES.map((rule, idx) => (
              <div key={idx} className="py-3 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-mono font-bold text-indigo-300">{rule.code}</span>
                  <span className="font-semibold text-slate-200">{rule.name}</span>
                </div>
                <p className="text-slate-400">{rule.explanation}</p>
                <p className="text-emerald-300 font-mono text-[11px]">{rule.example}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
