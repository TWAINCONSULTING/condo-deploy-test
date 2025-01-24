import React from 'react';

interface SectionIntroProps {
  title: string;
  description: string;
}

export function SectionIntro({ title, description }: SectionIntroProps) {
  return (
    <div className="text-left max-w-3xl mx-auto mb-2 pl-8 -mt-4">
      <h1 className="text-3xl font-bold font-logo mt-0">{title}</h1>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}