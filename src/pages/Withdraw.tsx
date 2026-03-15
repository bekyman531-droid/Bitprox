import { useState } from 'react';
import { useStore } from '../store';
import { motion, AnimatePresence } from 'motion/react';
import { Wallet, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export function Withdraw() {
  const { user } = useStore();
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  if (!user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    
    if (numAmount > user.balance) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    if (numAmount >= 15 && address.length > 10) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setAmount('');
        setAddress('');
      }, 3000);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32 relative z-10 flex flex-col">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
          Withdraw <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Funds</span>
        </h1>
        <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto">
          Withdraw your earnings to your personal crypto wallet.
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="bg-gradient-to-br from-black/80 to-black/40 border-t border-l border-white/20 border-r border-b border-white/5 rounded-3xl p-8 backdrop-blur-xl max-w-2xl mx-auto shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
      >
        <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
          <div className="flex items-center justify-between mb-8 p-6 bg-white/5 rounded-2xl border border-white/10">
          <div>
            <p className="text-gray-400 font-medium mb-1">Available Balance</p>
            <h2 className="text-3xl font-black text-white">{user.balance.toLocaleString()} <span className="text-cyan-400 text-lg">USDT</span></h2>
          </div>
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
            <Wallet className="w-6 h-6 text-cyan-400" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Withdrawal Amount (USDT)</label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-4 pr-16 text-2xl font-black text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                placeholder="0.00"
                min="15"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-500 font-bold">
                USDT
              </div>
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span className="text-gray-500">Min: 15 USDT</span>
              <button
                type="button"
                onClick={() => setAmount(user.balance.toString())}
                className="text-cyan-400 hover:underline font-medium active:scale-95 transition-transform"
              >
                Max Amount
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">USDT Wallet Address (TRC20/BEP20/ERC20)</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono text-sm"
              placeholder="Paste your wallet address here..."
            />
          </div>

          <button
            type="submit"
            disabled={!amount || parseFloat(amount) < 15 || address.length < 10}
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-black text-white text-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all disabled:opacity-50 disabled:hover:scale-100 disabled:active:scale-100 disabled:cursor-not-allowed"
          >
            Request Withdrawal <ArrowRight className="w-6 h-6" />
          </button>
        </form>
        </div>
      </motion.div>

      <AnimatePresence>
        {showError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <div className="bg-gray-900 border border-red-500/50 rounded-3xl p-8 max-w-md w-full text-center shadow-[0_0_50px_rgba(239,68,68,0.2)]">
              <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-10 h-10 text-red-500" />
              </div>
              <h3 className="text-2xl font-black text-white mb-2">Insufficient Balance!</h3>
              <p className="text-gray-400 mb-8">You cannot withdraw more than your available balance.</p>
            </div>
          </motion.div>
        )}

        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <div className="bg-gray-900 border border-green-500/50 rounded-3xl p-8 max-w-md w-full text-center shadow-[0_0_50px_rgba(34,197,94,0.2)]">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-2xl font-black text-white mb-2">Withdrawal Requested!</h3>
              <p className="text-gray-400 mb-8">Your withdrawal of {amount} USDT is being processed and will arrive in your wallet shortly.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
