'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

interface Skill {
  id: string;
  name: string;
  description: string;
  baseDamage: number;
  baseCooldown: number;
  baseManaCost: number;
  baseRange: number;
  baseAreaOfEffect: number;
  createdAt: Date;
  updatedAt: Date;
}

interface SkillFormData {
  name: string;
  description: string;
  baseDamage: number;
  baseCooldown: number;
  baseManaCost: number;
  baseRange: number;
  baseAreaOfEffect: number;
}

export default function SkillsSection() {
  const { user } = useAuth();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState<SkillFormData>({
    name: '',
    description: '',
    baseDamage: 0,
    baseCooldown: 0,
    baseManaCost: 0,
    baseRange: 0,
    baseAreaOfEffect: 0,
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Not authenticated');
        return;
      }
      
      const response = await fetch('http://localhost:3000/skills', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setSkills(data);
      } else {
        setError('Failed to fetch skills');
      }
    } catch (err) {
      setError('An error occurred while fetching skills');
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
        baseDamage: Number(formData.baseDamage),
        baseCooldown: Number(formData.baseCooldown),
        baseManaCost: Number(formData.baseManaCost),
        baseRange: Number(formData.baseRange),
        baseAreaOfEffect: Number(formData.baseAreaOfEffect),
      };

      const url = editingSkill
        ? `http://localhost:3000/skills/${editingSkill.id}`
        : 'http://localhost:3000/skills';
      const method = editingSkill ? 'PATCH' : 'POST';

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
        setEditingSkill(null);
        resetForm();
        fetchSkills();
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to save skill');
      }
    } catch (err) {
      setError('An error occurred while saving the skill');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Not authenticated');
        return;
      }

      const response = await fetch(`http://localhost:3000/skills/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchSkills();
      } else {
        setError('Failed to delete skill');
      }
    } catch (err) {
      setError('An error occurred while deleting the skill');
    }
  };

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      description: skill.description,
      baseDamage: skill.baseDamage,
      baseCooldown: skill.baseCooldown,
      baseManaCost: skill.baseManaCost,
      baseRange: skill.baseRange,
      baseAreaOfEffect: skill.baseAreaOfEffect,
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      baseDamage: 0,
      baseCooldown: 0,
      baseManaCost: 0,
      baseRange: 0,
      baseAreaOfEffect: 0,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    // Convert string values to numbers for numeric fields
    if (type === 'number') {
      setFormData(prev => ({
        ...prev,
        [name]: value === '' ? 0 : Number(value),
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  if (loading && skills.length === 0) {
    return <div className="text-gray-400">Loading skills...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">Skills Management</h2>
        <button
          onClick={() => {
            setEditingSkill(null);
            resetForm();
            setIsModalOpen(true);
          }}
          className="bg-indigo-600 text-white px-5 py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center gap-2 transition-colors duration-200"
        >
          <FontAwesomeIcon icon={faPlus} />
          Create New Skill
        </button>
      </div>

      {error && (
        <div className="bg-red-500 text-white p-4 rounded-md mb-6">{error}</div>
      )}

      {/* Skills Table */}
      <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Damage
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Cooldown
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Mana Cost
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Range
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Area of Effect
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {skills.map((skill) => (
              <tr key={skill.id} className="hover:bg-gray-700 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                  {skill.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300 max-w-xs truncate">
                  {skill.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {skill.baseDamage}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {skill.baseCooldown}s
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {skill.baseManaCost}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {skill.baseRange}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {skill.baseAreaOfEffect}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <button
                    onClick={() => handleEdit(skill)}
                    className="text-indigo-400 hover:text-indigo-300 mr-4 flex items-center gap-1 transition-colors duration-200"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(skill.id)}
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
              {editingSkill ? 'Edit Skill' : 'Create New Skill'}
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
                    Base Cooldown (seconds)
                  </label>
                  <input
                    type="number"
                    name="baseCooldown"
                    value={formData.baseCooldown}
                    onChange={handleChange}
                    required
                    min="0"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Base Mana Cost
                  </label>
                  <input
                    type="number"
                    name="baseManaCost"
                    value={formData.baseManaCost}
                    onChange={handleChange}
                    required
                    min="0"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Base Range
                  </label>
                  <input
                    type="number"
                    name="baseRange"
                    value={formData.baseRange}
                    onChange={handleChange}
                    required
                    min="0"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Base Area of Effect
                  </label>
                  <input
                    type="number"
                    name="baseAreaOfEffect"
                    value={formData.baseAreaOfEffect}
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
                    setEditingSkill(null);
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
                  {loading ? 'Saving...' : editingSkill ? 'Update Skill' : 'Create Skill'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 