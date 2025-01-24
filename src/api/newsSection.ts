import { supabase } from '../lib/supabase';
import type { NewsItem, CreateNewsItem } from '../types/news';

export const newsApi = {
  getAll: async (): Promise<NewsItem[]> => {
    const { data, error } = await supabase
      .from('news_section')
      .select('*')
      .order('created_at', { ascending: false });
  
    if (error) throw error;
    return data || [];
  },

  getPinned: async (): Promise<NewsItem | null> => {
    const { data, error } = await supabase
      .from('news_section')
      .select('*')
      .eq('is_pinned', true)
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  create: async (news: CreateNewsItem): Promise<NewsItem> => {
    const { data, error } = await supabase
      .from('news_section')
      .insert(news)
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('Failed to create news item');
    return data;
  },

  update: async (id: string, news: Partial<CreateNewsItem>): Promise<NewsItem> => {
    const { data: existing, error: getError } = await supabase
      .from('news_section')
      .select()
      .eq('id', id)
      .single();

    if (getError) throw getError;
    if (!existing) throw new Error('News item not found');

    const { data, error } = await supabase
      .from('news_section')
      .update(news)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('Failed to update news item');
    return data;
  },

  togglePin: async (id: string): Promise<NewsItem> => {
    // First get the current item to check its pin status
    const { data: current, error: getError } = await supabase
      .from('news_section')
      .select('*')
      .eq('id', id)
      .single();

    if (getError) throw getError;
    if (!current) throw new Error('News item not found');

    // Toggle the pin status
    const { data, error } = await supabase
      .from('news_section')
      .update({ 
        is_pinned: !current.is_pinned,
        // Ensure updated_at is refreshed
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('Failed to update pin status');
    
    return data;
  }
};