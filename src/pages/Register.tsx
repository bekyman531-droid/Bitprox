import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { UserPlus, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useStore } from '../store';

export function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const register = useStore((s) => s.register);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !username || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    if (register(email, username, password)) {
      navigate('/login');
    } else {
      setError('Email already exists');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="w-full max-w-md p-8 rounded-3xl bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-2xl border-t border-l border-white/20 border-r border-b border-white/5 shadow-[0_30px_60px_rgba(0,0,0,0.5)] relative overflow-hidden"
      >
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl" style={{ transform: 'translateZ(-20px)' }} />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500/20 rounded-full blur-3xl" style={{ transform: 'translateZ(-20px)' }} />

        <div className="relative z-10" style={{ transform: 'translateZ(30px)' }}>
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-white mb-2 tracking-tight">Join BitProx</h2>
            <p className="text-gray-400 font-medium">Create your account to start earning</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm font-medium text-center"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-medium"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-medium"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-white text-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all"
            >
              Create Account <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-cyan-400 font-bold hover:underline">
              Log in here
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
