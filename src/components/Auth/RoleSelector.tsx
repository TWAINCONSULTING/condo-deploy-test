import React from 'react';
import { ROLE_CONFIG, UserRole } from '../../constants/roles';
import { useUserRole } from '../../hooks/useUserRole';

interface RoleSelectorProps {
  onRoleSelect: (role: UserRole) => void;
}

export function RoleSelector({ onRoleSelect }: RoleSelectorProps) {
  const { role: currentRole } = useUserRole();

  return (
    <div className="grid grid-cols-3 gap-2 mb-6 mt-6">
      {ROLE_CONFIG.map(({ id, label, icon: Icon }) => {
        const isSelected = currentRole === id;
        const isTenant = id === 'tenant';
        
        return (
          <button
            key={id}
            type="button"
            onClick={() => !isTenant && onRoleSelect(id)}
            disabled={isTenant}
            className={`
              w-full flex flex-col items-center justify-center gap-2 p-3 rounded-lg border transition-all
              ${isSelected
                ? 'border-blue-500 bg-blue-50'
                : isTenant
                  ? 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
                  : 'border-gray-200 hover:border-blue-500 hover:bg-gray-50'
              }
            `}
          >
            <div className={`
              p-2 rounded-lg flex items-center justify-center
              ${isSelected ? 'bg-blue-100' : 'bg-gray-100'}
            `}>
              <Icon className={`
                h-5 w-5
                ${isSelected ? 'text-blue-600' : 'text-gray-600'}
              `} />
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <div className="text-sm font-medium">{label}</div>
              {isTenant && (
                <div className="text-xs text-gray-500 mt-1">
                  Kommer i 2025
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}