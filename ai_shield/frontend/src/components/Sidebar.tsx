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
    <div className="flex flex-col w-[240px] bg-dark text-white flex-shrink-0 relative h-screen">
      <div className="flex items-center justify-center h-20 border-b border-white/10 gap-3">
        <ShieldAlert className="w-8 h-8 text-primary-light" />
        <span className="text-2xl font-sora font-bold tracking-tight">IntelliShield</span>
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
                  isActive ? 'bg-primary text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className={`mr-3 flex-shrink-0 h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="p-4 border-t border-white/10 bg-black/20">
        <div className="flex items-center gap-3 mb-4">
          <UserCircle className="w-10 h-10 text-gray-300" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Investigator_01</span>
            <span className="text-xs text-gray-400">admin@intellishield</span>
          </div>
        </div>
        <Link to="/login" className="flex items-center px-4 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white rounded-btn transition-colors">
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </Link>
      </div>
    </div>
  );
}

