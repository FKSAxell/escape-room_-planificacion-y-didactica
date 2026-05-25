import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { gameData } from '../data/gameData';
import { ChallengeProps } from '../types';
import { Compass, BookOpen, Key, LockKeyhole, Power, Cpu, Server, Activity } from 'lucide-react';

import room1 from '../assets/images/room_1_1779666836738.png';
import room2 from '../assets/images/room_2_1779666850869.png';
import room3 from '../assets/images/room_3_1779666864551.png';
import room4 from '../assets/images/room_4_1779666877955.png';

export function ChallengeOne({ onSuccess, onError }: ChallengeProps) {
  const data = gameData.challenges[0];
  const [selected, setSelected] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!selected) return;
    if (selected === data.correctId) {
      onSuccess(data.successMsg || '');
    } else {
      onError(data.errorMsg || '');
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-6 md:gap-10 h-full items-center">
      <div className="w-full md:w-5/12 flex flex-col justify-center">
        <div className="bg-slate-900 rounded-2xl shadow-xl relative overflow-hidden flex flex-col border border-slate-800">
          <div className="h-40 md:h-56 w-full relative">
            <img src={room1} className="w-full h-full object-cover" alt="Room 1" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-[#0f172a]/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-violet-600/90 text-white rounded-xl flex items-center justify-center shrink-0 border-b-2 border-violet-800">
                <Compass className="w-5 h-5 drop-shadow-sm z-10" />
              </div>
              <h2 className="text-lg md:text-xl font-bold text-white tracking-tight leading-tight font-sans text-shadow-sm">{data.title}</h2>
            </div>
          </div>
          <div className="p-5 md:p-6 bg-slate-900 border-t border-slate-800 min-h-[140px]">
            <p className="text-sm md:text-sm text-slate-300 font-medium leading-relaxed whitespace-pre-line relative z-10 line-clamp-6 md:line-clamp-none">
              {data.description}
            </p>
          </div>
        </div>
      </div>
      
      <div className="w-full md:w-7/12 flex flex-col justify-center">
        <div className="grid grid-cols-1 gap-3 md:gap-4 mb-6">
          {data.options?.map((opt) => (
            <motion.button
              whileHover={{ scale: 1.01, x: 4 }}
              whileTap={{ scale: 0.98 }}
              key={opt.id}
              onClick={() => setSelected(opt.id)}
              className={`relative p-4 md:p-5 rounded-2xl transition-all flex items-center gap-4 text-left overflow-hidden
                ${selected === opt.id 
                  ? 'border border-violet-500 bg-violet-900/30 shadow-[0_4px_0_rgba(139,92,246,1)] z-10 md:-translate-y-1' 
                  : 'border border-slate-700 border-b-[4px] bg-slate-800/80 hover:border-slate-600 hover:bg-slate-800'
              }`}
            >
              <div className={`relative z-10 w-12 h-12 shrink-0 rounded-xl flex items-center justify-center transition-all ${selected === opt.id ? 'bg-violet-600 text-white' : 'bg-slate-900 text-slate-500 border border-slate-700'}`}>
                <Power className="w-6 h-6" />
              </div>
              <div className="relative z-10 flex-1">
                <h3 className={`font-bold text-sm md:text-base mb-0.5 ${selected === opt.id ? 'text-violet-300' : 'text-slate-300'}`}>{opt.title}</h3>
                <p className="text-xs text-slate-400 font-medium leading-snug">{opt.text}</p>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!selected}
            className="px-8 md:px-10 h-[52px] md:h-[60px] bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:border-slate-900 disabled:active:translate-y-0 disabled:active:border-b-4 border-b-4 border-cyan-800 active:border-b-0 active:translate-y-1 text-white font-extrabold rounded-2xl uppercase tracking-widest text-xs md:text-sm transition-all flex items-center gap-3 shrink-0"
          >
            <Cpu className="w-4 h-4 md:w-5 md:h-5" />
            COMPLETAR RETO
          </button>
        </div>
      </div>
    </div>
  );
}

export function ChallengeTwo({ onSuccess, onError }: ChallengeProps) {
  const data = gameData.challenges[1];
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [activeDef, setActiveDef] = useState<string | null>(data.definitions?.[0]?.id || null);

  const handleSubmit = () => {
    if (Object.keys(answers).length < (data.definitions?.length || 0)) return;
    
    let isCorrect = true;
    for (const [defId, value] of Object.entries(answers)) {
      if ((data.correctPairs as Record<string, string>)?.[defId] !== value) {
        isCorrect = false;
        break;
      }
    }

    if (isCorrect) onSuccess(data.successMsg || '');
    else onError(data.errorMsg || '');
  };

  const handleChipClick = (optId: string) => {
    if (!activeDef) return;
    setAnswers(prev => ({ ...prev, [activeDef]: optId }));
    
    // Auto-advance to next empty
    const nextEmpty = data.definitions?.find(d => !answers[d.id] && d.id !== activeDef);
    if (nextEmpty) {
      setActiveDef(nextEmpty.id);
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-6 md:gap-10 h-full items-center">
      <div className="w-full md:w-4/12 flex flex-col justify-center">
        <div className="bg-slate-900 rounded-2xl shadow-xl relative overflow-hidden flex flex-col border border-slate-800">
          <div className="h-40 md:h-56 w-full relative">
            <img src={room2} className="w-full h-full object-cover" alt="Room 2" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-[#0f172a]/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-violet-600/90 text-white rounded-xl flex items-center justify-center shrink-0 border-b-2 border-violet-800">
                <BookOpen className="w-5 h-5 drop-shadow-sm z-10" />
              </div>
              <h2 className="text-lg md:text-xl font-bold text-white tracking-tight leading-tight font-sans text-shadow-sm">{data.title}</h2>
            </div>
          </div>
          <div className="p-5 md:p-6 bg-slate-900 border-t border-slate-800 min-h-[140px]">
            <p className="text-xs xl:text-sm text-slate-300 font-medium leading-relaxed whitespace-pre-line relative z-10 line-clamp-6 md:line-clamp-none">
              {data.description}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full md:w-8/12 flex flex-col justify-center">
        <div className="bg-slate-900 p-4 md:p-6 rounded-3xl border border-slate-800 shadow-xl mb-6 text-left relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-violet-500/50" />
          
          <div className="space-y-3 mb-6">
            {data.definitions?.map(def => {
               const answeredOpt = data.options?.find(o => o.id === answers[def.id]);
               const isActive = activeDef === def.id;
               return (
                <motion.div 
                  key={def.id} 
                  className={`relative flex flex-col sm:flex-row gap-3 p-3 rounded-2xl border ${isActive ? 'border-violet-500 bg-violet-900/10 outline outline-2 outline-violet-500/20' : 'border-slate-800 bg-slate-950/50 hover:border-slate-700'} cursor-pointer transition-all`}
                  onClick={() => setActiveDef(def.id)}
                >
                  <div className="flex-1">
                    <p className="text-xs text-slate-300 font-bold leading-snug">{def.text}</p>
                  </div>
                  <div className="w-full sm:w-36 lg:w-48 h-10 rounded-xl bg-slate-950 border border-dashed border-slate-700 flex items-center justify-center shrink-0 shadow-inner overflow-hidden">
                    {answeredOpt ? (
                      <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="px-3 py-1.5 rounded-lg bg-violet-600 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-sm w-full h-full flex items-center justify-center truncate">
                        {answeredOpt.text}
                      </motion.div>
                    ) : (
                      <span className="text-[10px] text-slate-600 font-black tracking-widest">_ _ _</span>
                    )}
                  </div>
                </motion.div>
               )
            })}
          </div>
          
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-wrap justify-center gap-2 md:gap-3">
            {data.options?.map(opt => {
               const isUsed = Object.values(answers).includes(opt.id);
               return (
                 <button
                   key={opt.id}
                   onClick={() => !isUsed && handleChipClick(opt.id)}
                   disabled={isUsed}
                   className={`px-3 py-2 md:px-4 md:py-3 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all truncate min-w-[30%] text-center
                     ${isUsed 
                      ? 'border-slate-800 bg-slate-900 text-slate-600 cursor-not-allowed' 
                      : 'border-slate-700 border-b-[4px] bg-slate-800 text-slate-300 hover:bg-slate-700 hover:border-slate-600 active:border-b active:translate-y-1 cursor-pointer'
                     }`}
                 >
                   {opt.text}
                 </button>
               )
            })}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={Object.keys(answers).length < (data.definitions?.length || 0)}
            className="px-8 md:px-10 h-[52px] md:h-[60px] bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:border-slate-900 disabled:active:translate-y-0 disabled:active:border-b-4 border-b-4 border-cyan-800 active:border-b-0 active:translate-y-1 text-white font-extrabold rounded-2xl uppercase tracking-widest text-xs md:text-sm transition-all flex items-center gap-3 shrink-0"
          >
            <Activity className="w-4 h-4 md:w-5 md:h-5" />
            COMPROBAR
          </button>
        </div>
      </div>
    </div>
  );
}


export function ChallengeThree({ onSuccess, onError }: ChallengeProps) {
  const data = gameData.challenges[2];
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelection = (id: string) => {
    setSelected(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const handleSubmit = () => {
    if (selected.length !== 3) return;
    
    const correctAnswers = data.correctAnswers as string[];
    const isCorrect = selected.every(s => correctAnswers.includes(s)) && correctAnswers.every((c: string) => selected.includes(c));
    
    if (isCorrect) onSuccess(data.successMsg || '');
    else onError(data.errorMsg || '');
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-6 md:gap-10 h-full items-center">
      <div className="w-full md:w-5/12 flex flex-col justify-center">
        <div className="bg-slate-900 rounded-2xl shadow-xl relative overflow-hidden flex flex-col border border-slate-800">
          <div className="h-40 md:h-56 w-full relative">
            <img src={room3} className="w-full h-full object-cover" alt="Room 3" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-[#0f172a]/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-violet-600/90 text-white rounded-xl flex items-center justify-center shrink-0 border-b-2 border-violet-800">
                <Key className="w-5 h-5 drop-shadow-sm z-10" />
              </div>
              <h2 className="text-lg md:text-xl font-bold text-white tracking-tight leading-tight font-sans text-shadow-sm">{data.title}</h2>
            </div>
          </div>
          <div className="p-5 md:p-6 bg-slate-900 border-t border-slate-800 min-h-[140px]">
            <p className="text-sm md:text-sm text-slate-300 font-medium leading-relaxed whitespace-pre-line relative z-10 line-clamp-6 md:line-clamp-none">
              {data.description}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full md:w-7/12 flex flex-col justify-center">
        <div className="bg-slate-900 p-4 md:p-6 rounded-3xl border border-slate-800 shadow-xl mb-6 text-left relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-violet-500/50" />
          <div className="flex justify-between items-center mb-4">
              <h3 className="text-[10px] md:text-xs text-slate-400 uppercase font-bold tracking-widest flex items-center gap-2">
                <Server className="w-3 h-3 md:w-4 md:h-4 text-violet-400" /> Módulos de Aprendizaje
              </h3>
              <div className="flex gap-1.5">
                {[0,1,2].map(i => (
                  <div key={i} className={`w-3.5 h-3.5 md:w-4 md:h-4 rounded-full transition-all border-2 ${i < selected.length ? 'bg-violet-600 border-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.5)]' : 'bg-slate-800 border-slate-700'}`} />
                ))}
              </div>
          </div>
          
          <div className="grid gap-3 mb-2">
            {data.options?.map(opt => {
              const isSelected = selected.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  onClick={() => toggleSelection(opt.id)}
                  className={`w-full text-left px-4 py-3 rounded-2xl border transition-all relative overflow-hidden flex items-center gap-4 ${
                    isSelected 
                      ? 'border-violet-500 bg-violet-900/20 shadow-[0_4px_0_rgba(139,92,246,1)] active:-translate-y-0 active:shadow-sm md:-translate-y-1' 
                      : 'border-slate-700 border-b-[4px] bg-slate-800/50 text-slate-300 hover:border-slate-600 hover:bg-slate-800'
                  }`}
                >
                  <div className={`relative w-12 h-6 rounded-full shrink-0 transition-colors border ${isSelected ? 'bg-violet-600 border-violet-500' : 'bg-slate-900 border-slate-700'}`}>
                     <motion.div 
                       animate={{ x: isSelected ? 24 : 2 }}
                       className="absolute top-0.5 bottom-0.5 w-4 bg-white rounded-full shadow-sm border border-slate-300"
                     />
                  </div>

                  <div className="flex-1 relative z-10">
                    <span className={`text-[11px] md:text-xs font-extrabold block mb-0.5 ${isSelected ? 'text-violet-300' : 'text-slate-200'}`}>{opt.title}</span>
                    <span className={`text-[10px] md:text-xs font-medium leading-snug line-clamp-2 ${isSelected ? 'text-violet-100/70' : 'text-slate-400'}`}>{opt.text}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={selected.length !== 3}
            className="px-8 md:px-10 h-[52px] md:h-[60px] bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:border-slate-900 disabled:active:translate-y-0 disabled:active:border-b-4 border-b-4 border-cyan-800 active:border-b-0 active:translate-y-1 text-white font-extrabold rounded-2xl uppercase tracking-widest text-xs md:text-sm transition-all flex items-center gap-3 shrink-0"
          >
            <Server className="w-4 h-4 md:w-5 md:h-5" />
            COMPROBAR
          </button>
        </div>
      </div>
    </div>
  );
}

export function ChallengeFour({ onSuccess, onError }: ChallengeProps) {
  const data = gameData.challenges[3];
  const [sequence, setSequence] = useState<string[]>([]);
  
  const availableOptions = data.options?.filter(opt => !sequence.includes(opt.id)) || [];

  const handleSelect = (id: string) => {
    if (sequence.length < 3) {
      setSequence(prev => [...prev, id]);
    }
  };

  const handleRemove = (index: number) => {
    setSequence(prev => {
      const newSeq = [...prev];
      newSeq.splice(index, 1);
      return newSeq;
    });
  };

  const handleSubmit = () => {
    if (sequence.length !== 3) return;
    
    const correctSeq = data.correctSequence as string[];
    const isCorrect = sequence.join(',') === correctSeq.join(',');
    
    if (isCorrect) onSuccess(data.successMsg || '');
    else onError(data.errorMsg || '');
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-6 md:gap-10 h-full items-center">
      <div className="w-full md:w-5/12 flex flex-col justify-center">
        <div className="bg-slate-900 rounded-2xl shadow-xl relative overflow-hidden flex flex-col border border-slate-800">
          <div className="h-40 md:h-56 w-full relative">
            <img src={room4} className="w-full h-full object-cover" alt="Room 4" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-[#0f172a]/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-violet-600/90 text-white rounded-xl flex items-center justify-center shrink-0 border-b-2 border-violet-800">
                <LockKeyhole className="w-5 h-5 drop-shadow-sm z-10" />
              </div>
              <h2 className="text-lg md:text-xl font-bold text-white tracking-tight leading-tight font-sans text-shadow-sm">{data.title}</h2>
            </div>
          </div>
          <div className="p-5 md:p-6 bg-slate-900 border-t border-slate-800 min-h-[140px]">
            <p className="text-sm md:text-sm text-slate-300 font-medium leading-relaxed whitespace-pre-line relative z-10 line-clamp-6 md:line-clamp-none">
              {data.description}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full md:w-7/12 flex flex-col justify-center">
        <div className="bg-slate-900 p-4 md:p-6 rounded-3xl border border-slate-800 shadow-xl mb-6 text-center relative overflow-hidden">
          <h3 className="text-[10px] md:text-xs text-slate-400 uppercase font-black tracking-widest mb-6 flex items-center justify-center gap-2">
            <Activity className="w-4 h-4 text-violet-400" /> Ensamblador de Secuencia
          </h3>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
            {[0, 1, 2].map((index) => {
               const stepId = sequence[index];
               const opt = data.options?.find(o => o.id === stepId);
               
               return (
                 <div key={index} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                   <motion.div 
                      layout
                      onClick={() => opt && handleRemove(index)}
                      className={`w-full sm:w-32 md:w-36 h-20 sm:h-24 md:h-28 rounded-2xl flex items-center justify-center p-3 border transition-all relative ${
                        opt 
                        ? 'bg-violet-600 border-[2px] border-b-[4px] border-violet-800 shadow-lg shadow-violet-500/20 cursor-pointer hover:bg-violet-500 -translate-y-1' 
                        : 'bg-slate-950 border-dashed border-slate-700'
                      }`}
                   >
                     {opt ? (
                       <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-[10px] md:text-xs font-black text-white uppercase tracking-wider text-center">
                         {opt.text}
                       </motion.span>
                     ) : (
                       <span className="text-2xl md:text-3xl text-slate-700 font-black">_</span>
                     )}
                     
                     {opt && (
                       <div className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 border-2 border-slate-900 rounded-full flex items-center justify-center shadow-md">
                         <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                       </div>
                     )}
                   </motion.div>
                 </div>
               )
            })}
          </div>

          <div className="flex flex-wrap justify-center gap-3 min-h-[48px] bg-slate-950 p-4 border border-slate-800 rounded-2xl">
            <AnimatePresence>
              {availableOptions.map(opt => (
                <motion.button
                  key={opt.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  onClick={() => handleSelect(opt.id)}
                  className="px-4 py-2 md:px-5 md:py-3 bg-slate-800 border-2 border-b-[3px] border-slate-700 rounded-xl text-[10px] md:text-xs font-bold text-slate-300 hover:border-violet-500 hover:text-violet-300 hover:bg-slate-800 active:border-b-2 active:translate-y-1 transition-all max-w-[200px]"
                >
                  {opt.text}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={sequence.length !== 3}
            className="px-8 md:px-10 h-[52px] md:h-[60px] bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:border-slate-900 disabled:active:translate-y-0 disabled:active:border-b-4 border-b-4 border-cyan-800 active:border-b-0 active:translate-y-1 text-white font-extrabold rounded-2xl uppercase tracking-widest text-xs md:text-sm transition-all flex items-center gap-3 shrink-0"
          >
            <LockKeyhole className="w-4 h-4 md:w-5 md:h-5" />
            COMPROBAR SECUENCIA
          </button>
        </div>
      </div>
    </div>
  );
}
