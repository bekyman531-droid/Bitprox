import { useStore } from '../store';
import { motion } from 'motion/react';
import { Users, Copy, CheckCircle2, Share2, Award, TrendingUp } from 'lucide-react';
import { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Line, Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function NetworkNode({ position, color, scale = 1 }: { position: [number, number, number], color: string, scale?: number }) {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <Sphere args={[0.2 * scale, 32, 32]} position={position}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} roughness={0.2} metalness={0.8} />
      </Sphere>
    </Float>
  );
}

function NetworkTree3D() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = (performance.now() / 1000) * 0.15;
    }
  });

  const nodes = useMemo(() => {
    const root: [number, number, number] = [0, 2, 0];
    const t1 = [
      [-2.5, 0, -1.5], [2.5, 0, -1.5], [0, 0, 2.5]
    ] as [number, number, number][];
    const t2 = [
      [-3.5, -2, -2.5], [-1.5, -2, -2.5],
      [3.5, -2, -2.5], [1.5, -2, -2.5],
      [-1.5, -2, 3.5], [1.5, -2, 3.5]
    ] as [number, number, number][];

    return { root, t1, t2 };
  }, []);

  return (
    <group ref={groupRef} position={[0, 0.5, 0]}>
      {/* Root Node (You) */}
      <NetworkNode position={nodes.root} color="#00f0ff" scale={1.8} />
      
      {/* Tier 1 Referrals */}
      {nodes.t1.map((pos, i) => (
        <group key={`t1-${i}`}>
          <NetworkNode position={pos} color="#00ff88" scale={1.2} />
          <Line points={[nodes.root, pos]} color="#00f0ff" opacity={0.4} transparent lineWidth={2} />
        </group>
      ))}

      {/* Tier 2 Referrals */}
      {nodes.t2.map((pos, i) => {
        const parent = nodes.t1[Math.floor(i / 2)];
        return (
          <group key={`t2-${i}`}>
            <NetworkNode position={pos} color="#0088ff" scale={0.8} />
            <Line points={[parent, pos]} color="#00ff88" opacity={0.2} transparent lineWidth={1} />
          </group>
        );
      })}
    </group>
  );
}

export function Referrals() {
  const user = useStore(s => s.user);
  const [copied, setCopied] = useState(false);

  if (!user) return null;

  const refLink = `${window.location.origin}/ref/${user.username.toLowerCase()}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(refLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 flex flex-col">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
          Referral <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Network</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-400 font-medium max-w-2xl mx-auto px-4">
          Invite friends and earn up to 10% commission on their investments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20, rotateX: 10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          whileHover={{ scale: 1.05, y: -5, rotateX: 5, rotateY: -5 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 300 }}
          style={{ transformStyle: 'preserve-3d' }}
          className="p-6 rounded-3xl bg-gradient-to-br from-black/80 to-black/40 border-t border-l border-white/20 border-r border-b border-white/5 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
        >
          <div style={{ transform: 'translateZ(20px)' }}>
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4 shadow-inner">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <p className="text-gray-400 font-medium mb-1">Total Referrals</p>
            <h2 className="text-4xl font-black text-white">{user.referralCount}</h2>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, rotateX: 10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          whileHover={{ scale: 1.05, y: -5, rotateX: 5, rotateY: 5 }}
          transition={{ delay: 0.1, duration: 0.6, type: "spring", stiffness: 300 }}
          style={{ transformStyle: 'preserve-3d' }}
          className="p-6 rounded-3xl bg-gradient-to-br from-black/80 to-black/40 border-t border-l border-white/20 border-r border-b border-white/5 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
        >
          <div style={{ transform: 'translateZ(20px)' }}>
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-4 shadow-inner">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <p className="text-gray-400 font-medium mb-1">Active Investors</p>
            <h2 className="text-4xl font-black text-white">{Math.floor(user.referralCount * 0.6)}</h2>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, rotateX: 10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          whileHover={{ scale: 1.05, y: -5, rotateX: -5, rotateY: 5 }}
          transition={{ delay: 0.2, duration: 0.6, type: "spring", stiffness: 300 }}
          style={{ transformStyle: 'preserve-3d' }}
          className="p-6 rounded-3xl bg-gradient-to-br from-black/80 to-black/40 border-t border-l border-white/20 border-r border-b border-white/5 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
        >
          <div style={{ transform: 'translateZ(20px)' }}>
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-4 shadow-inner">
              <Award className="w-6 h-6 text-cyan-400" />
            </div>
            <p className="text-gray-400 font-medium mb-1">Total Commission</p>
            <h2 className="text-4xl font-black text-white">{user.totalCommission} <span className="text-xl text-cyan-400">USDT</span></h2>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="bg-gradient-to-br from-black/80 to-black/40 border-t border-l border-white/20 border-r border-b border-white/5 rounded-3xl p-8 backdrop-blur-xl mb-12 shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
      >
        <h3 className="text-2xl font-bold text-white mb-6">Your Referral Link</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between shadow-inner">
            <code className="text-cyan-400 font-mono">{refLink}</code>
            <button
              onClick={handleCopy}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors active:scale-95"
            >
              {copied ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-white" />}
            </button>
          </div>
          <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl font-bold text-white flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]">
            <Share2 className="w-5 h-5" /> Share
          </button>
        </div>
      </motion.div>

      {/* 3D Network Tree */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="h-[300px] sm:h-[500px] bg-gradient-to-br from-black/80 to-black/40 border-t border-l border-white/20 border-r border-b border-white/5 rounded-3xl backdrop-blur-xl relative overflow-hidden group shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="absolute top-6 left-6 z-10 pointer-events-none">
          <h3 className="text-xl font-bold text-white mb-2">Live Network Map</h3>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_10px_#00f0ff]" /> You</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_#00ff88]" /> Tier 1 (10%)</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_#0088ff]" /> Tier 2 (5%)</div>
          </div>
        </div>

        <Canvas camera={{ position: [0, 2, 8], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ff88" />
          <NetworkTree3D />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} maxPolarAngle={Math.PI / 2 + 0.2} minPolarAngle={Math.PI / 4} />
        </Canvas>
        
        <div className="absolute bottom-4 right-4 text-xs text-gray-500 pointer-events-none">
          Interactive 3D View - Drag to rotate
        </div>
      </motion.div>
    </div>
  );
}
