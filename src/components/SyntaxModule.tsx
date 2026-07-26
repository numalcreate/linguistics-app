import React, { useState, useEffect, useRef } from 'react';
import { SYNTAX_EXAMPLES } from '../data/syntaxData';
import { SyntaxNode, SyntaxExample } from '../types';
import { parseBracketNotation, nodeToBracketNotation, sentenceToBaselineTree } from '../utils/syntaxParser';
import { GitFork, Sparkles, ZoomIn, ZoomOut, RefreshCw, Layers, Edit3, HelpCircle, ArrowRight, Eye } from 'lucide-react';

export const SyntaxModule: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<SyntaxExample>(SYNTAX_EXAMPLES[0]);
  const [bracketInput, setBracketInput] = useState(SYNTAX_EXAMPLES[0].bracketNotation);
  const [customSentence, setCustomSentence] = useState('');
  const [treeRoot, setTreeRoot] = useState<SyntaxNode | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Structural Ambiguity Dual View
  const [ambiguityMode, setAmbiguityMode] = useState(false);

  // SVG Zoom / Pan State
  const [zoomLevel, setZoomLevel] = useState(1);

  // Re-parse tree whenever bracketInput changes
  useEffect(() => {
    try {
      const parsed = parseBracketNotation(bracketInput);
      if (parsed) {
        setTreeRoot(parsed);
        setParseError(null);
      } else {
        setParseError('Invalid bracket notation. Make sure brackets match: [Category Word]');
      }
    } catch (e: any) {
      setParseError('Bracket parsing error');
    }
  }, [bracketInput]);

  const handleSelectExample = (ex: SyntaxExample) => {
    setSelectedExample(ex);
    setBracketInput(ex.bracketNotation);
    if (ex.category === 'Ambiguity') {
      setAmbiguityMode(true);
    } else {
      setAmbiguityMode(false);
    }
  };

  // Auto-parse custom sentence using Gemini API
  const handleAiParseSentence = async () => {
    if (!customSentence.trim()) return;
    setIsAiLoading(true);
    setParseError(null);

    try {
      const res = await fetch('/api/gemini/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sentence: customSentence }),
      });
      const data = await res.json();
      if (data.bracketSyntax) {
        setBracketInput(data.bracketSyntax);
      } else {
        // Fallback to baseline rule-based parser
        const fallback = sentenceToBaselineTree(customSentence);
        setBracketInput(nodeToBracketNotation(fallback));
      }
    } catch (err) {
      const fallback = sentenceToBaselineTree(customSentence);
      setBracketInput(nodeToBracketNotation(fallback));
    } finally {
      setIsAiLoading(false);
    }
  };

  // Render SVG Tree Recursive Component
  const renderSvgTree = (node: SyntaxNode, x: number, y: number, levelWidth: number): React.ReactNode => {
    const nodeRadius = 18;
    const verticalGap = 70;
    const children = node.children || [];

    return (
      <g key={node.id}>
        {/* Render child connection lines */}
        {children.map((child, idx) => {
          const childX = x - levelWidth / 2 + (idx + 0.5) * (levelWidth / children.length);
          const childY = y + verticalGap;

          return (
            <g key={`edge_${node.id}_${child.id}`}>
              <line
                x1={x}
                y1={y + 12}
                x2={childX}
                y2={childY - 12}
                stroke="#6366f1"
                strokeWidth="2"
                strokeDasharray={child.category === 'trace' ? '4 4' : 'none'}
              />
              {renderSvgTree(child, childX, childY, levelWidth / children.length)}
            </g>
          );
        })}

        {/* Node Circle */}
        <circle
          cx={x}
          cy={y}
          r={nodeRadius}
          fill={node.text ? '#1e1b4b' : '#312e81'}
          stroke="#818cf8"
          strokeWidth="2"
          className="cursor-pointer hover:fill-indigo-600 transition-colors"
        />

        {/* Category Label (NP, VP, Det, etc.) */}
        <text
          x={x}
          y={y + 4}
          fill="#ffffff"
          fontSize="11"
          fontWeight="bold"
          textAnchor="middle"
          pointerEvents="none"
        >
          {node.label}
        </text>

        {/* Terminal Word Text (e.g., "cat") */}
        {node.text && (
          <text
            x={x}
            y={y + 36}
            fill="#38bdf8"
            fontSize="13"
            fontWeight="bold"
            fontStyle="italic"
            textAnchor="middle"
          >
            "{node.text}"
          </text>
        )}
      </g>
    );
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-500/20 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <GitFork className="w-3.5 h-3.5" />
            <span>Subfield: Syntax & Constituent Analysis</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Interactive Syntax Tree Studio & Visualizer
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Construct and analyze phrase structures (X-Bar Theory, TP/DP projections, Complementizer embedding, and Structural Ambiguities). Edit bracket notation or parse any sentence using AI.
          </p>
        </div>
      </div>

      {/* Control Panel & Sentence Parser Input */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Preset Selector & AI Sentence Input */}
        <div className="lg:col-span-1 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-5 shadow-lg">
          <div>
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Pre-loaded Classic Examples</h3>
            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {SYNTAX_EXAMPLES.map((ex) => (
                <button
                  key={ex.id}
                  onClick={() => handleSelectExample(ex)}
                  className={`w-full text-left p-3 rounded-xl border transition-all text-xs ${
                    selectedExample.id === ex.id
                      ? 'bg-indigo-600/30 border-indigo-500 text-white font-bold'
                      : 'bg-slate-800/60 border-slate-700/50 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-indigo-200">{ex.title}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-300 font-semibold">{ex.category}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{ex.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* AI Custom Sentence Input Box */}
          <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 space-y-3">
            <label className="text-xs font-bold text-indigo-300 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>AI Sentence Tree Parser (Gemini)</span>
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="e.g., She believed that John ate the apple..."
                value={customSentence}
                onChange={(e) => setCustomSentence(e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={handleAiParseSentence}
                disabled={isAiLoading || !customSentence.trim()}
                className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg shadow-md transition-all disabled:opacity-50 flex items-center space-x-1"
              >
                {isAiLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <span>Parse</span>}
              </button>
            </div>
          </div>

          {/* Bracket Editor Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
              <span>Bracket Notation Editor</span>
              <span className="text-[10px] text-slate-400 font-mono">[S [NP ...]]</span>
            </label>
            <textarea
              rows={4}
              value={bracketInput}
              onChange={(e) => setBracketInput(e.target.value)}
              className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl font-mono text-xs text-indigo-200 focus:outline-none focus:border-indigo-500 leading-relaxed shadow-inner"
            />
            {parseError && <p className="text-xs text-rose-400 font-semibold">{parseError}</p>}
          </div>
        </div>

        {/* Tree Display Stage (2 columns) */}
        <div className="lg:col-span-2 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div>
                <h2 className="text-base font-bold text-white">{selectedExample.title}</h2>
                <p className="text-xs text-slate-400">{selectedExample.description}</p>
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setZoomLevel((z) => Math.min(2, z + 0.15))}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomLevel((z) => Math.max(0.5, z - 0.15))}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomLevel(1)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-bold"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* SVG Interactive Canvas */}
            <div className="w-full h-[400px] bg-slate-950 rounded-xl border border-slate-800 overflow-auto flex items-center justify-center p-6 relative shadow-inner">
              {treeRoot ? (
                <svg
                  style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
                  className="w-full h-full transition-transform duration-200"
                  viewBox="0 0 700 380"
                >
                  {renderSvgTree(treeRoot, 350, 40, 580)}
                </svg>
              ) : (
                <p className="text-xs text-slate-500">No valid tree to display.</p>
              )}
            </div>
          </div>

          {/* Syntactic Analysis & X-Bar Explanation Note */}
          <div className="mt-4 p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs leading-relaxed text-slate-300">
            <span className="font-bold text-indigo-300 uppercase tracking-wider block mb-1">Theoretical Syntactic Analysis:</span>
            {selectedExample.explanation}
          </div>
        </div>
      </div>

      {/* Structural Ambiguity Comparative Panel */}
      {ambiguityMode && (
        <div className="bg-slate-900 p-6 rounded-2xl border border-indigo-500/30 shadow-xl space-y-4">
          <div className="flex items-center space-x-2 text-amber-300 font-bold text-sm">
            <Eye className="w-5 h-5" />
            <span>Structural Ambiguity Comparison: High vs Low Attachment</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-indigo-300">Option A: VP Attachment (Instrument Meaning)</span>
              <p className="text-slate-400">The Prepositional Phrase [PP with telescope] attaches under VP. The telescope is the tool used for seeing.</p>
              <code className="block p-2 bg-slate-900 rounded font-mono text-indigo-200">[VP saw [NP the man] [PP with telescope]]</code>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-indigo-300">Option B: NP Attachment (Possession Meaning)</span>
              <p className="text-slate-400">The Prepositional Phrase [PP with telescope] attaches inside the NP object. The man possesses the telescope.</p>
              <code className="block p-2 bg-slate-900 rounded font-mono text-indigo-200">[VP saw [NP the man [PP with telescope]]]</code>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
