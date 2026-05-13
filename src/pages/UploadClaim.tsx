import React, { useState } from 'react';
import { UploadCloud, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StepperProgress from '../components/StepperProgress';

const STEPS = [
  { id: 'upload', name: 'Upload' },
  { id: 'ocr', name: 'OCR / Extraction' },
  { id: 'nlp', name: 'NLP Processing' },
  { id: 'fraud', name: 'Fraud Engine' },
  { id: 'verify', name: 'Gov/Bank Verification' }
];

export default function UploadClaim() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;
    setIsUploading(true);
    setCurrentStep(1); // Start with OCR
    
    // Simulate pipeline
    const timer1 = setTimeout(() => setCurrentStep(2), 2000); // OCR to NLP
    const timer2 = setTimeout(() => setCurrentStep(3), 4000); // NLP to Fraud Engine
    const timer3 = setTimeout(() => setCurrentStep(4), 6500); // Fraud to Verify
    const timer4 = setTimeout(() => {
      setCurrentStep(5); // Complete
      setTimeout(() => navigate('/claims/CLM-NEW'), 1000); // Redirect
    }, 9000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  };

  return (
    <div className="p-8 max-w-4xl mx-auto animate-in fade-in duration-500">
      <h1 className="text-3xl font-sora font-semibold text-dark mb-2">Upload Claim Document</h1>
      <p className="text-muted mb-8">Upload a medical bill, hospital discharge summary, or invoice to begin investigation.</p>
      
      {!isUploading && currentStep === 0 ? (
        <div className="bg-white border border-border rounded-card shadow-card p-10 mt-6 transition-all">
          <div 
            className="border-2 border-dashed border-primary/30 bg-primary/5 rounded-2xl p-16 text-center hover:bg-primary/10 hover:border-primary/50 transition-colors cursor-pointer flex flex-col items-center justify-center"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <div className="p-4 bg-white rounded-full shadow-sm mb-4">
              <UploadCloud className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-lg font-sora font-semibold text-dark">Drop PDF or image here</h3>
            <p className="text-sm text-muted mt-2">or click to browse from your computer</p>
            <input id="file-upload" type="file" className="sr-only" onChange={(e) => e.target.files && setFile(e.target.files[0])} />
            <p className="text-xs leading-5 text-gray-400 mt-6 font-mono border border-gray-200 rounded-full px-3 py-1 bg-white">Accepts PDF, JPG, PNG up to 20MB</p>
          </div>
          
          {file && (
            <div className="mt-8 flex items-center justify-between bg-surface px-6 py-4 border border-border rounded-xl">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-white rounded shadow-sm">
                  <FileIcon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-dark truncate max-w-xs">{file.name}</span>
                  <span className="text-xs text-muted">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
              </div>
              <button 
                onClick={handleUpload}
                className="flex-shrink-0 bg-primary text-white px-6 py-2.5 rounded-btn text-sm font-semibold hover:bg-primary-light transition-colors shadow-sm"
              >
                Run AI Analysis
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white border border-border rounded-card shadow-card p-12 mt-6 transition-all">
          <h2 className="text-xl font-sora font-semibold text-dark mb-10 text-center">Processing Document</h2>
          <StepperProgress steps={STEPS} currentStepIndex={currentStep} />
          
          {currentStep === 5 && (
            <div className="mt-12 text-center animate-in zoom-in duration-300">
               <div className="inline-flex items-center justify-center p-3 bg-success-text/10 rounded-full mb-4">
                 <CheckCircle className="h-12 w-12 text-success-text" />
               </div>
               <h3 className="text-2xl font-bold text-dark">Analysis Complete!</h3>
               <p className="text-muted mt-2">Generating investigation report...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Simple fallback icon
function FileIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
    </svg>
  );
}

