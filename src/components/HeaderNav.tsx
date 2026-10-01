import React, { useRef, useEffect } from 'react';
import {
  Search,
  Home,
  GraduationCap,
  Building2,
  Landmark,
  Plus,
  Bell,
  X,
  ArrowUpDown,
  MapPin,
  ArrowLeft,
  Wifi,
  Battery,
} from 'lucide-react';
import { Avatar } from './Avatars';
import { TentramLogo } from './TentramLogo';
import { useDragScroll } from '../hooks/useDragScroll';

interface HeaderNavProps {
  isRoutePlannerOpen: boolean;
  onOpenRoutePlanner: () => void;
  onCloseRoutePlanner: () => void;
  originQuery: string;
  destinationQuery: string;
  activeSelectionStep: 'origin' | 'destination';
  onOriginChange: (val: string) => void;
  onDestinationChange: (val: string) => void;
  onSelectStep: (step: 'origin' | 'destination') => void;
  onSwapLocations: () => void;
  onQuickSelect: (placeName: string) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  isRoutePlannerOpen,
  onOpenRoutePlanner,
  onCloseRoutePlanner,
  originQuery,
  destinationQuery,
  activeSelectionStep,
  onOriginChange,
  onDestinationChange,
  onSelectStep,
  onSwapLocations,
  onQuickSelect,
}) => {
  const originInputRef = useRef<HTMLInputElement>(null);
  const destinationInputRef = useRef<HTMLInputElement>(null);
  const mobileChipsDrag = useDragScroll<HTMLDivElement>();
  const desktopChipsDrag = useDragScroll<HTMLDivElement>();

  const quickPlaces = [
    { label: 'Rumah', icon: Home, query: 'Rumah Saya (Jl. Merdeka)' },
    { label: 'Kampus', icon: GraduationCap, query: 'Institut Teknologi PLN' },
    { label: 'Kantor', icon: Building2, query: 'Mayora Group Headquarters' },
    { label: 'Masjid', icon: Landmark, query: "Masjid Raya KH. Hasyim Asy'ari" },
  ];

  useEffect(() => {
    if (isRoutePlannerOpen) {
      if (activeSelectionStep === 'origin') {
        originInputRef.current?.focus();
      } else {
        destinationInputRef.current?.focus();
      }
    }
  }, [isRoutePlannerOpen, activeSelectionStep]);

  return (
    <>
      {/* ======================================================== */}
      {/* MOBILE HEADER (Matches Home.png exactly)                 */}
      {/* ======================================================== */}
      <div className="md:hidden bg-white px-4 pt-3 pb-3 border-b border-slate-100 shadow-2xs z-30">
        {/* iOS style status bar hint */}
        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-800 mb-2 px-1">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold">5G</span>
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4 fill-slate-800" />
          </div>
        </div>

        {/* Branding header: Tentram Logo + Subtitle + Bell + Avatar */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <TentramLogo size="sm" showText={false} />
            <div>
              <span className="font-black text-base text-[#3E2768] tracking-[0.12em] uppercase block leading-tight">
                Tentram
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                Perjalanan aman, bersama tentram
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              aria-label="Notifikasi"
              className="relative w-8 h-8 flex items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white" />
            </button>
            <Avatar name="Profile" size="sm" />
          </div>
        </div>

        {/* Mobile Search Bar / Route Box */}
        {!isRoutePlannerOpen ? (
          <div>
            <div
              onClick={onOpenRoutePlanner}
              className="relative w-full mb-2.5 cursor-pointer"
            >
              <input
                type="text"
                readOnly
                value={destinationQuery || ''}
                placeholder="Mau kemana hari ini?"
                className="w-full pl-4 pr-11 py-2.5 bg-white border border-[#4F5BFF]/30 rounded-full text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-hidden shadow-2xs cursor-pointer"
              />
              <button
                type="button"
                onClick={onOpenRoutePlanner}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4F5BFF]"
              >
                <Search className="w-4 h-4 stroke-[2.2]" />
              </button>
            </div>

            {/* Quick Chips (Draggable with mouse hold & swipeable with touch) */}
            <div
              ref={mobileChipsDrag.ref}
              onMouseDown={mobileChipsDrag.dragProps.onMouseDown}
              onClickCapture={mobileChipsDrag.dragProps.onClickCapture}
              className={`flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 cursor-grab active:cursor-grabbing select-none ${
                mobileChipsDrag.isDragging ? 'cursor-grabbing' : ''
              }`}
            >
              {quickPlaces.map((place) => {
                const Icon = place.icon;
                return (
                  <button
                    key={place.label}
                    onClick={() => {
                      onOpenRoutePlanner();
                      onQuickSelect(place.query);
                    }}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 whitespace-nowrap cursor-pointer"
                  >
                    <Icon className="w-3 h-3 text-slate-500" />
                    <span>{place.label}</span>
                  </button>
                );
              })}

              <button
                onClick={() => {
                  onOpenRoutePlanner();
                  onQuickSelect('Puri Indah Mall');
                }}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold text-[#4F5BFF] bg-blue-50 border border-blue-200 whitespace-nowrap cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>Tambah</span>
              </button>
            </div>
          </div>
        ) : (
          /* Mobile Route Planner Stack */
          <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-md animate-in fade-in duration-150">
            <div className="flex items-center justify-between mb-2 pb-1 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-800">Rencanakan Rute</span>
              <button
                onClick={onCloseRoutePlanner}
                className="text-xs font-semibold text-slate-400 hover:text-slate-700"
              >
                Tutup ✕
              </button>
            </div>

            <div className="flex items-center gap-2">
              {/* Left indicators: Circle, 3 dots, Pin */}
              <div className="flex flex-col items-center justify-between py-1 flex-shrink-0 h-18 w-3">
                <div
                  className={`w-3 h-3 rounded-full border-2 ${
                    activeSelectionStep === 'origin'
                      ? 'border-[#008985]'
                      : 'border-slate-800'
                  }`}
                />
                <div className="flex flex-col gap-0.5 items-center my-0.5">
                  <span className="w-0.5 h-0.5 rounded-full bg-slate-700" />
                  <span className="w-0.5 h-0.5 rounded-full bg-slate-700" />
                  <span className="w-0.5 h-0.5 rounded-full bg-slate-700" />
                </div>
                <MapPin className="w-3.5 h-3.5 text-red-600 fill-red-100" />
              </div>

              {/* Middle Inputs */}
              <div className="flex-1 space-y-1.5">
                <input
                  ref={originInputRef}
                  type="text"
                  value={originQuery}
                  onChange={(e) => onOriginChange(e.target.value)}
                  onFocus={() => onSelectStep('origin')}
                  placeholder="Pilih titik awal, atau klik peta..."
                  className={`w-full px-3 py-1.5 text-xs font-medium text-slate-800 placeholder:text-slate-400 bg-white rounded-lg border focus:outline-hidden ${
                    activeSelectionStep === 'origin'
                      ? 'border-[#008985] ring-1 ring-[#008985]'
                      : 'border-slate-300'
                  }`}
                />
                <input
                  ref={destinationInputRef}
                  type="text"
                  value={destinationQuery}
                  onChange={(e) => onDestinationChange(e.target.value)}
                  onFocus={() => onSelectStep('destination')}
                  placeholder="Pilih tujuan..."
                  className={`w-full px-3 py-1.5 text-xs font-medium text-slate-800 placeholder:text-slate-400 bg-white rounded-lg border focus:outline-hidden ${
                    activeSelectionStep === 'destination'
                      ? 'border-[#008985] ring-1 ring-[#008985]'
                      : 'border-slate-300'
                  }`}
                />
              </div>

              {/* Swap Button */}
              <button
                type="button"
                onClick={onSwapLocations}
                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-700 cursor-pointer"
              >
                <ArrowUpDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* DESKTOP HEADER                                           */}
      {/* ======================================================== */}
      <header className="hidden md:flex px-6 py-3.5 bg-white/95 backdrop-blur-md border-b border-slate-100/90 z-30 relative shadow-2xs">
        <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto w-full">
          {/* Left Side: Search Bar OR 2-Step Route Box */}
          <div className="flex items-center gap-3 flex-1 max-w-4xl">
            {!isRoutePlannerOpen ? (
              <div className="flex items-center gap-3 flex-1">
                <div
                  onClick={onOpenRoutePlanner}
                  className="relative w-80 lg:w-96 flex-shrink-0 cursor-pointer group"
                >
                  <input
                    type="text"
                    readOnly
                    placeholder="Mau kemana hari ini?"
                    className="w-full pl-5 pr-11 py-2.5 bg-white border border-[#4F5BFF]/30 group-hover:border-[#4F5BFF] rounded-full text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden transition-all shadow-xs cursor-pointer"
                  />
                  <button
                    type="button"
                    onClick={onOpenRoutePlanner}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#4F5BFF] hover:text-blue-700 cursor-pointer p-0.5"
                  >
                    <Search className="w-5 h-5 stroke-[2.2]" />
                  </button>
                </div>

                <div
                  ref={desktopChipsDrag.ref}
                  onMouseDown={desktopChipsDrag.dragProps.onMouseDown}
                  onClickCapture={desktopChipsDrag.dragProps.onClickCapture}
                  className={`hidden md:flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 cursor-grab active:cursor-grabbing select-none ${
                    desktopChipsDrag.isDragging ? 'cursor-grabbing' : ''
                  }`}
                >
                  {quickPlaces.map((place) => {
                    const Icon = place.icon;
                    return (
                      <button
                        key={place.label}
                        onClick={() => {
                          onOpenRoutePlanner();
                          onQuickSelect(place.query);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-slate-200/90 bg-slate-50/80 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <Icon className="w-3.5 h-3.5 text-slate-500" />
                        <span>{place.label}</span>
                      </button>
                    );
                  })}

                  <button
                    onClick={() => {
                      onOpenRoutePlanner();
                      onQuickSelect('Puri Indah Mall');
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-[#4F5BFF] bg-blue-50/70 border border-blue-200 hover:bg-blue-100/60 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full max-w-xl bg-white border border-slate-200/80 rounded-2xl p-3.5 shadow-lg animate-in fade-in zoom-in-98 duration-150 relative">
                <div className="w-32 h-1 bg-slate-600 rounded-full mx-auto mb-3" />

                <div className="flex items-center gap-3">
                  <button
                    onClick={onCloseRoutePlanner}
                    title="Kembali ke pencarian utama"
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer flex-shrink-0"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>

                  <div className="flex flex-col items-center justify-between py-1 flex-shrink-0 h-20 w-4">
                    <div
                      className={`w-3.5 h-3.5 rounded-full border-2 transition-colors ${
                        activeSelectionStep === 'origin'
                          ? 'border-[#008985]'
                          : 'border-slate-800'
                      }`}
                    />
                    <div className="flex flex-col gap-0.5 items-center my-0.5">
                      <span className="w-1 h-1 rounded-full bg-slate-700" />
                      <span className="w-1 h-1 rounded-full bg-slate-700" />
                      <span className="w-1 h-1 rounded-full bg-slate-700" />
                    </div>
                    <MapPin className="w-4 h-4 text-red-600 fill-red-100" />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div
                      onClick={() => onSelectStep('origin')}
                      className={`relative flex items-center bg-white rounded-xl border transition-all ${
                        activeSelectionStep === 'origin'
                          ? 'border-[#008985] ring-2 ring-[#008985]/20 shadow-xs'
                          : 'border-slate-300 hover:border-slate-400'
                      }`}
                    >
                      <input
                        ref={originInputRef}
                        type="text"
                        value={originQuery}
                        onChange={(e) => onOriginChange(e.target.value)}
                        onFocus={() => onSelectStep('origin')}
                        placeholder="Pilih titik awal, atau klik peta..."
                        className="w-full pl-3.5 pr-9 py-2 text-xs lg:text-sm font-medium text-slate-800 placeholder:text-slate-400 bg-transparent border-0 focus:outline-hidden"
                      />
                      <div className="absolute right-3 text-[#008985]">
                        {originQuery ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onOriginChange('');
                            }}
                            className="text-slate-400 hover:text-slate-600 cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <Search className="w-4 h-4 stroke-[2.5]" />
                        )}
                      </div>
                    </div>

                    <div
                      onClick={() => onSelectStep('destination')}
                      className={`relative flex items-center bg-white rounded-xl border transition-all ${
                        activeSelectionStep === 'destination'
                          ? 'border-[#008985] ring-2 ring-[#008985]/20 shadow-xs'
                          : 'border-slate-300 hover:border-slate-400'
                      }`}
                    >
                      <input
                        ref={destinationInputRef}
                        type="text"
                        value={destinationQuery}
                        onChange={(e) => onDestinationChange(e.target.value)}
                        onFocus={() => onSelectStep('destination')}
                        placeholder="Pilih tujuan..."
                        className="w-full pl-3.5 pr-9 py-2 text-xs lg:text-sm font-medium text-slate-800 placeholder:text-slate-400 bg-transparent border-0 focus:outline-hidden"
                      />
                      {destinationQuery && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDestinationChange('');
                          }}
                          className="absolute right-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onSwapLocations}
                    title="Tukar titik awal dan tujuan"
                    className="p-2 hover:bg-slate-100 rounded-xl text-slate-700 hover:text-black transition-colors cursor-pointer flex-shrink-0"
                  >
                    <ArrowUpDown className="w-5 h-5 stroke-[2.2]" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3.5 flex-shrink-0">
            <button
              aria-label="Notifikasi"
              className="relative w-9 h-9 flex items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            </button>

            <div className="cursor-pointer hover:ring-2 hover:ring-[#4F5BFF]/30 rounded-full transition-all">
              <Avatar name="Profile" size="md" />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
