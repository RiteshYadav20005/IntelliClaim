import { Bell, Moon, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // This is a partial mock setup for dark mode.
    // Real implementation would toggle a class on the `html` element.
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') setIsDarkMode(true);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 flex-shrink-0 items-center justify-between border-b border-border bg-white px-4 shadow-[0_2px_16px_rgba(13,71,161,0.05)] sm:px-6 lg:px-8 transition-colors">
      <div className="flex md:hidden">
        <button type="button" className="text-gray-500 hover:text-gray-600">
          <Menu className="h-6 w-6" />
        </button>
      </div>
      <div className="flex flex-1"></div>
      <div className="flex items-center gap-x-4 lg:gap-x-6">
        <button type="button" className="p-2 text-gray-400 hover:text-dark transition-colors rounded-full hover:bg-gray-100 relative">
          <span className="sr-only">View notifications</span>
          <Bell className="h-5 w-5" aria-hidden="true" />
          <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-danger-text ring-2 ring-white" />
        </button>
        <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-border" aria-hidden="true" />
        <button 
          onClick={toggleDarkMode}
          type="button" 
          className="p-2 text-gray-400 hover:text-dark transition-colors rounded-full hover:bg-gray-100"
          title="Toggle Dark Mode"
        >
          <Moon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}

