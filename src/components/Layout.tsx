import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { motion, AnimatePresence } from 'motion/react';
import { LogOut, LayoutDashboard, TrendingUp, Wallet, Users, Trophy, Award, Info, Home, LogIn, UserPlus, ArrowLeft, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const NOTIFICATIONS = [
  "🚀 demo invested 600 USDT in VIP",
  "💰 admin earned 150 USDT from referrals",
  "🎉 New user joined BitProx",
  "🏆 crypto_king reached Elite level",
  "💎 whale99 withdrew 1,000 USDT",
  "⭐ satoshi became top earner today"
];

function LiveNotifications() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % NOTIFICATIONS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-48 md:bottom-32 right-4 z-50 pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          className="bg-black/60 backdrop-blur-md border border-cyan-500/30 text-white px-4 py-3 rounded-xl shadow-2xl shadow-cyan-500/20 flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center animate-spin-slow">
            <span className="text-white font-bold text-xs">BP</span>
          </div>
          <p className="text-sm font-medium">{NOTIFICATIONS[current]}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function Layout() {
  const { user, logout } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const publicLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Certificates', path: '/certificates', icon: Award },
    { name: 'Login', path: '/login', icon: LogIn },
    { name: 'Register', path: '/register', icon: UserPlus },
  ];

  const privateLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Invest', path: '/invest', icon: TrendingUp },
    { name: 'Deposit', path: '/deposit', icon: Wallet },
    { name: 'Withdraw', path: '/withdraw', icon: Wallet },
    { name: 'Referrals', path: '/referrals', icon: Users },
    { name: 'Leaderboard', path: '/leaderboard', icon: Trophy },
  ];

  const links = user ? privateLinks : publicLinks;

  return (
    <div className="min-h-screen flex flex-col text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-black/60 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              {location.pathname !== '/' && location.pathname !== '/dashboard' && (
                <button
                  onClick={() => navigate(-1)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all active:scale-95"
                  title="Go Back"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <Link to="/" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                  <span className="text-white font-black text-xl tracking-tighter">BP</span>
                </div>
                <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-white">BitProx</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {links.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                      isActive 
                        ? 'bg-white/10 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]' 
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.name}
                  </Link>
                );
              })}
              {user && (
                <button
                  onClick={handleLogout}
                  className="ml-4 px-4 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-white active:scale-95 transition-all"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/10 bg-black/90 backdrop-blur-2xl overflow-hidden"
            >
              <div className="px-4 py-6 space-y-2">
                {links.map((link) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`w-full px-4 py-4 rounded-xl text-lg font-bold flex items-center gap-4 transition-all ${
                        isActive 
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                          : 'text-gray-300 hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                      {link.name}
                    </Link>
                  );
                })}
                {user && (
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-4 rounded-xl text-lg font-bold text-red-400 flex items-center gap-4 hover:bg-red-500/10 transition-all"
                  >
                    <LogOut className="w-6 h-6" />
                    Logout
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex-1 w-full flex flex-col pb-24 md:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="w-full flex flex-col"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Navigation */}
      {user && (
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-black/80 backdrop-blur-xl border-t border-white/10 px-4 py-3 safe-area-bottom">
          <div className="flex items-center justify-around max-w-lg mx-auto">
            {[
              { name: 'Home', path: '/dashboard', icon: LayoutDashboard },
              { name: 'Invest', path: '/invest', icon: TrendingUp },
              { name: 'Deposit', path: '/deposit', icon: Wallet },
              { name: 'Network', path: '/referrals', icon: Users },
            ].map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex flex-col items-center gap-1.5 px-3 transition-all ${
                    isActive ? 'text-cyan-400' : 'text-gray-500'
                  }`}
                >
                  <div className={`p-1 rounded-lg transition-all ${isActive ? 'bg-cyan-500/10' : ''}`}>
                    <Icon className={`w-6 h-6 ${isActive ? 'scale-110' : ''}`} />
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-tighter transition-all ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
