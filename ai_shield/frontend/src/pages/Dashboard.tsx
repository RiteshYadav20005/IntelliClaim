import { Link } from 'react-router-dom';
import { Activity, CheckCircle, AlertTriangle, FileWarning, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { name: 'Total Claims Today', value: '1,240', icon: Activity, color: 'text-blue-600' },
    { name: 'Fraud Detected', value: '62', icon: FileWarning, color: 'text-red-600' },
    { name: 'Auto-Approved', value: '850', icon: CheckCircle, color: 'text-green-600' },
    { name: 'Manual Review', value: '328', icon: AlertTriangle, color: 'text-amber-500' },
  ];

  const recentClaims = [
    { id: 'CLM-001', time: '10 mins ago', status: 'COMPLETED', score: 0.88, label: 'HIGH' },
    { id: 'CLM-002', time: '15 mins ago', status: 'COMPLETED', score: 0.12, label: 'LOW' },
    { id: 'CLM-003', time: '22 mins ago', status: 'PROCESSING', score: null, label: 'PENDING' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="overflow-hidden bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Icon className={`h-6 w-6 ${stat.color}`} aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-500">{stat.name}</dt>
                    <dd>
                      <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-base font-semibold leading-6 text-gray-900">Recent Activity Feed</h3>
          <Link to="/claims" className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center">
            View all claims <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <ul role="list" className="divide-y divide-gray-200">
          {recentClaims.map((claim) => (
            <li key={claim.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">{claim.id}</span>
                <span className="text-sm text-gray-500">{claim.time}</span>
              </div>
              <div className="flex items-center gap-4">
                {claim.label === 'HIGH' && <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">HIGH RISK</span>}
                {claim.label === 'LOW' && <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">LOW RISK</span>}
                {claim.label === 'PENDING' && <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">PROCESSING</span>}
                
                <span className="text-sm font-mono text-gray-500 w-12 text-right">
                  {claim.score !== null ? claim.score.toFixed(2) : '--'}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
