import React, { useState } from 'react';
import { generateInviteUrl } from '../utils/url';
import { Heart, Copy, Check, Sparkles } from 'lucide-react';

const ValentineForm: React.FC = () => {
  const [recipient, setRecipient] = useState('');
  const [sender, setSender] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !sender) return;
    const url = generateInviteUrl(sender, recipient);
    setGeneratedLink(url);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-lg w-full bg-white/90 backdrop-blur-lg p-10 rounded-[2.5rem] shadow-2xl border-2 border-pink-50 animate-in fade-in zoom-in duration-700">
      <div className="flex justify-center mb-8 relative">
        <div className="absolute -top-4 -right-4 animate-spin-slow">
            <Sparkles className="text-yellow-400 w-8 h-8" />
        </div>
        <div className="bg-rose-50 p-6 rounded-full">
            <Heart className="w-16 h-16 text-rose-500 fill-rose-500 animate-pulse" />
        </div>
      </div>
      
      <h2 className="text-4xl font-cursive text-rose-600 text-center mb-2">
        Craft Your Love Letter
      </h2>
      <p className="text-rose-400 text-center mb-10 text-sm italic font-medium">Create a digital surprise they can't refuse</p>

      {!generatedLink ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <label className="block text-xs font-bold text-rose-300 uppercase tracking-widest mb-2 ml-1 transition-colors group-focus-within:text-rose-500">To My Dearest</label>
            <input
              type="text"
              required
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl border-2 border-pink-100 focus:border-rose-400 focus:ring-4 focus:ring-rose-50 focus:outline-none transition-all text-rose-700 font-medium placeholder:text-rose-200"
              placeholder="e.g. My Princess"
            />
          </div>
          <div className="relative group">
            <label className="block text-xs font-bold text-rose-300 uppercase tracking-widest mb-2 ml-1 transition-colors group-focus-within:text-rose-500">From Your</label>
            <input
              type="text"
              required
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl border-2 border-pink-100 focus:border-rose-400 focus:ring-4 focus:ring-rose-50 focus:outline-none transition-all text-rose-700 font-medium placeholder:text-rose-200"
              placeholder="e.g. Prince Charming"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-rose-500 hover:bg-rose-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-rose-200 transition-all transform hover:scale-[1.02] active:scale-95 text-lg uppercase tracking-widest"
          >
            Generate Magic Link ✨
          </button>
        </form>
      ) : (
        <div className="space-y-6 animate-in slide-in-from-bottom-6 duration-500">
          <div className="text-center bg-rose-50 p-4 rounded-2xl border border-rose-100">
            <p className="text-rose-800 font-medium text-sm">
              Your secret proposal is ready! 💌
            </p>
            <p className="text-rose-400 text-xs mt-1">Copy the link below and send it to your love.</p>
          </div>
          
          <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border-2 border-rose-100 shadow-inner overflow-hidden">
            <input
              type="text"
              readOnly
              value={generatedLink}
              className="flex-1 bg-transparent text-sm text-rose-600 font-semibold outline-none truncate"
            />
            <button
              onClick={copyToClipboard}
              className={`p-3 rounded-xl transition-all flex items-center gap-2 ${copied ? 'bg-green-500 text-white' : 'bg-rose-100 text-rose-500 hover:bg-rose-200'}`}
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              <span className="text-xs font-bold uppercase">{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
          
          <button
            onClick={() => setGeneratedLink('')}
            className="w-full py-3 text-rose-400 text-sm font-bold hover:text-rose-600 transition-colors uppercase tracking-widest"
          >
            ← Start Over
          </button>
        </div>
      )}
    </div>
  );
};

export default ValentineForm;