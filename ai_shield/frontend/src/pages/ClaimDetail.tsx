import { useParams } from 'react-router-dom';
import { FileText, Download } from 'lucide-react';

export default function ClaimDetail() {
  const { id } = useParams();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Investigation Report: {id}</h1>
          <p className="text-sm text-gray-500">Submitted on: 2026-05-13 09:30 AM</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 shadow-sm text-sm font-medium">
          <Download className="w-4 h-4" />
          Download PDF
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Score Card */}
        <div className="col-span-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col items-center justify-center">
          <h3 className="text-gray-500 font-medium text-sm mb-4 w-full text-left">Final Fraud Score</h3>
          <div className="relative flex items-center justify-center">
            {/* Simple mock gauge */}
            <svg className="w-32 h-32 transform -rotate-90">
              <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-100" />
              <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="376" strokeDashoffset={376 - (0.72 * 376)} className="text-red-500" />
            </svg>
            <div className="absolute text-3xl font-bold text-gray-900">0.72</div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 w-full text-center">
            <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-sm font-medium text-red-700 ring-1 ring-inset ring-red-600/10">HIGH RISK</span>
            <p className="text-sm text-gray-500 mt-2">Action: Escalate to SIU</p>
          </div>
        </div>

        {/* NLP Extraction Card */}
        <div className="col-span-1 md:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 font-semibold mb-4">Extracted Information</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><span className="text-gray-500">Claimant Name</span><p className="font-medium">Ritesh Yadav</p></div>
            <div><span className="text-gray-500">Hospital</span><p className="font-medium">Apollo Diagnostics</p></div>
            <div><span className="text-gray-500">Bill Amount</span><p className="font-medium">₹ 50,000</p></div>
            <div><span className="text-gray-500">Admission</span><p className="font-medium">10/05/2026</p></div>
            <div><span className="text-gray-500">Discharge</span><p className="font-medium">12/05/2026</p></div>
            <div><span className="text-gray-500">PAN</span><p className="font-medium">ABCDE1234F</p></div>
          </div>
        </div>
        
        {/* SHAP Chart (Mocked) */}
        <div className="col-span-1 md:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 font-semibold mb-4 text-sm">Top Fraud Drivers (SHAP)</h3>
          <div className="space-y-4">
             {/* Mock bars */}
             <div className="flex items-center text-sm"><div className="w-1/3 truncate text-gray-500">claim_amount</div><div className="flex-1 ml-4"><div className="h-4 bg-red-400 rounded-sm" style={{width: '80%'}}></div></div><div className="w-12 text-right text-gray-700">+0.45</div></div>
             <div className="flex items-center text-sm"><div className="w-1/3 truncate text-gray-500">duplicate_pan_flag</div><div className="flex-1 ml-4"><div className="h-4 bg-red-400 rounded-sm" style={{width: '60%'}}></div></div><div className="w-12 text-right text-gray-700">+0.25</div></div>
             <div className="flex items-center text-sm"><div className="w-1/3 truncate text-gray-500">stay_days</div><div className="flex-1 ml-4"><div className="h-4 bg-blue-400 rounded-sm" style={{width: '15%'}}></div></div><div className="w-12 text-right text-gray-700">-0.05</div></div>
          </div>
        </div>

        {/* Cross Verification */}
        <div className="col-span-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 font-semibold mb-4 text-sm">Gov API Cross-Verification</h3>
          <ul className="space-y-3">
             <li className="flex justify-between items-center text-sm border-b pb-2"><span className="text-gray-500">NSDL (PAN)</span><span className="text-green-600 font-medium font-mono">VERIFIED</span></li>
             <li className="flex justify-between items-center text-sm border-b pb-2"><span className="text-gray-500">UIDAI (Aadhaar)</span><span className="text-amber-500 font-medium font-mono">MISMATCH</span></li>
             <li className="flex justify-between items-center text-sm border-b pb-2"><span className="text-gray-500">VAHAN (RC)</span><span className="text-gray-400 font-medium font-mono">N/A</span></li>
             <li className="flex justify-between items-center text-sm"><span className="text-gray-500">Bank (IMPS)</span><span className="text-green-600 font-medium font-mono">VERIFIED</span></li>
          </ul>
        </div>
        
      </div>
    </div>
  );
}
