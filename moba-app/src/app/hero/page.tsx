'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Hero } from '../../types/game';
import EquippedItemsSection from '../../components/hero/EquippedItemsSection';
import InventorySection from '../../components/hero/InventorySection';

export default function HeroProfile() {
  const router = useRouter();
  const [hero, setHero] = useState<Hero | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'status' | 'inventory'>('status');

  useEffect(() => {
    fetchHero();
  }, []);

  const fetchHero = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/auth/signin');
        return;
      }

      const response = await fetch('http://localhost:3000/heroes/active', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setHero(data.hero);
      } else if (response.status === 404) {
        setHero(null);
        setError('No active hero found for the current season');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to fetch hero data');
      }
    } catch (err) {
      setError('An error occurred while fetching hero data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 shadow rounded-lg overflow-hidden p-6">
            <p className="text-white text-center">Loading hero information...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 shadow rounded-lg overflow-hidden p-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Error</h2>
            <p className="text-gray-400 mb-6">{error}</p>
            <Link
              href="/hero/create"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Your Hero
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!hero) {
    return (
      <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 shadow rounded-lg overflow-hidden p-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">No Hero Found</h2>
            <p className="text-gray-400 mb-6">You don't have a hero for the current season.</p>
            <Link
              href="/hero/create"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Your Hero
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Header */}
        <div className="bg-gray-800 shadow rounded-lg overflow-hidden mb-6">
          <div className="px-6 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">{hero.name}</h1>
                <p className="mt-1 text-gray-400">Level {hero.level}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400">Created on {new Date(hero.createdAt).toLocaleDateString()}</p>
                <p className="text-gray-400">Last updated {new Date(hero.updatedAt).toLocaleDateString()}</p>
              </div>
            </div>
            <p className="mt-4 text-gray-300">{hero.description}</p>

            {/* Health and Mana Progress Bars */}
            <div className="mt-6 space-y-4">
              {/* Health Bar */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-400">Health</span>
                  <span className="text-sm font-medium text-gray-400">
                    {hero.attributes.currentLife} / {hero.attributes.baseHealth}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-red-600 h-2.5 rounded-full" 
                    style={{ 
                      width: `${(hero.attributes.currentLife / hero.attributes.baseHealth) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>

              {/* Mana Bar */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-400">Mana</span>
                  <span className="text-sm font-medium text-gray-400">
                    {hero.attributes.currentMana} / {hero.attributes.baseMana}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ 
                      width: `${(hero.attributes.currentMana / hero.attributes.baseMana) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-gray-800 shadow rounded-lg overflow-hidden mb-6">
          <div className="border-b border-gray-700">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('status')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'status'
                    ? 'text-white border-b-2 border-indigo-500'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Status
              </button>
              <button
                onClick={() => setActiveTab('inventory')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'inventory'
                    ? 'text-white border-b-2 border-indigo-500'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Inventory & Equipment
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'status' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Primary Attributes */}
                <div className="bg-gray-700 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">Primary Attributes</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Strength</span>
                      <span className="text-white">{hero.attributes.strength}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Dexterity</span>
                      <span className="text-white">{hero.attributes.dexterity}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Intelligence</span>
                      <span className="text-white">{hero.attributes.intelligence}</span>
                    </div>
                  </div>
                </div>

                {/* Derived Stats */}
                <div className="bg-gray-700 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">Derived Stats</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Armor</span>
                      <span className="text-white">{hero.attributes.baseArmor}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Magic Resistance</span>
                      <span className="text-white">{hero.attributes.baseMagicResistance}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Accuracy</span>
                      <span className="text-white">{hero.attributes.baseAccuracy}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Damage</span>
                      <span className="text-white">{hero.attributes.baseDamage}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Magic Damage</span>
                      <span className="text-white">{hero.attributes.baseMagicDamage}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">Equipped Items</h2>
                  <EquippedItemsSection />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">Inventory</h2>
                  <InventorySection />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 