import React, { useState } from 'react';
import { Send, Clock, ArrowLeft, X, Check } from 'lucide-react';
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
    <div className="flex-1 bg-white min-h-screen overflow-y-auto no-scrollbar flex flex-col">
      {/* Mobile Top Header (only on small screens) */}
      <div className="md:hidden px-4 py-3 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-20">
        <div className="flex items-center gap-2.5">
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="p-1 text-slate-600 hover:bg-slate-100 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <h2 className="text-base font-bold text-slate-900">
            {isSharingActive ? 'Berbagi Lokasi' : 'Lokasi'}
          </h2>
        </div>
      </div>

      {/* Main Content Area matching Shareloc_laptop.png */}
      <div className="flex-1 px-5 sm:px-8 lg:px-12 py-6 lg:py-9 max-w-7xl">
        {/* Page Title & Subtitle matching Shareloc_laptop.png */}
        <div className="mb-6">
          <h1 className="text-xl lg:text-2xl font-bold text-slate-900 leading-snug">
            Berbagi lokasi, <br />
            <span>Perjalanan jadi lebih aman</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            Pilih teman yang ingin anda beri tahu lokasi anda
          </p>
        </div>

        {/* Desktop Side-by-Side Layout matching Shareloc_laptop.png */}
        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
          {/* Left Column: Interactive Map Box */}
          <div className="w-full lg:w-[520px] xl:w-[560px] h-[360px] sm:h-[400px] rounded-3xl overflow-hidden border border-slate-200 shadow-2xs relative bg-[#f3f7fb] flex-shrink-0">
            <MapCanvas
              isSharingLocation={true}
              sharedFriends={activeFriends}
              className="w-full h-full"
            />
          </div>

          {/* Right Column: Configuration or Active Sharing Card */}
          {!isSharingActive ? (
            /* Screen A: Card Pilih Teman & Durasi matching Shareloc_laptop.png */
            <div className="w-full lg:w-[420px] bg-white border border-slate-200/90 rounded-3xl p-6 shadow-2xs">
              {/* Header: Pilih Teman + Count */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-900">Pilih Teman</span>
                <span className="text-xs text-slate-400 font-medium">
                  {selectedFriendIds.length} dipilih
                </span>
              </div>

              {/* Friends Grid matching Shareloc_laptop.png */}
              <div className="grid grid-cols-2 gap-2.5 mb-6">
                {friendsList.map((friend) => {
                  const isSelected = selectedFriendIds.includes(friend.id);
                  return (
                    <button
                      key={friend.id}
                      onClick={() => toggleFriend(friend.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer text-left ${
                        isSelected
                          ? 'border-[#4F5BFF] bg-blue-50/70 text-slate-900 shadow-2xs'
                          : 'border-slate-200 bg-slate-50/70 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Avatar name={friend.avatar} size="xs" />
                      <span className="truncate flex-1">{friend.name}</span>
                      {isSelected ? (
                        <Check className="w-3.5 h-3.5 text-[#4F5BFF] flex-shrink-0" />
                      ) : null}
                    </button>
                  );
                })}
              </div>

              {/* Durasi section */}
              <div className="mb-6">
                <span className="text-xs font-bold text-slate-900 block mb-2.5">Durasi</span>
                <div className="flex flex-wrap gap-2">
                  {durations.map((dur) => {
                    const isSelected = selectedDuration === dur;
                    return (
                      <button
                        key={dur}
                        onClick={() => setSelectedDuration(dur)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#EEF1FF] text-[#4F5BFF] font-bold border border-blue-200'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-transparent'
                        }`}
                      >
                        {dur}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Button: Mulai Bagikan */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleStartSharing}
                  disabled={selectedFriendIds.length === 0}
                  className={`px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                    selectedFriendIds.length > 0
                      ? 'bg-[#4854FE] hover:bg-[#3D47E0] text-white shadow-xs'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <span>Mulai Bagikan</span>
                  <Send className="w-3.5 h-3.5 fill-white" />
                </button>
              </div>
            </div>
          ) : (
            /* Screen B: Card Berbagi Lokasi Aktif matching Shareloc_laptop.png */
            <div className="w-full lg:w-[420px] bg-white border border-slate-200/90 rounded-3xl p-6 shadow-2xs">
              {/* Header: Status Aktif */}
              <div className="flex items-center gap-2 mb-1">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <h3 className="font-bold text-emerald-600 text-xs">Berbagi Lokasi Aktif</h3>
              </div>
              <p className="text-xs font-semibold text-slate-900 mb-5">
                Berakhir dalam {remainingTime} menit
              </p>

              {/* Info Row: Dilihat oleh & Durasi */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
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

              {/* Action Buttons: Akhiri & Perpanjang Durasi */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleEndSharing}
                  className="flex-1 py-2.5 bg-rose-100 hover:bg-rose-200 text-rose-600 font-bold text-xs rounded-xl transition-colors cursor-pointer text-center"
                >
                  Akhiri
                </button>

                <button
                  onClick={handleExtendDuration}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 border border-[#4854FE] hover:bg-blue-50 text-[#4854FE] font-bold text-xs rounded-xl transition-colors cursor-pointer text-center"
                >
                  <span>Perpanjang Durasi</span>
                  <Clock className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
