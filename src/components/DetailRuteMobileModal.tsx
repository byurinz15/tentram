import React, { useState } from 'react';
import {
  ArrowLeft,
  Send,
  ThumbsUp,
  MessageSquare,
  AlertTriangle,
  Users,
  Compass,
  Navigation,
  ChevronDown,
  ChevronUp,
  Zap,
} from 'lucide-react';
import { Avatar } from './Avatars';

interface DetailRuteMobileProps {
  isOpen: boolean;
  onClose: () => void;
  isNavigating: boolean;
  onToggleNavigation: () => void;
  originName?: string;
  destinationName?: string;
  selectedRouteType: 'safe' | 'risky';
}

export const DetailRuteMobile: React.FC<DetailRuteMobileProps> = ({
  isOpen,
  onClose,
  isNavigating,
  onToggleNavigation,
  originName = 'Jl. Merdeka No. 123, Tangerang',
  destinationName = 'Institut Teknologi PLN',
  selectedRouteType,
}) => {
  const [activeTab, setActiveTab] = useState<'kondisi' | 'detail' | 'rute'>('kondisi');
  const [isCommentsExpanded, setIsCommentsExpanded] = useState(true);
  const [sheetExpanded, setSheetExpanded] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col pointer-events-auto bg-transparent">
      {/* Top Floating Mobile Nav Bar */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between z-20">
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-slate-700 hover:bg-slate-50 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Action Button: Mulai > (Blue) or Akhiri (Red) */}
        {!isNavigating ? (
          <button
            onClick={onToggleNavigation}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-[#4F5BFF] hover:bg-blue-600 text-white font-bold text-xs rounded-full shadow-md shadow-blue-500/25 cursor-pointer"
          >
            <span>Mulai</span>
            <Send className="w-3.5 h-3.5 fill-white" />
          </button>
        ) : (
          <button
            onClick={onToggleNavigation}
            className="px-5 py-2.5 bg-rose-100 hover:bg-rose-200 text-rose-600 font-bold text-xs rounded-full cursor-pointer"
          >
            Akhiri
          </button>
        )}
      </div>

      {/* Floating GPS Target Arrow Button on Bottom Right */}
      <div className="absolute right-4 top-28 z-20">
        <button
          title="Pusatkan Lokasi"
          className="w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center text-[#4F5BFF] hover:bg-slate-50 cursor-pointer"
        >
          <Navigation className="w-5 h-5 fill-[#4F5BFF]" />
        </button>
      </div>

      {/* Spacer to let user see map underneath */}
      <div
        className="flex-1 min-h-[160px]"
        onClick={() => setSheetExpanded(!sheetExpanded)}
      />

      {/* Draggable Bottom Sheet matching Detail Rute.png */}
      <div
        className={`bg-white rounded-t-3xl shadow-2xl border-t border-slate-100 flex flex-col transition-all duration-300 z-30 ${
          sheetExpanded ? 'max-h-[75vh]' : 'max-h-[180px]'
        }`}
      >
        {/* Drag handle */}
        <div
          onClick={() => setSheetExpanded(!sheetExpanded)}
          className="w-full py-2.5 flex items-center justify-center cursor-pointer"
        >
          <div className="w-12 h-1.5 bg-slate-300 rounded-full" />
        </div>

        <div className="px-5 pb-6 overflow-y-auto no-scrollbar overscroll-contain">
          {/* Header Title */}
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-slate-900">Detail Rute</h2>
          </div>

          {/* Sub-tabs: Kondisi | Detail | Rute */}
          <div className="flex border-b border-slate-100 mb-4 text-xs font-semibold">
            {(['kondisi', 'detail', 'rute'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`flex-1 pb-2.5 text-center capitalize transition-colors cursor-pointer ${
                  activeTab === t
                    ? 'border-b-2 border-[#4F5BFF] text-[#4F5BFF]'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Timing stats bar */}
          <div className="flex items-center justify-between p-3 bg-blue-50/40 rounded-2xl mb-4 border border-blue-100/60">
            <div>
              <span className="block text-[10px] text-slate-400 font-medium">
                Estimasi Waktu Tiba
              </span>
              <span className="text-sm font-extrabold text-[#4F5BFF]">
                10.04 <span className="text-[11px] font-normal text-slate-500">WIB</span>
              </span>
            </div>
            <div className="text-right">
              <span className="block text-[10px] text-slate-400 font-medium">
                Berangkat Sekarang
              </span>
              <span className="text-xs font-bold text-slate-700">09.41 WIB</span>
            </div>
          </div>

          {/* Waypoint Stepper Timeline */}
          <div className="mb-5">
            <h3 className="text-xs font-bold text-slate-900 mb-3">Detail Rute</h3>
            <div className="relative pl-5 border-l-2 border-slate-200 space-y-4 ml-2">
              {/* Point 1: Lokasi Awal */}
              <div className="relative">
                <div className="absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-blue-100" />
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">Lokasi Awal</span>
                  <span className="text-[10px] text-slate-400">09.41</span>
                </div>
                <p className="text-[11px] text-slate-500">{originName}</p>
              </div>

              {/* Point 2: Jl. Ki Ageng Tirta */}
              <div className="relative">
                <div className="absolute -left-[25px] top-1 w-2.5 h-2.5 rounded-full bg-slate-300" />
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-800">Jl. Ki Ageng Tirta</span>
                  <span className="text-[10px] text-slate-400">09.47</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-500">
                  <span>± 6 mnt • 2.1 km</span>
                  <span className="text-emerald-600 font-semibold">• Penerangan Baik</span>
                </div>
              </div>

              {/* Point 3: Jl. Raya Pasteur */}
              <div className="relative">
                <div className="absolute -left-[25px] top-1 w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-800">
                    Jl. Raya Pasteur Dipati Ukur
                  </span>
                  <span className="text-[10px] text-slate-400">10.56</span>
                </div>
                <div className="text-[10px] text-slate-500">
                  <span>± 10 mnt • 3 km</span>
                  <span className="text-amber-600 font-medium ml-1">• Penerangan Cukup</span>
                </div>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-amber-100 text-amber-800">
                    Dalam Perbaikan
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-orange-100 text-orange-800">
                    Titik Perhatian
                  </span>
                </div>
              </div>

              {/* Point 4: Tujuan Akhir */}
              <div className="relative">
                <div className="absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full bg-red-500 ring-4 ring-red-100" />
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">Tujuan Akhir</span>
                  <span className="text-[10px] text-slate-400">10.04</span>
                </div>
                <p className="text-[11px] font-semibold text-slate-700">{destinationName}</p>
                <span className="text-[10px] text-slate-400">± 10 mnt • 3 km</span>
              </div>
            </div>
          </div>

          {/* Kondisi Sepanjang Rute Metrics */}
          <div className="mb-5">
            <h3 className="text-xs font-bold text-slate-900 mb-1">Kondisi Sepanjang Rute</h3>
            <p className="text-[10px] text-slate-400 mb-3">
              Ringkasan kondisi jalan berdasarkan laporan pengguna
            </p>

            <div className="grid grid-cols-3 gap-2 text-center mb-3">
              <div className="bg-emerald-50/70 border border-emerald-100 p-2.5 rounded-xl">
                <div className="flex items-center justify-center gap-1 text-emerald-600 font-bold text-sm">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>87%</span>
                </div>
                <span className="text-[9px] text-slate-600 mt-0.5 block">Penerangan Baik</span>
              </div>

              <div className="bg-amber-50/70 border border-amber-100 p-2.5 rounded-xl">
                <div className="flex items-center justify-center gap-1 text-amber-600 font-bold text-sm">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>3</span>
                </div>
                <span className="text-[9px] text-slate-600 mt-0.5 block">Risiko Sedang</span>
              </div>

              <div className="bg-blue-50/70 border border-blue-100 p-2.5 rounded-xl">
                <div className="flex items-center justify-center gap-1 text-blue-600 font-bold text-xs">
                  <Users className="w-3.5 h-3.5" />
                  <span>Tinggi</span>
                </div>
                <span className="text-[9px] text-slate-600 mt-0.5 block">Kepadatan</span>
              </div>
            </div>

            {/* Rute Berisiko / Aman Banner */}
            <div className="bg-amber-50/50 border border-amber-200/80 rounded-xl p-3">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="font-bold text-xs text-amber-900">
                    {selectedRouteType === 'safe' ? 'Rute Aman' : 'Rute Berisiko'}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-slate-600">
                  {selectedRouteType === 'safe' ? '23 mnt • 8.7 km' : '16 mnt • 7.2 km'}
                </span>
              </div>
              <p className="text-[10px] text-slate-600 leading-relaxed">
                Terdapat laporan kerusakan penerangan di beberapa titik, jarak lebih dekat, risiko
                menengah. Rute ini melewati jalan dengan penerangan cukup baik dan terdapat laporan
                berbahaya.
              </p>
            </div>
          </div>

          {/* Laporan Rute & Comments Thread matching Detail Rute.png */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 mb-2">Laporan Rute</h3>

            {/* Main Post */}
            <div className="bg-slate-50/80 rounded-2xl p-3.5 border border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar name="Anonymous" size="xs" />
                  <span className="text-xs font-bold text-slate-800">Anonymous</span>
                </div>
                <span className="text-[10px] text-slate-400">20/5</span>
              </div>

              <p className="text-xs text-slate-700 leading-snug">
                Tolong kepada pihak PLN, lampu jalan di kawasan jalan Raya Pasteur agak redup. Tolong
                diperbaiki
              </p>

              <div className="flex items-center justify-between pt-1 text-[11px]">
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-1 text-slate-600">
                    <ThumbsUp className="w-3 h-3 text-blue-600" />
                    <span>23</span>
                  </button>
                  <button
                    onClick={() => setIsCommentsExpanded(!isCommentsExpanded)}
                    className="flex items-center gap-1 text-slate-600"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>1</span>
                  </button>
                </div>
                <button className="text-[#4F5BFF] font-bold">Balas</button>
              </div>

              {/* Nested Replies Thread matching Detail Rute.png */}
              {isCommentsExpanded && (
                <div className="pl-4 border-l-2 border-slate-200 space-y-3 pt-2">
                  {/* Reply 1: Aryana.Dwiyanti */}
                  <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[11px] text-slate-800">
                        Aryana.Dwiyanti
                      </span>
                      <span className="text-[9px] text-slate-400">20/5</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug">
                      <span className="text-[#4F5BFF] font-medium">@Anonymous</span> Betul, takut
                      kalau pulang sepi malem-malem
                    </p>
                    <div className="flex items-center justify-between mt-1 text-[10px]">
                      <span className="flex items-center gap-1 text-slate-500">
                        <ThumbsUp className="w-2.5 h-2.5" /> 2
                      </span>
                      <button className="text-[#4F5BFF] font-medium">Balas</button>
                    </div>
                  </div>

                  {/* Reply 2: PLN 123 */}
                  <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3.5 h-3.5 rounded-full bg-amber-400 flex items-center justify-center text-[8px] font-bold text-slate-900">
                          ⚡
                        </span>
                        <span className="font-bold text-[11px] text-slate-800">PLN 123</span>
                      </div>
                      <span className="text-[9px] text-slate-400">20/5</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug">
                      <span className="text-[#4F5BFF] font-medium">@Anonymous</span> Halo, Terima
                      kasih telah melaporkan kerusakan lampu penerangan di jalan Raya Pasteur. Pihak
                      PLN akan menangani hal tersebut.
                    </p>
                    <div className="flex items-center justify-between mt-1 text-[10px]">
                      <span className="flex items-center gap-1 text-slate-500">
                        <ThumbsUp className="w-2.5 h-2.5" /> 4
                      </span>
                      <button className="text-[#4F5BFF] font-medium">Balas</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
