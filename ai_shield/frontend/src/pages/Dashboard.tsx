import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, TrendingUp, ShieldCheck, Activity, ArrowRight, Banknote } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, CartesianGrid } from 'recharts';
import RiskBadge from '../components/RiskBadge';

export default function Dashboard() {
  const stats = [
    { name: 'Total Claims Today', value: '1,240', icon: Activity, color: 'text-primary' },
    { name: 'Flagged (HIGH)', value: '62', icon: AlertTriangle, color: 'text-danger-text' },
    { name: 'Avg Fraud Score', value: '0.24', icon: TrendingUp, color: 'text-warning-text' },
    { name: 'Fraud Loss Prevented', value: '₹ 2.4 Cr', icon: Banknote, color: 'text-success-text' },
  ];

  const recentClaims: any[] = [
    { id: 'CLM-001', time: '10 mins ago', status: 'COMPLETED', score: 0.88, label: 'HIGH' },
    { id: 'CLM-002', time: '15 mins ago', status: 'COMPLETED', score: 0.12, label: 'LOW' },
    { id: 'CLM-003', time: '22 mins ago', status: 'PROCESSING', score: null, label: 'PENDING' },
    { id: 'CLM-004', time: '1 hr ago', status: 'COMPLETED', score: 0.45, label: 'MEDIUM' },
    { id: 'CLM-005', time: '1.5 hrs ago', status: 'COMPLETED', score: 0.05, label: 'LOW' },
    { id: 'CLM-006', time: '2 hrs ago', status: 'COMPLETED', score: 0.76, label: 'HIGH' },
    { id: 'CLM-007', time: '3 hrs ago', status: 'COMPLETED', score: 0.22, label: 'LOW' },
  ];

  const weeklyData = [
    { day: 'Mon', 'LOW': 400, 'MEDIUM': 50, 'HIGH': 15 },
    { day: 'Tue', 'LOW': 300, 'MEDIUM': 60, 'HIGH': 20 },
    { day: 'Wed', 'LOW': 550, 'MEDIUM': 40, 'HIGH': 12 },
    { day: 'Thu', 'LOW': 450, 'MEDIUM': 70, 'HIGH': 25 },
    { day: 'Fri', 'LOW': 600, 'MEDIUM': 80, 'HIGH': 30 },
  ];

  const trendData = [
    { day: '1', score: 0.2 }, { day: '2', score: 0.22 }, { day: '3', score: 0.18 }, 
    { day: '4', score: 0.25 }, { day: '5', score: 0.24 }, { day: '6', score: 0.28 },
    { day: '7', score: 0.21 }, { day: '8', score: 0.19 }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-sora font-semibold text-dark">Dashboard Overview</h1>
        <p className="text-muted text-sm border bg-white px-4 py-1.5 rounded-full shadow-sm">Last update: Real-time</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-card shadow-card border border-border p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-surface ${stat.color}`}>
                  <Icon className="h-6 w-6" strokeWidth={2} />
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted">{stat.name}</dt>
                  <dd className="text-2xl font-bold text-dark mt-1">{stat.value}</dd>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-card shadow-card border border-border p-6 h-96">
          <h2 className="text-lg font-sora font-semibold text-dark mb-6">Claims by Risk Level (Weekly)</h2>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#546E7A'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#546E7A'}} />
              <Tooltip cursor={{ fill: '#F0F4FF' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="LOW" stackId="a" fill="#D4EDDA" radius={[0, 0, 4, 4]} />
              <Bar dataKey="MEDIUM" stackId="a" fill="#FFF3E0" />
              <Bar dataKey="HIGH" stackId="a" fill="#FFEBEE" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-card shadow-card border border-border p-6 h-96">
          <h2 className="text-lg font-sora font-semibold text-dark mb-6">Avg Fraud Score Trend (30 Days)</h2>
          <ResponsiveContainer width="100%" height="90%">
            <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0D47A1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0D47A1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#546E7A'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#546E7A'}} domain={[0.1, 0.35]} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} />
              <Area type="monotone" dataKey="score" stroke="#0D47A1" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-card shadow-card border border-border overflow-hidden">
        <div className="px-6 py-5 border-b border-border flex justify-between items-center bg-surface/50">
          <h3 className="text-xl font-sora font-semibold text-dark">Real-time Claims Feed</h3>
          <Link to="/claims" className="text-sm font-semibold text-primary hover:text-primary-light flex items-center transition-colors">
            View all claims <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border text-left">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-4 text-sm font-medium text-muted uppercase tracking-wider">Claim ID</th>
                <th className="px-6 py-4 text-sm font-medium text-muted uppercase tracking-wider">Uploaded</th>
                <th className="px-6 py-4 text-sm font-medium text-muted uppercase tracking-wider">Fraud Score</th>
                <th className="px-6 py-4 text-sm font-medium text-muted uppercase tracking-wider">Risk Level</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-muted uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-white">
              {recentClaims.map((claim) => (
                <tr key={claim.id} className="hover:bg-surface transition-colors group">
                  <td className="px-6 py-4 text-sm font-semibold text-dark whitespace-nowrap">{claim.id}</td>
                  <td className="px-6 py-4 text-sm text-muted whitespace-nowrap">{claim.time}</td>
                  <td className="px-6 py-4 text-sm font-mono text-dark font-medium whitespace-nowrap">
                    {claim.score !== null ? claim.score.toFixed(2) : '--'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <RiskBadge label={claim.label} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                     <Link to={`/claims/${claim.id}`}>
                       <button className="text-primary hover:text-primary-light px-4 py-1.5 rounded-btn border border-primary/20 hover:bg-primary/5 transition-all opacity-0 group-hover:opacity-100">
                         View Case
                       </button>
                     </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
