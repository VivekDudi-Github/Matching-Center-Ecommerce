"use client";

import React, { useState } from 'react';
import { Menu, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import Sidebar from '@/app/components/dashboard/Sidebar';
import OverviewView from '@/app/components/dashboard/Overview';

export default function UserDashboard() {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Dynamic content renderer
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewView />;
      case 'orders':
        return <div className="text-zinc-500">Orders Component goes here...</div>;
      case 'wishlist':
        return <div className="text-zinc-500">Wishlist Component goes here...</div>;
      case 'addresses':
        return <div className="text-zinc-500">Addresses Component goes here...</div>;
      case 'settings':
        return <div className="text-zinc-500">Settings Component goes here...</div>;
      default:
        return <OverviewView />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex font-sans transition-colors duration-300">
      
      {/* Sidebar Component */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isMobileOpen={isMobileMenuOpen}
        closeMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        
        {/* Mobile Header (Visible only on small screens) */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-zinc-900 dark:text-white p-2 -ml-2"
          >
            <Menu size={24} />
          </button>
          <span className="font-bold text-lg dark:text-white">Dashboard</span>
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="text-zinc-900 dark:text-white p-2 -mr-2"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </header>

        {/* Desktop Theme Toggle (Optional, top right corner) */}
        <div className="hidden lg:flex justify-end p-6 pb-0">
           <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Dynamic View Injection */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            {renderContent()}
          </div>
        </main>
        
      </div>
    </div>
  );
}