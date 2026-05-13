import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import React from 'react';

type RiskBadgeProps = {
  label: 'LOW' | 'MEDIUM' | 'HIGH' | 'PENDING';
};

export default function RiskBadge({ label }: RiskBadgeProps) {
  if (label === 'HIGH') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-badge bg-danger-bg px-2.5 py-1 text-xs font-semibold text-danger-text ring-1 ring-inset ring-danger-text/20 animate-pulse">
        <AlertTriangle className="h-3.5 w-3.5" /> HIGH RISK
      </span>
    );
  }
  if (label === 'MEDIUM') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-badge bg-warning-bg px-2.5 py-1 text-xs font-semibold text-warning-text ring-1 ring-inset ring-warning-text/20">
        <AlertCircle className="h-3.5 w-3.5" /> MEDIUM RISK
      </span>
    );
  }
  if (label === 'LOW') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-badge bg-success-bg px-2.5 py-1 text-xs font-semibold text-success-text ring-1 ring-inset ring-success-text/20">
        <CheckCircle className="h-3.5 w-3.5" /> LOW RISK
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-badge bg-surface px-2.5 py-1 text-xs font-semibold text-muted ring-1 ring-inset ring-gray-600/20">
      <div className="w-3.5 h-3.5 border-2 border-border border-t-transparent rounded-full animate-spin"></div> PROCESSING
    </span>
  );
}
