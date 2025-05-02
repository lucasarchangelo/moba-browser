'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface HeroAttributes {
  strength: number;
  dexterity: number;
  intelligence: number;
  baseHealth: number;
  baseMana: number;
  baseArmor: number;
  baseMagicResistance: number;
  baseAccuracy: number;
  baseDamage: number;
  baseMagicDamage: number;
  currentLife: number;
  currentMana: number;
}

interface Hero {
  id: string;
  name: string;
  description: string;
  level: number;
  attributes: HeroAttributes;
  userId: string;
  seasonId: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export default function HeroProfile() {
  const router = useRouter();
  const [hero, setHero] = useState<Hero | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
          setHero(data);
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

    fetchHero();
  }, [router]);

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

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Primary Attributes */}
          <div className="bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white">Primary Attributes</h2>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Strength</span>
                <span className="text-white font-medium text-base py-3">{hero.attributes.strength}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Dexterity</span>
                <span className="text-white font-medium text-base py-3">{hero.attributes.dexterity}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Intelligence</span>
                <span className="text-white font-medium text-base py-3">{hero.attributes.intelligence}</span>
              </div>
            </div>
          </div>

          {/* Combat Stats */}
          <div className="bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white">Combat Stats</h2>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Base Damage</span>
                <span className="text-white font-medium text-base py-3">{hero.attributes.baseDamage}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Base Magic Damage</span>
                <span className="text-white font-medium text-base py-3">{hero.attributes.baseMagicDamage}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Base Accuracy</span>
                <span className="text-white font-medium text-base py-3">{hero.attributes.baseAccuracy}</span>
              </div>
            </div>
          </div>

          {/* Defense Stats */}
          <div className="bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white">Defense Stats</h2>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Base Armor</span>
                <span className="text-white font-medium text-base py-3">{hero.attributes.baseArmor}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Base Magic Resistance</span>
                <span className="text-white font-medium text-base py-3">{hero.attributes.baseMagicResistance}</span>
              </div>
            </div>
          </div>

          {/* Resource Stats */}
          <div className="bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white">Resource Stats</h2>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Base Health</span>
                <span className="text-white font-medium text-base py-3">{hero.attributes.baseHealth}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Base Mana</span>
                <span className="text-white font-medium text-base py-3">{hero.attributes.baseMana}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Current Life</span>
                <span className="text-white font-medium text-base py-3">{hero.attributes.currentLife}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Current Mana</span>
                <span className="text-white font-medium text-base py-3">{hero.attributes.currentMana}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Future Components */}
        <div className="space-y-6">
          {/* Inventory Accordion */}
          <div className="bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white">Inventory</h2>
            </div>
            <div className="px-6 py-4">
              <p className="text-gray-400 text-center">Inventory component coming soon...</p>
            </div>
          </div>

          {/* Skills Accordion */}
          <div className="bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white">Skills</h2>
            </div>
            <div className="px-6 py-4">
              <p className="text-gray-400 text-center">Skills component coming soon...</p>
            </div>
          </div>

          {/* Equipped Items Accordion */}
          <div className="bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white">Equipped Items</h2>
            </div>
            <div className="px-6 py-4">
              <p className="text-gray-400 text-center">Equipped items component coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 