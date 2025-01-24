import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Building2, Users } from 'lucide-react';

interface SelectionButtonsProps {
  label: string;
  options: Array<{
    value: string;
    label: string;
    icon?: LucideIcon;
  }>;
  value: string;
  onChange: (value: string) => void;
  variant?: 'default' | 'problem';
}

const recipientIcons: Record<string, LucideIcon> = {
  'condo': Building2,
  'styret': Users
};

export function SelectionButtons({ 
  label, 
  options, 
  value, 
  onChange,
  variant = 'default'
}: SelectionButtonsProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className={`grid ${variant === 'problem' ? 'grid-cols-4' : 'grid-cols-2'} gap-3`}>
        {options.map((option) => {
          const Icon = option.icon || recipientIcons[option.value];
          const isSelected = value === option.value;
          const isRecipient = option.value === 'condo' || option.value === 'styret';
          
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`
                flex flex-col items-center gap-3 p-4 rounded-lg border transition-all text-left
                ${isSelected 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-200 hover:border-blue-500 hover:bg-gray-50'
                }
              `}
            >
              <div className={`
                p-2 rounded-lg
                ${isSelected 
                  ? isRecipient && option.value === 'condo'
                    ? 'bg-blue-600'
                    : 'bg-blue-100'
                  : isRecipient && option.value === 'condo'
                    ? 'bg-blue-600'
                    : 'bg-gray-100'
                }
              `}>
                <Icon className={`
                  h-5 w-5 
                  ${isRecipient && option.value === 'condo'
                    ? 'text-white'
                    : isSelected 
                      ? 'text-blue-600' 
                      : 'text-gray-600'
                  }
                `} />
              </div>
              <span className="font-medium text-center">{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}