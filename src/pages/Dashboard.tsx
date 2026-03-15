import { useStore } from '../store';
import { motion } from 'motion/react';
import { Wallet, TrendingUp, ArrowUpRight, ArrowDownRight, Activity, Users } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Float, Text3D, Center, MeshDistortMaterial } from '@react-three/drei';

function AnimatedPieChart() {
  return (
    <div className="h-64 w-full relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
          <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
            <cylinderGeometry args={[2, 2, 0.5, 32, 1, false, 0, Math.PI * 1.5]} />
            <meshStandardMaterial color="#00f0ff" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
            <cylinderGeometry args={[2, 2, 0.5, 32, 1, false, Math.PI * 1.5, Math.PI * 0.5]} />
            <meshStandardMaterial color="#0044ff" metalness={0.8} roughness={0.2} />
          </mesh>
        </Float>
      </Canvas>
    </div>
  );
}

export function Dashboard() {
  const user = useStore((s) => s.user);
  const transactions = useStore((s) => s.transactions);

  if (!user) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 flex flex-col">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Welcome back, {user.username}</h1>
          <p className="text-sm sm:text-base text-gray-400 font-medium">Here's your portfolio overview</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)]">
          <span className="text-white font-black text-xl">{user.username.charAt(0).toUpperCase()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20, rotateX: 20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          whileHover={{ scale: 1.02, y: -5, rotateX: 5, rotateY: -5 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
          style={{ transformStyle: 'preserve-3d' }}
          className="p-6 rounded-3xl bg-gradient-to-br from-white/10 to-black/40 border-t border-l border-white/20 border-r border-b border-white/5 backdrop-blur-xl relative overflow-hidden group shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ transform: 'translateZ(-10px)' }} />
          <div className="relative z-10" style={{ transform: 'translateZ(30px)' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" /> +2.4%
              </span>
            </div>
            <p className="text-gray-400 font-medium mb-1 text-sm sm:text-base">Available Balance</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tighter">
              {user.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).replace('$', '')} <span className="text-lg sm:text-xl text-cyan-400">USDT</span>
            </h2>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, rotateX: 20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          whileHover={{ scale: 1.02, y: -5, rotateX: 5, rotateY: 5 }}
          transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 300 }}
          style={{ transformStyle: 'preserve-3d' }}
          className="p-6 rounded-3xl bg-gradient-to-br from-white/10 to-black/40 border-t border-l border-white/20 border-r border-b border-white/5 backdrop-blur-xl relative overflow-hidden group shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ transform: 'translateZ(-10px)' }} />
          <div className="relative z-10" style={{ transform: 'translateZ(30px)' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-400" />
              </div>
              <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" /> +12.5%
              </span>
            </div>
            <p className="text-gray-400 font-medium mb-1 text-sm sm:text-base">Total Invested</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tighter">
              {user.totalInvested.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).replace('$', '')} <span className="text-lg sm:text-xl text-blue-400">USDT</span>
            </h2>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, rotateX: 20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          whileHover={{ scale: 1.02, y: -5, rotateX: 5, rotateY: 5 }}
          transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 300 }}
          style={{ transformStyle: 'preserve-3d' }}
          className="p-6 rounded-3xl bg-gradient-to-br from-white/10 to-black/40 border-t border-l border-white/20 border-r border-b border-white/5 backdrop-blur-xl relative overflow-hidden group shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ transform: 'translateZ(-10px)' }} />
          <div className="relative z-10" style={{ transform: 'translateZ(30px)' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                <Activity className="w-5 h-5 text-green-400" />
              </div>
              <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" /> +5.2%
              </span>
            </div>
            <p className="text-gray-400 font-medium mb-1 text-sm sm:text-base">Total Earned</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tighter">
              {user.totalEarned.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).replace('$', '')} <span className="text-lg sm:text-xl text-green-400">USDT</span>
            </h2>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-2 p-6 rounded-3xl bg-gradient-to-br from-black/60 to-black/20 border-t border-l border-white/10 border-r border-b border-black/50 backdrop-blur-xl shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" /> Portfolio Distribution
          </h3>
          <AnimatedPieChart />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="p-6 rounded-3xl bg-gradient-to-br from-black/60 to-black/20 border-t border-l border-white/10 border-r border-b border-black/50 backdrop-blur-xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] flex flex-col"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-400" /> Recent Activity
          </h3>
          <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {transactions.length === 0 ? (
              <div className="text-center py-8 text-gray-500 font-medium">
                No recent activity.
              </div>
            ) : (
              transactions.slice(0, 4).map((tx, i) => (
                <motion.div 
                  key={tx.id} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + (i * 0.1) }}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border-t border-l border-white/10 border-r border-b border-transparent hover:bg-white/10 transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.type === 'deposit' || tx.type === 'reward' ? 'bg-gradient-to-br from-green-400 to-green-600' :
                      tx.type === 'withdraw' ? 'bg-gradient-to-br from-red-400 to-red-600' :
                      'bg-gradient-to-br from-blue-400 to-blue-600'
                    }`}>
                      {tx.type === 'deposit' || tx.type === 'reward' ? <ArrowDownRight className="w-5 h-5 text-white" /> : <ArrowUpRight className="w-5 h-5 text-white" />}
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm capitalize">{tx.type}</p>
                      <p className="text-xs text-gray-400">{new Date(tx.date).toLocaleDateString()} {new Date(tx.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${
                      tx.type === 'deposit' || tx.type === 'reward' ? 'text-green-400' :
                      tx.type === 'withdraw' ? 'text-red-400' :
                      'text-blue-400'
                    }`}>
                      {tx.amount > 0 ? '+' : ''}{tx.amount} USDT
                    </p>
                    <p className="text-xs text-gray-400 capitalize">{tx.status}</p>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
