'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import InventorySection from '@/components/store/InventorySection';
import StoreGrid from '@/components/store/StoreGrid';
import ShoppingCart from '@/components/store/ShoppingCart';
import SkillFilters from '@/components/store/SkillFilters';

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

interface SkillResponseDto {
  id: string;
  name: string;
  description: string;
  magicType: string;
  baseDamage: number;
  baseManaCost: number;
  requiredStrength: number;
  requiredDexterity: number;
  requiredIntelligence: number;
  price: number;
  imageUrl: string;
  effects: Record<string, any>;
}

interface StoreResponse {
  items: ItemResponseDto[];
  skills: SkillResponseDto[];
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
  item: {
    id: string;
    name: string;
  };
  quantity: number;
}

interface HeroData {
  hero: {
    id: string;
    name: string;
    money: number;
    attributes: {
      strength: number;
      dexterity: number;
      intelligence: number;
    };
    inventory?: InventoryItem[];
  };
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

interface SkillFilters {
  maxRequiredStrength?: number;
  maxRequiredDexterity?: number;
  maxRequiredIntelligence?: number;
}

export default function StorePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'items' | 'skills'>('items');
  const [items, setItems] = useState<ItemResponseDto[]>([]);
  const [skills, setSkills] = useState<SkillResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<{ item: ItemResponseDto | SkillResponseDto; quantity: number }[]>([]);
  const [heroMoney, setHeroMoney] = useState(0);
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [selectedSlotType, setSelectedSlotType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 8;
  const [skillFilters, setSkillFilters] = useState<SkillFilters>({
    maxRequiredStrength: undefined,
    maxRequiredDexterity: undefined,
    maxRequiredIntelligence: undefined,
  });

  const fetchStoreData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/auth/signin');
        return;
      }

      const endpoint = activeTab === 'items' ? '/items' : '/skills';
      const url = new URL(`http://localhost:3000${endpoint}`);
      
      if (activeTab === 'items' && selectedSlotType) {
        url.searchParams.append('slotType', selectedSlotType);
      } else if (activeTab === 'skills') {
        // Add skill filters to URL
        if (skillFilters.maxRequiredStrength !== undefined) {
          url.searchParams.append('maxRequiredStrength', skillFilters.maxRequiredStrength.toString());
        }
        if (skillFilters.maxRequiredDexterity !== undefined) {
          url.searchParams.append('maxRequiredDexterity', skillFilters.maxRequiredDexterity.toString());
        }
        if (skillFilters.maxRequiredIntelligence !== undefined) {
          url.searchParams.append('maxRequiredIntelligence', skillFilters.maxRequiredIntelligence.toString());
        }
      }

      url.searchParams.append('page', currentPage.toString());
      url.searchParams.append('limit', itemsPerPage.toString());

      const [storeResponse, heroResponse] = await Promise.all([
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

      if (!storeResponse.ok) {
        throw new Error(`Failed to fetch ${activeTab}`);
      }

      if (!heroResponse.ok) {
        throw new Error('Failed to fetch hero data');
      }

      const storeData: PaginatedResponse<ItemResponseDto | SkillResponseDto> = await storeResponse.json();
      const heroData = await heroResponse.json();

      if (activeTab === 'items') {
        setItems(storeData.data as ItemResponseDto[]);
      } else {
        setSkills(storeData.data as SkillResponseDto[]);
      }
      setTotalPages(storeData.meta.totalPages);
      setTotalItems(storeData.meta.total);
      setHeroMoney(heroData.hero.money || 0);
      setHeroData(heroData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      toast.error(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStoreData();
  }, [router, selectedSlotType, currentPage, activeTab, skillFilters]);

  const handleAddToCart = (item: ItemResponseDto | SkillResponseDto) => {
    // For skills, check if hero meets requirements
    if ('requiredStrength' in item) {
      const hero = heroData?.hero;
      if (!hero) return;

      if (hero.attributes.strength < item.requiredStrength ||
          hero.attributes.dexterity < item.requiredDexterity ||
          hero.attributes.intelligence < item.requiredIntelligence) {
        toast.error(`You don't meet the requirements for ${item.name}`);
        return;
      }
    } else {
      // For items, check if hero already has it (non-consumable items only)
      if (!item.isConsumable) {
        const hero = heroData?.hero;
        if (!hero) return;

        const hasItem = hero.inventory?.some(invItem => invItem.item.id === item.id);
        if (hasItem) {
          toast.error(`You already have ${item.name}`);
          return;
        }
      }
    }

    const existingItem = selectedItems.find(selected => selected.item.id === item.id);
    
    if (existingItem) {
      if ('isConsumable' in item && item.isConsumable) {
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
        if ('isConsumable' in selected.item && selected.item.isConsumable) {
          const newQuantity = Math.max(1, selected.quantity + change);
          return { ...selected, quantity: newQuantity };
        }
      }
      return selected;
    }));
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
            type: 'isConsumable' in item ? 'item' : 'skill',
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

  const handleSkillFilterChange = (filters: SkillFilters) => {
    setSkillFilters(filters);
    setCurrentPage(1); // Reset to first page when filters change
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

        {/* Inventory Section */}
        <InventorySection type={activeTab} />

        {/* Store Items and Shopping Cart Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Store Items/Skills */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 shadow rounded-lg overflow-hidden mb-6">
              <div className="px-6 py-4 border-b border-gray-700">
                <div className="flex justify-between items-center">
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setActiveTab('items')}
                      className={`px-4 py-2 rounded-md ${
                        activeTab === 'items'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      Items
                    </button>
                    <button
                      onClick={() => setActiveTab('skills')}
                      className={`px-4 py-2 rounded-md ${
                        activeTab === 'skills'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      Skills
                    </button>
                  </div>
                  {activeTab === 'items' && (
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
                  )}
                </div>
              </div>
            </div>

            {/* Skill Filters */}
            {activeTab === 'skills' && heroData?.hero && (
              <SkillFilters
                onFilterChange={handleSkillFilterChange}
                heroAttributes={heroData.hero.attributes}
              />
            )}

            <StoreGrid
              type={activeTab}
              items={activeTab === 'items' ? items : skills}
              onAddToCart={handleAddToCart}
              loading={loading}
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              onPageChange={setCurrentPage}
            />
          </div>

          {/* Shopping Cart */}
          <div className="lg:col-span-1">
            <ShoppingCart
              items={selectedItems.map(({ item, quantity }) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: 'isConsumable' in item ? quantity : undefined,
              }))}
              onRemove={handleRemoveFromCart}
              onQuantityChange={handleQuantityChange}
              onPurchase={handlePurchase}
              heroMoney={heroMoney}
              purchasing={purchasing}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 