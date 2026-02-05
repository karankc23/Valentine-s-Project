
import React from 'react';
import { Heart } from 'lucide-react';

interface Props {
  recipient: string;
  sender: string;
}

const Celebration: React.FC<Props> = ({ recipient, sender }) => {
  return (
    <div className="text-center animate-in fade-in zoom-in duration-1000 max-w-3xl px-6 py-10 bg-white/40 backdrop-blur-md rounded-[3rem] border-4 border-white shadow-2xl">
      <div className="flex justify-center mb-10 space-x-4">
        <Heart className="w-16 h-16 text-rose-500 fill-rose-500 animate-bounce" />
        <Heart className="w-20 h-20 text-rose-600 fill-rose-600 animate-bounce [animation-delay:200ms]" />
        <Heart className="w-16 h-16 text-rose-400 fill-rose-400 animate-bounce [animation-delay:400ms]" />
      </div>
      
      <h1 className="text-6xl md:text-8xl font-cursive text-rose-600 mb-8 drop-shadow-xl animate-pulse">
        IT'S OFFICIAL!
      </h1>
      
      <div className="mb-12">
        <p className="text-3xl md:text-5xl font-black text-rose-700 leading-tight uppercase tracking-tight">
          {recipient} <span className="text-rose-400 font-cursive lowercase text-4xl mx-2">&</span> {sender}
        </p>
        <p className="text-2xl md:text-4xl mt-6 text-rose-500 font-cursive italic">
          are a valentine
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <div className="rounded-3xl overflow-hidden shadow-2xl transform rotate-[-3deg] hover:rotate-0 transition-transform duration-500 border-8 border-white">
          <img 
            src="https://media.tenor.com/791V4M9KzGAAAAAM/cute-cat.gif" 
            alt="Celebrating cat" 
            className="w-full h-auto"
          />
        </div>
        <div className="rounded-3xl overflow-hidden shadow-2xl transform rotate-[3deg] hover:rotate-0 transition-transform duration-500 border-8 border-white">
          <img 
            src="https://media.tenor.com/fA67f5zH17UAAAAM/happy-cat.gif" 
            alt="Happy cats" 
            className="w-full h-auto"
          />
        </div>
      </div>

      <div className="mt-16">
        <button 
          onClick={() => window.location.hash = ''}
          className="px-6 py-2 rounded-full border-2 border-rose-200 text-rose-400 hover:bg-rose-100 hover:text-rose-600 font-semibold transition-all"
        >
          Create another surprise link
        </button>
      </div>
    </div>
  );
};

export default Celebration;
