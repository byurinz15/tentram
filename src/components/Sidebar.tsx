import React from 'react';
import { Home, BarChart2, Navigation2, LayoutDashboard } from 'lucide-react';
import { TentramLogo } from './TentramLogo';
import { NavigationTab } from '../types';

interface SidebarProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onSelectTab }) => {
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
    <aside className="w-56 lg:w-64 bg-white border-r border-slate-100 flex flex-col h-screen sticky top-0 z-30 select-none shadow-[2px_0_12px_rgba(0,0,0,0.02)]">
      {/* Brand Logo Header */}
      <div className="pt-7 pb-8 px-6">
        <TentramLogo size="md" />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-[15px] transition-all duration-200 cursor-pointer text-left ${
                isActive
                  ? 'bg-[#EEF1FF] text-[#4F5BFF] font-semibold shadow-xs'
                  : 'text-[#7D8592] hover:bg-slate-50/80 hover:text-slate-900'
              }`}
            >
              <Icon
                className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${
                  isActive ? 'text-[#4F5BFF] fill-[#4F5BFF]/15' : 'text-[#8A92A0]'
                }`}
                strokeWidth={isActive ? 2.3 : 1.9}
              />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom info/status if needed */}
      <div className="p-4 m-4 rounded-xl bg-slate-50 border border-slate-100/80 text-xs text-slate-500">
        <p className="font-semibold text-slate-700">Tentram v1.2</p>
        <p className="text-[11px] text-slate-400 mt-0.5">Navigasi Rute Ramah & Aman</p>
      </div>
    </aside>
  );
};
