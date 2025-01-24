import { useState, useEffect } from 'react';
import { newsApi } from '../api/newsSection';
import type { NewsItem } from '../types/news';
import { useNotificationStore } from '../store/notificationStore';

export function useNewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addNotification } = useNotificationStore();

  const fetchNews = async () => {
  try {
    setLoading(true);
    setError(null);
    const data = await newsApi.getAll();
    // Move pinned messages to the top
    const sortedData = [
      ...data.filter((item) => item.is_pinned),
      ...data.filter((item) => !item.is_pinned),
    ];
    setNews(sortedData);
  } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch news';
      setError(message);
      addNotification({
        type: 'error',
        message,
        duration: 5000
      })
  } finally {
    setLoading(false);
  }
};


  const handlePin = async (id: string) => {
    try {
      setLoading(true);
      await newsApi.togglePin(id);
      await fetchNews(); // Refresh the list after toggling
      addNotification({
        type: 'success',
        message: 'News item updated successfully',
        duration: 3000
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update news item';
      addNotification({
        type: 'error',
        message,
        duration: 5000
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return {
    news,
    loading,
    error,
    refetch: fetchNews,
    handlePin
  };
}