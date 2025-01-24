import React from 'react';

interface CommentFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function CommentForm({ value, onChange, onSubmit }: CommentFormProps) {
  return (
    <form 
      onSubmit={onSubmit}
      onClick={(e) => e.stopPropagation()}
      className="flex items-center gap-3"
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Skriv en kommentar..."
        className="flex-1 px-3 py-2 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
      />
      <button
        type="submit"
        disabled={!value.trim()}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Publiser
      </button>
    </form>
  );
}