import type { PostType } from '../types/forum';

interface CategoryInfo {
  label: string;
  classes: string;
}

export const categoryLabels: Record<PostType, CategoryInfo> = {
  'discussion': { 
    label: 'Diskusjon', 
    classes: 'bg-blue-50 text-blue-600' 
  },
  'marketplace': { 
    label: 'Markedsplass', 
    classes: 'bg-purple-50 text-purple-600' 
  },
  'event': { 
    label: 'Arrangement', 
    classes: 'bg-green-50 text-green-600' 
  },
  'recommendations': { 
    label: 'Anbefaling', 
    classes: 'bg-amber-50 text-amber-600' 
  }
};

export const scopeLabels = {
  'building': 'Digitalgården',
  'area': 'Området'
} as const;

export const sortOptions = [
  { value: 'date-desc', label: 'Nyeste først' },
  { value: 'date-asc', label: 'Eldste først' },
  { value: 'likes-desc', label: 'Mest likt' },
  { value: 'trending-desc', label: 'Trender nå' }
] as const;