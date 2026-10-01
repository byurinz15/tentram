import React, { useState } from 'react';
import {
  ShieldCheck,
  Zap,
  ArrowRight,
  ArrowLeft,
  ThumbsUp,
  AlertTriangle,
  Users,
  Navigation,
  Clock,
  ChevronDown,
  MessageSquare,
  Sparkles,
  PhoneCall,
  X,
  AlertOctagon,
} from 'lucide-react';
import { HeaderNav } from '../components/HeaderNav';
import { MapCanvas, LocationPoint } from '../components/MapCanvas';
import { DetailRuteMobile } from '../components/DetailRuteMobileModal';
import { NavigationTab } from '../types';

interface BerandaViewProps {
  onNavigateToTab: (tab: NavigationTab) => void;
}

export const BerandaView: React.FC<BerandaViewProps> = ({ onNavigateToTab }) => {
  const [isRoutePlannerOpen, setIsRoutePlannerOpen] = useState(false);

  // Origin & Destination points
  const [originPoint, setOriginPoint] = useState<LocationPoint | null>(null);
  const [destinationPoint, setDestinationPoint] = useState<LocationPoint | null>(null);
  const [activeStep, setActiveStep] = useState<'origin' | 'destination'>('origin');

  const [originQuery, setOriginQuery] = useState('');
  const [destinationQuery, setDestinationQuery] = useState('');

  const [showRouteDetail, setShowRouteDetail] = useState(false);
  const [selectedRouteType, setSelectedRouteType] = useState<'safe' | 'risky'>('risky');
  const [activeTabMetric, setActiveTabMetric] = useState<'kondisi' | 'detail' | 'rute'>('kondisi');
  const [isNavigating, setIsNavigating] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  const hasBothPoints = Boolean(originPoint && destinationPoint);

  const recentActivities = [
    {
      id: 'a1',
      image: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=300&q=80',
      text: 'Tolong kepada pihak PLN, lampu jalan di kawasan jalan Raya Pasteur agak redup. Tolong diperbaiki',
      time: '1 j lalu',
    },
    {
      id: 'a2',
      image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=300&q=80',
      text: 'Hati hati gais, ada lubang besar di jalan tol Pacer KM. 871.',
      time: '1 j lalu',
    },
    {
      id: 'a3',
      image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=300&q=80',
      text: 'Salut banget sama petugasnya, jalanan terang banget jadi ga takut kalo lewat sini sendirian',
      time: '1 j lalu',
    },
  ];

  const handleSelectLocationPoint = (point: LocationPoint) => {
    setIsRoutePlannerOpen(true);
    if (!originPoint || activeStep === 'origin') {
      setOriginPoint(point);
      setOriginQuery(point.name);
      setActiveStep('destination');
    } else {
      setDestinationPoint(point);
      setDestinationQuery(point.name);
      setShowRouteDetail(false);
    }
  };

  const handleQuickSelect = (placeName: string) => {
    setIsRoutePlannerOpen(true);
    const dummyPoint: LocationPoint = {
      name: placeName,
      x: placeName.includes('PLN') ? 920 : placeName.includes('Mayora') ? 310 : 740,
      y: placeName.includes('PLN') ? 200 : placeName.includes('Mayora') ? 120 : 540,
    };

    if (!originPoint || activeStep === 'origin') {
      setOriginPoint(dummyPoint);
      setOriginQuery(placeName);
      setActiveStep('destination');
    } else {
      setDestinationPoint(dummyPoint);
      setDestinationQuery(placeName);
      setShowRouteDetail(false);
    }
  };

  const handleSwapLocations = () => {
    const prevOrigin = originPoint;
    const prevDest = destinationPoint;
    const prevOQ = originQuery;
    const prevDQ = destinationQuery;

    setOriginPoint(prevDest);
    setDestinationPoint(prevOrigin);
    setOriginQuery(prevDQ);
    setDestinationQuery(prevOQ);
  };

  const handleResetRoute = () => {
    setOriginPoint(null);
    setDestinationPoint(null);
    setOriginQuery('');
    setDestinationQuery('');
    setActiveStep('origin');
    setShowRouteDetail(false);
    setIsNavigating(false);
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
      {/* Top Header Bar with Origin & Destination fields (Responsive: Desktop & Mobile Home.png) */}
      <HeaderNav
        isRoutePlannerOpen={isRoutePlannerOpen}
        onOpenRoutePlanner={() => setIsRoutePlannerOpen(true)}
        onCloseRoutePlanner={() => {
          setIsRoutePlannerOpen(false);
          handleResetRoute();
        }}
        originQuery={originQuery}
        destinationQuery={destinationQuery}
        activeSelectionStep={activeStep}
        onOriginChange={(val) => {
          setOriginQuery(val);
          if (val) {
            setOriginPoint({ name: val, x: 270, y: 590 });
          } else {
            setOriginPoint(null);
          }
        }}
        onDestinationChange={(val) => {
          setDestinationQuery(val);
          if (val) {
            setDestinationPoint({ name: val, x: 920, y: 200 });
          } else {
            setDestinationPoint(null);
          }
        }}
        onSelectStep={(step) => setActiveStep(step)}
        onSwapLocations={handleSwapLocations}
        onQuickSelect={handleQuickSelect}
      />

      {/* Main Map Canvas Area */}
      <div className="flex-1 relative overflow-hidden pb-16 md:pb-0">
        <MapCanvas
          originPoint={originPoint}
          destinationPoint={destinationPoint}
          activeSelectionStep={activeStep}
          isRoutePlannerOpen={isRoutePlannerOpen}
          showRoute={hasBothPoints}
          activeRouteType={selectedRouteType}
          onSelectRoute={(type) => setSelectedRouteType(type)}
          onSelectLocationPoint={handleSelectLocationPoint}
          isNavigating={isNavigating}
          className="w-full h-full"
        />

        {/* Floating Red SOS Emergency Button on Bottom Right (Matches Home.png) */}
        <div className="absolute right-4 bottom-24 md:bottom-8 z-30 pointer-events-auto">
          <button
            onClick={() => setShowEmergencyModal(true)}
            title="Panggilan Darurat / SOS"
            className="w-13 h-13 rounded-full bg-red-600 hover:bg-red-700 shadow-xl flex items-center justify-center text-white transition-transform active:scale-95 cursor-pointer ring-4 ring-red-200"
          >
            <div className="relative flex items-center justify-center">
              <MessageSquare className="w-6 h-6 fill-white text-white" />
              <span className="absolute text-red-600 font-extrabold text-sm mb-1">!</span>
            </div>
          </button>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* DESKTOP CASE 1: When Route is NOT ready -> Activity Strip    */}
        {/* ------------------------------------------------------------- */}
        {!hasBothPoints && (
          <div className="hidden md:block absolute bottom-6 left-6 right-6 max-w-5xl mx-auto z-10 pointer-events-auto">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-slate-100">
              <div className="flex items-center justify-between mb-3.5">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm tracking-tight">
                    Update Terbaru Aktivitas
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {!originPoint
                      ? 'Klik titik di peta atau ketik lokasi awal untuk memulai rute'
                      : 'Lokasi awal terpilih. Klik lokasi tujuan untuk melihat rute aman'}
                  </p>
                </div>
                <button
                  onClick={() => onNavigateToTab('aktivitas')}
                  className="text-xs font-semibold text-[#4F5BFF] hover:text-blue-700 transition-colors cursor-pointer"
                >
                  Lihat Semua
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {recentActivities.map((act) => (
                  <div
                    key={act.id}
                    onClick={() => onNavigateToTab('aktivitas')}
                    className="flex gap-3 p-2.5 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/20 transition-all cursor-pointer group"
                  >
                    <img
                      src={act.image}
                      alt="Thumbnail"
                      className="w-20 h-16 rounded-lg object-cover flex-shrink-0 group-hover:scale-102 transition-transform"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <p className="text-xs text-slate-700 leading-snug line-clamp-3">
                        {act.text}
                      </p>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {act.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* DESKTOP CASE 2: Route Recommendation Floating Card            */}
        {/* ------------------------------------------------------------- */}
        {hasBothPoints && !showRouteDetail && (
          <div className="hidden md:block absolute top-16 left-6 z-20 w-96 max-w-[calc(100vw-3rem)] pointer-events-auto animate-in fade-in slide-in-from-left-4 duration-200">
            <div className="bg-white rounded-2xl p-5 shadow-xl border border-slate-100">
              <div className="mb-3.5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-slate-900 text-base">Rekomendasi Rute</h3>
                  <button
                    onClick={handleResetRoute}
                    className="text-xs font-medium text-slate-400 hover:text-slate-600"
                  >
                    Ubah Rute
                  </button>
                </div>
                <p className="text-xs text-slate-400">
                  {originPoint?.name} → {destinationPoint?.name}
                </p>
              </div>

              {/* Rute Aman */}
              <div
                onClick={() => setSelectedRouteType('safe')}
                className={`p-3.5 rounded-xl border-2 mb-3 cursor-pointer transition-all ${
                  selectedRouteType === 'safe'
                    ? 'border-emerald-500 bg-emerald-50/40 shadow-xs'
                    : 'border-slate-100 hover:border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <span className="font-bold text-sm text-slate-900">Rute Aman</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-600">23 mnt</span>
                    <span className="block text-[11px] text-slate-400">8.7 km</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Tidak ada laporan kerusakan penerangan, jarak lebih jauh, risiko rendah
                </p>
              </div>

              {/* Rute Berisiko */}
              <div
                onClick={() => setSelectedRouteType('risky')}
                className={`p-3.5 rounded-xl border-2 mb-4 cursor-pointer transition-all ${
                  selectedRouteType === 'risky'
                    ? 'border-amber-500 bg-amber-50/40 shadow-xs'
                    : 'border-slate-100 hover:border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
                    <span className="font-bold text-sm text-slate-900">Rute Berisiko</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-amber-600">16 mnt</span>
                    <span className="block text-[11px] text-slate-400">7.2 km</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Terdapat laporan kerusakan penerangan di beberapa titik, jarak lebih dekat, risiko menengah
                </p>
              </div>

              <button
                onClick={() => setShowRouteDetail(true)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#4F5BFF] hover:bg-blue-600 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-500/20 transition-all cursor-pointer"
              >
                <span>Lihat Detail Rute</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MOBILE CASE 2: Bottom Sheet Rekomendasi Rute (Matches Home.png)*/}
        {/* ------------------------------------------------------------- */}
        {hasBothPoints && !showRouteDetail && (
          <div className="md:hidden absolute bottom-16 left-0 right-0 z-30 bg-white rounded-t-3xl p-5 shadow-2xl border-t border-slate-100 pointer-events-auto animate-in slide-in-from-bottom duration-200">
            <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto mb-3" />
            <div className="mb-3">
              <h3 className="font-extrabold text-sm text-slate-900">Rekomendasi Rute</h3>
              <p className="text-[11px] text-slate-400">Diperbarui 2 menit yang lalu</p>
            </div>

            {/* Rute Aman */}
            <div
              onClick={() => setSelectedRouteType('safe')}
              className={`p-3 rounded-2xl border-2 mb-2.5 cursor-pointer transition-all ${
                selectedRouteType === 'safe'
                  ? 'border-emerald-500 bg-emerald-50/40 shadow-xs'
                  : 'border-slate-100'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-xs text-slate-900">Rute Aman</span>
                </div>
                <span className="text-xs font-bold text-emerald-600">
                  23 mnt <span className="text-slate-400 text-[10px] font-normal">8.7 km</span>
                </span>
              </div>
              <p className="text-[10px] text-slate-500">
                Tidak ada laporan kerusakan penerangan, jarak lebih jauh, risiko rendah
              </p>
            </div>

            {/* Rute Berisiko */}
            <div
              onClick={() => setSelectedRouteType('risky')}
              className={`p-3 rounded-2xl border-2 mb-3.5 cursor-pointer transition-all ${
                selectedRouteType === 'risky'
                  ? 'border-amber-500 bg-amber-50/40 shadow-xs'
                  : 'border-slate-100'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="font-bold text-xs text-slate-900">Rute Berisiko</span>
                </div>
                <span className="text-xs font-bold text-amber-600">
                  16 mnt <span className="text-slate-400 text-[10px] font-normal">7.2 km</span>
                </span>
              </div>
              <p className="text-[10px] text-slate-500">
                Terdapat laporan kerusakan penerangan di beberapa titik, jarak lebih dekat, risiko menengah
              </p>
            </div>

            {/* CTA: Lihat Detail Rute */}
            <button
              onClick={() => setShowRouteDetail(true)}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#4F5BFF] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
            >
              <span>Lihat Detail Rute</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MOBILE CASE 3: Full Screen Detail Rute Mobile (Detail Rute.png)*/}
        {/* ------------------------------------------------------------- */}
        <div className="md:hidden">
          <DetailRuteMobile
            isOpen={showRouteDetail}
            onClose={() => setShowRouteDetail(false)}
            isNavigating={isNavigating}
            onToggleNavigation={() => setIsNavigating(!isNavigating)}
            originName={originPoint?.name}
            destinationName={destinationPoint?.name}
            selectedRouteType={selectedRouteType}
          />
        </div>

        {/* ------------------------------------------------------------- */}
        {/* DESKTOP CASE 3: Desktop Detail Rute Layout                    */}
        {/* ------------------------------------------------------------- */}
        {hasBothPoints && showRouteDetail && (
          <div className="hidden md:block">
            {/* Top Right Floating Card */}
            <div className="absolute top-6 right-6 z-20 w-96 max-w-[calc(100vw-3rem)] pointer-events-auto animate-in fade-in slide-in-from-right-4 duration-200">
              <div className="bg-white rounded-2xl p-5 shadow-xl border border-slate-100">
                <h3 className="font-bold text-slate-900 text-base">Kondisi Sepanjang Rute</h3>
                <p className="text-[11px] text-slate-400 mb-3">
                  Ringkasan kondisi jalan berdasarkan laporan pengguna
                </p>

                <div className="flex border-b border-slate-100 mb-4 text-xs font-medium">
                  {(['kondisi', 'detail', 'rute'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveTabMetric(t)}
                      className={`flex-1 pb-2 text-center capitalize transition-colors cursor-pointer ${
                        activeTabMetric === t
                          ? 'border-b-2 border-[#4F5BFF] text-[#4F5BFF] font-bold'
                          : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-2.5 mb-4 text-center">
                  <div className="bg-emerald-50/70 border border-emerald-100 p-2.5 rounded-xl">
                    <div className="flex items-center justify-center gap-1 text-emerald-600 font-bold text-base">
                      <ThumbsUp className="w-4 h-4" />
                      <span>87%</span>
                    </div>
                    <span className="text-[10px] text-slate-600 mt-1 block">Penerangan Baik</span>
                  </div>

                  <div className="bg-amber-50/70 border border-amber-100 p-2.5 rounded-xl">
                    <div className="flex items-center justify-center gap-1 text-amber-600 font-bold text-base">
                      <AlertTriangle className="w-4 h-4" />
                      <span>3</span>
                    </div>
                    <span className="text-[10px] text-slate-600 mt-1 block">Risiko Sedang</span>
                  </div>

                  <div className="bg-blue-50/70 border border-blue-100 p-2.5 rounded-xl">
                    <div className="flex items-center justify-center gap-1 text-blue-600 font-bold text-sm">
                      <Users className="w-4 h-4" />
                      <span>Tinggi</span>
                    </div>
                    <span className="text-[10px] text-slate-600 mt-1 block">Kepadatan</span>
                  </div>
                </div>

                <div className="bg-amber-50/40 border border-amber-200/80 rounded-xl p-3 mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="font-bold text-xs text-amber-900">
                        {selectedRouteType === 'safe' ? 'Rute Aman' : 'Rute Berisiko'}
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-600">
                      {selectedRouteType === 'safe' ? '23 mnt • 8.7 km' : '16 mnt • 7.2 km'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {selectedRouteType === 'safe'
                      ? 'Rute ini memiliki penerangan jalan yang sangat baik dan tidak ada laporan lubang atau bahaya.'
                      : 'Terdapat laporan kerusakan penerangan di beberapa titik, jarak lebih dekat, risiko menengah. Rute ini melewati jalan dengan penerangan cukup baik dan terdapat laporan berbahaya.'}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs py-2 px-3 bg-slate-50 rounded-xl mb-4">
                  <div>
                    <span className="block text-[10px] text-slate-400">Estimasi Waktu Tiba</span>
                    <span className="font-bold text-slate-800">10.04 WIB</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] text-slate-400">Berangkat Sekarang</span>
                    <span className="font-semibold text-slate-700">09.41 WIB</span>
                  </div>
                </div>

                {!isNavigating ? (
                  <button
                    onClick={() => setIsNavigating(true)}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#4F5BFF] hover:bg-blue-600 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                  >
                    <span>Mulai Perjalanan</span>
                    <Navigation className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setIsNavigating(false)}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-xl shadow-md shadow-rose-500/20 transition-all cursor-pointer"
                  >
                    <span>Akhiri Perjalanan</span>
                  </button>
                )}
              </div>
            </div>

            {/* Desktop Bottom Drawer: Detail Rute Waypoint Stepper */}
            <div className="absolute bottom-4 left-6 right-6 lg:right-[430px] z-20 pointer-events-auto">
              <div className="bg-white rounded-2xl p-4 shadow-xl border border-slate-100 flex flex-col md:flex-row gap-5 max-h-[300px] overflow-y-auto no-scrollbar overscroll-contain">
                <div className="flex-1 min-w-[280px]">
                  <div className="flex items-center gap-2 mb-3">
                    <button
                      onClick={() => setShowRouteDetail(false)}
                      className="p-1 hover:bg-slate-100 rounded-lg text-slate-500 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <h4 className="font-bold text-slate-900 text-sm">Detail Rute</h4>
                  </div>

                  <div className="relative pl-5 border-l-2 border-slate-200 space-y-4 ml-2">
                    <div className="relative">
                      <div className="absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-blue-100" />
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-900">Lokasi Awal</span>
                        <span className="text-[10px] text-slate-400">09.41</span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium">{originPoint?.name}</p>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-[25px] top-1 w-2.5 h-2.5 rounded-full bg-slate-300" />
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-800">Jl. Ki Ageng Tirta</span>
                        <span className="text-[10px] text-slate-400">09.47</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500">
                        <span>4 mnt • 2.1 km</span>
                        <span className="text-emerald-600 font-semibold">• Penerangan Baik</span>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-[25px] top-1 w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-800">Jl. Raya Pasteur Dipati Ukur</span>
                        <span className="text-[10px] text-slate-400">10.56</span>
                      </div>
                      <span className="text-[10px] text-amber-600 font-medium">• Penerangan Cukup</span>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-amber-100 text-amber-800">
                          Dalam Perbaikan
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-orange-100 text-orange-800">
                          Titik Perhatian
                        </span>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full bg-red-500 ring-4 ring-red-100" />
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-900">Tujuan Akhir</span>
                        <span className="text-[10px] text-slate-400">10.04</span>
                      </div>
                      <p className="text-[11px] font-semibold text-slate-700">{destinationPoint?.name}</p>
                      <span className="text-[10px] text-slate-400">10 mnt • 3 km</span>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-64 border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-4">
                  <span className="block text-xs font-bold text-slate-900 mb-2">Laporan Rute</span>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                      <span className="font-semibold text-slate-700">Anonymous</span>
                      <span>20/5</span>
                    </div>
                    <p className="text-[11px] text-slate-600 line-clamp-3 mb-2 leading-snug">
                      Tolong kepada pihak PLN, lampu jalan di kawasan jalan Raya Pasteur agak redup. Tolong diperbaiki
                    </p>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-[10px]">
                      <div className="flex items-center gap-3 text-slate-500">
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3 text-blue-600" /> 23
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" /> 1
                        </span>
                      </div>
                      <button
                        onClick={() => onNavigateToTab('aktivitas')}
                        className="text-[#4F5BFF] font-semibold hover:underline"
                      >
                        Balas
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Emergency SOS Modal */}
        {showEmergencyModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <AlertOctagon className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-1">Bantuan Darurat (SOS)</h3>
              <p className="text-xs text-slate-500 mb-5 leading-relaxed">
                Tekan tombol di bawah untuk menghubungi layanan darurat kota atau membagikan koordinat
                ke kontak darurat Anda.
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => setShowEmergencyModal(false)}
                  className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Hubungi Call Center 112</span>
                </button>
                <button
                  onClick={() => setShowEmergencyModal(false)}
                  className="w-full py-2.5 bg-slate-100 text-slate-600 font-semibold text-xs rounded-xl cursor-pointer"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
