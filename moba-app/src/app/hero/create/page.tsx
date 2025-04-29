'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface HeroFormData {
  name: string;
  strength: number;
  agility: number;
  intelligence: number;
}

export default function CreateHero() {
  const router = useRouter();
  const [formData, setFormData] = useState<HeroFormData>({
    name: '',
    strength: 5,
    agility: 5,
    intelligence: 5,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/auth/signin');
        return;
      }

      const response = await fetch('http://localhost:3000/heroes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/profile');
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to create hero');
      }
    } catch (err) {
      setError('An error occurred while creating your hero');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'name' ? value : Math.max(1, Math.min(10, parseInt(value) || 0)),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-700">
            <h3 className="text-2xl font-bold text-white">Create Your Hero</h3>
            <p className="mt-1 text-sm text-gray-400">
              Choose your hero's name and attributes
            </p>
          </div>

          <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
            <div className="space-y-6">
              {/* Hero Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400">
                  Hero Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter hero name"
                />
              </div>

              {/* Attributes */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-white">Attributes</h4>
                <p className="text-sm text-gray-400">
                  Distribute points between strength, agility, and intelligence (1-10 each)
                </p>

                {/* Strength */}
                <div>
                  <label htmlFor="strength" className="block text-sm font-medium text-gray-400">
                    Strength
                  </label>
                  <input
                    type="number"
                    name="strength"
                    id="strength"
                    min="1"
                    max="10"
                    value={formData.strength}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                {/* Agility */}
                <div>
                  <label htmlFor="agility" className="block text-sm font-medium text-gray-400">
                    Agility
                  </label>
                  <input
                    type="number"
                    name="agility"
                    id="agility"
                    min="1"
                    max="10"
                    value={formData.agility}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                {/* Intelligence */}
                <div>
                  <label htmlFor="intelligence" className="block text-sm font-medium text-gray-400">
                    Intelligence
                  </label>
                  <input
                    type="number"
                    name="intelligence"
                    id="intelligence"
                    min="1"
                    max="10"
                    value={formData.intelligence}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create Hero'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 