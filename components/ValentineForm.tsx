
import React, { useState } from 'react';
import { generateInviteUrl } from '../utils/url';
import { Heart, Copy, Check } from 'lucide-react';

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
    <div className="max-w-md w-full bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-pink-100 animate-in fade-in zoom-in duration-500">
      <div className="flex justify-center mb-6">
        <Heart className="w-16 h-16 text-rose-500 fill-rose-500 animate-pulse" />
      </div>
      
      <h2 className="text-3xl font-cursive text-rose-600 text-center mb-6">
        Create Your Valentine Surprise
      </h2>

      {!generatedLink ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-rose-400 mb-1 ml-1">Her Name (The One You Love)</label>
            <input
              type="text"
              required
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-pink-100 focus:border-rose-400 focus:outline-none transition-colors"
              placeholder="e.g. My Princess"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-rose-400 mb-1 ml-1">His Name (Yours)</label>
            <input
              type="text"
              required
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-pink-100 focus:border-rose-400 focus:outline-none transition-colors"
              placeholder="e.g. Prince Charming"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-rose-200 transition-all transform hover:scale-105 active:scale-95"
          >
            Generate Romantic Link
          </button>
        </form>
      ) : (
        <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
          <p className="text-gray-600 text-center text-sm">
            Your special link is ready! Send it to your Valentine:
          </p>
          <div className="flex items-center gap-2 p-3 bg-rose-50 rounded-xl border border-rose-100 overflow-hidden">
            <input
              type="text"
              readOnly
              value={generatedLink}
              className="flex-1 bg-transparent text-sm text-rose-700 outline-none truncate"
            />
            <button
              onClick={copyToClipboard}
              className="p-2 bg-white rounded-lg shadow-sm hover:text-rose-500 transition-colors"
            >
              {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
          <button
            onClick={() => setGeneratedLink('')}
            className="w-full text-rose-400 text-sm font-semibold hover:text-rose-600 transition-colors"
          >
            Create Another
          </button>
        </div>
      )}
    </div>
  );
};

export default ValentineForm;
