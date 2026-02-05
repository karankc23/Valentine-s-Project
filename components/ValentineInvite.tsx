import React, { useState, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';

interface Props {
  recipient: string;
  sender: string;
  onAccept: () => void;
}

const ValentineInvite: React.FC<Props> = ({ recipient, sender, onAccept }) => {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [yesScale, setYesScale] = useState(1);
  const [flash, setFlash] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const moveNoButton = useCallback(() => {
    // Increment YES button size every time NO button moves
    setYesScale(prev => Math.min(prev + 0.18, 3.5)); // Max scale slightly increased

    // Randomize NO position within a safe viewport range
    const x = (Math.random() * 60 + 20); // 20% to 80%
    const y = (Math.random() * 60 + 20); // 20% to 80%
    setNoPosition({ x, y });
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!noButtonRef.current) return;

    const rect = noButtonRef.current.getBoundingClientRect();
    const buttonCenter = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };

    const dist = Math.sqrt(
      Math.pow(e.clientX - buttonCenter.x, 2) + 
      Math.pow(e.clientY - buttonCenter.y, 2)
    );

    // If mouse gets close, flee!
    if (dist < 120) {
      moveNoButton();
    }
  };

  const handleYes = () => {
    setFlash(true);
    setTimeout(() => {
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      onAccept();
    }, 400);
  };

  return (
    <div 
      className={`min-h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden relative transition-colors duration-700 ${flash ? 'bg-white' : ''}`}
      onMouseMove={handleMouseMove}
    >
      {flash && (
        <div className="fixed inset-0 z-50 bg-white animate-pulse" />
      )}

      <div className="z-10 text-center max-w-4xl px-4 flex flex-col items-center">
        <div className="mb-8 animate-float">
            <svg className="w-24 h-24 text-rose-500 fill-rose-100 drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
        </div>

        <h1 className="text-5xl md:text-8xl font-cursive text-rose-600 mb-4 animate-in fade-in slide-in-from-top-10 duration-1000 leading-tight">
          Dearest {recipient},
        </h1>
        <h2 className="text-3xl md:text-5xl font-cursive text-rose-500 mb-16 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
          Will you be my Valentine forever?
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-12 relative min-h-[250px] w-full">
          <button
            onClick={handleYes}
            style={{ transform: `scale(${yesScale})` }}
            className={`px-16 py-6 bg-rose-500 hover:bg-rose-600 text-white text-3xl font-black rounded-full shadow-[0_20px_50px_rgba(244,63,94,0.5)] transition-all duration-300 z-20 uppercase tracking-widest active:scale-95 flex items-center gap-3 ${yesScale === 1 ? 'animate-pulse-scale' : ''}`}
          >
            YES! <span className="text-4xl">❤️</span>
          </button>

          <button
            ref={noButtonRef}
            onMouseEnter={moveNoButton}
            onClick={(e) => {
                e.preventDefault();
                moveNoButton();
            }}
            style={
              noPosition.x !== 0 
                ? { 
                    position: 'fixed', 
                    left: `${noPosition.x}%`, 
                    top: `${noPosition.y}%`,
                    transition: 'all 0.1s ease-out',
                    zIndex: 40
                  } 
                : { zIndex: 10 }
            }
            className="px-12 py-5 bg-gray-200 text-gray-500 text-xl font-bold rounded-full transition-all duration-300 whitespace-nowrap opacity-50 hover:opacity-100 shadow-sm"
          >
            No thanks
          </button>
        </div>
      </div>

      <div className="mt-20 opacity-40 pointer-events-none text-center">
        <p className="text-rose-400 font-cursive text-2xl animate-bounce">Waiting for your answer... ❤️</p>
        {sender && <p className="text-rose-300 text-sm mt-2">Love, {sender}</p>}
      </div>
    </div>
  );
};

export default ValentineInvite;