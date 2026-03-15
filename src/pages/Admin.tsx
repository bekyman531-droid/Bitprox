import { useStore } from '../store';
import { motion } from 'motion/react';
import { ShieldAlert, Users, Activity, DollarSign } from 'lucide-react';

export function Admin() {
  const user = useStore(s => s.user);

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 relative z-10">
        <div className="bg-red-500/10 border border-red-500/30 rounded-3xl p-8 max-w-md w-full text-center">
          <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-white mb-2">Access Denied</h2>
          <p className="text-gray-400">You do not have permission to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Admin Dashboard</h1>
          <p className="text-gray-400 font-medium">Platform overview and management</p>
        </div>
        <div className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl font-bold text-sm flex items-center gap-2">
          <ShieldAlert className="w-4 h-4" /> Admin Mode
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Users', value: '124,592', icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/20' },
          { label: 'Active Investments', value: '$45.2M', icon: Activity, color: 'text-green-400', bg: 'bg-green-500/20' },
          { label: 'Pending Withdrawals', value: '$125K', icon: DollarSign, color: 'text-cyan-400', bg: 'bg-cyan-500/20' },
          { label: 'System Status', value: 'Healthy', icon: ShieldAlert, color: 'text-purple-400', bg: 'bg-purple-500/20' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20, rotateX: 10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            whileHover={{ scale: 1.05, y: -5, rotateX: 5, rotateY: 5 }}
            transition={{ delay: i * 0.1, duration: 0.6, type: "spring", stiffness: 300 }}
            style={{ transformStyle: 'preserve-3d' }}
            className="p-6 rounded-3xl bg-gradient-to-br from-black/80 to-black/40 border-t border-l border-white/20 border-r border-b border-white/5 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
          >
            <div style={{ transform: 'translateZ(20px)' }}>
              <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center mb-4 shadow-inner`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <p className="text-gray-400 font-medium mb-1">{stat.label}</p>
              <h2 className="text-3xl font-black text-white">{stat.value}</h2>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-gradient-to-br from-black/80 to-black/40 border-t border-l border-white/20 border-r border-b border-white/5 rounded-3xl p-6 backdrop-blur-xl shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
      >
        <h3 className="text-xl font-bold text-white mb-6">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 text-sm">
                <th className="pb-4 font-medium">User</th>
                <th className="pb-4 font-medium">Type</th>
                <th className="pb-4 font-medium">Amount</th>
                <th className="pb-4 font-medium">Status</th>
                <th className="pb-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 font-medium text-white">user_{Math.floor(Math.random() * 9000) + 1000}</td>
                  <td className="py-4 text-gray-400">Withdrawal</td>
                  <td className="py-4 font-bold text-cyan-400">{Math.floor(Math.random() * 500) + 50} USDT</td>
                  <td className="py-4">
                    <span className="px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold">Pending</span>
                  </td>
                  <td className="py-4 text-right">
                    <button className="px-3 py-1 bg-green-500/20 text-green-400 hover:bg-green-500/30 rounded-lg font-bold text-xs transition-colors mr-2">
                      Approve
                    </button>
                    <button className="px-3 py-1 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg font-bold text-xs transition-colors">
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
