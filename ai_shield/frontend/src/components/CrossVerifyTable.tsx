import React from 'react';
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-react';

type VerificationResult = {
  service: string;
  status: 'VERIFIED' | 'MISMATCH' | 'NOT_FOUND' | 'PENDING';
  message: string;
};

type CrossVerifyTableProps = {
  results: VerificationResult[];
};

export default function CrossVerifyTable({ results }: CrossVerifyTableProps) {
  return (
    <div className="overflow-hidden bg-white shadow-card sm:rounded-card border border-border">
      <table className="min-w-full divide-y divide-border">
        <thead className="bg-surface">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-muted uppercase">Service</th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-muted uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-muted uppercase">Message</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-white">
          {results.map((item, idx) => (
            <tr key={idx} className="hover:bg-gray-50 transition-colors">
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-dark">{item.service}</td>
              <td className="whitespace-nowrap px-6 py-4 text-sm">
                <div className="flex items-center gap-2">
                  {item.status === 'VERIFIED' && <CheckCircle2 className="h-5 w-5 text-success-text" />}
                  {item.status === 'MISMATCH' && <XCircle className="h-5 w-5 text-danger-text" />}
                  {item.status === 'NOT_FOUND' && <HelpCircle className="h-5 w-5 text-warning-text" />}
                  {item.status === 'PENDING' && <div className="h-4 w-4 rounded-full border-2 border-gray-300 border-t-primary animate-spin" />}
                  <span className={`font-semibold ${
                    item.status === 'VERIFIED' ? 'text-success-text' :
                    item.status === 'MISMATCH' ? 'text-danger-text' :
                    item.status === 'NOT_FOUND' ? 'text-warning-text' : 'text-gray-500'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs" title={item.message}>
                {item.message}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
