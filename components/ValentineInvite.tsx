
import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';

interface Props {
  recipient: string;
  sender: string;
  onAccept: () => void;
}

const ValentineInvite: React.FC<Props> = ({ recipient, sender, onAccept }) => {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [flash, setFlash] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const moveNoButton = useCallback(() => {
    // Keep it away from the edges (15% to 85%)
    const x = (Math.random() * 70 + 15);
    const y = (Math.random() * 70 + 15);
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

    // Be very sensitive - move if within 150px
    if (dist < 150) {
      moveNoButton();
    }
  };

  const handleYes = () => {
    // Flash effect
    setFlash(true);
    setTimeout(() => {
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#ff0000', '#ff69b4', '#ffffff', '#ff1493']
      });
      onAccept();
    }, 500);
  };

  return (
    <div 
      className={`min-h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden relative transition-colors duration-300 ${flash ? 'bg-white' : ''}`}
      onMouseMove={handleMouseMove}
    >
      {flash && (
        <div className="fixed inset-0 z-50 bg-white animate-pulse" />
      )}

      <div className="z-10 text-center max-w-2xl px-4">
        <h1 className="text-5xl md:text-7xl font-cursive text-rose-600 mb-12 animate-in fade-in zoom-in duration-700 leading-tight">
          {recipient}, will you be my valentine?
        </h1>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-12 relative min-h-[200px]">
          <button
            onClick={handleYes}
            className="px-16 py-5 bg-rose-500 hover:bg-rose-600 text-white text-2xl font-black rounded-full shadow-[0_10px_30px_rgba(244,63,94,0.4)] hover:scale-125 active:scale-95 transition-all duration-300 z-20 uppercase tracking-widest"
          >
            YES
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
                    transition: 'all 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    zIndex: 40
                  } 
                : { zIndex: 10 }
            }
            className="px-10 py-4 bg-gray-200 text-gray-500 text-xl font-bold rounded-full transition-all duration-300 whitespace-nowrap opacity-80"
          >
            NO
          </button>
        </div>
      </div>

      <div className="mt-24 opacity-20 pointer-events-none">
        <p className="text-rose-400 font-cursive text-2xl">Sent by {sender}</p>
      </div>
    </div>
  );
};

export default ValentineInvite;
