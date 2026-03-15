import { useState } from 'react';
import { useStore, PLANS } from '../store';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Zap, Star, Crown, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export function Invest() {
  const { user, invest } = useStore();
  const [amount, setAmount] = useState<string>('');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!user) return null;

  const handlePlanClick = (planId: string, minAmount: number) => {
    setSelectedPlan(planId);
    setAmount(minAmount.toString());
  };

  const handleInvest = () => {
    if (!selectedPlan || !amount) return;
    const numAmount = parseFloat(amount);
    
    if (numAmount > user.balance) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    const success = invest(selectedPlan, numAmount);
    if (success) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setAmount('');
      setSelectedPlan(null);
    }
  };

  const icons = {
    starter: Shield,
    advanced: Zap,
    vip: Star,
    elite: Crown,
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 flex flex-col">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
          Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Investment Plan</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-400 font-medium max-w-2xl mx-auto px-4">
          Select a plan to start earning daily returns. Your balance: <span className="text-cyan-400 font-bold">{user.balance} USDT</span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {PLANS.map((plan, i) => {
          const Icon = icons[plan.id as keyof typeof icons];
          const isSelected = selectedPlan === plan.id;

          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20, rotateX: 20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.5, delay: i * 0.1, type: "spring", stiffness: 300 }}
              onClick={() => handlePlanClick(plan.id, plan.minAmount)}
              className={`relative group cursor-pointer rounded-2xl p-4 transition-all duration-300 overflow-hidden ${
                isSelected 
                  ? 'bg-gradient-to-b from-cyan-500/20 to-black/60 border border-cyan-400 shadow-lg' 
                  : 'bg-gradient-to-br from-white/10 to-black/40 border border-white/10 hover:border-cyan-500/50 shadow-md'
              } backdrop-blur-xl`}
            >
              <div className="relative z-10">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                  isSelected ? 'bg-cyan-500 text-white' : 'bg-white/10 text-cyan-400'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="text-xl font-black text-white mb-1">{plan.name}</h3>
                <div className="text-2xl font-black text-cyan-400 mb-4 tracking-tighter">
                  {plan.dailyRate}% <span className="text-sm text-gray-400 font-medium">/ day</span>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Min</span>
                    <span className="text-white font-bold">{plan.minAmount} USDT</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Max</span>
                    <span className="text-white font-bold">{plan.maxAmount} USDT</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Duration</span>
                    <span className="text-white font-bold">{plan.durationDays} Days</span>
                  </div>
                </div>

                <div className={`w-full py-2 rounded-lg text-sm font-bold text-center transition-all ${
                  isSelected 
                    ? 'bg-cyan-500 text-white' 
                    : 'bg-white/10 text-white group-hover:bg-white/20'
                }`}>
                  {isSelected ? 'Selected' : 'Select'}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedPlan && (
          <motion.div
            initial={{ opacity: 0, y: 20, height: 0, rotateX: -20 }}
            animate={{ opacity: 1, y: 0, height: 'auto', rotateX: 0 }}
            exit={{ opacity: 0, y: -20, height: 0, rotateX: 20 }}
            style={{ transformStyle: 'preserve-3d' }}
            className="max-w-2xl mx-auto bg-gradient-to-br from-black/80 to-black/40 border-t border-l border-cyan-500/50 border-r border-b border-cyan-500/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent pointer-events-none" style={{ transform: 'translateZ(-10px)' }} />
            
            <h3 className="text-2xl font-black text-white mb-6 relative z-10" style={{ transform: 'translateZ(20px)' }}>Complete Investment</h3>
            
            <div className="space-y-6 relative z-10" style={{ transform: 'translateZ(30px)' }}>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Investment Amount (USDT)</label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-4 pr-16 text-2xl font-black text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                    placeholder="0.00"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-500 font-bold">
                    USDT
                  </div>
                </div>
              </div>

              <button
                onClick={handleInvest}
                disabled={!amount || parseFloat(amount) <= 0}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-black text-white text-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all disabled:opacity-50 disabled:hover:scale-100 disabled:active:scale-100 disabled:cursor-not-allowed"
              >
                Confirm Investment <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
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
              <p className="text-gray-400 mb-8">Please deposit funds to your account before investing.</p>
              <button
                onClick={() => window.location.href = '/deposit'}
                className="w-full py-4 bg-red-500 hover:bg-red-600 rounded-xl font-bold text-white transition-colors active:scale-95"
              >
                Go to Deposit
              </button>
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
              <h3 className="text-2xl font-black text-white mb-2">Investment Successful!</h3>
              <p className="text-gray-400 mb-8">Your investment is now active and generating returns.</p>
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="w-full py-4 bg-green-500 hover:bg-green-600 rounded-xl font-bold text-white transition-colors active:scale-95"
              >
                View Dashboard
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
