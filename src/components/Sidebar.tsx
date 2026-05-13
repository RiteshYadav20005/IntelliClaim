import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileUp, Files, ShieldAlert, LogOut, UserCircle } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Upload Claim', path: '/upload', icon: FileUp },
    { name: 'Claims History', path: '/claims', icon: Files },
  ];

  return (
    <div className="flex flex-col w-[240px] bg-card text-dark flex-shrink-0 relative h-screen border-r border-border">
      <div className="flex items-center justify-center h-20 border-b border-border gap-3">
        <ShieldAlert className="w-8 h-8 text-primary" />
        <span className="text-2xl font-sora font-bold tracking-tight">IntelliClaim</span>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto mt-6">
        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`group flex items-center px-4 py-3 text-sm font-medium rounded-btn transition-colors ${
                  isActive ? 'bg-primary text-white' : 'text-muted hover:bg-surface hover:text-dark'
                }`}
              >
                <Icon className={`mr-3 flex-shrink-0 h-5 w-5 ${isActive ? 'text-white' : 'text-muted group-hover:text-primary'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="p-4 border-t border-border bg-surface/50">
        <div className="flex items-center gap-3 mb-4">
          <UserCircle className="w-10 h-10 text-muted" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-dark">Investigator_01</span>
            <span className="text-xs text-muted">admin@intelliclaim</span>
          </div>
        </div>
        <Link to="/login" className="flex items-center px-4 py-2 text-sm font-medium text-muted hover:bg-surface hover:text-dark rounded-btn transition-colors">
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </Link>
      </div>
    </div>
  );
}

