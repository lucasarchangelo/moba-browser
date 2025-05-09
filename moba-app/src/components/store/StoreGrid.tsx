import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface StoreItem {
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

interface StoreSkill {
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

interface StoreGridProps {
  type: 'items' | 'skills';
  items: StoreItem[] | StoreSkill[];
  onAddToCart: (item: StoreItem | StoreSkill) => void;
  loading: boolean;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export default function StoreGrid({
  type,
  items,
  onAddToCart,
  loading,
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
}: StoreGridProps) {
  return (
    <div className="bg-gray-800 shadow rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-700">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">Available {type === 'items' ? 'Items' : 'Skills'}</h2>
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
                  {type === 'items' && (
                    <p className="text-gray-400 text-sm mt-1">Slot: {(item as StoreItem).slotType}</p>
                  )}
                </div>
                <span className="text-yellow-400 font-medium">{item.price} gold</span>
              </div>
              <div className="mt-4">
                {type === 'items' ? (
                  Object.entries(item.effects).map(([stat, value]) => (
                    <div key={stat} className="flex justify-between text-sm">
                      <span className="text-gray-400">{stat}</span>
                      <span className="text-white">{value}</span>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Base Damage</span>
                      <span className="text-white">{(item as StoreSkill).baseDamage}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Base Mana Cost</span>
                      <span className="text-white">{(item as StoreSkill).baseManaCost}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Required Strength</span>
                      <span className="text-white">{(item as StoreSkill).requiredStrength}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Required Dexterity</span>
                      <span className="text-white">{(item as StoreSkill).requiredDexterity}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Required Intelligence</span>
                      <span className="text-white">{(item as StoreSkill).requiredIntelligence}</span>
                    </div>
                  </>
                )}
              </div>
              <button
                onClick={() => onAddToCart(item)}
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
            Showing {items.length} of {totalItems} {type}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1 || loading}
              className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
            >
              Previous
            </button>
            <span className="px-4 py-2 bg-gray-700 text-white rounded-md">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages || loading}
              className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 