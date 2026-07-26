import React, { useState } from 'react';
import { LINGUISTS_DATABASE } from '../data/linguistsData';
import { LinguistProfile, ModuleTab } from '../types';
import { BookOpen, Calendar, Award, Sparkles, ArrowRight, Quote, Share2, Layers } from 'lucide-react';

interface LinguistsModuleProps {
  onNavigateToModule: (tab: ModuleTab) => void;
}

export const LinguistsModule: React.FC<LinguistsModuleProps> = ({ onNavigateToModule }) => {
  const [selectedEra, setSelectedEra] = useState<string>('All');
  const [selectedSubfield, setSelectedSubfield] = useState<string>('All');
  const [activeProfile, setActiveProfile] = useState<LinguistProfile | null>(null);

  const eras = ['All', 'Ancient', '19th Century', 'Structuralism (20th C.)', 'Generativism & Modern'];
  const subfields = ['All', 'Phonetics & Phonology', 'Syntax', 'Morphology', 'Sociolinguistics', 'Historical / Typology', 'Cognitive'];

  const filteredLinguists = LINGUISTS_DATABASE.filter((l) => {
    const matchesEra = selectedEra === 'All' || l.era === selectedEra;
    const matchesSubfield = selectedSubfield === 'All' || l.subfields.includes(selectedSubfield as any);
    return matchesEra && matchesSubfield;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-500/20 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>History & Theoretical Foundations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Historical Pioneers & Major Contributions in Linguistics
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            From Pāṇini's ancient Sanskrit grammar rules to Saussure's structuralism, Chomsky's generative theory, and Labov's sociolinguistics. Explore the theoretical evolution of language science.
          </p>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3 shadow-md">
        {/* Era Filters */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
          <span className="font-bold text-slate-400 shrink-0 mr-1">Historical Era:</span>
          {eras.map((era) => (
            <button
              key={era}
              onClick={() => setSelectedEra(era)}
              className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
                selectedEra === era
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {era}
            </button>
          ))}
        </div>

        {/* Subfield Filters */}
        <div className="flex items-center space-x-2 overflow-x-auto pt-2 border-t border-slate-800 text-xs">
          <span className="font-bold text-slate-400 shrink-0 mr-1">Subfield Focus:</span>
          {subfields.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubfield(sub)}
              className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
                selectedSubfield === sub
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Linguist Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLinguists.map((ling) => (
          <div
            key={ling.id}
            className="bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between hover:border-indigo-500/50 transition-all shadow-lg space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-2xl shadow-inner group-hover:scale-105 transition-transform">
                  {ling.avatarIcon}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {ling.name}
                  </h3>
                  <div className="flex items-center space-x-2 text-xs text-indigo-400 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{ling.years}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 pt-1">
                {ling.subfields.map((sf) => (
                  <span
                    key={sf}
                    className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-semibold border border-slate-700"
                  >
                    {sf}
                  </span>
                ))}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">{ling.shortBio}</p>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <button
                onClick={() => setActiveProfile(ling)}
                className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center space-x-1"
              >
                <span>Read Full Biography</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onNavigateToModule(ling.moduleLink)}
                className="px-2.5 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 text-[11px] font-semibold border border-indigo-500/30 transition-all"
                title={`Try ${ling.name}'s key subfield module`}
              >
                Try Interactive Module
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Deep Dive Modal */}
      {activeProfile && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-3xl shadow-inner">
                  {activeProfile.avatarIcon}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{activeProfile.name}</h2>
                  <p className="text-xs text-indigo-400 font-semibold">{activeProfile.years} • {activeProfile.era}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveProfile(null)}
                className="text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs leading-relaxed text-slate-300">
              <div>
                <h4 className="font-bold text-indigo-300 uppercase tracking-wider mb-1">Biography</h4>
                <p className="text-slate-200 text-sm leading-normal">{activeProfile.shortBio}</p>
              </div>

              {/* Famous Quote */}
              <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex items-start space-x-3 text-indigo-200 font-serif italic text-sm">
                <Quote className="w-6 h-6 text-indigo-400 shrink-0" />
                <p>"{activeProfile.famousQuote}"</p>
              </div>

              {/* Major Breakthroughs */}
              <div>
                <h4 className="font-bold text-indigo-300 uppercase tracking-wider mb-2">Major Field Breakthroughs</h4>
                <ul className="space-y-1.5 list-disc list-inside text-slate-300">
                  {activeProfile.majorBreakthroughs.map((breakthrough, idx) => (
                    <li key={idx}>{breakthrough}</li>
                  ))}
                </ul>
              </div>

              {/* Key Publications */}
              <div>
                <h4 className="font-bold text-indigo-300 uppercase tracking-wider mb-2">Key Seminal Works</h4>
                <div className="space-y-1">
                  {activeProfile.keyPublications.map((pub, idx) => (
                    <p key={idx} className="font-mono text-indigo-200">
                      📖 {pub}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
              <button
                onClick={() => {
                  const link = activeProfile.moduleLink;
                  setActiveProfile(null);
                  onNavigateToModule(link);
                }}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <span>Explore Interactive Learning Module for {activeProfile.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
