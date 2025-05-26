'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faEdit, faCode } from '@fortawesome/free-solid-svg-icons';
import { EffectType } from '@/types/effect-type.enum';
import { EffectTarget } from '@/types/effect-target.enum';
import { StatType } from '@/types/stat-type.enum';

interface EffectEntry {
  type: EffectType;
  target: EffectTarget;
  value: number | string;
  stat?: StatType;
  duration?: number;
  chance?: number;
}

interface Effect {
  effect: EffectEntry[];
}

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
  effects: Effect;
  createdAt: Date;
  updatedAt: Date;
}

interface ItemFormData {
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
  effects: Effect;
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

function EffectEditor({ value, onChange }: { value: Effect; onChange: (value: Effect) => void }) {
  const [isJsonMode, setIsJsonMode] = useState(false);
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [jsonValue, setJsonValue] = useState('');

  useEffect(() => {
    if (isJsonMode) {
      setJsonValue(JSON.stringify(value, null, 2));
    }
  }, [isJsonMode, value]);

  const handleJsonChange = (newJson: string) => {
    setJsonValue(newJson);
    try {
      const parsed = JSON.parse(newJson);
      // Validate the structure
      if (!parsed.effect || !Array.isArray(parsed.effect)) {
        throw new Error('Effects must be an array under the "effect" key');
      }
      
      // Validate each effect entry
      parsed.effect.forEach((entry: any, index: number) => {
        if (!entry.type || !entry.target || entry.value === undefined) {
          throw new Error(`Effect at index ${index} is missing required fields (type, target, value)`);
        }
        if (entry.type && !Object.values(EffectType).includes(entry.type)) {
          throw new Error(`Invalid effect type at index ${index}`);
        }
        if (entry.target && !Object.values(EffectTarget).includes(entry.target)) {
          throw new Error(`Invalid effect target at index ${index}`);
        }
        if (entry.stat && !Object.values(StatType).includes(entry.stat)) {
          throw new Error(`Invalid stat type at index ${index}`);
        }
      });

      onChange(parsed);
      setJsonError(null);
    } catch (err) {
      setJsonError(err instanceof Error ? err.message : 'Invalid JSON');
    }
  };

  const addEffect = () => {
    const newEffect: Effect = {
      effect: [
        ...(value.effect || []),
        {
          type: EffectType.STAT_CHANGE,
          target: EffectTarget.SELF,
          value: 0,
          stat: StatType.HEALTH,
          duration: 0,
          chance: 100
        }
      ]
    };
    onChange(newEffect);
  };

  const removeEffect = (index: number) => {
    const newEffect: Effect = {
      effect: value.effect.filter((_, i) => i !== index)
    };
    onChange(newEffect);
  };

  const updateEffect = (index: number, field: keyof EffectEntry, newValue: any) => {
    const newEffect: Effect = {
      effect: value.effect.map((effect, i) => 
        i === index ? { ...effect, [field]: newValue } : effect
      )
    };
    onChange(newEffect);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-medium text-white">Effects</h4>
        <div className="space-x-2">
          <button
            type="button"
            onClick={() => setIsJsonMode(!isJsonMode)}
            className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            <FontAwesomeIcon icon={faCode} />
            {isJsonMode ? 'Visual Editor' : 'JSON Editor'}
          </button>
          {!isJsonMode && (
            <button
              type="button"
              onClick={addEffect}
              className="text-green-400 hover:text-green-300 flex items-center gap-1"
            >
              <FontAwesomeIcon icon={faPlus} />
              Add Effect
            </button>
          )}
        </div>
      </div>

      {isJsonMode ? (
        <div className="space-y-2">
          <textarea
            value={jsonValue}
            onChange={(e) => handleJsonChange(e.target.value)}
            className="w-full h-64 font-mono text-sm bg-gray-700 text-white rounded-md p-4"
            placeholder='{
  "effect": [
    {
      "type": "HEALING",
      "target": "SELF",
      "value": 100,
      "stat": "HEALTH",
      "duration": 10,
      "chance": 100
    }
  ]
}'
          />
          {jsonError && (
            <div className="text-red-400 text-sm">{jsonError}</div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {value.effect.map((effect, index) => (
            <div key={index} className="bg-gray-700 p-4 rounded-md space-y-4">
              <div className="flex justify-between items-center">
                <h5 className="text-white font-medium">Effect {index + 1}</h5>
                <button
                  type="button"
                  onClick={() => removeEffect(index)}
                  className="text-red-400 hover:text-red-300"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Type
                  </label>
                  <select
                    value={effect.type}
                    onChange={(e) => updateEffect(index, 'type', e.target.value)}
                    className="w-full bg-gray-600 text-white rounded-md p-2"
                  >
                    {Object.values(EffectType).map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Target
                  </label>
                  <select
                    value={effect.target}
                    onChange={(e) => updateEffect(index, 'target', e.target.value)}
                    className="w-full bg-gray-600 text-white rounded-md p-2"
                  >
                    {Object.values(EffectTarget).map((target) => (
                      <option key={target} value={target}>{target}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Value
                  </label>
                  <input
                    type="number"
                    value={effect.value}
                    onChange={(e) => updateEffect(index, 'value', Number(e.target.value))}
                    className="w-full bg-gray-600 text-white rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Stat
                  </label>
                  <select
                    value={effect.stat || ''}
                    onChange={(e) => updateEffect(index, 'stat', e.target.value || undefined)}
                    className="w-full bg-gray-600 text-white rounded-md p-2"
                  >
                    <option value="">None</option>
                    {Object.values(StatType).map((stat) => (
                      <option key={stat} value={stat}>{stat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Duration (seconds)
                  </label>
                  <input
                    type="number"
                    value={effect.duration || 0}
                    onChange={(e) => updateEffect(index, 'duration', Number(e.target.value))}
                    className="w-full bg-gray-600 text-white rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Chance (%)
                  </label>
                  <input
                    type="number"
                    value={effect.chance || 100}
                    onChange={(e) => updateEffect(index, 'chance', Number(e.target.value))}
                    min="0"
                    max="100"
                    className="w-full bg-gray-600 text-white rounded-md p-2"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ItemsSection() {
  const { user } = useAuth();
  const [items, setItems] = useState<ItemResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ItemResponseDto | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;
  const [formData, setFormData] = useState<ItemFormData>({
    name: '',
    description: '',
    baseHealth: 0,
    baseMana: 0,
    baseArmor: 0,
    baseMagicResistance: 0,
    baseAccuracy: 0,
    baseDamage: 0,
    baseMagicDamage: 0,
    isConsumable: false,
    slotType: 'HEAD',
    price: 0,
    imageUrl: '',
    effects: { effect: [] },
  });

  useEffect(() => {
    fetchItems(currentPage);
  }, [currentPage]);

  const fetchItems = async (page: number = 1) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Not authenticated');
        return;
      }
      
      const response = await fetch(`http://localhost:3000/items?page=${page}&limit=${itemsPerPage}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data: PaginatedResponse<ItemResponseDto> = await response.json();
        setItems(data.data);
        setTotalPages(data.meta.totalPages);
        setTotalItems(data.meta.total);
      } else {
        setError('Failed to fetch items');
      }
    } catch (err) {
      setError('An error occurred while fetching items');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Not authenticated');
        return;
      }

      const url = editingItem
        ? `http://localhost:3000/items/${editingItem.id}`
        : 'http://localhost:3000/items';
      const method = editingItem ? 'PATCH' : 'POST';

      // Send the effects array directly
      const submitData = {
        ...formData,
        effects: formData.effects.effect,
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        setIsModalOpen(false);
        setEditingItem(null);
        resetForm();
        fetchItems(currentPage);
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to save item');
      }
    } catch (err) {
      setError('An error occurred while saving the item');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Not authenticated');
        return;
      }

      const response = await fetch(`http://localhost:3000/items/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchItems(currentPage);
      } else {
        setError('Failed to delete item');
      }
    } catch (err) {
      setError('An error occurred while deleting the item');
    }
  };

  const handleEdit = (item: ItemResponseDto) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      baseHealth: item.baseHealth,
      baseMana: item.baseMana,
      baseArmor: item.baseArmor,
      baseMagicResistance: item.baseMagicResistance,
      baseAccuracy: item.baseAccuracy,
      baseDamage: item.baseDamage,
      baseMagicDamage: item.baseMagicDamage,
      isConsumable: item.isConsumable,
      slotType: item.slotType,
      price: item.price,
      imageUrl: item.imageUrl,
      effects: { effect: Array.isArray(item.effects) ? item.effects : [] },
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      baseHealth: 0,
      baseMana: 0,
      baseArmor: 0,
      baseMagicResistance: 0,
      baseAccuracy: 0,
      baseDamage: 0,
      baseMagicDamage: 0,
      isConsumable: false,
      slotType: 'HEAD',
      price: 0,
      imageUrl: '',
      effects: { effect: [] },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'number') {
      setFormData(prev => ({
        ...prev,
        [name]: value === '' ? 0 : Number(value),
      }));
    } else if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  if (loading && items.length === 0) {
    return <div className="text-gray-400">Loading items...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">Items Management</h2>
        <button
          onClick={() => {
            setEditingItem(null);
            resetForm();
            setIsModalOpen(true);
          }}
          className="bg-indigo-600 text-white px-5 py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center gap-2 transition-colors duration-200"
        >
          <FontAwesomeIcon icon={faPlus} />
          Create New Item
        </button>
      </div>

      {error && (
        <div className="bg-red-500 text-white p-4 rounded-md mb-6">{error}</div>
      )}

      {/* Items Table */}
      <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Slot Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-700 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-12 h-12 object-contain rounded shadow"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {item.slotType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {item.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-indigo-400 hover:text-indigo-300 mr-4 flex items-center gap-1 transition-colors duration-200"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors duration-200"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-gray-400">
          Showing {items.length} of {totalItems} items
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            First
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="px-4 py-2 bg-gray-700 text-white rounded-md">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Last
          </button>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">
              {editingItem ? 'Edit Item' : 'Create New Item'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Image URL
                  </label>
                  <input
                    type="text"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 text-base"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Slot Type
                  </label>
                  <select
                    name="slotType"
                    value={formData.slotType}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 text-base"
                  >
                    <option value="HEAD">Head</option>
                    <option value="CHEST">Chest</option>
                    <option value="HANDS">Hands</option>
                    <option value="LEGS">Legs</option>
                    <option value="FEET">Feet</option>
                    <option value="WEAPON">Weapon</option>
                    <option value="ACCESSORY">Accessory</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 text-base"
                  />
                </div>
                <div className="col-span-2">
                  <label className="flex items-center text-sm font-medium text-gray-300">
                    <input
                      type="checkbox"
                      name="isConsumable"
                      checked={formData.isConsumable}
                      onChange={handleChange}
                      className="mr-2 h-5 w-5 rounded border-gray-600 text-indigo-500 focus:ring-indigo-500"
                    />
                    Consumable
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Base Health
                  </label>
                  <input
                    type="number"
                    name="baseHealth"
                    value={formData.baseHealth}
                    onChange={handleChange}
                    required
                    min="0"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Base Mana
                  </label>
                  <input
                    type="number"
                    name="baseMana"
                    value={formData.baseMana}
                    onChange={handleChange}
                    required
                    min="0"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Base Armor
                  </label>
                  <input
                    type="number"
                    name="baseArmor"
                    value={formData.baseArmor}
                    onChange={handleChange}
                    required
                    min="0"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Base Magic Resistance
                  </label>
                  <input
                    type="number"
                    name="baseMagicResistance"
                    value={formData.baseMagicResistance}
                    onChange={handleChange}
                    required
                    min="0"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Base Accuracy
                  </label>
                  <input
                    type="number"
                    name="baseAccuracy"
                    value={formData.baseAccuracy}
                    onChange={handleChange}
                    required
                    min="0"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Base Damage
                  </label>
                  <input
                    type="number"
                    name="baseDamage"
                    value={formData.baseDamage}
                    onChange={handleChange}
                    required
                    min="0"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Base Magic Damage
                  </label>
                  <input
                    type="number"
                    name="baseMagicDamage"
                    value={formData.baseMagicDamage}
                    onChange={handleChange}
                    required
                    min="0"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 text-base"
                  />
                </div>
              </div>

              <div className="mt-6">
                <EffectEditor
                  value={formData.effects}
                  onChange={(newEffects) => setFormData(prev => ({ ...prev, effects: newEffects }))}
                />
              </div>

              <div className="flex justify-end space-x-4 mt-8">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingItem(null);
                    resetForm();
                  }}
                  className="bg-gray-700 text-white px-5 py-3 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-indigo-600 text-white px-5 py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors duration-200"
                >
                  {loading ? 'Saving...' : editingItem ? 'Update Item' : 'Create Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 