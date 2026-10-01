import React, { useState } from 'react';
import { Send, Clock, ArrowLeft, X } from 'lucide-react';
import { MapCanvas } from '../components/MapCanvas';
import { Avatar } from '../components/Avatars';
import { Friend } from '../types';

interface LokasiViewProps {
  onBackToHome?: () => void;
}

export const LokasiView: React.FC<LokasiViewProps> = ({ onBackToHome }) => {
  const [selectedFriendIds, setSelectedFriendIds] = useState<string[]>(['f1', 'f2']);
  const [selectedDuration, setSelectedDuration] = useState('45 Menit');
  const [isSharingActive, setIsSharingActive] = useState(false);
  const [remainingTime, setRemainingTime] = useState(30);

  const friendsList: Friend[] = [
    { id: 'f1', name: 'Aulia', avatar: 'Aulia' },
    { id: 'f2', name: 'Tasya', avatar: 'Tasya' },
    { id: 'f3', name: 'Rahman', avatar: 'Rahman' },
    { id: 'f4', name: 'Adit', avatar: 'Adit' },
    { id: 'f5', name: 'Zahra', avatar: 'Zahra' },
  ];

  const durations = ['15 Menit', '30 Menit', '45 Menit', '1 Jam', 'Selalu Bagikan'];

  const toggleFriend = (id: string) => {
    if (selectedFriendIds.includes(id)) {
      setSelectedFriendIds(selectedFriendIds.filter((fId) => fId !== id));
    } else {
      setSelectedFriendIds([...selectedFriendIds, id]);
    }
  };

  const handleStartSharing = () => {
    if (selectedFriendIds.length === 0) return;
    setIsSharingActive(true);
  };

  const handleEndSharing = () => {
    setIsSharingActive(false);
  };

  const handleExtendDuration = () => {
    setRemainingTime((prev) => prev + 30);
  };

  const activeFriends = friendsList.filter((f) => selectedFriendIds.includes(f.id));

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-white">
      {/* Top Header matching Berbagi Lokasi.png */}
      <div className="px-5 py-3.5 border-b border-slate-100 bg-white z-10 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="p-1.5 hover:bg-slate-100 rounded-full text-slate-700 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base lg:text-xl font-bold text-slate-900 tracking-tight">
            {isSharingActive ? 'Berbagi Lokasi' : 'Lokasi'}
          </h1>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative overflow-hidden pb-14 md:pb-0">
        {/* If Active Sharing -> Full Map with Bottom Sheet (Matches Screen 3) */}
        {isSharingActive ? (
          <div className="w-full h-full relative">
            <MapCanvas
              isSharingLocation={true}
              sharedFriends={activeFriends}
              className="w-full h-full"
            />

            {/* Bottom Sheet for Active Sharing */}
            <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-6 md:top-6 md:bottom-auto md:w-96 z-30 bg-white rounded-3xl p-5 shadow-2xl border border-slate-100">
              <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto mb-3 md:hidden" />
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 -ml-5" />
                <h3 className="font-bold text-slate-900 text-sm">Berbagi Lokasi Aktif</h3>
              </div>
              <p className="text-xs text-slate-400 mb-4 pl-4.5">
                Berakhir dalam {remainingTime} menit
              </p>

              <div className="flex items-center justify-between mb-4 bg-slate-50/70 p-3 rounded-2xl border border-slate-100">
                <div>
                  <span className="block text-[10px] text-slate-400 font-medium mb-1">
                    Dilihat oleh
                  </span>
                  <div className="flex items-center -space-x-1.5">
                    {activeFriends.map((friend) => (
                      <Avatar
                        key={friend.id}
                        name={friend.avatar}
                        size="xs"
                        className="ring-2 ring-white"
                      />
                    ))}
                  </div>
                </div>

                <div className="text-right">
                  <span className="block text-[10px] text-slate-400 font-medium mb-0.5">
                    Durasi
                  </span>
                  <span className="text-xs font-bold text-slate-800">
                    {selectedDuration}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleEndSharing}
                  className="flex-1 py-3 bg-rose-100 hover:bg-rose-200 text-rose-600 font-bold text-xs rounded-xl transition-colors cursor-pointer text-center"
                >
                  Akhiri
                </button>

                <button
                  onClick={handleExtendDuration}
                  className="flex-1 flex items-center justify-center gap-1.5 py-3 border border-blue-400 hover:bg-blue-50/50 text-[#4F5BFF] font-bold text-xs rounded-xl transition-colors cursor-pointer text-center"
                >
                  <span>Perpanjang Durasi</span>
                  <Clock className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Configuring Share Location Form (Matches Screen 1 & 2 of Berbagi Lokasi.png) */
          <div className="flex flex-col h-full overflow-y-auto no-scrollbar max-w-lg mx-auto p-5 pb-24 md:pb-8">
            {/* Top Banner Graphic / Map Preview */}
            <div className="w-full h-36 rounded-2xl overflow-hidden mb-4 border border-slate-100 shadow-2xs relative bg-[#eef3f9]">
              <MapCanvas isSharingLocation={true} sharedFriends={activeFriends} className="w-full h-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent pointer-events-none" />
            </div>

            {/* Title & Subtitle */}
            <div className="mb-4">
              <h2 className="text-base font-bold text-slate-900 leading-snug">
                Berbagi lokasi, <br />
                <span className="font-extrabold text-slate-900">Perjalanan jadi lebih aman</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Pilih teman yang ingin anda beri tahu lokasi anda
              </p>
            </div>

            {/* Section: Pilih Teman */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-bold text-slate-900">Pilih Teman</span>
                <span className="text-xs text-slate-400 font-medium">
                  {selectedFriendIds.length} dipilih
                </span>
              </div>

              {/* Friend Chips matching Berbagi Lokasi.png */}
              <div className="flex flex-wrap gap-2">
                {friendsList.map((friend) => {
                  const isSelected = selectedFriendIds.includes(friend.id);
                  return (
                    <button
                      key={friend.id}
                      onClick={() => toggleFriend(friend.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#4F5BFF] bg-blue-50/70 text-slate-900 shadow-2xs'
                          : 'border-slate-200 bg-slate-50/80 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Avatar name={friend.avatar} size="xs" />
                      <span>{friend.name}</span>
                      {isSelected && (
                        <X className="w-3.5 h-3.5 text-blue-600 ml-0.5 hover:text-red-500" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section: Durasi */}
            <div className="mb-6">
              <span className="text-xs font-bold text-slate-900 block mb-2">Durasi</span>
              <div className="flex flex-wrap gap-1.5">
                {durations.map((dur) => {
                  const isSelected = selectedDuration === dur;
                  return (
                    <button
                      key={dur}
                      onClick={() => setSelectedDuration(dur)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#EEF1FF] text-[#4F5BFF] font-bold border border-blue-200'
                          : 'bg-slate-100/90 text-slate-600 hover:bg-slate-200 border border-transparent'
                      }`}
                    >
                      {dur}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sticky/Bottom Action Button: Mulai Bagikan */}
            <div className="mt-auto pt-4">
              <button
                onClick={handleStartSharing}
                disabled={selectedFriendIds.length === 0}
                className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-xs lg:text-sm transition-all cursor-pointer ${
                  selectedFriendIds.length > 0
                    ? 'bg-[#4854FE] hover:bg-blue-600 text-white shadow-md shadow-blue-500/25'
                    : 'bg-slate-300 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Mulai Bagikan</span>
                <Send className="w-4 h-4 fill-white" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
