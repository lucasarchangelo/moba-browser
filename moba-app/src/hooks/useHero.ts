'use client';

import { useState, useEffect } from 'react';
import { api } from '@/services/api';

interface Hero {
  id: number;
  name: string;
  money: number;
  // Add other hero properties as needed
}

interface UseHeroReturn {
  hero: Hero | null;
  loading: boolean;
  error: string | null;
  refreshHero: () => Promise<void>;
}

export const useHero = (): UseHeroReturn => {
  const [hero, setHero] = useState<Hero | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHero = async () => {
    try {
      const response = await api.get<Hero>('/heroes/current');
      setHero(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch hero data');
      console.error('Error fetching hero:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHero();
  }, []);

  return {
    hero,
    loading,
    error,
    refreshHero: fetchHero,
  };
}; 