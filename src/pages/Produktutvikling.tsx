import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { NewFeatureDialog } from '../components/ProductDev/NewFeatureDialog';
import { FeatureList } from '../components/ProductDev/FeatureList';
import { FilterBar } from '../components/ProductDev/FilterBar';
import { PageWrapper } from '../components/ui/PageWrapper';
import { sectionIntros } from '../data/sectionIntros';
import type { NewFeature } from '../types/features';

export default function Produktutvikling() {
  const [showNewFeatureDialog, setShowNewFeatureDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleNewFeature = (feature: NewFeature) => {
    console.log('New feature:', feature);
    setShowNewFeatureDialog(false);
  };

  const handleVote = (featureId: string) => {
    console.log('Vote for:', featureId);
  };

  const handleComment = (featureId: string) => {
    console.log('New comment for:', featureId);
  };

  return (
    <PageWrapper intro={sectionIntros.produktutvikling}>
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <FilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedFilter={selectedFilter}
              onFilterChange={setSelectedFilter}
            />
          </div>
          <Button 
            onClick={() => setShowNewFeatureDialog(true)}
            className="flex items-center gap-2 text-sm"
          >
            <Plus className="h-4 w-4" />
            Send inn forslag
          </Button>
        </div>

        <FeatureList 
          searchQuery={searchQuery}
          filter={selectedFilter}
          onVote={handleVote}
          onComment={handleComment}
        />

        {showNewFeatureDialog && (
          <NewFeatureDialog 
            onClose={() => setShowNewFeatureDialog(false)}
            onSubmit={handleNewFeature}
          />
        )}
      </div>
    </PageWrapper>
  );
}