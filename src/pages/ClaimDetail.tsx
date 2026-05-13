import { useParams, Link } from 'react-router-dom';
import { FileDown, ShieldCheck, XCircle, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import FraudScoreGauge from '../components/FraudScoreGauge';
import ShapWaterfall from '../components/ShapWaterfall';
import CrossVerifyTable from '../components/CrossVerifyTable';
import RiskBadge from '../components/RiskBadge';
import FieldExtractCard from '../components/FieldExtractCard';

export default function ClaimDetail() {
  const { id } = useParams();

  // Mock data for the view
  const claimData = {
    id: id || 'CLM-10023',
    score: 0.88,
    label: 'HIGH' as const,
    extractedFields: {
      claimant_name: 'Rahul Sharma',
      hospital_name: 'Sunrise Care, Mumbai',
      bill_amount: 450000,
      admission_date: '2023-10-01',
      discharge_date: '2023-10-05',
      pan_number: 'ABCDE1234F',
    },
    anomalies: ['bill_amount', 'pan_number'], // Highlights NLP mismatches
    crossVerifications: [
      { service: 'NSDL PAN DB', status: 'MISMATCH' as const, message: 'Name on PAN does not match' },
      { service: 'Aadhaar UIDAI', status: 'VERIFIED' as const, message: 'Identity verified' },
      { service: 'Bank Account', status: 'NOT_FOUND' as const, message: 'Acc number invalid' },
      { service: 'ROHINI Registry', status: 'VERIFIED' as const, message: 'Hospital is registered' },
      { service: 'Vahan RC', status: 'PENDING' as const, message: 'Awaiting response' }
    ],
    shapFeatures: [
      { feature: 'Bill amount vs Procedure', contribution: 0.35, effect: 'positive' },
      { feature: 'Mismatch in PAN name', contribution: 0.28, effect: 'positive' },
      { feature: 'Frequent claim history', contribution: 0.15, effect: 'positive' },
      { feature: 'Valid hospital registration', contribution: -0.10, effect: 'negative' },
      { feature: 'Doctor signature match', contribution: -0.05, effect: 'negative' },
    ]
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] pb-20 animate-in fade-in duration-500 bg-surface">
      <div className="p-8 max-w-7xl mx-auto w-full space-y-8 flex-1">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <Link to="/claims" className="flex items-center text-sm font-semibold text-muted hover:text-dark transition-colors w-max">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to History
            </Link>
            <div className="flex items-center gap-4 mt-2">
              <h1 className="text-3xl font-sora font-semibold text-dark">Investigate Claim {claimData.id}</h1>
              <RiskBadge label={claimData.label} />
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center px-4 py-2 bg-card border border-border text-dark rounded-btn shadow-sm hover:bg-surface font-semibold transition-colors">
              <FileDown className="w-4 h-4 mr-2" /> Download PDF Report
            </button>
          </div>
        </div>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Col 1: Extracted Fields */}
          <div className="lg:col-span-1 border border-border rounded-card bg-card overflow-hidden shadow-card hover:shadow-lg transition-shadow">
             <FieldExtractCard fields={claimData.extractedFields} anomalies={claimData.anomalies} />
          </div>

          {/* Col 2: Gauge & Forensics */}
          <div className="lg:col-span-1 space-y-8 flex flex-col">
            <div className="bg-card rounded-card shadow-card border border-border p-6 flex flex-col items-center flex-1 transition-shadow hover:shadow-lg">
              <h3 className="text-dark font-sora font-semibold w-full text-left mb-6">Fraud Propensity</h3>
               <FraudScoreGauge score={claimData.score} label={claimData.label} />
               <p className="text-sm text-muted mt-4 text-center">Calculated across 42 factors via XGBoost & CNN</p>
            </div>
            
            <div className="bg-card rounded-card shadow-card border border-border p-6">
               <h3 className="text-dark font-sora font-semibold mb-4 flex items-center gap-2">
                 <ImageIcon className="w-5 h-5 text-muted" /> Document Forensics
               </h3>
               <div className="p-4 bg-danger-bg border text-danger-text border-danger-text/20 rounded-lg text-sm">
                 <p className="font-semibold mb-1">EXIF Data Analysis</p>
                 <ul className="list-disc pl-4 space-y-1">
                   <li>Metadata stripped by Photoshop v21.0</li>
                   <li>Bill header text overlay detected</li>
                 </ul>
               </div>
            </div>
          </div>

          {/* Col 3: Cross Verification */}
          <div className="lg:col-span-1 bg-card rounded-card shadow-card border border-border p-6 hover:shadow-lg transition-shadow">
             <h3 className="text-dark font-sora font-semibold mb-6 text-left">3rd Party Cross-Verification</h3>
             <CrossVerifyTable results={claimData.crossVerifications} />
          </div>
        </div>

        {/* ML Explainability Component */}
        <div className="bg-card rounded-card shadow-card border border-border p-8 mt-8">
          <h2 className="text-xl font-sora font-semibold text-dark mb-4">Why was this score assigned? (SHAP Analysis)</h2>
          <p className="text-sm text-muted mb-8 max-w-3xl">This chart explains the machine learning model's reasoning. Red bars indicate features that drove the fraud score UP (higher risk), while blue bars show features that pushed the score DOWN.</p>
          <ShapWaterfall features={claimData.shapFeatures} />
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 bg-card border-t border-border w-full py-4 shadow-[0_-4px_16px_rgba(0,0,0,0.05)] z-20">
        <div className="max-w-7xl mx-auto px-8 flex justify-end gap-3">
          <button className="flex items-center px-6 py-2.5 bg-danger-bg text-danger-text border border-danger-text/20 font-bold rounded-btn transition-colors hover:bg-danger-bg/80 shadow-sm">
            <XCircle className="w-5 h-5 mr-2" /> REJECT CLAIM
          </button>
          <button className="flex items-center px-6 py-2.5 bg-success-text text-white font-bold rounded-btn transition-colors hover:bg-success-text/90 shadow-sm">
            <ShieldCheck className="w-5 h-5 mr-2" /> APPROVE CLAIM
          </button>
        </div>
      </div>
    </div>
  );
}
