import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MOBA Browser Game',
  description: 'A browser-based MOBA game where you create and evolve your heroes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen bg-gray-900">
            {children}
          </main>
        </AuthProvider>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1F2937',
              color: '#fff',
              border: '1px solid #374151',
            },
            success: {
              style: {
                background: '#065F46',
              },
            },
            error: {
              style: {
                background: '#991B1B',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
