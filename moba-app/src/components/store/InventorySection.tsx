import { useState, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

interface InventoryItem {
  id: string;
  quantity: number;
  item: {
    id: string;
    name: string;
    description: string;
    slotType: string;
    isConsumable: boolean;
    effects: Record<string, any>;
  };
  createdAt: Date;
  acquiredAt: Date;
}

interface HeroSkill {
  id: string;
  level: number;
  damageMultiplier: number;
  cooldownMultiplier: number;
  manaCostMultiplier: number;
  rangeMultiplier: number;
  areaOfEffectMultiplier: number;
  skill: {
    id: string;
    name: string;
    description: string;
    magicType: string;
    baseDamage: number;
    baseManaCost: number;
    requiredStrength: number;
    requiredDexterity: number;
    requiredIntelligence: number;
    effects: Record<string, any>;
  };
}

interface InventorySectionProps {
  type: 'items' | 'skills';
}

export default function InventorySection({ type }: InventorySectionProps) {
  const [showInventory, setShowInventory] = useState(false);
  const [inventory, setInventory] = useState<InventoryItem[] | HeroSkill[]>([]);
  const [inventoryLoading, setInventoryLoading] = useState(false);

  const fetchInventory = async () => {
    try {
      setInventoryLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }

      const endpoint = type === 'items' ? '/inventory' : '/hero-skills';
      const response = await fetch(`http://localhost:3000${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch ${type}`);
      }

      const data = await response.json();
      
      if (type === 'items') {
        setInventory(data.items || []);
      } else {
        // For skills, ensure we have the correct data structure
        if (data && Array.isArray(data)) {
          setInventory(data);
        } else if (data?.hero?.skills && Array.isArray(data.hero.skills)) {
          setInventory(data.hero.skills);
        } else {
          setInventory([]);
          console.error('Unexpected skills data structure:', data);
        }
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : `Failed to load ${type}`);
      setInventory([]);
    } finally {
      setInventoryLoading(false);
    }
  };

  useEffect(() => {
    if (showInventory) {
      fetchInventory();
    }
  }, [showInventory, type]);

  return (
    <div className="bg-gray-800 shadow rounded-lg overflow-hidden mb-6">
      <button
        onClick={() => setShowInventory(!showInventory)}
        className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-700 transition-colors"
      >
        <h2 className="text-xl font-semibold text-white">Your {type === 'items' ? 'Inventory' : 'Skills'}</h2>
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
              <span className="ml-3 text-white">Loading {type}...</span>
            </div>
          ) : inventory.length === 0 ? (
            <p className="text-gray-400 text-center py-8">Your {type} is empty</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {type === 'items' ? (
                (inventory as InventoryItem[]).map(({ item, quantity }) => (
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
                ))
              ) : (
                (inventory as HeroSkill[]).map((heroSkill) => (
                  <div key={heroSkill.id} className="bg-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-white font-medium">{heroSkill.skill?.name || 'Unknown Skill'}</h3>
                        <p className="text-gray-400 text-sm mt-1">{heroSkill.skill?.description || 'No description available'}</p>
                        <p className="text-gray-400 text-sm mt-1">Level: {heroSkill.level}</p>
                      </div>
                    </div>
                    <div className="mt-2">

                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
} 