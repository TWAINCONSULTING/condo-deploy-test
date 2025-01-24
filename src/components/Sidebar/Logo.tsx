import React from 'react';
import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';

interface LogoProps {
  onClick?: () => void;
}

export function Logo({ onClick }: LogoProps) {
  return (
    <Link 
      to="/"
      className="flex items-center gap-3"
      onClick={onClick}
    >
      <div className="bg-condo-dark text-condo-light p-2 rounded-lg">
        <Building2 className="h-6 w-6" />
      </div>
      <h1 className="text-xl font-bold text-condo-dark font-logo uppercase tracking-[0.05em]">
        CONDO
      </h1>
    </Link>
  );
}