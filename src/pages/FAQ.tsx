import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { PageWrapper } from '../components/ui/PageWrapper';
import { HelpCenterSearch } from '../components/HelpCenter/HelpCenterSearch';
import { CategoryList } from '../components/HelpCenter/CategoryList';
import { HelpCenterArticles } from '../components/HelpCenter/HelpCenterArticles';
import { sectionIntros } from '../data/sectionIntros';

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <PageWrapper intro={sectionIntros.hjelpesenter}>
      <div className="max-w-5xl mx-auto space-y-4">
        {/* Search bar */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <HelpCenterSearch value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-12 gap-4">
          {/* Categories sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 lg:sticky lg:top-4">
              <h2 className="font-medium px-2 mb-3">Kategorier</h2>
              <CategoryList 
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>
          </div>
          
          {/* Articles section */}
          <div className="col-span-12 lg:col-span-9">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <HelpCenterArticles 
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
              />
            </div>
          </div>
        </div>

        {/* Contact section */}
        <div className="bg-blue-50 rounded-xl p-6 text-center">
          <h2 className="text-lg font-semibold mb-2">Fant du ikke svaret du trengte?</h2>
          <p className="text-gray-600 mb-4">
            Du kan kontakte styret direkte for ytterligere hjelp eller spørsmål.
          </p>
          <a
            href="/kontakt?recipient=board"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Users className="h-4 w-4" />
            Kontakt styret
          </a>
        </div>
      </div>
    </PageWrapper>
  );
}