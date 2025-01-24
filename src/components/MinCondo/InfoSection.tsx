import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface InfoItemProps {
  icon: LucideIcon;
  title: string;
  value: string;
}

export function InfoItem({ icon: Icon, title, value }: InfoItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 bg-blue-50 rounded-lg">
        <Icon className="h-5 w-5 text-blue-600" />
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-gray-600">{value}</p>
      </div>
    </div>
  );
}