import React from 'react';
import { helpArticles } from '../../data/helpArticles';
import { ArticleItem } from './ArticleItem';

interface HelpCenterArticlesProps {
  searchQuery: string;
  selectedCategory: string | null;
}

export function HelpCenterArticles({ searchQuery, selectedCategory }: HelpCenterArticlesProps) {
  const filteredArticles = helpArticles.filter(article => {
    const matchesSearch = !searchQuery || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  if (filteredArticles.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Ingen artikler funnet. Prøv å søke på noe annet eller velg en annen kategori.
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-medium px-2 mb-3">Vanlige spørsmål</h2>
      <div className="space-y-2">
        {filteredArticles.map((article) => (
          <ArticleItem key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}