'use client';

import { useState, useEffect } from 'react';
import { api } from '@/services/api';
import { Item } from '@/types/item';

interface PurchaseItem {
  item: Item;
  quantity: number;
}

interface UseStoreReturn {
  items: Item[];
  loading: boolean;
  error: string | null;
  purchaseItems: (items: PurchaseItem[]) => Promise<void>;
}

export const useStore = (): UseStoreReturn => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await api.get<Item[]>('/store/items');
      setItems(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch store items');
      console.error('Error fetching store items:', err);
    } finally {
      setLoading(false);
    }
  };

  const purchaseItems = async (itemsToPurchase: PurchaseItem[]) => {
    try {
      await api.post('/store/purchase', { items: itemsToPurchase });
      await fetchItems(); // Refresh items after purchase
    } catch (err) {
      setError('Failed to purchase items');
      console.error('Error purchasing items:', err);
      throw err;
    }
  };

  return {
    items,
    loading,
    error,
    purchaseItems,
  };
}; 