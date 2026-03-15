import { motion } from 'motion/react';
import { Trophy, Medal, Star } from 'lucide-react';

const LEADERS = [
  { rank: 1, name: 'crypto_king', amount: 150000, color: 'from-cyan-400 to-blue-600', icon: Trophy },
  { rank: 2, name: 'whale99', amount: 125000, color: 'from-gray-300 to-gray-500', icon: Medal },
  { rank: 3, name: 'satoshi', amount: 98000, color: 'from-amber-600 to-amber-800', icon: Star },
  { rank: 4, name: 'diamond_hands', amount: 85000 },
  { rank: 5, name: 'moon_walker', amount: 72000 },
  { rank: 6, name: 'bull_run', amount: 65000 },
  { rank: 7, name: 'hodl_master', amount: 54000 },
  { rank: 8, name: 'defi_degen', amount: 48000 },
  { rank: 9, name: 'alpha_seeker', amount: 42000 },
  { rank: 10, name: 'yield_farmer', amount: 38000 },
];

export function Leaderboard() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 flex flex-col">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
          Top <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Earners</span>
        </h1>
        <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto">
          The most successful investors on BitProx this month.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center py-20 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl">
        <Trophy className="w-20 h-20 text-gray-600 mb-6" />
        <h3 className="text-2xl font-bold text-white mb-2">No Data Available</h3>
        <p className="text-gray-400">The leaderboard updates every 24 hours based on active investments.</p>
      </div>
    </div>
  );
}
