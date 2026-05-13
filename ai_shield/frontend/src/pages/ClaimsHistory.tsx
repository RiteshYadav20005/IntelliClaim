import { Link } from 'react-router-dom';

export default function ClaimsHistory() {
  const claims = [
    { id: 'CLM-001', date: '2026-05-13', name: 'Ritesh Yadav', amount: '₹ 50,000', score: 0.88, label: 'HIGH' },
    { id: 'CLM-002', date: '2026-05-13', name: 'Aman Sharma', amount: '₹ 12,000', score: 0.12, label: 'LOW' },
    { id: 'CLM-003', date: '2026-05-12', name: 'Priya Patel', amount: '₹ 85,000', score: 0.45, label: 'MEDIUM' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Claims History</h1>
      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Claim ID</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Claimant</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Amount</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Fraud Score</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Risk Label</th>
              <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">View</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {claims.map((claim) => (
              <tr key={claim.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{claim.id}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{claim.date}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{claim.name}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{claim.amount}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm font-mono text-gray-500">{claim.score.toFixed(2)}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {claim.label === 'HIGH' && <span className="inline-flex rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">HIGH</span>}
                  {claim.label === 'MEDIUM' && <span className="inline-flex rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/10">MEDIUM</span>}
                  {claim.label === 'LOW' && <span className="inline-flex rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">LOW</span>}
                </td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <Link to={`/claims/${claim.id}`} className="text-blue-600 hover:text-blue-900">View<span className="sr-only">, {claim.id}</span></Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
