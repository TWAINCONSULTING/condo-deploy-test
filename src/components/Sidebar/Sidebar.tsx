import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { Logo } from './Logo';
import { NavGroup } from './NavGroup';
import { Backdrop } from './Backdrop';
import { mainNavigation, supportNavigation } from './navigation';
import { useUserRole } from '../../hooks/useUserRole';

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { role } = useUserRole();

  const handleClose = () => {
    setIsOpen(false);
  };

  const filteredSupportNavigation = supportNavigation.filter(item => {
    if (!item.roles || role === 'board') {
      return true;
    }
    return item.roles.includes(role);
  });

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-8 sm:top-12 left-4 mt-2 z-50 p-1.5 sm:p-2 bg-gradient-to-br from-white/60 to-white/40 backdrop-blur-sm hover:bg-white rounded-full shadow-lg transition-all"
      >
        <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-condo-dark" />
      </button>

      <Backdrop isOpen={isOpen} onClick={handleClose} />
      <nav
        className={`
          fixed lg:fixed inset-y-0 left-0 w-64 bg-white shadow-lg
          transform transition-transform duration-200 ease-in-out z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          top-8 sm:top-12
        `}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 sm:p-6 border-b border-gray-100">
            <Logo onClick={handleClose} />
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-1">
              {mainNavigation.map((item) => (
                <NavGroup 
                  key={item.to} 
                  item={item}
                  onClick={handleClose}
                />
              ))}
            </div>
          </div>

          <div className="p-4 bg-gray-50 border-t border-gray-100 mt-auto">
            <div className="space-y-1">
              {filteredSupportNavigation.map((item) => (
                <NavGroup 
                  key={item.to} 
                  item={item}
                  onClick={handleClose}
                />
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}