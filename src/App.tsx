/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store';
import { Layout } from './components/Layout';
import { ThreeBackground } from './components/ThreeBackground';
import { AIChatbot } from './components/AIChatbot';

import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { About } from './pages/About';
import { Certificates } from './pages/Certificates';

import { Dashboard } from './pages/Dashboard';
import { Invest } from './pages/Invest';
import { Deposit } from './pages/Deposit';
import { Withdraw } from './pages/Withdraw';
import { Referrals } from './pages/Referrals';
import { Leaderboard } from './pages/Leaderboard';
import { Admin } from './pages/Admin';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useStore(s => s.user);
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <ThreeBackground />
      <Routes>
        <Route element={<Layout />}>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/certificates" element={<Certificates />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/invest" element={<ProtectedRoute><Invest /></ProtectedRoute>} />
          <Route path="/deposit" element={<ProtectedRoute><Deposit /></ProtectedRoute>} />
          <Route path="/withdraw" element={<ProtectedRoute><Withdraw /></ProtectedRoute>} />
          <Route path="/referrals" element={<ProtectedRoute><Referrals /></ProtectedRoute>} />
          <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
      <AIChatbot />
    </BrowserRouter>
  );
}
