'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import ItemsSection from './components/ItemsSection';
import SkillsSection from './components/SkillsSection';

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('items');

  // Use useEffect for navigation instead of doing it directly in render
  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      router.push('/');
    }
  }, [user, router]);

  // If not admin, show nothing while redirecting
  if (!user || user.role !== 'ADMIN') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-700">
            <h3 className="text-2xl font-bold text-white">Admin Dashboard</h3>
            <p className="mt-1 text-sm text-gray-400">
              Manage game content and settings
            </p>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-700">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('items')}
                className={`${
                  activeTab === 'items'
                    ? 'border-indigo-500 text-indigo-500'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
              >
                Items
              </button>
              <button
                onClick={() => setActiveTab('skills')}
                className={`${
                  activeTab === 'skills'
                    ? 'border-indigo-500 text-indigo-500'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
              >
                Skills
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'items' && <ItemsSection />}
            {activeTab === 'skills' && <SkillsSection />}
          </div>
        </div>
      </div>
    </div>
  );
} 