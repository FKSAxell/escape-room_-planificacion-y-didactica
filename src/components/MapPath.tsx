import { motion } from 'motion/react';
import { Lock, MapPin, Star, Unlock } from 'lucide-react';
import room1 from '../assets/images/room_1_1779666836738.png';
import room2 from '../assets/images/room_2_1779666850869.png';
import room3 from '../assets/images/room_3_1779666864551.png';
import room4 from '../assets/images/room_4_1779666877955.png';

const IMAGES = [room1, room2, room3, room4];

interface MapPathProps {
  maxUnlockedIndex: number;
  onSelectChallenge: (index: number) => void;
}

export function MapPath({ maxUnlockedIndex, onSelectChallenge }: MapPathProps) {
  const TOTAL_CHALLENGES = 4;

  // Winding path positions
  const getPathOffset = (index: number) => {
    switch (index) {
      case 0: return 'translate-x-0 md:translate-y-0';
      case 1: return 'translate-x-[40px] md:translate-x-0 md:translate-y-[60px] xl:translate-y-[100px]';
      case 2: return 'translate-x-0 md:translate-y-[20px] xl:translate-y-[30px]';
      case 3: return '-translate-x-[40px] md:translate-x-0 md:-translate-y-[40px] xl:-translate-y-[80px]';
      default: return '';
    }
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row items-center justify-center p-8 relative min-h-[60vh]">
      <div className="absolute top-8 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-12 z-20">
        <h2 className="text-2xl md:text-3xl font-sans text-white font-black text-center md:text-left uppercase tracking-widest shrink-0 shadow-sm bg-slate-900/90 px-6 py-3 rounded-2xl backdrop-blur-sm border border-slate-800">
          Mapa de Progreso
        </h2>
      </div>

      <div className="relative w-full max-w-sm md:max-w-none flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-20 xl:gap-28 mt-20 md:mt-0">
        
        {/* Draw connection SVG lines behind nodes */}
        <div className="absolute inset-0 pointer-events-none z-0 flex justify-center items-center opacity-70">
            {/* Mobile Path */}
            <svg width="100%" height="100%" className="overflow-visible absolute top-12 md:hidden">
              <path 
                d="M 50% 0 Q 70% 50 50% 100 T 50% 200 T 50% 300" 
                fill="none" 
                stroke="#334155" 
                strokeWidth="10" 
                strokeDasharray="10 10" 
              />
            </svg>
            {/* Desktop Path */}
            <svg width="100%" height="100%" className="overflow-visible absolute hidden md:block" style={{ top: '50%', left: 0, right: 0, transform: 'translateY(-50%)' }}>
              <path 
                d="M 10% 50% Q 25% 100% 50% 50% T 90% 40%" 
                fill="none" 
                stroke="#334155" 
                strokeWidth="12" 
                strokeDasharray="12 12" 
              />
            </svg>
        </div>

        {Array.from({ length: TOTAL_CHALLENGES }).map((_, i) => {
          const isUnlocked = i <= maxUnlockedIndex;
          const isCurrent = i === maxUnlockedIndex;
          const isCompleted = i < maxUnlockedIndex;
          const imageSrc = IMAGES[i];

          return (
            <motion.div
              key={i}
              className={`relative z-10 flex items-center justify-center ${getPathOffset(i)}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.15, type: 'spring' }}
            >
              <motion.button
                whileHover={isUnlocked ? { scale: 1.05 } : {}}
                whileTap={isUnlocked ? { scale: 0.95 } : {}}
                onClick={() => isUnlocked && onSelectChallenge(i)}
                disabled={!isUnlocked}
                className={`relative w-28 h-28 md:w-36 md:h-36 lg:w-48 lg:h-48 xl:w-56 xl:h-56 rounded-full transition-all overflow-hidden flex items-center justify-center ${
                  isCurrent 
                    ? 'border-[6px] border-b-[12px] border-sky-400 cursor-pointer z-20' 
                  : isCompleted
                    ? 'border-[6px] border-b-[12px] border-indigo-400 bg-indigo-50 cursor-pointer'
                  : 'border-[6px] border-b-[12px] border-slate-300 bg-slate-200 cursor-not-allowed grayscale-[0.8] opacity-70'
                }`}
              >
                {/* Background image for node */}
                <div className="absolute inset-0 w-full h-full">
                  <img 
                    src={imageSrc} 
                    alt={`Room ${i + 1}`} 
                    className="w-full h-full object-cover opacity-80"
                    referrerPolicy="no-referrer"
                  />
                  {/* Overlay for non-current to darken them a bit */}
                  {!isCurrent && !isCompleted && <div className="absolute inset-0 bg-slate-800/60 mix-blend-multiply" />}
                  {isCompleted && <div className="absolute inset-0 bg-indigo-900/30 mix-blend-multiply" />}
                  {isCurrent && <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply" />}
                </div>

                <div className="relative z-10 bg-white w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center shadow-sm">
                  {isCompleted ? (
                    <Star className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-indigo-500 fill-indigo-500" />
                  ) : isCurrent ? (
                    <Star className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-sky-400 fill-sky-400 mt-1" />
                  ) : (
                    <Lock className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-slate-300" />
                  )}
                </div>

                {isCurrent && (
                  <motion.div 
                    className="absolute inset-0 rounded-full border-4 border-sky-400 mix-blend-overlay"
                    animate={{ scale: [1, 1.05, 1], opacity: [0.8, 0.2, 0.8] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                )}
              </motion.button>
              
              {/* Challenge Label */}
              <div className={`absolute left-1/2 -translate-x-1/2 ${i % 2 === 0 ? 'bottom-[110%]' : 'top-[110%]'} whitespace-nowrap hidden sm:block z-30`}>
                <div className={`px-4 py-2 lg:px-6 lg:py-3 rounded-2xl border-2 shadow-sm font-black text-sm lg:text-lg tracking-wide bg-white uppercase ${
                    isCurrent ? 'text-sky-500 border-sky-200' : isCompleted ? 'text-indigo-500 border-indigo-200' : 'text-slate-400 border-slate-200'
                }`}>
                  Nivel {i + 1}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
