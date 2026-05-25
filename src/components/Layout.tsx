import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Landmark, CheckCircle, Target } from 'lucide-react';
import { FeedbackState } from '../types';

interface LayoutProps {
  currentStep: number;
  totalSteps: number;
  children: ReactNode;
  feedback: FeedbackState;
  onNextStep?: () => void;
  onCloseFeedback?: () => void;
}

export function Layout({ currentStep, totalSteps, children, feedback, onNextStep, onCloseFeedback }: LayoutProps) {
  // Calculate progress percentage, where 0 is intro, 5 is victory
  let progress = 0;
  if (currentStep > 0 && currentStep <= totalSteps) {
    progress = ((currentStep - 1) / totalSteps) * 100;
  } else if (currentStep > totalSteps) {
    progress = 100;
  }

  return (
    <div className="h-screen w-full overflow-hidden bg-slate-950 flex items-center justify-center p-0 sm:p-4 md:p-6 lg:p-8 font-sans text-slate-200">
      {/* Genially-style Slide Container */}
      <div className="w-full h-full max-w-[1600px] sm:max-h-[95vh] bg-slate-900 rounded-none sm:rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col relative sm:border border-slate-800">
        
        {/* Header Area */}
        <header className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex justify-between items-center z-20 shrink-0">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-violet-900/30 border border-violet-800/50 rounded-xl flex items-center justify-center text-violet-400 shrink-0">
              <Landmark className="w-6 h-6 md:w-7 md:h-7" />
            </div>
            <div>
              <h1 className="text-base md:text-lg font-extrabold tracking-tight text-white uppercase font-sans">
                Escape Room: Mapa Maestro
              </h1>
              <p className="text-[10px] md:text-xs text-violet-400 font-bold tracking-widest uppercase mt-0.5">
                Unidad 1: Contextualización de la ES
              </p>
            </div>
          </div>

          {currentStep > 0 && currentStep <= totalSteps && (
            <div className="flex flex-col items-end gap-1.5 hidden sm:flex">
              <div className="flex gap-1.5">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <div key={i} className={`w-8 md:w-10 h-2.5 rounded-full transition-colors duration-500 ${i < currentStep ? 'bg-indigo-500' : 'bg-slate-200'}`} />
                ))}
              </div>
              <span className="text-[9px] md:text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                Progreso: {Math.round(progress)}% — Cámara {currentStep}
              </span>
            </div>
          )}
        </header>

        {/* Main Content Area */}
        <main className="flex-1 relative overflow-y-auto overflow-x-hidden bg-slate-950">
          <div className="absolute inset-0 pattern-dots pattern-slate-800 pattern-bg-transparent pattern-size-4 opacity-70 pointer-events-none" />
          
          <div className="w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
            <div className="w-full max-w-5xl relative z-10 w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="w-full"
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </main>

        {/* Persistent Feedback Floating Modal/Banner */}
        <AnimatePresence>
          {feedback.status !== 'idle' && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="absolute bottom-12 left-0 right-0 z-50 px-4 md:px-12 flex justify-center pointer-events-none"
            >
              <div className={`p-5 md:p-6 rounded-3xl border-b-4 flex flex-col md:flex-row items-center gap-4 md:gap-6 justify-between shadow-2xl w-full max-w-3xl pointer-events-auto bg-white/95 backdrop-blur-sm ${
                feedback.status === 'success' 
                  ? 'border-indigo-500/20 text-indigo-800' 
                  : 'border-red-500/20 text-red-800'
              }`}>
                <div className="flex items-center gap-4 md:gap-5 text-center md:text-left">
                  {feedback.status === 'success' ? (
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 border border-indigo-300 shadow-sm">
                      <CheckCircle className="w-6 h-6 md:w-7 md:h-7 text-indigo-600" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-red-100 flex items-center justify-center shrink-0 border border-red-300 shadow-sm">
                      <Target className="w-6 h-6 md:w-7 md:h-7 text-red-600" />
                    </div>
                  )}
                  <p className="font-semibold text-sm md:text-lg leading-snug max-w-xl">{feedback.message}</p>
                </div>

                {feedback.status === 'success' && onNextStep && (
                  <button
                    onClick={onNextStep}
                    className="whitespace-nowrap px-8 py-3 md:px-10 md:py-4 bg-indigo-500 hover:bg-indigo-400 text-white font-extrabold rounded-2xl border-b-4 border-indigo-600 active:border-b-0 active:translate-y-1 transition-all uppercase tracking-widest text-sm shrink-0"
                  >
                    Continuar
                  </button>
                )}
                {feedback.status === 'error' && onCloseFeedback && (
                  <button
                    onClick={onCloseFeedback}
                    className="whitespace-nowrap px-8 py-3 md:px-10 md:py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold rounded-2xl border-b-4 border-slate-300 active:border-b-0 active:translate-y-1 transition-all uppercase tracking-widest text-sm shrink-0"
                  >
                    Reintentar
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Status Bar */}
        <footer className="bg-white border-t border-slate-200 px-6 py-2 flex justify-between items-center z-20 shrink-0">
          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.5)]"></div>
              <span className="text-[9px] md:text-[10px] text-slate-500 font-semibold uppercase tracking-widest hidden sm:inline-block">Servidor Académico Online</span>
              <span className="text-[9px] md:text-[10px] text-slate-500 font-semibold uppercase tracking-widest sm:hidden">Online</span>
            </div>
             <div className="text-[9px] md:text-[10px] text-slate-400 font-semibold uppercase tracking-widest">
              Realizado por: <span className="text-slate-600">Kevin Axell Concha Regatto</span>
            </div>
          </div>
          <div className="text-[9px] md:text-[10px] text-slate-400 font-semibold">
            <span className="hidden sm:inline">Diseño para: </span><span className="text-sky-500 font-bold">Didáctica en Ed. Superior</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
