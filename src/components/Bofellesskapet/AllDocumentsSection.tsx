import React, { useState } from 'react';
import { FileText, Plus, ChevronDown, Info, Search } from 'lucide-react';
import { Card } from '../ui/Card';
import { DocumentCategory } from './DocumentCategory';
import { documentCategories } from '../../data/bofellesskapetDocuments';
import { useUserRole } from '../../hooks/useUserRole';
import { DocumentUploadDialog } from '../ui/DocumentUploadDialog';
import { cn } from '../../utils/cn';
import { HistoryCard } from './HistoryCard';
import { Tooltip } from '../ui/Tooltip';
import { useImportantDocuments } from '../../stores/useImportantDocuments';

const uploadCategories = [
  { value: 'arsrapporter', label: 'Årsrapporter og økonomi' },
  { value: 'vedlikehold', label: 'Vedlikehold og oppgraderinger' },
  { value: 'styredokumenter', label: 'Styredokumenter' }
];

export function AllDocumentsSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { role } = useUserRole();
  const { importantDocuments } = useImportantDocuments();
  const isBoard = role === 'board';

  const handleUpload = async (data: { 
    name: string; 
    category: string; 
    files: File[] 
  }) => {
    try {
      console.log('Uploading documents:', data);
      setShowUploadDialog(false);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const toggleExpand = () => setIsExpanded(!isExpanded);

  // Get all important documents
  const importantDocs = documentCategories.flatMap(category => 
    category.documents.filter(doc => importantDocuments.includes(doc.id))
  );

  // Filter documents based on search query
  const filterDocuments = (documents: typeof documentCategories) => {
    if (!searchQuery) return documents;

    const query = searchQuery.toLowerCase();
    return documents.map(category => ({
      ...category,
      documents: category.documents.filter(doc => 
        doc.name.toLowerCase().includes(query)
      )
    })).filter(category => category.documents.length > 0);
  };

  const filteredCategories = filterDocuments(documentCategories);

  return (
    <div className="space-y-4">
      <HistoryCard />
      <Card id="documents">
        <div className="p-4">
          {/* Fixed Header Section with two columns */}
          <div className={`flex items-start justify-between ${isBoard ? '-mb-3' : 'mb-6'}`}>
            {/* Left column: Title and tooltip */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold">Dokumentarkiv</h2>
              <Tooltip content="Klikk på bokmerket for å feste viktige dokumenter til forsiden.">
                <Info className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-help" />
              </Tooltip>
            </div>

            {/* Right column: Search and Upload stacked vertically */}
            <div className="flex flex-col gap-2">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  placeholder="Søk i dokumenter..."
                  className="w-48 pl-9 pr-3 py-1.5 text-sm border rounded-lg focus:ring-1 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>

              {isBoard && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowUploadDialog(true);
                  }}
                  className="flex items-center justify-center gap-1 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                >
                  <Plus className="h-4 w-4" />
                  Last opp dokument
                </button>
              )}
            </div>
          </div>

          {/* Clickable Content Section */}
          <div className="cursor-pointer" onClick={toggleExpand}>
            {/* Important documents section */}
            {importantDocs.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Viktige dokumenter</h3>
                <div className="grid gap-3">
                  {importantDocs.map((doc) => (
                    <DocumentCategory.Document
                      key={doc.id}
                      document={doc}
                      isImportant={true}
                      showActions={isBoard}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* All documents section */}
            <div className={cn(
              "space-y-8 transition-all duration-200 overflow-hidden",
              isExpanded ? "opacity-100 max-h-[2000px]" : "opacity-0 max-h-0"
            )}>
              {filteredCategories.map((category) => (
                <DocumentCategory
                  key={category.title}
                  title={category.title}
                  documents={category.documents}
                  showActions={isBoard}
                />
              ))}
            </div>

            {/* Bottom actions */}
            <div className="flex items-center justify-center mt-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
              >
                <ChevronDown 
                  className={cn(
                    "h-5 w-5 transition-transform duration-200",
                    isExpanded && "rotate-180"
                  )} 
                />
                <span>{isExpanded ? 'Vis mindre' : 'Vis flere dokumenter'}</span>
              </button>
            </div>
          </div>
        </div>
      </Card>

      {showUploadDialog && (
        <DocumentUploadDialog
          onClose={() => setShowUploadDialog(false)}
          onUpload={handleUpload}
          categories={uploadCategories}
          title="Last opp dokument til arkivet"
          description="Last opp dokumenter til borettslagets dokumentarkiv. Dokumentene vil være tilgjengelige for alle beboere."
        />
      )}
    </div>
  );
}