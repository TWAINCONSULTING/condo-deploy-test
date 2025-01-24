import React from 'react';
import { Card } from '../ui/Card';
import type { LucideIcon } from 'lucide-react';
import { Tooltip } from '../ui/Tooltip';
import { Pencil } from 'lucide-react';

interface FacilityRule {
  label: string;
  value: string;
  link?: string;
  icon: LucideIcon;
  iconColor?: string;
}

interface FacilityCardProps {
  title: string;
  icon: LucideIcon;
  importantIcon?: LucideIcon;
  importantMessage?: string;
  rules: FacilityRule[];
  onImportantClick?: () => void;
  showMobileMessage?: boolean;
  isEditing?: boolean;
  onEdit?: () => void;
  editValues?: Record<string, string>;
  onEditValueChange?: (label: string, value: string) => void;
}

export function FacilityCard({ 
  title, 
  icon: Icon, 
  importantIcon: ImportantIcon,
  importantMessage,
  rules,
  onImportantClick,
  showMobileMessage,
  isEditing,
  onEdit,
  editValues,
  onEditValueChange
}: FacilityCardProps) {
  const isSoppelhandtering = title === 'Søppelhåndtering';

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-50 rounded-lg">
              <Icon className="h-5 w-5 text-gray-600" />
            </div>
            <h2 className="text-xl font-semibold">{title}</h2>
          </div>
          <div className="flex items-center gap-2">
            {/* Edit button for non-Søppelhåndtering sections */}
            {!isSoppelhandtering && onEdit && (
              <button
                onClick={onEdit}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-blue-600"
              >
                <Pencil className="h-4 w-4" />
              </button>
            )}
            {ImportantIcon && importantMessage && (
              <>
                {/* Edit button for Søppelhåndtering - placed before important icon */}
                {isSoppelhandtering && onEdit && (
                  <button
                    onClick={onEdit}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-blue-600"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                )}
                {/* Desktop tooltip */}
                <div className="hidden lg:block">
                  <Tooltip content={importantMessage}>
                    <button className="p-2 hover:bg-red-50 rounded-lg transition-colors group">
                      <ImportantIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-600" />
                    </button>
                  </Tooltip>
                </div>
                {/* Mobile button */}
                <div className="lg:hidden">
                  <button 
                    onClick={onImportantClick}
                    className="p-2 hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <ImportantIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-600" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile message */}
        {showMobileMessage && importantMessage && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm lg:hidden">
            {importantMessage}
          </div>
        )}

        {/* Rules list */}
        <div className="space-y-3">
          {rules.map(({ label, value, link, icon: RuleIcon, iconColor }) => (
            <div key={label} className="flex items-center justify-between py-2 border-b last:border-0">
              <div className="flex items-center gap-2">
                <RuleIcon className={`h-4 w-4 ${iconColor || 'text-gray-400'}`} />
                <span className="text-gray-600">{label}</span>
              </div>
              {isEditing && onEditValueChange ? (
                <input
                  type="text"
                  value={editValues?.[label] || value}
                  onChange={(e) => onEditValueChange(label, e.target.value)}
                  className="px-2 py-1 border rounded-md focus:ring-1 focus:ring-blue-500 font-medium"
                />
              ) : link ? (
                <a 
                  href={link}
                  className="font-medium text-blue-600 hover:text-blue-700"
                >
                  {value}
                </a>
              ) : (
                <span className="font-medium">{value}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}