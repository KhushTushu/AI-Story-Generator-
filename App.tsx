
import React, { useState, useCallback, useMemo } from 'react';
import { generateStory } from './services/geminiService';
import { GeneratedStory, StoryTone } from './types';
import Particles from './components/Particles';
import TypewriterText from './components/TypewriterText';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [story, setStory] = useState<GeneratedStory | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setError(null);
    setStory(null);
    try {
      const result = await generateStory(prompt);
      setStory(result);
    } catch (err) {
      console.error(err);
      setError("The cosmos failed to respond. Please try again later.");
    } finally {
      setIsGenerating(false);
    }
  };

  const getThemeClasses = useMemo(() => {
    if (!story) return 'bg-zinc-950 text-zinc-100';
    switch (story.tone) {
      case StoryTone.HAPPY:
        return 'bg-amber-100 text-amber-950';
      case StoryTone.SAD:
        return 'bg-blue-200 text-blue-950';
      case StoryTone.INTENSE:
        return 'bg-red-950 text-red-50';
      case StoryTone.MYSTERIOUS:
        return 'bg-slate-900 text-slate-100';
      case StoryTone.CALM:
        return 'bg-teal-100 text-teal-950';
      case StoryTone.HOPEFUL:
        return 'bg-rose-100 text-rose-950';
      default:
        return 'bg-zinc-900 text-zinc-100';
    }
  }, [story]);

  const getInputThemeClasses = useMemo(() => {
    if (!story) return 'bg-white/5 border-white/10 focus:border-white/30 text-white';
    switch (story.tone) {
      case StoryTone.INTENSE:
      case StoryTone.MYSTERIOUS:
        return 'bg-white/5 border-white/10 focus:border-white/30 text-white';
      default:
        return 'bg-black/5 border-black/10 focus:border-black/30 text-black';
    }
  }, [story]);

  return (
    <div className={`min-h-screen transition-all duration-1000 flex flex-col items-center p-6 md:p-12 relative ${getThemeClasses}`}>
      <Particles />
      
      {/* Header */}
      <header className="w-full max-w-4xl flex flex-col items-center mb-12 z-10 text-center">
        <h1 className="serif text-4xl md:text-6xl font-bold tracking-tight mb-4 opacity-90">
          Aetheria
        </h1>
        <p className="text-sm md:text-base font-light tracking-widest uppercase opacity-60">
          Where your thoughts become destiny
        </p>
      </header>

      {/* Main Story Canvas */}
      <main className="w-full max-w-4xl flex-grow z-10 flex flex-col justify-center">
        {isGenerating && (
          <div className="flex flex-col items-center justify-center space-y-4 animate-pulse">
            <div className="w-12 h-12 border-4 border-current border-t-transparent rounded-full animate-spin"></div>
            <p className="serif italic text-lg opacity-70">Whispering to the fates...</p>
          </div>
        )}

        {error && (
          <div className="text-center p-8 border border-red-500/30 bg-red-500/10 rounded-lg">
            <p className="text-red-400">{error}</p>
            <button 
              onClick={() => setError(null)}
              className="mt-4 px-4 py-2 text-sm border border-red-500/30 rounded hover:bg-red-500/20 transition-colors"
            >
              Clear
            </button>
          </div>
        )}

        {story && !isGenerating && (
          <article className="space-y-8 animate-in fade-in duration-1000">
            <h2 className="serif text-3xl md:text-5xl text-center leading-tight mb-8">
              {story.title}
            </h2>
            <div className="max-w-2xl mx-auto">
              <TypewriterText text={story.content} speed={25} />
            </div>
          </article>
        )}

        {!story && !isGenerating && !error && (
          <div className="text-center py-20 opacity-40">
            <p className="serif italic text-xl">Enter a fragment of a dream to begin the narrative...</p>
          </div>
        )}
      </main>

      {/* Interaction Controls */}
      <footer className="w-full max-w-3xl mt-12 z-20 pb-10">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            placeholder="Type your story spark... (e.g. 'A lighthouse at the end of time')"
            className={`flex-grow px-6 py-4 rounded-full outline-none transition-all duration-500 border ${getInputThemeClasses}`}
          />
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className={`px-8 py-4 rounded-full font-medium tracking-wide transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2
              ${story ? 
                (story.tone === StoryTone.INTENSE || story.tone === StoryTone.MYSTERIOUS ? 
                  'bg-white text-black hover:bg-zinc-200' : 
                  'bg-black text-white hover:bg-zinc-800') : 
                'bg-zinc-100 text-zinc-950 hover:bg-white shadow-lg'
              }`}
          >
            {isGenerating ? 'Weaving...' : 'Manifest Story'}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </button>
        </div>
        
        {story && (
          <div className="mt-4 flex justify-center gap-4 opacity-60 text-xs tracking-widest uppercase">
            <span>Tone: {story.tone}</span>
            <span className="cursor-pointer hover:underline" onClick={() => {setStory(null); setPrompt('');}}>Clear Canvas</span>
          </div>
        )}
      </footer>

      {/* Aesthetic Overlay */}
      <div className="fixed inset-0 pointer-events-none border-[20px] md:border-[40px] border-black/5 mix-blend-overlay z-50"></div>
    </div>
  );
};

export default App;
