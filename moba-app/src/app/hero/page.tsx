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
  money: number;
  userId: string;
  seasonId: string;
  createdAt: string;
  updatedAt: string;
}

interface AttributeChanges {
  strength: number;
  dexterity: number;
  intelligence: number;
}

export default function HeroProfile() {
  const router = useRouter();
  const [hero, setHero] = useState<Hero | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attributeChanges, setAttributeChanges] = useState<AttributeChanges>({
    strength: 0,
    dexterity: 0,
    intelligence: 0,
  });
  const [isDistributing, setIsDistributing] = useState(false);

  // Calculate available points (5 points per level)
  const availablePoints = hero?.level ? hero.level * 5 : 0;
  const usedPoints = hero?.attributes ? 
    (hero.attributes.strength || 0) + 
    (hero.attributes.dexterity || 0) + 
    (hero.attributes.intelligence || 0) : 0;
  const remainingPoints = availablePoints - usedPoints;
  const pendingChanges = 
    attributeChanges.strength + attributeChanges.dexterity + attributeChanges.intelligence;
  const actualRemainingPoints = remainingPoints - pendingChanges;

  const handleAttributeChange = (attribute: keyof AttributeChanges, change: number) => {
    if (!hero?.attributes) return;

    const newChanges = { ...attributeChanges };
    const currentValue = hero.attributes[attribute] || 0;
    const newValue = currentValue + change + newChanges[attribute];

    // Calculate total points that would be used after this change
    const totalPointsAfterChange = 
      (hero.attributes.strength || 0) + 
      (hero.attributes.dexterity || 0) + 
      (hero.attributes.intelligence || 0) + 
      pendingChanges - newChanges[attribute] + change;

    // Check if we have enough points and the new value is valid
    if (change > 0) {
      // When adding points, check if we have enough remaining points
      if (totalPointsAfterChange > availablePoints) {
        return;
      }
    } else {
      // When removing points, check if we're not going below the original value
      if (newValue < currentValue) {
        return;
      }
    }

    // Check if the new value is within valid range (0-10)
    if (newValue < 0 || newValue > 10) {
      return;
    }

    newChanges[attribute] += change;
    setAttributeChanges(newChanges);
  };

  const handleDistributePoints = async () => {
    if (!hero || pendingChanges === 0) return;

    setIsDistributing(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/auth/signin');
        return;
      }

      const response = await fetch(`http://localhost:3000/heroes/${hero.id}/distribute-points`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          strength: attributeChanges.strength,
          dexterity: attributeChanges.dexterity,
          intelligence: attributeChanges.intelligence,
        }),
      });

      if (response.ok) {
        const updatedHero = await response.json();
        // Validate the response structure
        if (updatedHero && updatedHero.attributes) {
          setHero(updatedHero);
          setAttributeChanges({ strength: 0, dexterity: 0, intelligence: 0 });
        } else {
          setError('Invalid hero data received from server');
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to distribute points');
      }
    } catch (err) {
      setError('An error occurred while distributing points');
    } finally {
      setIsDistributing(false);
    }
  };

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

  const renderAttributeValue = (attribute: keyof AttributeChanges, value: number) => {
    const change = attributeChanges[attribute];
    const hasChanges = change !== 0;
    const currentValue = value || 0;
    const newValue = currentValue + change;

    // Calculate if we can add more points
    const canAddPoints = actualRemainingPoints > 0;
    // Calculate if we can remove points (can't go below original value)
    const canRemovePoints = newValue > currentValue;

    return (
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleAttributeChange(attribute, -1)}
          className="text-gray-400 hover:text-white disabled:opacity-50"
          disabled={loading || isDistributing || !canRemovePoints}
        >
          -
        </button>
        <span className={`text-white font-medium text-base py-3 ${hasChanges ? 'text-yellow-400' : ''}`}>
          {newValue}
        </span>
        <button
          onClick={() => handleAttributeChange(attribute, 1)}
          className="text-gray-400 hover:text-white disabled:opacity-50"
          disabled={loading || isDistributing || !canAddPoints}
        >
          +
        </button>
      </div>
    );
  };

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
            <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">Primary Attributes</h2>
              {remainingPoints > 0 && (
                <span className={`px-2 py-1 rounded-full text-sm ${
                  actualRemainingPoints >= 0 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-red-600 text-white'
                }`}>
                  {actualRemainingPoints} points available
                </span>
              )}
            </div>
            <div className="px-6 py-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Strength</span>
                {renderAttributeValue('strength', hero?.attributes?.strength || 0)}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Dexterity</span>
                {renderAttributeValue('dexterity', hero?.attributes?.dexterity || 0)}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Intelligence</span>
                {renderAttributeValue('intelligence', hero?.attributes?.intelligence || 0)}
              </div>
              {pendingChanges !== 0 && (
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={handleDistributePoints}
                    disabled={isDistributing}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                  >
                    {isDistributing ? 'Applying...' : 'Apply Changes'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Derived Stats */}
          <div className="bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white">Derived Stats</h2>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Health</span>
                <span className="text-white">{hero?.attributes?.baseHealth || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Mana</span>
                <span className="text-white">{hero?.attributes?.baseMana || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Armor</span>
                <span className="text-white">{hero?.attributes?.baseArmor || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Magic Resistance</span>
                <span className="text-white">{hero?.attributes?.baseMagicResistance || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Accuracy</span>
                <span className="text-white">{hero?.attributes?.baseAccuracy || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Damage</span>
                <span className="text-white">{hero?.attributes?.baseDamage || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Magic Damage</span>
                <span className="text-white">{hero?.attributes?.baseMagicDamage || 0}</span>
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