'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface ItemResponseDto {
  id: string;
  name: string;
  description: string;
  baseHealth: number;
  baseMana: number;
  baseArmor: number;
  baseMagicResistance: number;
  baseAccuracy: number;
  baseDamage: number;
  baseMagicDamage: number;
  isConsumable: boolean;
  slotType: string;
  price: number;
  imageUrl: string;
  effects: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface InventoryItem {
  id: string;
  quantity: number;
  item: ItemResponseDto;
  createdAt: Date;
  acquiredAt: Date;
}

interface InventoryResponse {
  heroId: string;
  items: InventoryItem[];
}

const SLOT_TYPES = [
  { value: '', label: 'All Items' },
  { value: 'HEAD', label: 'Head' },
  { value: 'CHEST', label: 'Chest' },
  { value: 'HANDS', label: 'Hands' },
  { value: 'LEGS', label: 'Legs' },
  { value: 'FEET', label: 'Feet' },
  { value: 'WEAPON', label: 'Weapon' },
  { value: 'ACCESSORY', label: 'Accessory' },
] as const;

export default function StorePage() {
  const router = useRouter();
  const [items, setItems] = useState<ItemResponseDto[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<{ item: ItemResponseDto; quantity: number }[]>([]);
  const [heroMoney, setHeroMoney] = useState(0);
  const [selectedSlotType, setSelectedSlotType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 8;
  const [showInventory, setShowInventory] = useState(false);
  const [inventoryLoading, setInventoryLoading] = useState(false);

  const fetchStoreData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/auth/signin');
        return;
      }

      // Fetch store items
      const url = new URL('http://localhost:3000/items');
      if (selectedSlotType) {
        url.searchParams.append('slotType', selectedSlotType);
      }
      url.searchParams.append('page', currentPage.toString());
      url.searchParams.append('limit', itemsPerPage.toString());

      const [itemsResponse, heroResponse] = await Promise.all([
        fetch(url.toString(), {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }),
        fetch('http://localhost:3000/heroes/active', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
      ]);

      if (!itemsResponse.ok) {
        throw new Error('Failed to fetch store items');
      }

      if (!heroResponse.ok) {
        throw new Error('Failed to fetch hero data');
      }

      const itemsData: PaginatedResponse<ItemResponseDto> = await itemsResponse.json();
      const heroData = await heroResponse.json();

      setItems(itemsData.data);
      setTotalPages(itemsData.meta.totalPages);
      setTotalItems(itemsData.meta.total);
      setHeroMoney(heroData.money || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      toast.error(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchInventory = async () => {
    try {
      setInventoryLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/auth/signin');
        return;
      }

      const response = await fetch('http://localhost:3000/inventory', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch inventory');
      }

      const data: InventoryResponse = await response.json();
      setInventory(data.items);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to load inventory');
    } finally {
      setInventoryLoading(false);
    }
  };

  useEffect(() => {
    fetchStoreData();
  }, [router, selectedSlotType, currentPage]);

  useEffect(() => {
    if (showInventory) {
      fetchInventory();
    }
  }, [showInventory]);

  const handleAddToCart = (item: ItemResponseDto) => {
    const existingItem = selectedItems.find(selected => selected.item.id === item.id);
    
    if (existingItem) {
      if (item.isConsumable) {
        setSelectedItems(selectedItems.map(selected =>
          selected.item.id === item.id
            ? { ...selected, quantity: selected.quantity + 1 }
            : selected
        ));
        toast.success(`Added another ${item.name} to cart`);
      } else {
        toast.error(`You can only have one ${item.name}`);
      }
    } else {
      setSelectedItems([...selectedItems, { item, quantity: 1 }]);
      toast.success(`Added ${item.name} to cart`);
    }
  };

  const handleRemoveFromCart = (itemId: string) => {
    const item = selectedItems.find(selected => selected.item.id === itemId);
    setSelectedItems(selectedItems.filter(selected => selected.item.id !== itemId));
    if (item) {
      toast.success(`Removed ${item.item.name} from cart`);
    }
  };

  const handleQuantityChange = (itemId: string, change: number) => {
    setSelectedItems(selectedItems.map(selected => {
      if (selected.item.id === itemId) {
        if (selected.item.isConsumable) {
          const newQuantity = Math.max(1, selected.quantity + change);
          return { ...selected, quantity: newQuantity };
        }
      }
      return selected;
    }));
  };

  const calculateTotal = () => {
    return selectedItems.reduce((total, { item, quantity }) => total + (item.price * quantity), 0);
  };

  const handlePurchase = async () => {
    try {
      setPurchasing(true);
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/auth/signin');
        return;
      }

      const response = await fetch('http://localhost:3000/store/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: selectedItems.map(({ item, quantity }) => ({
            itemId: item.id,
            quantity,
          })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to purchase items');
      }

      const result = await response.json();
      setHeroMoney(result.remainingMoney);
      setSelectedItems([]);
      toast.success('Items purchased successfully!');
      
      // Refresh store data to update available items
      await fetchStoreData();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'An error occurred during purchase');
    } finally {
      setPurchasing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-800 shadow rounded-lg overflow-hidden p-6">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
              <span className="ml-3 text-white">Loading store items...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-800 shadow rounded-lg overflow-hidden p-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Error</h2>
            <p className="text-gray-400 mb-6">{error}</p>
            <Link
              href="/hero"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Return to Hero
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Gold */}
        <div className="bg-gray-800 shadow rounded-lg overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-700">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">Store</h1>
              <div className="text-right">
                <p className="text-gray-400">Your Gold</p>
                <p className="text-2xl font-bold text-yellow-400">{heroMoney}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Inventory Section - Full Width */}
        <div className="bg-gray-800 shadow rounded-lg overflow-hidden mb-6">
          <button
            onClick={() => setShowInventory(!showInventory)}
            className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-700 transition-colors"
          >
            <h2 className="text-xl font-semibold text-white">Your Inventory</h2>
            {showInventory ? (
              <ChevronUpIcon className="h-6 w-6 text-white" />
            ) : (
              <ChevronDownIcon className="h-6 w-6 text-white" />
            )}
          </button>
          
          {showInventory && (
            <div className="px-6 py-4 border-t border-gray-700">
              {inventoryLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                  <span className="ml-3 text-white">Loading inventory...</span>
                </div>
              ) : inventory.length === 0 ? (
                <p className="text-gray-400 text-center py-8">Your inventory is empty</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                  {inventory.map(({ item, quantity }) => (
                    <div key={item.id} className="bg-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-white font-medium">{item.name}</h3>
                          <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                          <p className="text-gray-400 text-sm mt-1">Slot: {item.slotType}</p>
                        </div>
                        {item.isConsumable && (
                          <span className="text-white font-medium">x{quantity}</span>
                        )}
                      </div>
                      <div className="mt-2">
                        {Object.entries(item.effects).map(([stat, value]) => (
                          <div key={stat} className="flex justify-between text-sm">
                            <span className="text-gray-400">{stat}</span>
                            <span className="text-white">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Store Items and Shopping Cart Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Store Items */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-700">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-white">Available Items</h2>
                  <select
                    value={selectedSlotType}
                    onChange={(e) => {
                      setSelectedSlotType(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {SLOT_TYPES.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium text-white">{item.name}</h3>
                          <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                          <p className="text-gray-400 text-sm mt-1">Slot: {item.slotType}</p>
                        </div>
                        <span className="text-yellow-400 font-medium">{item.price} gold</span>
                      </div>
                      <div className="mt-4">
                        {Object.entries(item.effects).map(([stat, value]) => (
                          <div key={stat} className="flex justify-between text-sm">
                            <span className="text-gray-400">{stat}</span>
                            <span className="text-white">{value}</span>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => handleAddToCart(item)}
                        disabled={loading}
                        className="mt-4 w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>

                {/* Pagination Controls */}
                <div className="mt-6 flex justify-between items-center">
                  <div className="text-gray-400">
                    Showing {items.length} of {totalItems} items
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1 || loading}
                      className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
                    >
                      Previous
                    </button>
                    <span className="px-4 py-2 bg-gray-700 text-white rounded-md">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages || loading}
                      className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shopping Cart */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-700">
                <h2 className="text-xl font-semibold text-white">Shopping Cart</h2>
              </div>
              <div className="p-6">
                {selectedItems.length === 0 ? (
                  <p className="text-gray-400 text-center">Your cart is empty</p>
                ) : (
                  <div className="space-y-4">
                    {selectedItems.map(({ item, quantity }) => (
                      <div key={item.id} className="bg-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-white font-medium">{item.name}</h3>
                            <p className="text-yellow-400 text-sm">{item.price} gold each</p>
                          </div>
                          <button
                            onClick={() => handleRemoveFromCart(item.id)}
                            disabled={purchasing}
                            className="text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            ×
                          </button>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          {item.isConsumable ? (
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleQuantityChange(item.id, -1)}
                                disabled={purchasing}
                                className="text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                -
                              </button>
                              <span className="text-white">{quantity}</span>
                              <button
                                onClick={() => handleQuantityChange(item.id, 1)}
                                disabled={purchasing}
                                className="text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <span className="text-gray-400">Equipment (1)</span>
                          )}
                          <span className="text-white">
                            Total: {item.price * quantity} gold
                          </span>
                        </div>
                      </div>
                    ))}
                    <div className="border-t border-gray-700 pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-400">Total Cost:</span>
                        <span className="text-2xl font-bold text-yellow-400">
                          {calculateTotal()} gold
                        </span>
                      </div>
                      <button
                        onClick={handlePurchase}
                        disabled={calculateTotal() > heroMoney || purchasing}
                        className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {purchasing ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Purchasing...
                          </div>
                        ) : (
                          'Purchase'
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 