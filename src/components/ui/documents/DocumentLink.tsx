import React from 'react';
import { cn } from '../../../utils/cn';
import { DocumentIcon } from './DocumentIcon';
import { ImportantBadge } from './ImportantBadge';

interface DocumentLinkProps {
  name: string;
  link: string;
  isImportant: boolean;
}

export function DocumentLink({ name, link, isImportant }: DocumentLinkProps) {
  return (
    <a
      href={link}
      className="flex items-center gap-3 flex-1"
      target="_blank"
      rel="noopener noreferrer"
    >
      <DocumentIcon isImportant={isImportant} />
      <span className={cn(
        "text-base-dark3 group-hover:text-condo-dark",
        isImportant && "font-medium"
      )}>
        {name}
      </span>
      {isImportant && <ImportantBadge />}
    </a>
  );
}