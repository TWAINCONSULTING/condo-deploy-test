import React from 'react';
import { Clock, Calendar, CheckCircle, XCircle } from 'lucide-react';
import type { ReservationStatus } from '../../../types/booking';

interface StatusBadgeProps {
  status: ReservationStatus;
}

const statusConfig = {
  ongoing: {
    icon: Clock,
    label: 'Pågående',
    className: 'bg-blue-50 text-blue-600'
  },
  upcoming: {
    icon: Calendar,
    label: 'Kommende',
    className: 'bg-blue-50 text-blue-600'
  },
  completed: {
    icon: CheckCircle,
    label: 'Avsluttet',
    className: 'bg-green-50 text-green-600'
  },
  cancelled: {
    icon: XCircle,
    label: 'Kansellert',
    className: 'bg-red-50 text-red-600'
  }
} as const;

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm ${config.className}`}>
      <Icon className="h-4 w-4" />
      <span className="font-medium">{config.label}</span>
    </div>
  );
}