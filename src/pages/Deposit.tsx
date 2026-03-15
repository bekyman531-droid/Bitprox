import { useState } from 'react';
import { useStore } from '../store';
import { motion, AnimatePresence } from 'motion/react';
import { Copy, CheckCircle2, AlertCircle, ArrowRight, QrCode } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Float, Box, MeshDistortMaterial } from '@react-three/drei';

const NETWORKS = [
  { id: 'bsc', name: 'BSC (BEP20)', address: '0x6e2ae8191f712aa382c6e4a253826551eb5bf350', color: '#00f0ff' },
  { id: 'tron', name: 'TRON (TRC20)', address: 'TFS9cKevmEMGY4W8zsds2GfbjhE1pXSuku', color: '#FF0013' },
  { id: 'ton', name: 'TON', address: 'UQD1tNUqX9cmUGEldNo8vYI_9XmbKHiHwPo8ffylnYxrgEmW', color: '#0098EA' },
  { id: 'eth', name: 'Ethereum (ERC20)', address: '0x6e2ae8191f712aa382c6e4a253826551eb5bf350', color: '#627EEA' },
];

const QUICK_AMOUNTS = [15, 50, 150, 600, 1500, 3000];

function BlockchainAnimation({ color }: { color: string }) {
  return (
    <div className="h-48 w-full relative mb-8 rounded-2xl overflow-hidden bg-black/40 border border-white/10">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color={color} />
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
          <Box args={[1.5, 1.5, 1.5]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
            <MeshDistortMaterial color={color} metalness={0.8} roughness={0.2} distort={0.2} speed={2} />
          </Box>
        </Float>
      </Canvas>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <p className="text-white/50 font-bold tracking-widest uppercase text-sm mb-2">Network Active</p>
          <div className="flex gap-2 justify-center">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Deposit() {
  const { user, deposit } = useStore();
  const [selectedNetwork, setSelectedNetwork] = useState(NETWORKS[0]);
  const [amount, setAmount] = useState<string>('');
  const [txid, setTxid] = useState('');
  const [copied, setCopied] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!user) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedNetwork.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount < 15 || numAmount > 3000 || !txid) return;

    deposit(numAmount, selectedNetwork.name, txid);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setAmount('');
      setTxid('');
    }, 3000);
  };

  const isValid = parseFloat(amount) >= 15 && parseFloat(amount) <= 3000 && txid.length > 10;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32 relative z-10 flex flex-col">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
          Deposit <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Funds</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-400 font-medium max-w-2xl mx-auto px-4">
          Add USDT to your balance to start investing. Minimum deposit: 15 USDT.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Network & Address */}
        <motion.div 
          initial={{ opacity: 0, x: -20, rotateY: -10 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
          style={{ transformStyle: 'preserve-3d' }}
          className="bg-gradient-to-br from-black/80 to-black/40 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-xl"
        >
          <div className="relative z-10" style={{ transform: 'translateZ(10px)' }}>
            <h3 className="text-lg font-bold text-white mb-4">1. Select Network</h3>
          
          <div className="grid grid-cols-2 gap-3 mb-6">
            {NETWORKS.map((net) => (
              <button
                key={net.id}
                onClick={() => setSelectedNetwork(net)}
                className={`p-3 rounded-xl font-bold text-xs transition-all border ${
                  selectedNetwork.id === net.id
                    ? `bg-white/10 border-[${net.color}] text-white shadow-lg`
                    : 'bg-black/40 border-white/5 text-gray-400 hover:bg-white/5'
                }`}
                style={{ borderColor: selectedNetwork.id === net.id ? net.color : undefined }}
              >
                {net.name}
              </button>
            ))}
          </div>

          <BlockchainAnimation color={selectedNetwork.color} />

          <h3 className="text-lg font-bold text-white mb-3">2. Send USDT</h3>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex items-center justify-between mb-3 relative z-10">
              <span className="text-xs text-gray-400 font-medium">Deposit Address</span>
              <QrCode className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex items-center gap-3 relative z-10">
              <code className="flex-1 bg-black/50 p-2 rounded-lg text-xs text-cyan-400 break-all font-mono">
                {selectedNetwork.address}
              </code>
              <button
                onClick={handleCopy}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors shrink-0 active:scale-95"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-white" />}
              </button>
            </div>
          </div>
          
            <div className="flex items-start gap-2 p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-xs text-cyan-400">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <p>Send only USDT to this address via the {selectedNetwork.name} network.</p>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Amount & TXID */}
        <motion.div 
          initial={{ opacity: 0, x: 20, rotateY: 10 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 300 }}
          style={{ transformStyle: 'preserve-3d' }}
          className="bg-gradient-to-br from-black/80 to-black/40 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-xl"
        >
          <div className="relative z-10" style={{ transform: 'translateZ(10px)' }}>
            <h3 className="text-lg font-bold text-white mb-4">3. Confirm Deposit</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-3">Amount Sent (USDT)</label>
              <div className="relative mb-3">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-16 text-xl font-black text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 transition-all"
                  placeholder="0.00"
                  min="15"
                  max="3000"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-500 font-bold text-sm">
                  USDT
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1.5">
                {QUICK_AMOUNTS.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAmount(amt.toString())}
                    className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-medium text-gray-300 transition-colors active:scale-95"
                  >
                    {amt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2">Transaction ID (TXID)</label>
              <div className="relative">
                <input
                  type="text"
                  value={txid}
                  onChange={(e) => setTxid(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-20 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 transition-all font-mono text-xs"
                  placeholder="Paste hash here..."
                />
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      const text = await navigator.clipboard.readText();
                      setTxid(text);
                    } catch (err) {
                      console.error('Failed to read clipboard contents: ', err);
                    }
                  }}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold text-white transition-colors active:scale-95"
                >
                  Paste
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={!isValid}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-black text-white text-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
            >
              Submit Deposit <ArrowRight className="w-5 h-5" />
            </button>
          </form>
          </div>
        </motion.div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
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
              <h3 className="text-2xl font-black text-white mb-2">Deposit Submitted!</h3>
              <p className="text-gray-400 mb-8">Your deposit is pending confirmation. It will be credited to your balance shortly.</p>
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
