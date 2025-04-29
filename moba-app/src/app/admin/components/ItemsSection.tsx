'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

interface Item {
  id: string;
  name: string;
  description: string;
  type: string;
  damage: number;
  armor: number;
  magicResistance: number;
  health: number;
  mana: number;
  strength: number;
  agility: number;
  intelligence: number;
  imageUrl: string;
  price: number;
  rarity: string;
  slotType: string;
  isConsumable: boolean;
  effects: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

interface ItemFormData {
  name: string;
  description: string;
  type: string;
  damage: number;
  armor: number;
  magicResistance: number;
  health: number;
  mana: number;
  strength: number;
  agility: number;
  intelligence: number;
  imageUrl: string;
  price: number;
  rarity: string;
  slotType: string;
  isConsumable: boolean;
  effects: Record<string, any>;
}

export default function ItemsSection() {
  const { user } = useAuth();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [formData, setFormData] = useState<ItemFormData>({
    name: '',
    description: '',
    type: '',
    damage: 0,
    armor: 0,
    magicResistance: 0,
    health: 0,
    mana: 0,
    strength: 0,
    agility: 0,
    intelligence: 0,
    imageUrl: '',
    price: 0,
    rarity: 'COMMON',
    slotType: 'HEAD',
    isConsumable: false,
    effects: {},
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Not authenticated');
        return;
      }
      
      const response = await fetch('http://localhost:3000/items', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setItems(data);
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

      // Ensure all numeric fields are actually numbers
      const processedFormData = {
        ...formData,
        damage: Number(formData.damage),
        armor: Number(formData.armor),
        magicResistance: Number(formData.magicResistance),
        health: Number(formData.health),
        mana: Number(formData.mana),
        strength: Number(formData.strength),
        agility: Number(formData.agility),
        intelligence: Number(formData.intelligence),
        price: Number(formData.price),
      };

      const url = editingItem
        ? `http://localhost:3000/items/${editingItem.id}`
        : 'http://localhost:3000/items';
      const method = editingItem ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(processedFormData),
      });

      if (response.ok) {
        setIsModalOpen(false);
        setEditingItem(null);
        resetForm();
        fetchItems();
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
        fetchItems();
      } else {
        setError('Failed to delete item');
      }
    } catch (err) {
      setError('An error occurred while deleting the item');
    }
  };

  const handleEdit = (item: Item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      type: item.type,
      damage: item.damage,
      armor: item.armor,
      magicResistance: item.magicResistance,
      health: item.health,
      mana: item.mana,
      strength: item.strength,
      agility: item.agility,
      intelligence: item.intelligence,
      imageUrl: item.imageUrl,
      price: item.price,
      rarity: item.rarity,
      slotType: item.slotType,
      isConsumable: item.isConsumable,
      effects: item.effects,
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      type: '',
      damage: 0,
      armor: 0,
      magicResistance: 0,
      health: 0,
      mana: 0,
      strength: 0,
      agility: 0,
      intelligence: 0,
      imageUrl: '',
      price: 0,
      rarity: 'COMMON',
      slotType: 'HEAD',
      isConsumable: false,
      effects: {},
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Convert string values to numbers for numeric fields
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
                
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Rarity
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
                    src={`/assets/${item.slotType}/${item.imageUrl}`}
                    alt={item.name}
                    className="w-12 h-12 object-contain rounded shadow"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {item.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {item.rarity}
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
                    Type
                  </label>
                  <input
                    type="text"
                    name="type"
                    value={formData.type}
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
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Rarity
                  </label>
                  <select
                    name="rarity"
                    value={formData.rarity}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 text-base"
                  >
                    <option value="COMMON">Common</option>
                    <option value="UNCOMMON">Uncommon</option>
                    <option value="RARE">Rare</option>
                    <option value="EPIC">Epic</option>
                    <option value="LEGENDARY">Legendary</option>
                  </select>
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
                    <option value="LEGS">Legs</option>
                    <option value="FEET">Feet</option>
                    <option value="WEAPON">Weapon</option>
                    <option value="ACCESSORY">Accessory</option>
                  </select>
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
                    Damage
                  </label>
                  <input
                    type="number"
                    name="damage"
                    value={formData.damage}
                    onChange={handleChange}
                    required
                    min="0"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Armor
                  </label>
                  <input
                    type="number"
                    name="armor"
                    value={formData.armor}
                    onChange={handleChange}
                    required
                    min="0"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Magic Resistance
                  </label>
                  <input
                    type="number"
                    name="magicResistance"
                    value={formData.magicResistance}
                    onChange={handleChange}
                    required
                    min="0"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Health
                  </label>
                  <input
                    type="number"
                    name="health"
                    value={formData.health}
                    onChange={handleChange}
                    required
                    min="0"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Mana
                  </label>
                  <input
                    type="number"
                    name="mana"
                    value={formData.mana}
                    onChange={handleChange}
                    required
                    min="0"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Strength
                  </label>
                  <input
                    type="number"
                    name="strength"
                    value={formData.strength}
                    onChange={handleChange}
                    required
                    min="0"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Agility
                  </label>
                  <input
                    type="number"
                    name="agility"
                    value={formData.agility}
                    onChange={handleChange}
                    required
                    min="0"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Intelligence
                  </label>
                  <input
                    type="number"
                    name="intelligence"
                    value={formData.intelligence}
                    onChange={handleChange}
                    required
                    min="0"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 text-base"
                  />
                </div>
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