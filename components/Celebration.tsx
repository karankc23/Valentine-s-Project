import React, { useEffect } from "react";
import { Heart, Stars, Instagram } from "lucide-react";
import confetti from "canvas-confetti";
import catLoveGif from "../assets/cat-love.gif";
import catsHuggingGif from "../assets/cats-hugging.gif";

interface Props {
  recipient: string;
  sender: string;
}

const Celebration: React.FC<Props> = ({ recipient, sender }) => {
  useEffect(() => {
    // Festive confetti blast on mount
    const duration = 7 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="text-center animate-in fade-in zoom-in duration-1000 max-w-4xl px-8 py-16 bg-white/60 backdrop-blur-xl rounded-[4rem] border-8 border-white shadow-2xl relative overflow-hidden">
        {/* Background sparkle effect */}
        <div className="absolute inset-0 pointer-events-none">
          <Stars className="w-full h-full text-rose-100 opacity-30" />
        </div>

        <div className="flex justify-center mb-8 space-x-6 relative z-10">
          <Heart className="w-12 h-12 text-rose-400 fill-rose-400 animate-bounce" />
          <Heart className="w-24 h-24 text-rose-600 fill-rose-600 animate-bounce [animation-delay:150ms] drop-shadow-xl" />
          <Heart className="w-12 h-12 text-rose-500 fill-rose-500 animate-bounce [animation-delay:300ms]" />
        </div>

        <h1 className="text-7xl md:text-9xl font-cursive text-rose-600 mb-10 drop-shadow-2xl animate-pulse tracking-tight relative z-10">
          YES! ❤️
        </h1>

        <div className="mb-14 relative z-10">
          <p className="text-4xl md:text-6xl font-black text-rose-700 leading-tight uppercase tracking-tighter">
            {recipient}{" "}
            <span className="text-rose-400 font-cursive lowercase text-5xl mx-4">
              &
            </span>{" "}
            {sender}
          </p>
          <p className="text-3xl md:text-5xl mt-8 text-rose-500 font-cursive italic leading-relaxed">
            are destined to be together!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto relative z-10">
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl transform rotate-[-4deg] hover:rotate-0 transition-all duration-500 border-8 border-white group">
            <img
              src={catLoveGif}
              alt="Cute cat love"
              className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl transform rotate-[4deg] hover:rotate-0 transition-all duration-500 border-8 border-white group">
            <img
              src={catsHuggingGif}
              alt="Cats hugging"
              className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        </div>
      </div>

      <a
        href="https://www.instagram.com/bas.kar.karan"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-12 group flex flex-col items-center gap-2 transition-all hover:scale-110"
      >
        <div className="p-4 bg-white/80 rounded-full shadow-lg border border-rose-100 group-hover:bg-rose-500 group-hover:text-white transition-colors">
          <Instagram className="w-8 h-8" />
        </div>
        <span className="text-rose-400 font-bold text-xs tracking-widest uppercase opacity-60 group-hover:opacity-100">
          Created by Bas Kar Karan
        </span>
      </a>
    </div>
  );
};

export default Celebration;
