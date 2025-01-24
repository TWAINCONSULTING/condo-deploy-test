import React, { useState } from 'react';
import { Clock, Tag, DollarSign, Clock3, Trash2, Info } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { DateTimePicker } from './DateTimePicker';
import { DurationSelect } from './DurationSelect';
import { FacilityGrid } from './FacilityGrid';
import { ReminderDialog } from './ReminderDialog';
import { Tooltip } from '../ui/Tooltip';
import type { Facility } from '../../types/booking';

interface ReservationFormProps {
  facility: Facility;
  facilities: Facility[];
  onFacilityChange: (facilityId: string) => void;
  showForm: boolean;
  onShowForm: () => void;
}

export function ReservationForm({ 
  facility, 
  facilities, 
  onFacilityChange,
  showForm,
  onShowForm
}: ReservationFormProps) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('12:00');
  const [duration, setDuration] = useState(1);
  const [showReminderDialog, setShowReminderDialog] = useState(false);
  const [reminder, setReminder] = useState<{ reminderTime: number; channels: string[] } | null>(null);

  // Calculate end time
  const startTime = `${date}T${time}`;
  const endTime = new Date(startTime);
  endTime.setHours(endTime.getHours() + duration);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowReminderDialog(true);
  };

  const handleReminderSubmit = (data: { reminderTime: number; channels: string[] }) => {
    setReminder(data);
    console.log('Booking submitted:', {
      facilityId: facility.id,
      date,
      time,
      duration,
      reminder: data
    });
    setShowReminderDialog(false);
  };

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold">Reserver</h2>
          </div>
          <Tooltip content="Her kan styret velge hvilke fasiliteter som kan reserveres, og hvilke regler som gjelder for de ulike fasilitetene.">
            <Info className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-help" />
          </Tooltip>
        </div>

        <div className="space-y-8">
          {/* Facility selection */}
          <div className="grid grid-cols-3 gap-3">
            <FacilityGrid 
              facilities={facilities}
              onSelect={onFacilityChange}
              selectedFacilityId={facility.id}
            />
          </div>

          {/* Facility rules */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-medium text-gray-900 mb-4">
              Regler for {facility.name.toLowerCase()}
            </h3>
            {facility.rules.map(({ label, value }) => {
              const Icon = {
                'Gratis periode': Tag,
                'Timespris': DollarSign,
                'Pris per vask': DollarSign,
                'Maks varighet': Clock,
                'Åpningstid': Clock3,
                'Grilling tillatt': Tag,
                'Rydding': Trash2
              }[label] || Tag;
              
              return (
                <div key={label} className="flex items-center justify-between py-3 first:pt-0 last:pb-0 border-b last:border-0 border-gray-200">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">{label}</span>
                  </div>
                  <span className="font-medium text-gray-900">{value}</span>
                </div>
              );
            })}
          </div>

          {/* Reserve button */}
          {!showForm && (
            <Button onClick={onShowForm} className="w-full">
              Reserver en tid
            </Button>
          )}

          {/* Reservation form */}
          {showForm && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <DateTimePicker
                date={date}
                time={time}
                onDateChange={setDate}
                onTimeChange={setTime}
              />

              <DurationSelect
                duration={duration}
                onDurationChange={setDuration}
                maxDuration={facility.maxDuration}
              />

              <Button type="submit" className="w-full">
                Reserver
              </Button>
            </form>
          )}
        </div>
      </div>

      {showReminderDialog && (
        <ReminderDialog
          reservation={{
            facilityName: facility.name,
            startTime: startTime,
            endTime: endTime.toISOString()
          }}
          onClose={() => setShowReminderDialog(false)}
          onSubmit={handleReminderSubmit}
        />
      )}
    </Card>
  );
}