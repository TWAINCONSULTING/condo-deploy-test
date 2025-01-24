import React, { useState } from 'react';
import { FileText, ChevronDown, ChevronRight, Bookmark, Pencil } from 'lucide-react';
import { useUserRole } from '../../hooks/useUserRole';
import { useImportantDocuments } from '../../stores/useImportantDocuments';
import type { Document } from '../../types/documents';
import { cn } from '../../utils/cn';

interface DocumentProps {
  document: {
    id: string;
    name: string;
    link: string;
  };
  isImportant: boolean;
  showActions?: boolean;
}

interface DocumentCategoryProps {
  title: string;
  documents: Array<{
    id: string;
    name: string;
    link: string;
  }>;
  showActions?: boolean;
}

// Separate Document component that can be used independently
function Document({ document, isImportant, showActions }: DocumentProps) {
  const { toggleImportant } = useImportantDocuments();
  const { role } = useUserRole();
  const isBoard = role === 'board';
  const showImportantStyle = isBoard && isImportant;

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleImportant(document.id);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add edit functionality here
  };

  return (
    <div
      className={`
        flex items-center justify-between p-3 rounded-lg border transition-all group
        ${showImportantStyle 
          ? 'border-blue-200 bg-blue-50 hover:border-blue-300 hover:bg-blue-100' 
          : 'border-gray-200 hover:border-blue-500 hover:bg-gray-50'
        }
      `}
    >
      <a
        href={document.link}
        className="flex items-center gap-3 flex-1"
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
      >
        <FileText className={cn(
          "h-5 w-5",
          showImportantStyle ? "text-blue-600" : "text-gray-400 group-hover:text-blue-500"
        )} />
        <span className={cn(
          "text-gray-600 group-hover:text-gray-900",
          showImportantStyle && "font-medium"
        )}>
          {document.name}
        </span>
      </a>
      {showActions && (
        <div className="flex items-center gap-2">
          <button
            onClick={handleBookmark}
            className={cn(
              "p-2 rounded-lg transition-colors",
              isImportant 
                ? "text-blue-600 hover:bg-blue-200" 
                : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            )}
          >
            <Bookmark className="h-4 w-4" fill={isImportant ? "currentColor" : "none"} />
          </button>
          <button
            onClick={handleEdit}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Pencil className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

function DocumentCategory({ title, documents, showActions }: DocumentCategoryProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isImportant } = useImportantDocuments();

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const visibleDocuments = isExpanded ? documents : documents.slice(0, 2);

  return (
    <div className="space-y-3" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={handleToggle}
        className="flex items-center gap-2 group w-full text-left"
      >
        <div className="p-1 group-hover:bg-gray-100 rounded-lg transition-colors">
          {isExpanded ? (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronRight className="h-5 w-5 text-gray-400" />
          )}
        </div>
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-gray-900">{title}</h3>
          <span className="text-sm text-gray-500">
            ({documents.length} {documents.length === 1 ? 'dokument' : 'dokumenter'})
          </span>
        </div>
      </button>

      <div className="grid gap-3 transition-all duration-200">
        {visibleDocuments.map((doc) => (
          <Document
            key={doc.id}
            document={doc}
            isImportant={isImportant(doc.id)}
            showActions={showActions}
          />
        ))}
      </div>
    </div>
  );
}

// Add Document component to DocumentCategory exports
DocumentCategory.Document = Document;

export { DocumentCategory };