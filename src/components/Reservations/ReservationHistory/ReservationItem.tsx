import React from 'react';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import { StatusBadge } from './StatusBadge';
import type { Reservation } from '../../../types/booking';

interface ReservationItemProps {
  reservation: Reservation;
  onClick: (id: string) => void;
}

export function ReservationItem({ reservation, onClick }: ReservationItemProps) {
  const startDate = new Date(reservation.startTime);
  const endDate = new Date(reservation.endTime);
  const isOngoing = reservation.status === 'ongoing';

  return (
    <button
      onClick={() => onClick(reservation.id)}
      className={`
        relative w-full p-4 bg-white rounded-lg border transition-all text-left
        ${isOngoing ? 'border-blue-100 shadow-md' : 'border-gray-200'}
        hover:border-blue-500
      `}
    >
      {/* Status badge at top right */}
      <div className="absolute top-4 right-4">
        <StatusBadge status={reservation.status} />
      </div>

      {/* Main content */}
      <div className="pr-32">
        <div className="font-medium mb-1">{reservation.facilityName}</div>
        <div className="text-sm text-gray-500">
          {format(startDate, 'd. MMMM yyyy', { locale: nb })}
          {' • '}
          {format(startDate, 'HH:mm')} - {format(endDate, 'HH:mm')}
        </div>
      </div>
    </button>
  );
}