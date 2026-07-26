import React, { useState } from 'react';
import { CONSONANTS, VOWELS, PLACES, MANNERS } from '../data/ipaData';
import { IPASymbol } from '../types';
import { playVowelSound, playConsonantSound } from '../utils/soundSynth';
import { Volume2, Keyboard, Info, CheckCircle, HelpCircle, Sparkles, RefreshCw } from 'lucide-react';

export const PhoneticsModule: React.FC = () => {
  const [selectedSymbol, setSelectedSymbol] = useState<IPASymbol>(CONSONANTS[0]);
  const [activeTab, setActiveTab] = useState<'consonants' | 'vowels' | 'transcriber' | 'ear-training'>('consonants');

  // Virtual Transcriber State
  const [transcriptText, setTranscriptText] = useState('');
  const [practiceWordIndex, setPracticeWordIndex] = useState(0);

  const practiceWords = [
    { word: 'think', ipa: '/θɪŋk/' },
    { word: 'church', ipa: '/tʃɜːtʃ/' },
    { word: 'singing', ipa: '/ˈsɪŋ.ɪŋ/' },
    { word: 'vision', ipa: '/ˈvɪʒ.ən/' },
    { word: 'father', ipa: '/ˈfɑː.ðər/' },
  ];

  // Ear Training State
  const [earTargetSymbol, setEarTargetSymbol] = useState<IPASymbol | null>(null);
  const [earUserGuess, setEarUserGuess] = useState<string | null>(null);
  const [earScore, setEarScore] = useState(0);

  const startEarTrainingRound = () => {
    const allSymbols = [...CONSONANTS, ...VOWELS];
    const randomSym = allSymbols[Math.floor(Math.random() * allSymbols.length)];
    setEarTargetSymbol(randomSym);
    setEarUserGuess(null);
    playSymbolAudio(randomSym);
  };

  const playSymbolAudio = (sym: IPASymbol) => {
    if (sym.category === 'vowel') {
      const f1 = sym.formants?.f1 || 500;
      const f2 = sym.formants?.f2 || 1500;
      playVowelSound(f1, f2, 0.7);
    } else {
      playConsonantSound(sym.manner || 'Fricative', !!sym.voiced, sym.place || 'Alveolar', 0.5);
    }
  };

  const handleVirtualKeyClick = (char: string) => {
    setTranscriptText((prev) => prev + char);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-500/20 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <Volume2 className="w-3.5 h-3.5" />
            <span>Subfield: Phonetics & Phonology</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            International Phonetic Alphabet (IPA) Studio
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Master human speech sounds. Explore articulatory places, manners, and acoustic formant structures with live audio synthesis, virtual transcription keyboards, and ear-training drills.
          </p>
        </div>

        {/* Inner Navigation Sub-tabs */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-800/80 pt-4">
          <button
            onClick={() => setActiveTab('consonants')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'consonants'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-800/70 text-slate-300 hover:bg-slate-700/60'
            }`}
          >
            Pulmonary Consonants Chart
          </button>
          <button
            onClick={() => setActiveTab('vowels')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'vowels'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-800/70 text-slate-300 hover:bg-slate-700/60'
            }`}
          >
            IPA Vowel Trapezoid & Formants
          </button>
          <button
            onClick={() => setActiveTab('transcriber')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'transcriber'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-800/70 text-slate-300 hover:bg-slate-700/60'
            }`}
          >
            IPA Virtual Transcriber
          </button>
          <button
            onClick={() => {
              setActiveTab('ear-training');
              if (!earTargetSymbol) startEarTrainingRound();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'ear-training'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-800/70 text-slate-300 hover:bg-slate-700/60'
            }`}
          >
            Ear Training Sandbox
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === 'consonants' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* IPA Consonants Matrix (2 columns) */}
          <div className="lg:col-span-2 bg-slate-900 p-5 rounded-2xl border border-slate-800 overflow-x-auto shadow-lg">
            <h2 className="text-base font-bold text-white mb-4 flex items-center justify-between">
              <span>IPA Pulmonary Consonants Grid</span>
              <span className="text-xs font-normal text-slate-400">Click any symbol to synthesize sound</span>
            </h2>

            <div className="min-w-[650px]">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 font-semibold">Manner \ Place</th>
                    {PLACES.slice(0, 8).map((place) => (
                      <th key={place} className="p-2 font-semibold text-center">
                        {place}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {MANNERS.slice(0, 6).map((manner) => (
                    <tr key={manner} className="hover:bg-slate-800/20">
                      <td className="p-2 font-medium text-indigo-300">{manner}</td>
                      {PLACES.slice(0, 8).map((place) => {
                        const cellSymbols = CONSONANTS.filter((c) => c.manner === manner && c.place === place);
                        const voiceless = cellSymbols.find((c) => !c.voiced);
                        const voiced = cellSymbols.find((c) => c.voiced);

                        return (
                          <td key={place} className="p-1 text-center">
                            <div className="flex items-center justify-center space-x-1">
                              {voiceless ? (
                                <button
                                  onClick={() => {
                                    setSelectedSymbol(voiceless);
                                    playSymbolAudio(voiceless);
                                  }}
                                  className={`w-7 h-7 rounded flex items-center justify-center font-serif text-sm transition-all ${
                                    selectedSymbol.symbol === voiceless.symbol
                                      ? 'bg-indigo-600 text-white font-bold ring-2 ring-indigo-400'
                                      : 'bg-slate-800/80 text-slate-200 hover:bg-indigo-500/30'
                                  }`}
                                  title={`Voiceless ${place} ${manner}`}
                                >
                                  {voiceless.symbol}
                                </button>
                              ) : (
                                <span className="w-7 text-slate-700 text-center">•</span>
                              )}

                              {voiced ? (
                                <button
                                  onClick={() => {
                                    setSelectedSymbol(voiced);
                                    playSymbolAudio(voiced);
                                  }}
                                  className={`w-7 h-7 rounded flex items-center justify-center font-serif text-sm font-bold transition-all ${
                                    selectedSymbol.symbol === voiced.symbol
                                      ? 'bg-indigo-600 text-white ring-2 ring-indigo-400'
                                      : 'bg-slate-800/80 text-indigo-300 hover:bg-indigo-500/30'
                                  }`}
                                  title={`Voiced ${place} ${manner}`}
                                >
                                  {voiced.symbol}
                                </button>
                              ) : (
                                <span className="w-7 text-slate-700 text-center">•</span>
                              )}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-[11px] text-slate-400 italic text-right">
              Note: Symbols on left are voiceless; symbols on right are voiced.
            </p>
          </div>

          {/* Selected Symbol Detail Inspector */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-indigo-500/30 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center font-serif text-3xl font-extrabold text-indigo-300 shadow-inner">
                  [{selectedSymbol.symbol}]
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedSymbol.name}</h3>
                  <p className="text-xs text-indigo-400 font-medium">IPA Unicode: U+0{selectedSymbol.symbol.charCodeAt(0).toString(16).toUpperCase()}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Place of Articulation:</span>
                <span className="font-semibold text-slate-200">{selectedSymbol.place || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Manner of Articulation:</span>
                <span className="font-semibold text-slate-200">{selectedSymbol.manner || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Voicing:</span>
                <span className={`font-semibold ${selectedSymbol.voiced ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {selectedSymbol.voiced ? 'Voiced (Vocal Folds Vibrating)' : 'Voiceless (Aspirated / Unvoiced)'}
                </span>
              </div>
            </div>

            {/* Audio Synthesis Trigger */}
            <button
              onClick={() => playSymbolAudio(selectedSymbol)}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
            >
              <Volume2 className="w-4 h-4" />
              <span>Synthesize [{selectedSymbol.symbol}] Sound</span>
            </button>

            {/* Cross-Linguistic Examples */}
            <div>
              <h4 className="text-xs font-bold text-slate-300 mb-2.5">Cross-Linguistic Word Examples:</h4>
              <div className="space-y-2">
                {selectedSymbol.examples.map((ex, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-800/70 border border-slate-700/50 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-white">{ex.word}</span>{' '}
                      <span className="text-indigo-300 font-serif">{ex.ipa}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-300 font-semibold">{ex.language}</span>
                      <p className="text-[11px] text-slate-400">"{ex.meaning}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Vowels Trapezoid & Acoustic Formants View */}
      {activeTab === 'vowels' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg">
            <h2 className="text-base font-bold text-white mb-2">IPA Vowel Quadrilateral (Formant Space)</h2>
            <p className="text-xs text-slate-400 mb-6">
              Vowels are classified by tongue height (vertical F1 axis) and backness (horizontal F2 axis). Click any vowel symbol to hear synthesized formants.
            </p>

            {/* SVG Vowel Trapezoid Diagram */}
            <div className="relative w-full max-w-xl mx-auto h-80 bg-slate-950/80 rounded-xl border border-indigo-500/20 p-4">
              <svg className="w-full h-full text-slate-700" viewBox="0 0 500 300">
                {/* Trapezoid boundary lines */}
                <polygon points="50,40 450,40 380,260 50,260" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                {/* Mid lines */}
                <line x1="50" y1="110" x2="425" y2="110" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="50" y1="180" x2="400" y2="180" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="250" y1="40" x2="215" y2="260" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />

                {/* Axes labels */}
                <text x="20" y="30" fill="#94a3b8" fontSize="11" fontWeight="bold">Close (Low F1)</text>
                <text x="20" y="280" fill="#94a3b8" fontSize="11" fontWeight="bold">Open (High F1)</text>
                <text x="50" y="20" fill="#818cf8" fontSize="11" fontWeight="bold">Front (High F2)</text>
                <text x="400" y="20" fill="#818cf8" fontSize="11" fontWeight="bold">Back (Low F2)</text>
              </svg>

              {/* Position Vowel Symbols over SVG */}
              {VOWELS.map((vowel) => {
                // Map height/backness to % position
                let top = 50;
                let left = 50;

                if (vowel.height === 'Close') top = 12;
                else if (vowel.height === 'Near-Close') top = 25;
                else if (vowel.height === 'Close-Mid') top = 38;
                else if (vowel.height === 'Mid') top = 50;
                else if (vowel.height === 'Open-Mid') top = 65;
                else if (vowel.height === 'Near-Open') top = 78;
                else if (vowel.height === 'Open') top = 88;

                if (vowel.backness === 'Front') left = 12;
                else if (vowel.backness === 'Central') left = 50;
                else if (vowel.backness === 'Back') left = 85;

                return (
                  <button
                    key={vowel.symbol}
                    onClick={() => {
                      setSelectedSymbol(vowel);
                      playSymbolAudio(vowel);
                    }}
                    style={{ top: `${top}%`, left: `${left}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center font-serif text-sm font-bold transition-all shadow-md ${
                      selectedSymbol.symbol === vowel.symbol
                        ? 'bg-indigo-600 text-white ring-4 ring-indigo-400 scale-125 z-10'
                        : 'bg-slate-800 text-indigo-200 border border-indigo-500/40 hover:bg-indigo-500 hover:text-white'
                    }`}
                    title={`${vowel.name} (F1:${vowel.formants?.f1}Hz, F2:${vowel.formants?.f2}Hz)`}
                  >
                    {vowel.symbol}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Acoustic Formants Inspector */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-indigo-500/30 shadow-xl space-y-5">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Acoustic Formant Spectrum</span>
            </h3>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Vowel Symbol:</span>
                <span className="font-serif text-base font-bold text-indigo-300">[{selectedSymbol.symbol}]</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">First Formant (F1 - Tongue Height):</span>
                <span className="font-mono font-bold text-amber-400">{selectedSymbol.formants?.f1 || '---'} Hz</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Second Formant (F2 - Tongue Backness):</span>
                <span className="font-mono font-bold text-indigo-400">{selectedSymbol.formants?.f2 || '---'} Hz</span>
              </div>
            </div>

            <button
              onClick={() => playSymbolAudio(selectedSymbol)}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg transition-all"
            >
              <Volume2 className="w-4 h-4" />
              <span>Synthesize Vowel Formants</span>
            </button>
          </div>
        </div>
      )}

      {/* IPA Virtual Transcriber Keyboard */}
      {activeTab === 'transcriber' && (
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center space-x-2">
              <Keyboard className="w-5 h-5 text-indigo-400" />
              <span>IPA Virtual Transcriber Keyboard</span>
            </h2>
            <button
              onClick={() => setTranscriptText('')}
              className="text-xs text-slate-400 hover:text-rose-400 flex items-center space-x-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>

          {/* Practice Prompt Box */}
          <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs text-indigo-300 font-semibold uppercase tracking-wider">Practice Exercise #{practiceWordIndex + 1}:</span>
              <p className="text-lg font-bold text-white mt-0.5">
                Transcribe the English word: <span className="text-amber-300">"{practiceWords[practiceWordIndex].word}"</span>
              </p>
            </div>
            <button
              onClick={() => setPracticeWordIndex((prev) => (prev + 1) % practiceWords.length)}
              className="px-3 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 text-xs font-semibold border border-indigo-500/40"
            >
              Next Word
            </button>
          </div>

          {/* Transcript Display Input */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-300">Your IPA Transcription Input:</label>
            <div className="flex items-center space-x-2">
              <div className="flex-1 p-3 rounded-xl bg-slate-950 border border-slate-700 font-serif text-xl text-indigo-200 tracking-wider font-bold shadow-inner min-h-[52px] flex items-center">
                /{transcriptText}/
              </div>
              {transcriptText === practiceWords[practiceWordIndex].ipa.replace(/\//g, '') && (
                <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-xl flex items-center space-x-1 text-xs font-bold">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span>Correct!</span>
                </div>
              )}
            </div>
            <p className="text-[11px] text-slate-400">Target Answer: <code className="font-serif text-indigo-300 font-bold">{practiceWords[practiceWordIndex].ipa}</code></p>
          </div>

          {/* Virtual IPA Keyboard Grid */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <span className="text-xs font-semibold text-slate-400">Quick IPA Symbol Keys:</span>
            <div className="grid grid-cols-8 sm:grid-cols-12 gap-1.5">
              {['θ', 'ð', 'ʃ', 'ʒ', 'tʃ', 'dʒ', 'ŋ', 'ɲ', 'ʔ', 'x', 'ʁ', 'i', 'ɪ', 'e', 'ɛ', 'æ', 'a', 'ə', 'ʌ', 'u', 'ʊ', 'o', 'ɔ', 'ɑ'].map((char) => (
                <button
                  key={char}
                  onClick={() => handleVirtualKeyClick(char)}
                  className="py-2.5 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-100 hover:text-white font-serif font-bold text-base transition-all active:scale-95 border border-slate-700/60 shadow-sm"
                >
                  {char}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Ear Training Sandbox */}
      {activeTab === 'ear-training' && (
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6 max-w-2xl mx-auto text-center">
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white">Phonetic Ear Training Drill</h2>
            <p className="text-xs text-slate-400">
              Listen to the synthesized phone and identify the correct IPA symbol from the choices below.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-4">
            <button
              onClick={() => earTargetSymbol && playSymbolAudio(earTargetSymbol)}
              className="mx-auto w-20 h-20 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 transition-all transform hover:scale-105 active:scale-95"
            >
              <Volume2 className="w-8 h-8" />
            </button>
            <p className="text-xs text-indigo-300 font-medium">Click button to re-play phone audio</p>
          </div>

          {/* Answer choices */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[...CONSONANTS, ...VOWELS].slice(0, 8).map((sym) => {
              const isSelected = earUserGuess === sym.symbol;
              const isCorrect = earTargetSymbol?.symbol === sym.symbol;

              return (
                <button
                  key={sym.symbol}
                  onClick={() => {
                    setEarUserGuess(sym.symbol);
                    if (isCorrect) setEarScore((s) => s + 1);
                  }}
                  className={`p-4 rounded-xl border text-xl font-serif font-bold transition-all ${
                    earUserGuess
                      ? isCorrect
                        ? 'bg-emerald-600/30 border-emerald-500 text-emerald-200'
                        : isSelected
                        ? 'bg-rose-600/30 border-rose-500 text-rose-200'
                        : 'bg-slate-800/50 border-slate-700/50 text-slate-400'
                      : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-indigo-600 hover:border-indigo-500 hover:text-white'
                  }`}
                >
                  [{sym.symbol}]
                </button>
              );
            })}
          </div>

          {earUserGuess && (
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-3">
              <p className="text-sm font-bold text-white">
                {earUserGuess === earTargetSymbol?.symbol ? '🎉 Correct Identification!' : `❌ Incorrect. Target was [${earTargetSymbol?.symbol}] (${earTargetSymbol?.name})`}
              </p>
              <button
                onClick={startEarTrainingRound}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-md"
              >
                Next Audio Challenge
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
