'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ItemsSection from './components/ItemsSection';
import SkillsSection from './components/SkillsSection';
import SeasonsSection from './components/SeasonsSection';

type TabType = 'seasons' | 'items' | 'skills';

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('seasons');

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      router.push('/');
    }
  }, [user, router]);

  if (!user || user.role !== 'ADMIN') {
    return null;
  }

  const tabs = [
    { id: 'seasons', label: 'Seasons' },
    { id: 'items', label: 'Items' },
    { id: 'skills', label: 'Skills' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
        
        {/* Tabs Navigation */}
        <div className="border-b border-gray-700 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-12">
          {activeTab === 'seasons' && <SeasonsSection />}
          {activeTab === 'items' && <ItemsSection />}
          {activeTab === 'skills' && <SkillsSection />}
        </div>
      </div>
    </div>
  );
} 