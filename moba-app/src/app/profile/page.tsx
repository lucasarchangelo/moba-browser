'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Hero {
  id: string;
  name: string;
  level: number;
  experience: number;
  strength: number;
  agility: number;
  intelligence: number;
  health: number;
  mana: number;
}

interface UserProfile {
  id: string;
  email: string;
  nickname: string;
  avatarUrl: string;
  lastLoginAt: string;
  hero?: Hero;
}

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/auth/signin');
          return;
        }

        const response = await fetch('http://localhost:3000/users/profile/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          setError('Failed to load profile');
        }
      } catch (err) {
        setError('An error occurred while loading your profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 shadow rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="px-4 py-5 sm:px-6 border-b border-gray-700">
            <h3 className="text-2xl font-bold text-white">Profile</h3>
            <p className="mt-1 text-sm text-gray-400">
              Manage your hero and account settings
            </p>
          </div>

          {/* Profile Content */}
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* User Information */}
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="text-lg font-medium text-white mb-4">Account Information</h4>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative h-[90px] w-[90px] rounded-full overflow-hidden">
                    {profile?.avatarUrl ? (
                      <Image
                        src={profile.avatarUrl}
                        alt={profile.nickname}
                        width={90}
                        height={90}
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-indigo-600 flex items-center justify-center">
                        <span className="text-white text-2xl font-medium">
                          {profile?.nickname.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="space-y-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-400">Nickname</label>
                        <div className="mt-1 text-white text-lg">{profile?.nickname}</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400">Email</label>
                        <div className="mt-1 text-white">{profile?.email}</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400">Last Login</label>
                        <div className="mt-1 text-white">{formatDate(profile?.lastLoginAt || '')}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hero Information */}
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="text-lg font-medium text-white mb-4">Hero Information</h4>
                {profile?.hero ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-400">Hero Name</label>
                      <div className="mt-1 text-white">{profile.hero.name}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400">Level</label>
                      <div className="mt-1 text-white">{profile.hero.level}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400">Experience</label>
                      <div className="mt-1 text-white">{profile.hero.experience}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400">Strength</label>
                        <div className="mt-1 text-white">{profile.hero.strength}</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400">Agility</label>
                        <div className="mt-1 text-white">{profile.hero.agility}</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400">Intelligence</label>
                        <div className="mt-1 text-white">{profile.hero.intelligence}</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400">Health</label>
                        <div className="mt-1 text-white">{profile.hero.health}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-gray-400">No hero created yet</p>
                    <button
                      className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => router.push('/hero/create')}
                    >
                      Create Hero
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 