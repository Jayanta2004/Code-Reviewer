"use client";
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { VALIDATION, UI_TEXT, ERROR_MESSAGES } from '@/lib/constants';
import { reviewCode, ApiError } from '@/lib/api';

export default function Home() {
  const [codeInput, setCodeInput] = useState('');
  const [reviewResult, setReviewResult] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validateInput = (input: string): string | null => {
    if (!input.trim()) {
      return ERROR_MESSAGES.EMPTY_CODE;
    }
    if (input.length > VALIDATION.MAX_CODE_LENGTH) {
      return ERROR_MESSAGES.CODE_TOO_LONG(VALIDATION.MAX_CODE_LENGTH);
    }
    return null;
  };

  const analyzeCode = async () => {
    const validationError = validateInput(codeInput);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setIsAnalyzing(true);
    setReviewResult('');
    setErrorMessage('');

    try {
      const review = await reviewCode(codeInput);
      setReviewResult(review);
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.statusCode === 408) {
          setErrorMessage(ERROR_MESSAGES.TIMEOUT);
        } else if (err.statusCode === 503) {
          setErrorMessage(ERROR_MESSAGES.CONNECTION);
        } else {
          setErrorMessage(err.message);
        }
      } else {
        setErrorMessage(ERROR_MESSAGES.UNEXPECTED);
      }
      console.error('Review error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'Enter') {
      analyzeCode();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <div className="inline-block mb-4">
            <div className="text-6xl">🔍</div>
          </div>
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Code Review Assistant</h1>
          <p className="text-gray-300 text-lg">Get instant feedback on your code quality and security</p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-gray-200 flex items-center gap-2">
                <span className="text-lg">📝</span>
                Your Code
              </label>
              <span className="text-xs text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full">
                {codeInput.length} / {VALIDATION.MAX_CODE_LENGTH}
              </span>
            </div>
            <textarea
              className="flex-1 min-h-[500px] p-5 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm resize-none transition-all shadow-xl"
              placeholder={UI_TEXT.PLACEHOLDER}
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              onKeyDown={handleKeyPress}
              spellCheck={false}
            />
            <button
              onClick={analyzeCode}
              disabled={isAnalyzing || !codeInput.trim()}
              className="mt-5 w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed rounded-xl font-bold text-lg transition-all duration-200 shadow-2xl hover:shadow-purple-500/50 hover:scale-[1.02] active:scale-[0.98]"
            >
              {isAnalyzing ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {UI_TEXT.BUTTON_ANALYZING}
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span>✨</span>
                  {UI_TEXT.BUTTON_ANALYZE}
                </span>
              )}
            </button>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-200 mb-3 flex items-center gap-2">
              <span className="text-lg">📊</span>
              Review Results
            </label>
            <div className="flex-1 min-h-[500px] bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 overflow-y-auto shadow-xl custom-scrollbar">
              {errorMessage ? (
                <div className="bg-red-900/30 border border-red-500/50 rounded-xl p-5 backdrop-blur-sm">
                  <p className="text-red-300 font-medium flex items-start gap-2">
                    <span className="text-xl">⚠️</span>
                    <span>{errorMessage}</span>
                  </p>
                </div>
              ) : reviewResult ? (
                <div className="prose prose-invert prose-sm max-w-none">
                  <ReactMarkdown>{reviewResult}</ReactMarkdown>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <div className="text-6xl mb-4 opacity-50">💭</div>
                  <p className="text-center text-lg">
                    {isAnalyzing ? UI_TEXT.ANALYZING_STATE : UI_TEXT.EMPTY_STATE}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <footer className="mt-10 text-center text-gray-500 text-sm">
          <p>Powered by GPT-4 • Built with Next.js & Flask</p>
        </footer>
      </div>
      
      <div className="fixed bottom-4 right-4 flex gap-3">
        <a
          href="https://github.com/Jayanta2004"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-slate-800/80 backdrop-blur-sm rounded-full border border-purple-500/30 hover:border-purple-400 transition-all hover:scale-110 group"
        >
          <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
        <a
          href="https://linkedin.com/in/jayantaghosh2004"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-slate-800/80 backdrop-blur-sm rounded-full border border-purple-500/30 hover:border-purple-400 transition-all hover:scale-110 group"
        >
          <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
      </div>
    </div>
  );
}