import React from 'react';
import { Home, BarChart2, Navigation2, LayoutDashboard } from 'lucide-react';
import { NavigationTab } from '../types';

interface MobileBottomNavProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onSelectTab,
}) => {
  const navItems = [
    {
      id: 'beranda' as NavigationTab,
      label: 'Beranda',
      icon: Home,
    },
    {
      id: 'laporan' as NavigationTab,
      label: 'Laporan',
      icon: BarChart2,
    },
    {
      id: 'lokasi' as NavigationTab,
      label: 'Lokasi',
      icon: Navigation2,
    },
    {
      id: 'aktivitas' as NavigationTab,
      label: 'Aktivitas',
      icon: LayoutDashboard,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-100 shadow-[0_-4px_16px_rgba(0,0,0,0.04)] select-none">
      <div className="flex items-center justify-around py-2 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className="flex flex-col items-center justify-center flex-1 py-1 cursor-pointer transition-transform active:scale-95"
            >
              <div
                className={`p-1 rounded-xl transition-colors ${
                  isActive ? 'text-[#4854FE]' : 'text-slate-400'
                }`}
              >
                <Icon
                  className="w-5 h-5"
                  strokeWidth={isActive ? 2.4 : 1.9}
                  fill={isActive ? '#4854FE20' : 'none'}
                />
              </div>
              <span
                className={`text-[11px] font-semibold transition-colors mt-0.5 ${
                  isActive ? 'text-[#4854FE]' : 'text-slate-400'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* iOS Home indicator bar */}
      <div className="w-32 h-1 bg-slate-900/80 rounded-full mx-auto mb-1.5" />
    </div>
  );
};
