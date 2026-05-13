import { useState } from 'react';
import { UploadCloud, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function UploadClaim() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(false);
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
    // Mock upload delay
    setTimeout(() => {
      setIsUploading(false);
      setSuccess(true);
      setTimeout(() => {
        // Mock navigate to the specific claim report
        navigate('/claims/CLM-NEW');
      }, 1500);
    }, 2000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Upload Claim Document</h1>
      
      {!success ? (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8">
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:bg-gray-50 transition-colors"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
              <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none hover:text-blue-500">
                <span>Upload a file</span>
                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={(e) => e.target.files && setFile(e.target.files[0])} />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-500">PDF, PNG, JPG up to 10MB</p>
          </div>
          
          {file && (
            <div className="mt-6 flex items-center justify-between bg-gray-50 px-4 py-3 border border-gray-200 rounded-md">
              <span className="text-sm font-medium text-gray-900 truncate">{file.name}</span>
              <button 
                onClick={handleUpload}
                disabled={isUploading}
                className="ml-4 flex-shrink-0 bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm font-semibold hover:bg-blue-500 disabled:opacity-50"
              >
                {isUploading ? 'Processing pipeline...' : 'Run Analysis'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-12 text-center h-64 flex flex-col items-center justify-center">
          <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900">Upload Complete</h2>
          <p className="text-gray-500 mt-2">Redirecting to claim report...</p>
        </div>
      )}
    </div>
  );
}
