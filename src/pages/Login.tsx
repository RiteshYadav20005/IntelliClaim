import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, AlertCircle } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setError('');
    // Mock login success
    navigate('/');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-surface flex-col">
      {/* Dynamic Background Graphics */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[100px]" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary-light/10 blur-[100px]" />
      </div>
      
      <div className="w-full max-w-md bg-white border border-border shadow-card rounded-card p-10 relative z-10 animate-in fade-in zoom-in-95 duration-500">
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-surface rounded-2xl mb-4 text-primary">
            <ShieldAlert className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold font-sora text-dark tracking-tight">IntelliClaim</h2>
          <p className="text-sm text-muted mt-2 text-center">Enter your investigator credentials to access the Fraud Detection Platform</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-danger-bg text-danger-text p-3 rounded-btn flex items-center gap-2 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" /> {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-semibold text-dark mb-1.5" htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              className="w-full px-4 py-3 border border-border rounded-btn bg-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-dark"
              placeholder="investigator@intelliclaim.ai"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-dark mb-1.5" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              className="w-full px-4 py-3 border border-border rounded-btn bg-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-dark"
              placeholder="••••••••"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-light text-white font-semibold py-3 px-4 rounded-btn shadow-sm transition-all focus:ring-2 focus:ring-offset-2 focus:ring-primary active:scale-[0.98]"
          >
            Sign in to Dashboard
          </button>
        </form>
      </div>
      
      <div className="mt-8 text-center text-xs text-muted relative z-10 animate-in fade-in duration-500 delay-200">
         <p>© 2026 IntelliClaim Auth Gateway</p>
         <p>IRDAI Regulatory Compliance Framework v2.0</p>
      </div>
    </div>
  );
}
