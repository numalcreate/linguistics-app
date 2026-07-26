import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, RefreshCw, X, HelpCircle, BookOpen } from 'lucide-react';

interface AiAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const AiAssistant: React.FC<AiAssistantProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Hello! I am your AI Linguistics Professor powered by Gemini. Ask me about Phonetic IPA transcriptions, Syntax Tree structures, Leipzig Morpheme Glossing, or the history of linguistics!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const samplePrompts = [
    'Explain the difference between a Phoneme and an Allophone with examples.',
    'How does X-Bar Theory handle Complementizer Phrases (CP)?',
    'What is split ergativity in morphology?',
    'Why is Pirahã controversial in Generative Syntax?',
  ];

  const handleSendMessage = async (promptText?: string) => {
    const textToSend = promptText || inputPrompt;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: textToSend }),
      });
      const data = await res.json();

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.text || 'I apologize, I could not complete the linguistic analysis at this moment.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: 'Sorry, I encountered an error connecting to the AI Linguistics service.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-lg bg-slate-900 border-l border-indigo-500/30 h-full flex flex-col justify-between p-6 shadow-2xl animate-slideLeft">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">AI Linguistics Professor</h2>
              <p className="text-xs text-indigo-300 font-medium">Powered by Gemini AI Studio</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto my-4 space-y-4 pr-1">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-2.5 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-purple-600/30 border border-purple-500/40 text-purple-300'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[82%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white font-medium rounded-tr-none'
                    : 'bg-slate-800 border border-slate-700/60 text-slate-200 rounded-tl-none space-y-2'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
                <span className="block text-[10px] text-slate-400 text-right">{msg.timestamp}</span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center space-x-2 text-xs text-indigo-300 italic">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-400" />
              <span>Analyzing linguistic structure...</span>
            </div>
          )}
        </div>

        {/* Quick Sample Prompts */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <span className="text-[11px] font-semibold text-slate-400">Sample Student Questions:</span>
          <div className="flex flex-wrap gap-1.5">
            {samplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-indigo-600/30 text-indigo-200 border border-slate-700/60 transition-all text-left line-clamp-1"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Box */}
        <div className="mt-3 flex items-center space-x-2">
          <input
            type="text"
            placeholder="Ask anything about linguistics..."
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={isLoading || !inputPrompt.trim()}
            className="p-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-md transition-all disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
