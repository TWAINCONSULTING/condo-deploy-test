import React from 'react';

interface DurationSelectProps {
  duration: number;
  onDurationChange: (duration: number) => void;
  maxDuration: number;
}

export function DurationSelect({ duration, onDurationChange, maxDuration }: DurationSelectProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Varighet (timer)
      </label>
      <select
        value={duration}
        onChange={(e) => onDurationChange(Number(e.target.value))}
        className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      >
        {Array.from({ length: maxDuration }, (_, i) => i + 1).map((hours) => (
          <option key={hours} value={hours}>
            {hours} {hours === 1 ? 'time' : 'timer'}
          </option>
        ))}
      </select>
    </div>
  );
}