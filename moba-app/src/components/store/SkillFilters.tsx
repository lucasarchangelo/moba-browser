import { useState } from 'react';

interface SkillFiltersProps {
  onFilterChange: (filters: {
    maxRequiredStrength?: number;
    maxRequiredDexterity?: number;
    maxRequiredIntelligence?: number;
  }) => void;
  heroAttributes: {
    strength: number;
    dexterity: number;
    intelligence: number;
  };
}

export default function SkillFilters({ onFilterChange, heroAttributes }: SkillFiltersProps) {
  const [localFilters, setLocalFilters] = useState({
    maxRequiredStrength: heroAttributes.strength,
    maxRequiredDexterity: heroAttributes.dexterity,
    maxRequiredIntelligence: heroAttributes.intelligence,
  });

  const handleInputChange = (attribute: string, value: string) => {
    const numValue = value === '' ? undefined : parseInt(value);
    setLocalFilters(prev => ({
      ...prev,
      [attribute]: numValue,
    }));
  };

  const handleApplyFilters = () => {
    onFilterChange(localFilters);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      maxRequiredStrength: heroAttributes.strength,
      maxRequiredDexterity: heroAttributes.dexterity,
      maxRequiredIntelligence: heroAttributes.intelligence,
    };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="bg-gray-800 shadow rounded-lg overflow-hidden mb-6">
      <div className="px-6 py-4 border-b border-gray-700">
        <h3 className="text-lg font-medium text-white mb-4">Filter Skills by Requirements</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="strength" className="block text-sm font-medium text-gray-400 mb-1">
              Max Strength Required
            </label>
            <input
              type="number"
              id="strength"
              min="0"
              value={localFilters.maxRequiredStrength || ''}
              onChange={(e) => handleInputChange('maxRequiredStrength', e.target.value)}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder={`Your Strength: ${heroAttributes.strength}`}
            />
          </div>
          <div>
            <label htmlFor="dexterity" className="block text-sm font-medium text-gray-400 mb-1">
              Max Dexterity Required
            </label>
            <input
              type="number"
              id="dexterity"
              min="0"
              value={localFilters.maxRequiredDexterity || ''}
              onChange={(e) => handleInputChange('maxRequiredDexterity', e.target.value)}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder={`Your Dexterity: ${heroAttributes.dexterity}`}
            />
          </div>
          <div>
            <label htmlFor="intelligence" className="block text-sm font-medium text-gray-400 mb-1">
              Max Intelligence Required
            </label>
            <input
              type="number"
              id="intelligence"
              min="0"
              value={localFilters.maxRequiredIntelligence || ''}
              onChange={(e) => handleInputChange('maxRequiredIntelligence', e.target.value)}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder={`Your Intelligence: ${heroAttributes.intelligence}`}
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Reset Filters
          </button>
          <button
            onClick={handleApplyFilters}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
} 