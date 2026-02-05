import React from 'react';
import { Heart, Stars } from 'lucide-react';

interface Props {
  recipient: string;
  sender: string;
}

const Celebration: React.FC<Props> = ({ recipient, sender }) => {
  return (
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
          {recipient} <span className="text-rose-400 font-cursive lowercase text-5xl mx-4">&</span> {sender}
        </p>
        <p className="text-3xl md:text-5xl mt-8 text-rose-500 font-cursive italic leading-relaxed">
          are destined to be together!
        </p>
      </div>

      {/* Using direct Giphy GIF links which are more reliable for external embedding */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto relative z-10">
        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl transform rotate-[-4deg] hover:rotate-0 transition-all duration-500 border-8 border-white group">
          <img 
            src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHY5bXF6ZXZycHhqam41bm84bHRoZjVsb3ZmcTFzZmlybzZ0NmV3ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MDJ9IbxxvDUQM/giphy.gif" 
            alt="Cute cat love" 
            className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl transform rotate-[4deg] hover:rotate-0 transition-all duration-500 border-8 border-white group">
          <img 
            src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHY5bXF6ZXZycHhqam41bm84bHRoZjVsb3ZmcTFzZmlybzZ0NmV3ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KztT2c4u8mYYUiMKdJ/giphy.gif" 
            alt="Cats hugging" 
            className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
      </div>

      <div className="mt-20 relative z-10">
        <button 
          onClick={() => window.location.hash = ''}
          className="px-8 py-3 rounded-full bg-white/80 border-2 border-rose-200 text-rose-400 hover:bg-rose-500 hover:text-white hover:border-rose-500 font-bold tracking-widest transition-all shadow-md active:scale-95"
        >
          CREATE A NEW STORY
        </button>
      </div>
    </div>
  );
};

export default Celebration;