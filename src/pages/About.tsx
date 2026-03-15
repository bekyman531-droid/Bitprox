import { motion } from 'motion/react';
import { Globe, Shield, Zap, Target } from 'lucide-react';

export function About() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 flex flex-col">
      <div className="text-center mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">BitProx</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-400 font-medium max-w-2xl mx-auto px-4">
          We are a team of elite traders and AI engineers building the future of algorithmic investing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <motion.div
          initial={{ opacity: 0, x: -30, rotateY: -10 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 300 }}
          style={{ transformStyle: 'preserve-3d' }}
          className="bg-gradient-to-br from-black/80 to-black/40 border-t border-l border-white/20 border-r border-b border-white/5 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
        >
          <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-6">Our Mission</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              At BitProx, we believe that high-yield algorithmic trading should not be restricted to institutional investors and hedge funds. Our mission is to democratize access to elite trading strategies through our proprietary AI-driven platform.
            </p>
            <p className="text-gray-400 leading-relaxed">
              By combining advanced machine learning models with high-frequency trading infrastructure, we consistently generate market-beating returns for our global community of investors.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 gap-6"
        >
          {[
            { icon: Globe, title: 'Global Reach', desc: 'Operating in 150+ countries' },
            { icon: Shield, title: 'Secure', desc: 'Bank-grade encryption' },
            { icon: Zap, title: 'Fast Execution', desc: 'Millisecond trading' },
            { icon: Target, title: 'High Yield', desc: 'Up to 15% daily returns' },
          ].map((item, i) => (
            <motion.div 
              key={i} 
              whileHover={{ scale: 1.05, y: -5, rotateX: 5, rotateY: 5 }}
              style={{ transformStyle: 'preserve-3d' }}
              className="bg-gradient-to-br from-white/5 to-black/40 border-t border-l border-white/10 border-r border-b border-transparent rounded-2xl p-6 hover:bg-white/10 transition-all shadow-lg hover:shadow-[0_15px_30px_rgba(6,182,212,0.2)]"
            >
              <div style={{ transform: 'translateZ(20px)' }}>
                <item.icon className="w-8 h-8 text-cyan-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
