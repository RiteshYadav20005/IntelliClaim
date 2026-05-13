import React from 'react';
import { AlertTriangle } from 'lucide-react';

type ExtractedFields = {
  claimant_name?: string | null;
  hospital_name?: string | null;
  bill_amount?: number | null;
  admission_date?: string | null;
  discharge_date?: string | null;
  pan_number?: string | null;
  [key: string]: any;
};

type FieldExtractCardProps = {
  fields: ExtractedFields;
  anomalies?: string[]; // Keys of fields that are considered anomalous
};

export default function FieldExtractCard({ fields, anomalies = [] }: FieldExtractCardProps) {
  const displayFields = [
    { key: 'claimant_name', label: 'Claimant Name' },
    { key: 'hospital_name', label: 'Hospital' },
    { key: 'bill_amount', label: 'Bill Amount' },
    { key: 'admission_date', label: 'Admission' },
    { key: 'discharge_date', label: 'Discharge' },
    { key: 'pan_number', label: 'PAN Number' },
  ];

  return (
    <div className="bg-card rounded-card shadow-card border border-border p-6 h-full">
      <h3 className="text-dark font-sora font-semibold mb-6">Extracted Entities (NLP)</h3>
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
        {displayFields.map((fieldDef) => {
          const val = fields[fieldDef.key];
          const isAnomaly = anomalies.includes(fieldDef.key);
          
          return (
            <div key={fieldDef.key} className={`p-3 rounded-lg border ${isAnomaly ? 'bg-danger-bg border-danger-text/20' : 'bg-surface border-transparent'}`}>
              <div className="flex items-center gap-1.5 text-muted mb-1">
                {isAnomaly && <AlertTriangle className="h-4 w-4 text-danger-text" />}
                <span>{fieldDef.label}</span>
              </div>
              <p className={`font-semibold ${isAnomaly ? 'text-danger-text' : 'text-dark'} truncate`} title={String(val || 'N/A')}>
                {fieldDef.key === 'bill_amount' && val ? `₹ ${val.toLocaleString('en-IN')}` : (val || 'N/A')}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
