import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavItemProps } from './types';
import { scrollToSection } from '../../utils/scroll';

export function NavLink({ item, onClick }: NavItemProps) {
  const location = useLocation();
  const Icon = item.icon;
  
  // Check if this is the current page
  const isActive = location.pathname === item.to || 
    location.pathname.startsWith(item.to + '/') ||
    (item.isScrollTarget && location.pathname + item.to.split('#')[1] === item.to);
  
  const handleClick = (e: React.MouseEvent) => {
    if (item.isScrollTarget) {
      const [path, section] = item.to.split('#');
      
      if (location.pathname === path) {
        e.preventDefault();
        scrollToSection(section);
      }
    }
    onClick?.();
  };

  // Determine background color based on highlight and active state
  const getBgColor = () => {
    if (item.highlight) {
      if (isActive) return 'bg-light-100';
      return 'hover:bg-purple-50';
    }
    if (isActive) return 'bg-blue-50';
    return 'hover:bg-gray-50';
  };
  
  return (
    <Link
      to={item.to}
      onClick={handleClick}
      className={`
        w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all
        ${item.isScrollTarget ? 'pl-11 text-sm' : ''}
        ${getBgColor()}
        ${item.highlight 
          ? `text-purple-600 ${isActive ? 'font-medium' : ''}` 
          : isActive 
            ? 'text-blue-600 font-medium' 
            : 'text-gray-600 hover:text-gray-900'}
      `}
    >
      {Icon && !item.isScrollTarget && (
        <Icon size={18} className={
          item.highlight ? 'text-purple-600' :
          isActive ? 'text-blue-600' : 'text-gray-600'
        } />
      )}
      <span>{item.label}</span>
    </Link>
  );
}