import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type User = {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  balance: number;
  totalInvested: number;
  totalEarned: number;
  referralCount: number;
  totalCommission: number;
};

export type InvestmentPlan = {
  id: string;
  name: string;
  dailyRate: number;
  minAmount: number;
  maxAmount: number;
  durationDays: number;
  tier: string;
};

export const PLANS: InvestmentPlan[] = [
  { id: 'starter', name: 'Starter', dailyRate: 5, minAmount: 15, maxAmount: 3000, durationDays: 30, tier: 'Bronze' },
  { id: 'advanced', name: 'Advanced', dailyRate: 8, minAmount: 150, maxAmount: 3000, durationDays: 30, tier: 'Silver' },
  { id: 'vip', name: 'VIP', dailyRate: 12, minAmount: 600, maxAmount: 3000, durationDays: 30, tier: 'Gold' },
  { id: 'elite', name: 'Elite', dailyRate: 15, minAmount: 1500, maxAmount: 3000, durationDays: 30, tier: 'Diamond' },
];

export type ActiveInvestment = {
  id: string;
  planId: string;
  amount: number;
  startDate: string;
  endDate: string;
  earned: number;
  status: 'active' | 'completed';
};

export type Transaction = {
  id: string;
  type: 'deposit' | 'withdraw' | 'investment' | 'reward';
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  date: string;
  txid?: string;
  network?: string;
};

type StoreState = {
  user: User | null;
  registeredUsers: { email: string; username: string; pass: string; user: User }[];
  activeInvestments: ActiveInvestment[];
  transactions: Transaction[];
  login: (emailOrUsername: string, pass: string) => boolean;
  register: (email: string, username: string, pass: string) => boolean;
  logout: () => void;
  deposit: (amount: number, network: string, txid: string) => void;
  invest: (planId: string, amount: number) => boolean;
};

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      user: null,
      registeredUsers: [
        { email: 'admin', username: 'admin', pass: 'admin123', user: { id: 'a1', username: 'Admin', email: 'admin', role: 'admin', balance: 15000, totalInvested: 5000, totalEarned: 12000, referralCount: 24, totalCommission: 1250 } }
      ],
      activeInvestments: [],
      transactions: [],
      login: (emailOrUsername, pass) => {
        const state = get();
        const found = state.registeredUsers.find(
          u => (u.email === emailOrUsername || u.username === emailOrUsername) && u.pass === pass
        );
        if (found) {
          set({
            user: found.user,
            activeInvestments: [],
            transactions: [],
          });
          return true;
        }
        return false;
      },
      register: (email, username, pass) => {
        const state = get();
        if (state.registeredUsers.some(u => u.email === email || u.username === username)) {
          return false;
        }
        const newUser: User = {
          id: Math.random().toString(36).substring(7),
          username,
          email,
          role: 'user',
          balance: 0,
          totalInvested: 0,
          totalEarned: 0,
          referralCount: 0,
          totalCommission: 0
        };
        set({
          registeredUsers: [...state.registeredUsers, { email, username, pass, user: newUser }]
        });
        return true;
      },
      logout: () => set({ user: null, activeInvestments: [], transactions: [] }),
      deposit: (amount, network, txid) => {
        const newTx: Transaction = {
          id: Math.random().toString(36).substring(7),
          type: 'deposit',
          amount,
          status: 'pending',
          date: new Date().toISOString(),
          txid,
          network,
        };
        set((state) => ({ transactions: [newTx, ...state.transactions] }));
        
        // Simulate approval after 3 seconds
        setTimeout(() => {
          set((state) => {
            const txs = state.transactions.map(t => t.id === newTx.id ? { ...t, status: 'completed' as const } : t);
            if (state.user) {
              return { transactions: txs, user: { ...state.user, balance: state.user.balance + amount } };
            }
            return { transactions: txs };
          });
        }, 3000);
      },
      invest: (planId, amount) => {
        const state = get();
        if (!state.user || state.user.balance < amount) return false;
        
        const plan = PLANS.find(p => p.id === planId);
        if (!plan || amount < plan.minAmount || amount > plan.maxAmount) return false;

        const newInv: ActiveInvestment = {
          id: Math.random().toString(36).substring(7),
          planId,
          amount,
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + plan.durationDays * 24 * 60 * 60 * 1000).toISOString(),
          earned: 0,
          status: 'active',
        };

        const newTx: Transaction = {
          id: Math.random().toString(36).substring(7),
          type: 'investment',
          amount: -amount,
          status: 'completed',
          date: new Date().toISOString(),
        };

        set((state) => ({
          user: state.user ? { ...state.user, balance: state.user.balance - amount, totalInvested: state.user.totalInvested + amount } : null,
          activeInvestments: [newInv, ...state.activeInvestments],
          transactions: [newTx, ...state.transactions],
        }));
        return true;
      },
    }),
    {
      name: 'bitprox-storage',
    }
  )
);
