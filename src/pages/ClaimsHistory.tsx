import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Search, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import RiskBadge from '../components/RiskBadge';

const MOCK_CLAIMS = Array.from({ length: 45 }).map((_, i) => ({
  id: `CLM-100${i}`,
  date: `2026-05-${String((i % 30) + 1).padStart(2, '0')}`,
  name: i % 2 === 0 ? 'Rahul Sharma' : 'Anjali Gupta',
  amount: `₹ ${(10000 + (i * 5000)).toLocaleString('en-IN')}`,
  score: i % 5 === 0 ? 0.88 : (i % 3 === 0 ? 0.45 : 0.12),
  label: (i % 5 === 0 ? 'HIGH' : (i % 3 === 0 ? 'MEDIUM' : 'LOW')) as 'HIGH' | 'MEDIUM' | 'LOW',
}));

export default function ClaimsHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const rowsPerPage = 20;

  const filtered = MOCK_CLAIMS.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.id.toLowerCase().includes(searchTerm.toLowerCase()));
  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const displayed = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <div className="p-8 max-w-[1400px] mx-auto flex gap-8 animate-in fade-in duration-500 bg-surface min-h-[calc(100vh-4rem)]">
      {/* Filter Sidebar */}
      <div className="w-64 flex-shrink-0 space-y-6">
        <div className="bg-card rounded-card shadow-card border border-border p-5">
           <h3 className="font-sora font-semibold text-dark flex items-center gap-2 mb-4">
             <Filter className="w-4 h-4" /> Filters
           </h3>
           <div className="space-y-4">
             <div>
               <label className="block text-sm font-medium text-muted mb-1.5">Date Range</label>
               <input type="date" className="w-full text-sm border-border rounded-btn p-2 text-dark bg-surface focus:ring-1 focus:ring-primary focus:border-primary outline-none" />
               <input type="date" className="w-full text-sm border-border rounded-btn p-2 mt-2 text-dark bg-surface focus:ring-1 focus:ring-primary focus:border-primary outline-none" />
             </div>
             <div>
               <label className="block text-sm font-medium text-muted mb-1.5">Risk Level</label>
               <select className="w-full text-sm border-border rounded-btn p-2 text-dark bg-surface focus:ring-1 focus:ring-primary outline-none">
                 <option>All Levels</option>
                 <option>High Risk</option>
                 <option>Medium Risk</option>
                 <option>Low Risk</option>
               </select>
             </div>
           </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 space-y-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-sora font-semibold text-dark">Claims History</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search IDs, names..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 border border-border rounded-btn text-sm w-64 bg-card focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <button className="flex items-center px-4 py-2 bg-card border border-border text-dark rounded-btn shadow-sm hover:bg-surface font-semibold transition-colors text-sm">
              <Download className="w-4 h-4 mr-2" /> Export CSV
            </button>
          </div>
        </div>

        <div className="bg-card border text-left border-border rounded-card shadow-card overflow-hidden">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-surface/50">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-muted uppercase tracking-wider">Claim ID</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-muted uppercase tracking-wider">Date</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-muted uppercase tracking-wider">Claimant</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-muted uppercase tracking-wider">Amount</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-muted uppercase tracking-wider">Fraud Score</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-muted uppercase tracking-wider">Risk Level</th>
                <th className="py-3 px-6 text-right text-xs font-medium text-muted uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {displayed.map((claim) => (
                <tr key={claim.id} className="hover:bg-surface/50 transition-colors group">
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-dark">{claim.id}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-muted">{claim.date}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-dark">{claim.name}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-dark">{claim.amount}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-mono text-dark font-medium">{claim.score.toFixed(2)}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <RiskBadge label={claim.label} />
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <Link to={`/claims/${claim.id}`}>
                      <button className="text-primary hover:text-primary-light px-4 py-1.5 rounded-btn border border-primary/20 hover:bg-primary/5 transition-all opacity-0 group-hover:opacity-100">
                        View
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Pagination */}
          <div className="px-6 py-4 border-t border-border flex items-center justify-between bg-surface/30">
             <span className="text-sm text-muted">
               Showing <span className="font-medium text-dark">{Math.min(filtered.length, (page - 1) * rowsPerPage + 1)}</span> to <span className="font-medium text-dark">{Math.min(filtered.length, page * rowsPerPage)}</span> of <span className="font-medium text-dark">{filtered.length}</span> results
             </span>
             <div className="flex gap-2">
               <button 
                 disabled={page === 1} 
                 onClick={() => setPage(p => p - 1)}
                 className="p-1 border border-border rounded-btn bg-card disabled:opacity-50 hover:bg-surface flex items-center"
               >
                 <ChevronLeft className="w-5 h-5 text-dark" />
               </button>
               <button 
                 disabled={page === totalPages} 
                 onClick={() => setPage(p => p + 1)}
                 className="p-1 border border-border rounded-btn bg-card disabled:opacity-50 hover:bg-surface flex items-center"
               >
                 <ChevronRight className="w-5 h-5 text-dark" />
               </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
