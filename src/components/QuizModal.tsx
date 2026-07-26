import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { Award, CheckCircle, XCircle, ArrowRight, RefreshCw, X } from 'lucide-react';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteQuiz: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, onCompleteQuiz }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  if (!isOpen) return null;

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === currentQ.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setQuizFinished(true);
      onCompleteQuiz();
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {!quizFinished ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-bold text-white uppercase tracking-wider">
                  Linguistics Practice Quiz ({currentIdx + 1}/{QUIZ_QUESTIONS.length})
                </span>
              </div>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                Subfield: {currentQ.module}
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-white">{currentQ.title}</h3>
              <p className="text-sm text-slate-200 leading-relaxed font-medium">{currentQ.prompt}</p>
            </div>

            {/* Multiple Choice Options */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt, idx) => {
                const isChosen = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;

                let btnStyle = 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-800';

                if (isSubmitted) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-600/30 border-emerald-500 text-emerald-200 font-bold';
                  } else if (isChosen) {
                    btnStyle = 'bg-rose-600/30 border-rose-500 text-rose-200';
                  } else {
                    btnStyle = 'bg-slate-800/40 border-slate-800 text-slate-500';
                  }
                } else if (isChosen) {
                  btnStyle = 'bg-indigo-600/30 border-indigo-500 text-white font-bold ring-2 ring-indigo-400';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isSubmitted && isCorrect && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
                    {isSubmitted && isChosen && !isCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Immediate Explanation Feedback */}
            {isSubmitted && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs leading-relaxed text-slate-300 animate-fadeIn">
                <span className="font-bold text-indigo-300 uppercase tracking-wider block">Linguistic Explanation:</span>
                <p>{currentQ.explanation}</p>
              </div>
            )}

            {/* Bottom Controls */}
            <div className="pt-4 border-t border-slate-800 flex justify-end">
              {!isSubmitted ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedOption === null}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg transition-all disabled:opacity-50"
                >
                  Confirm Answer
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg transition-all flex items-center space-x-2"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Finished Screen */
          <div className="text-center space-y-5 py-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-xl">
              <Award className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-white">Linguistics Quiz Completed!</h2>
            <p className="text-sm text-slate-300">
              Your Score: <span className="text-amber-400 font-bold text-lg">{score}</span> / {QUIZ_QUESTIONS.length}
            </p>
            <div className="pt-4 flex justify-center space-x-3">
              <button
                onClick={handleRestartQuiz}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center space-x-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-lg"
              >
                Return to Academy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
