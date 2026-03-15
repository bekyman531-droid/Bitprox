import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, Play, Shield, Zap, Globe } from 'lucide-react';

export function Landing() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-32 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-medium text-sm mb-8 backdrop-blur-md"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
              BitProx Institutional - Now open to public investors
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, type: 'spring' }}
              className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter mb-6 sm:mb-8"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-200 to-gray-500">
                The Future of
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]">
                Algorithmic Wealth
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-lg sm:text-xl text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4"
            >
              Experience institutional-grade algorithmic trading powered by advanced AI. 
              Secure, transparent, and designed to maximize your digital asset portfolio.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Link
                to="/register"
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl font-bold text-white text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 hover:shadow-[0_0_40px_rgba(6,182,212,0.4)]"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative flex items-center gap-2">
                  Start Investing <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              
              <Link to="/about" className="group px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-white text-lg backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20 flex items-center gap-3 active:scale-95">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                </div>
                Learn More
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: 'Total Invested', value: '$45.2M', icon: Shield },
              { label: 'Live Investors', value: (124592 + Math.floor(Math.random() * 100)).toLocaleString(), icon: Globe },
              { label: 'Daily Payouts', value: '$1.2M', icon: Zap },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, rotateX: 20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                whileHover={{ scale: 1.05, y: -10, rotateX: 5, rotateY: 5 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2, type: "spring", stiffness: 300 }}
                style={{ transformStyle: 'preserve-3d' }}
                className="relative group p-8 rounded-3xl bg-gradient-to-br from-black/80 to-black/40 border-t border-l border-white/20 border-r border-b border-white/5 backdrop-blur-xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ transform: 'translateZ(-10px)' }} />
                <div className="relative z-10" style={{ transform: 'translateZ(30px)' }}>
                  <stat.icon className="w-10 h-10 text-cyan-400 mb-6" />
                  <h3 className="text-4xl font-black text-white mb-2 tracking-tight">{stat.value}</h3>
                  <p className="text-gray-400 font-medium">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
