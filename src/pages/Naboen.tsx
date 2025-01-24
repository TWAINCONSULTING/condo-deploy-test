import React, { useState, useMemo } from 'react';
import { PageWrapper } from '../components/ui/PageWrapper';
import { ForumPost } from '../components/Forum/ForumPost';
import { ForumFilters } from '../components/Forum/ForumFilters';
import { NaboIntro } from '../components/Forum/NaboIntro';
import { NewPostDialog } from '../components/Forum/NewPostDialog';
import { PopularGroups } from '../components/Forum/PopularGroups/index';
import { sectionIntros } from '../data/sectionIntros';
import type { ForumFilter, PostType, NewPost } from '../types/forum';
import { filterPosts, sortPosts } from '../utils/forum';
import { mockPosts } from '../data/mockPosts';

export default function Naboen() {
  const [filters, setFilters] = useState<ForumFilter>({
    category: undefined,
    scope: undefined,
    sortBy: 'date',
    sortOrder: 'desc'
  });
  const [newPostType, setNewPostType] = useState<PostType | null>(null);

  const filteredAndSortedPosts = useMemo(() => {
    const filtered = filterPosts(mockPosts, filters);
    return sortPosts(filtered, filters.sortBy, filters.sortOrder);
  }, [filters]);

  const handleLike = (postId: string) => {
    console.log('Like post:', postId);
  };

  const handleNewPost = (post: NewPost) => {
    console.log('Create new post:', post);
    setNewPostType(null);
  };

  return (
    <PageWrapper intro={sectionIntros.naboen}>
      <div className="max-w-7xl mx-auto">
        <NaboIntro onFeatureClick={setNewPostType} />

        <div className="mt-4">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 min-w-0">
              <ForumFilters 
                filters={filters} 
                onFilterChange={setFilters} 
                onNewPost={() => setNewPostType('discussion')}
              />
              <div className="mt-4 space-y-4">
                {filteredAndSortedPosts.map((post) => (
                  <ForumPost 
                    key={post.id} 
                    post={post} 
                    onVote={handleLike}
                  />
                ))}
              </div>
            </div>
            
            <div className="w-full lg:w-[280px] xl:w-[320px] shrink-0">
              <div className="sticky top-4">
                <div className="flex items-center mb-4">
                  <button
                    onClick={() => console.log('Create new group')}
                    className="w-full mr-1 px-4 py-2 bg-purple-200 text-purple-600 hover:bg-purple-300 hover:text-purple-700 rounded-lg transition-colors text-sm font-medium"
                  >
                    Opprett en ny gruppe
                  </button>
                </div>
                <PopularGroups />
              </div>
            </div>
          </div>
        </div>

        {newPostType && (
          <NewPostDialog
            type={newPostType}
            onClose={() => setNewPostType(null)}
            onSubmit={handleNewPost}
          />
        )}
      </div>
    </PageWrapper>
  );
}