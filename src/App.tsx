/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { BerandaView } from './views/BerandaView';
import { LaporanView } from './views/LaporanView';
import { LokasiView } from './views/LokasiView';
import { AktivitasView } from './views/AktivitasView';
import { NavigationTab } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('beranda');

  const handleSelectTab = (tab: NavigationTab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F8FAFF] font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Desktop Left Sidebar (hidden on mobile) */}
      <div className="hidden md:flex flex-shrink-0">
        <Sidebar activeTab={activeTab} onSelectTab={handleSelectTab} />
      </div>

      {/* Main Responsive Viewport */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {activeTab === 'beranda' && <BerandaView onNavigateToTab={handleSelectTab} />}
        {activeTab === 'laporan' && (
          <LaporanView
            onGoToAktivitas={() => handleSelectTab('aktivitas')}
            onBackToHome={() => handleSelectTab('beranda')}
          />
        )}
        {activeTab === 'lokasi' && (
          <LokasiView onBackToHome={() => handleSelectTab('beranda')} />
        )}
        {activeTab === 'aktivitas' && <AktivitasView />}
      </main>

      {/* Mobile Bottom Navigation Bar (hidden on desktop) */}
      <div className="md:hidden">
        <MobileBottomNav activeTab={activeTab} onSelectTab={handleSelectTab} />
      </div>
    </div>
  );
}
