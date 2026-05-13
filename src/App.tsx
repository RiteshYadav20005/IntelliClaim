import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Dashboard from './pages/Dashboard';
import UploadClaim from './pages/UploadClaim';
import ClaimDetail from './pages/ClaimDetail';
import ClaimsHistory from './pages/ClaimsHistory';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

const queryClient = new QueryClient();

// Pseudo-auth for demo
const isAuthenticated = true;

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!isAuthenticated) return <Navigate to="/login" />;
  return (
    <div className="flex h-screen overflow-hidden bg-surface">
      <Sidebar />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Navbar />
        <main className="w-full">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/upload" element={<ProtectedRoute><UploadClaim /></ProtectedRoute>} />
          <Route path="/claims" element={<ProtectedRoute><ClaimsHistory /></ProtectedRoute>} />
          <Route path="/claims/:id" element={<ProtectedRoute><ClaimDetail /></ProtectedRoute>} />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
