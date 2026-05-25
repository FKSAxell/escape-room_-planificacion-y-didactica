import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Layout } from './components/Layout';
import { ChallengeOne, ChallengeTwo, ChallengeThree, ChallengeFour } from './components/Challenges';
import { MapPath } from './components/MapPath';
import { gameData } from './data/gameData';
import { FeedbackState } from './types';
import { Landmark, Medal, Play, Lightbulb, Microscope, Briefcase } from 'lucide-react';

export type ViewState = 'intro' | 'character' | 'map' | 'challenge' | 'victory';

const CHARACTERS = [
  { id: 'innovator', name: 'Docente Innovador', icon: Lightbulb, description: 'Especialista en didáctica y nuevas metodologías.' },
  { id: 'researcher', name: 'Investigador', icon: Microscope, description: 'Experto en análisis de datos y descubrimiento.' },
  { id: 'manager', name: 'Gestor Estratégico', icon: Briefcase, description: 'Líder en administración y normativas.' },
];

export default function App() {
  const [view, setView] = useState<ViewState>('intro');
  const [unlockedIndex, setUnlockedIndex] = useState(0); 
  const [activeChallengeIndex, setActiveChallengeIndex] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackState>({ status: 'idle', message: '' });
  const [character, setCharacter] = useState<string | null>(null);

  const TOTAL_CHALLENGES = 4;

  const handleSuccess = (msg: string) => {
    setFeedback({ status: 'success', message: msg });
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#22d3ee', '#8b5cf6', '#e879f9'],
      zIndex: 9999
    });
  };
  const handleError = (msg: string) => setFeedback({ status: 'error', message: msg });
  
  const triggerVictoryConfetti = () => {
    const end = Date.now() + 3.5 * 1000;
    const colors = ['#22d3ee', '#8b5cf6', '#e879f9'];

    (function frame() {
      confetti({
        particleCount: 8,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: colors,
        zIndex: 9999
      });
      confetti({
        particleCount: 8,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: colors,
        zIndex: 9999
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };
  
  const handleStartGame = () => {
    setView('character');
  };

  const handleSelectCharacter = () => {
    setView('map');
  };

  const handleSelectChallenge = (index: number) => {
    setActiveChallengeIndex(index);
    setFeedback({ status: 'idle', message: '' });
    setView('challenge');
  };

  const handleAdvanceFromFeedback = () => {
    setFeedback({ status: 'idle', message: '' });
    
    // If they were on the latest challenge, unlock the next one
    if (activeChallengeIndex === unlockedIndex) {
      if (unlockedIndex + 1 >= TOTAL_CHALLENGES) {
        setView('victory');
        triggerVictoryConfetti();
      } else {
        setUnlockedIndex(prev => prev + 1);
        setView('map');
      }
    } else {
      // Re-playing an older challenge
      setView('map');
    }
  };

  const getLayoutStepNumber = () => {
    if (view === 'intro' || view === 'character') return 0;
    if (view === 'map') return unlockedIndex + 1; // Show progress up to max unlocked
    if (view === 'challenge') return activeChallengeIndex + 1;
    if (view === 'victory') return TOTAL_CHALLENGES + 1;
    return 0;
  };

  const renderCurrentChallenge = () => {
    switch (activeChallengeIndex) {
      case 0: return <ChallengeOne onSuccess={handleSuccess} onError={handleError} />;
      case 1: return <ChallengeTwo onSuccess={handleSuccess} onError={handleError} />;
      case 2: return <ChallengeThree onSuccess={handleSuccess} onError={handleError} />;
      case 3: return <ChallengeFour onSuccess={handleSuccess} onError={handleError} />;
      default: return null;
    }
  };

  const renderContent = () => {
    switch (view) {
      case 'intro': 
        return (
          <div className="w-full max-w-2xl p-8 md:p-12 text-center bg-slate-900 border border-slate-800 shadow-2xl rounded-2xl flex flex-col items-center mx-auto my-auto mt-4 sm:mt-10 overflow-hidden relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-violet-900/20 w-full h-full rounded-full opacity-50 blur-3xl pointer-events-none" />
            <Landmark className="absolute -bottom-10 -right-10 w-64 h-64 text-violet-500 opacity-[0.05] rotate-12 pointer-events-none" />
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              transition={{ delay: 0.2 }}
              className="w-16 h-16 md:w-20 md:h-20 bg-violet-900/30 text-violet-400 border border-violet-800/50 rounded-2xl flex items-center justify-center mb-6 shrink-0 relative z-10"
            >
              <Landmark className="h-8 w-8 md:h-10 md:w-10 text-violet-400" />
            </motion.div>
            
            <h2 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tight uppercase font-sans">
               Misión: Educación Superior
            </h2>
            <div className="h-2 w-24 bg-cyan-500 mb-6 mt-2 mx-auto rounded-full shrink-0"></div>

            <p className="text-sm md:text-base text-slate-400 leading-relaxed mb-8 max-w-xl mx-auto z-10 relative">
              {gameData.narrative.introText}
            </p>
            
            <button 
              onClick={handleStartGame}
              className="relative z-10 inline-flex items-center h-[52px] md:h-[60px] gap-3 px-8 md:px-12 bg-violet-600 hover:bg-violet-500 text-white font-extrabold rounded-2xl border-b-4 border-violet-800 active:border-b-0 active:translate-y-1 transition-all uppercase tracking-widest text-sm shrink-0"
            >
              {gameData.narrative.introButton}
              <Play className="w-4 h-4 fill-current" />
            </button>
          </div>
        );

      case 'character':
        return (
          <div className="w-full max-w-4xl p-6 md:p-10 text-center bg-slate-900 border border-slate-800 shadow-2xl rounded-2xl flex flex-col items-center mx-auto my-auto mt-4 sm:mt-10 overflow-hidden relative">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tight uppercase font-sans relative z-10">
              Selecciona tu Perfil
            </h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto relative z-10">
              Elige el rol con el que te identificarás durante esta misión académica. Cada perfil representa una perspectiva única en la educación superior.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full mb-10 relative z-10">
              {CHARACTERS.map((char) => {
                const isSelected = character === char.id;
                const Icon = char.icon;
                return (
                  <motion.button
                    key={char.id}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setCharacter(char.id)}
                    className={`flex flex-col items-center p-6 rounded-2xl border transition-all relative overflow-hidden ${
                      isSelected 
                        ? 'border-violet-500 bg-violet-900/20 shadow-[0_4px_0_rgba(139,92,246,1)] md:-translate-y-1' 
                        : 'border-slate-800 border-b-[4px] bg-slate-950/50 hover:border-slate-700 hover:bg-slate-800/50'
                    }`}
                  >
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-colors ${
                      isSelected ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20' : 'bg-slate-800 text-slate-500 border border-slate-700'
                    }`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className={`font-bold text-lg mb-2 transition-colors ${isSelected ? 'text-violet-300' : 'text-slate-300'}`}>
                      {char.name}
                    </h3>
                    <p className="text-xs text-slate-500 leading-snug">
                      {char.description}
                    </p>
                  </motion.button>
                );
              })}
            </div>

            <button 
              onClick={handleSelectCharacter}
              disabled={!character}
              className="relative z-10 inline-flex items-center h-[52px] md:h-[60px] gap-3 px-8 md:px-12 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:border-slate-900 disabled:active:translate-y-0 disabled:active:border-b-4 text-white font-extrabold rounded-2xl border-b-4 border-cyan-800 active:border-b-0 active:translate-y-1 transition-all uppercase tracking-widest text-sm shrink-0"
            >
              Comenzar Misión
              <Play className="w-4 h-4 fill-current" />
            </button>
          </div>
        );
      
      case 'map':
        return <MapPath maxUnlockedIndex={unlockedIndex} onSelectChallenge={handleSelectChallenge} />;
        
      case 'challenge':
        return renderCurrentChallenge();
      
      case 'victory': 
        return (
          <div className="w-full max-w-2xl p-8 md:p-12 text-center bg-slate-900 border border-slate-800 shadow-2xl flex flex-col items-center rounded-2xl mx-auto mt-4 sm:mt-10 relative overflow-hidden">
            <div className="absolute top-0 w-full h-2 bg-cyan-500 left-0 shadow-[0_0_15px_rgba(6,182,212,0.5)] shrink-0 z-20" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-900/20 w-full h-full rounded-full opacity-50 blur-3xl pointer-events-none" />
            <Medal className="absolute -bottom-10 -right-10 w-64 h-64 text-cyan-500 opacity-[0.05] -rotate-12 pointer-events-none" />
            
            <motion.div 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }} 
              transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
              className="w-20 h-20 md:w-24 md:h-24 bg-cyan-900/30 text-cyan-400 border border-cyan-500/50 rounded-2xl flex items-center justify-center mb-6 shrink-0 relative z-10"
            >
              <Medal className="h-10 w-10 md:h-12 md:w-12 text-cyan-400" />
            </motion.div>
            
            <h2 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tight uppercase font-sans">
              {gameData.narrative.victoryTitle}
            </h2>
            <div className="h-2 w-24 bg-cyan-500 mb-6 mt-2 mx-auto rounded-full shrink-0"></div>

            <p className="text-sm md:text-base text-slate-400 leading-relaxed mb-8 max-w-xl mx-auto">
              {gameData.narrative.victoryText}
            </p>
            
            <button 
              onClick={() => {
                setView('intro');
                setUnlockedIndex(0);
                setActiveChallengeIndex(0);
                setCharacter(null);
                setFeedback({ status: 'idle', message: '' });
              }}
              className="relative z-10 inline-flex items-center h-[52px] md:h-[60px] gap-3 px-8 md:px-12 bg-violet-600 hover:bg-violet-500 text-white font-extrabold rounded-2xl border-b-4 border-violet-800 active:border-b-0 active:translate-y-1 transition-all uppercase tracking-widest text-sm shrink-0"
            >
              Volver a empezar
            </button>
            
            <div className="mt-8 md:mt-10 text-slate-500 text-[10px] md:text-xs font-medium uppercase tracking-widest border-t border-slate-800 pt-6 w-full shrink-0">
              Planificación y Didáctica en Educación Superior
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Layout 
      currentStep={getLayoutStepNumber()} 
      totalSteps={TOTAL_CHALLENGES} 
      feedback={feedback}
      onNextStep={feedback.status === 'success' ? handleAdvanceFromFeedback : undefined}
      onCloseFeedback={() => setFeedback({ status: 'idle', message: '' })}
    >
      {renderContent()}
    </Layout>
  );
}
