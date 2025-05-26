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

interface Skill {
  id: string;
  name: string;
  description: string;
  magicType: string;
  baseDamage: number;
  baseManaCost: number;
  requiredStrength: number;
  requiredAgility: number;
  requiredIntelligence: number;
  price: number;
  imageUrl: string;
  effects: Effect;
  createdAt: Date;
  updatedAt: Date;
}

interface SkillFormData {
  name: string;
  description: string;
  magicType: string;
  baseDamage: number;
  baseManaCost: number;
  requiredStrength: number;
  requiredAgility: number;
  requiredIntelligence: number;
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

export default function SkillsSection() {
  const { user } = useAuth();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalSkills, setTotalSkills] = useState(0);
  const skillsPerPage = 10;
  const [formData, setFormData] = useState<SkillFormData>({
    name: '',
    description: '',
    magicType: 'PHYSICAL',
    baseDamage: 0,
    baseManaCost: 0,
    requiredStrength: 0,
    requiredAgility: 0,
    requiredIntelligence: 0,
    price: 0,
    imageUrl: '',
    effects: { effect: [] },
  });

  useEffect(() => {
    fetchSkills(currentPage);
  }, [currentPage]);

  const fetchSkills = async (page: number = 1) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Not authenticated');
        return;
      }
      
      const response = await fetch(`http://localhost:3000/skills?page=${page}&limit=${skillsPerPage}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data: PaginatedResponse<Skill> = await response.json();
        setSkills(data.data);
        setTotalPages(data.meta.totalPages);
        setTotalSkills(data.meta.total);
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

      const url = editingSkill
        ? `http://localhost:3000/skills/${editingSkill.id}`
        : 'http://localhost:3000/skills';
      const method = editingSkill ? 'PATCH' : 'POST';

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
        setEditingSkill(null);
        resetForm();
        fetchSkills(currentPage);
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
        fetchSkills(currentPage);
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
      magicType: skill.magicType,
      baseDamage: skill.baseDamage,
      baseManaCost: skill.baseManaCost,
      requiredStrength: skill.requiredStrength,
      requiredAgility: skill.requiredAgility,
      requiredIntelligence: skill.requiredIntelligence,
      price: skill.price,
      imageUrl: skill.imageUrl,
      effects: { effect: Array.isArray(skill.effects) ? skill.effects : [] },
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      magicType: 'PHYSICAL',
      baseDamage: 0,
      baseManaCost: 0,
      requiredStrength: 0,
      requiredAgility: 0,
      requiredIntelligence: 0,
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
                Image
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Magic Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Base Damage
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Base Mana Cost
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
            {skills.map((skill) => (
              <tr key={skill.id} className="hover:bg-gray-700 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <img
                    src={skill.imageUrl}
                    alt={skill.name}
                    className="w-12 h-12 object-contain rounded shadow"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                  {skill.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {skill.magicType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {skill.baseDamage}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {skill.baseManaCost}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {skill.price}
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

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-gray-400">
          Showing {skills.length} of {totalSkills} skills
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
                    Magic Type
                  </label>
                  <select
                    name="magicType"
                    value={formData.magicType}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 text-base"
                  >
                    <option value="PHYSICAL">Physical</option>
                    <option value="FIRE">Fire</option>
                    <option value="ICE">Ice</option>
                    <option value="LIGHTNING">Lightning</option>
                    <option value="EARTH">Earth</option>
                    <option value="WIND">Wind</option>
                    <option value="WATER">Water</option>
                    <option value="LIGHT">Light</option>
                    <option value="DARK">Dark</option>
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
              </div>

              <div className="grid grid-cols-2 gap-6 mt-6">
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
                    Required Strength
                  </label>
                  <input
                    type="number"
                    name="requiredStrength"
                    value={formData.requiredStrength}
                    onChange={handleChange}
                    required
                    min="0"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Required Agility
                  </label>
                  <input
                    type="number"
                    name="requiredAgility"
                    value={formData.requiredAgility}
                    onChange={handleChange}
                    required
                    min="0"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Required Intelligence
                  </label>
                  <input
                    type="number"
                    name="requiredIntelligence"
                    value={formData.requiredIntelligence}
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