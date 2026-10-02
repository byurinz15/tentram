import React, { useState } from 'react';
import {
  MapPin,
  Crosshair,
  Camera,
  ChevronRight,
  Check,
  AlertCircle,
  Construction,
  Footprints,
  X,
  ArrowLeft,
} from 'lucide-react';
import { ReportCategory } from '../types';

interface LaporanViewProps {
  onSuccess?: () => void;
  onGoToAktivitas?: () => void;
  onBackToHome?: () => void;
}

export const LaporanView: React.FC<LaporanViewProps> = ({
  onSuccess,
  onGoToAktivitas,
  onBackToHome,
}) => {
  const [locationText, setLocationText] = useState(
    'Jl. Pulau Kapuk No. 129, Cengkareng, Jakarta Barat'
  );
  const [selectedCategory, setSelectedCategory] =
    useState<ReportCategory | null>('penerang_rusak');
  const [otherCategoryText, setOtherCategoryText] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(
    'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=400&q=80'
  );
  const [notes, setNotes] = useState(
    'Tolong segera diperbaiki, jalanan jadi sangat gelap. Khawatir terjadi hal hal yang tidak diinginkan'
  );
  const [showStatusLaporan, setShowStatusLaporan] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = Boolean(selectedCategory && locationText.trim());

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
    }
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowStatusLaporan(true);
    }, 400);
  };

  // State 3: Full Mobile "Status Laporan" Screen (Matches Laporan.png right screen)
  if (showStatusLaporan) {
    return (
      <div className="flex-1 bg-white h-full overflow-y-auto no-scrollbar flex flex-col justify-between p-6 pb-28 md:pb-12 max-w-lg mx-auto">
        <div className="text-center pt-2">
          <h2 className="text-base font-bold text-slate-800">Status Laporan</h2>
        </div>

        <div className="text-center my-auto py-12">
          {/* Giant Circular Blue Checkmark */}
          <div className="w-40 h-40 mx-auto mb-6 rounded-full border-[5px] border-[#4854FE] flex items-center justify-center text-[#4854FE]">
            <Check className="w-24 h-24 stroke-[3.5]" />
          </div>

          <h3 className="text-2xl font-extrabold text-[#4854FE] mb-2 tracking-tight">
            Laporan Terkirim
          </h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
            Terima kasih, laporan akan segera diproses.
          </p>
        </div>

        <div className="w-full space-y-3">
          <button
            onClick={() => {
              setShowStatusLaporan(false);
              if (onBackToHome) onBackToHome();
            }}
            className="w-full py-3.5 bg-[#4854FE] hover:bg-blue-600 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-500/25 transition-colors cursor-pointer"
          >
            Kembali ke Beranda
          </button>
          {onGoToAktivitas && (
            <button
              onClick={() => {
                setShowStatusLaporan(false);
                onGoToAktivitas();
              }}
              className="w-full py-2.5 text-xs font-semibold text-[#4854FE] hover:underline cursor-pointer"
            >
              Lihat di Feed Aktivitas
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#F8FAFF] h-full overflow-y-auto no-scrollbar px-4 sm:px-8 lg:px-14 pt-5 pb-32 md:pb-8">
      {/* Top Header with Back Arrow (Matches Laporan.png) */}
      <div className="flex items-center justify-between mb-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="p-1.5 hover:bg-slate-200/60 rounded-xl text-slate-700 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg lg:text-2xl font-bold text-slate-900 tracking-tight">
            Buat Laporan
          </h1>
        </div>

        {/* Desktop submit button */}
        <button
          onClick={handleSubmit}
          disabled={!canSubmit || isSubmitting}
          className={`hidden md:flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer ${
            canSubmit && !isSubmitting
              ? 'bg-[#4854FE] hover:bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'bg-slate-300 text-slate-100 cursor-not-allowed'
          }`}
        >
          <span>{isSubmitting ? 'Mengirim...' : 'Kirim Laporan'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Section 1: Lokasi Terkait */}
        <section>
          <div className="mb-2">
            <h2 className="text-xs font-bold text-slate-900">Lokasi Terkait</h2>
            <p className="text-[11px] text-slate-500">
              Lokasi akan terdeteksi secara otomatis. Jika tidak sesuai, anda dapat mengatur ulang lokasi
            </p>
          </div>

          <div className="flex items-center justify-between p-3.5 bg-white border border-slate-200 rounded-2xl shadow-2xs">
            <div className="flex items-center gap-2.5 flex-1 mr-2">
              <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-[#4854FE]">
                <MapPin className="w-4 h-4 fill-blue-100" />
              </div>
              <div className="flex-1 min-w-0">
                <input
                  type="text"
                  value={locationText}
                  onChange={(e) => setLocationText(e.target.value)}
                  className="w-full text-xs font-bold text-slate-900 focus:outline-hidden bg-transparent truncate"
                />
                <span className="block text-[10px] text-slate-400">
                  Lokasi terdeteksi otomatis
                </span>
              </div>
            </div>

            <button
              title="Deteksi Lokasi GPS"
              onClick={() =>
                setLocationText('Jl. Pulau Kapuk No. 129, Cengkareng, Jakarta Barat')
              }
              className="p-1.5 text-[#4854FE] hover:bg-blue-50 rounded-xl cursor-pointer flex-shrink-0"
            >
              <Crosshair className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* Section 2: Kategori Masalah */}
        <section>
          <div className="mb-2.5">
            <h2 className="text-xs font-bold text-slate-900">Kategori Masalah</h2>
            <p className="text-[11px] text-slate-500">Pilih masalah yang anda temukan</p>
          </div>

          <div className="space-y-2.5">
            {/* 1. Penerang Jalan Rusak/Mati */}
            <div
              onClick={() => setSelectedCategory('penerang_rusak')}
              className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                selectedCategory === 'penerang_rusak'
                  ? 'border-[#4854FE] bg-blue-50/20 shadow-2xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-[#4854FE] flex-shrink-0">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm-3 18h6v1c0 .55-.45 1-1 1h-4c-.55 0-1-.45-1-1v-1z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-xs text-slate-900">Penerang Jalan Rusak/Mati</h3>
                  <p className="text-[10px] text-slate-500">Lampu jalan tidak menyala atau redup</p>
                </div>
              </div>

              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedCategory === 'penerang_rusak'
                    ? 'border-[#4854FE] bg-[#4854FE]'
                    : 'border-slate-300 bg-white'
                }`}
              >
                {selectedCategory === 'penerang_rusak' && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
            </div>

            {/* 2. Jalan Rusak */}
            <div
              onClick={() => setSelectedCategory('jalan_rusak')}
              className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                selectedCategory === 'jalan_rusak'
                  ? 'border-[#4854FE] bg-blue-50/20 shadow-2xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-[#4854FE] flex-shrink-0">
                  <Construction className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-slate-900">Jalan Rusak</h3>
                  <p className="text-[10px] text-slate-500">
                    Kerusakan seperti lubang dan hal lainnya pada jalan
                  </p>
                </div>
              </div>

              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedCategory === 'jalan_rusak'
                    ? 'border-[#4854FE] bg-[#4854FE]'
                    : 'border-slate-300 bg-white'
                }`}
              >
                {selectedCategory === 'jalan_rusak' && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
            </div>

            {/* 3. Rambu Rusak */}
            <div
              onClick={() => setSelectedCategory('rambu_rusak')}
              className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                selectedCategory === 'rambu_rusak'
                  ? 'border-[#4854FE] bg-blue-50/20 shadow-2xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-[#4854FE] flex-shrink-0">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-slate-900">Rambu Rusak</h3>
                  <p className="text-[10px] text-slate-500">Rambu lalu lintas rusak atau hilang</p>
                </div>
              </div>

              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedCategory === 'rambu_rusak'
                    ? 'border-[#4854FE] bg-[#4854FE]'
                    : 'border-slate-300 bg-white'
                }`}
              >
                {selectedCategory === 'rambu_rusak' && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
            </div>

            {/* 4. Trotoar Rusak */}
            <div
              onClick={() => setSelectedCategory('trotoar_rusak')}
              className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                selectedCategory === 'trotoar_rusak'
                  ? 'border-[#4854FE] bg-blue-50/20 shadow-2xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-[#4854FE] flex-shrink-0">
                  <Footprints className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-slate-900">Trotoar Rusak</h3>
                  <p className="text-[10px] text-slate-500">Trotoar tidak layak atau rusak</p>
                </div>
              </div>

              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedCategory === 'trotoar_rusak'
                    ? 'border-[#4854FE] bg-[#4854FE]'
                    : 'border-slate-300 bg-white'
                }`}
              >
                {selectedCategory === 'trotoar_rusak' && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
            </div>

            {/* 5. Lainnya */}
            <div
              onClick={() => setSelectedCategory('lainnya')}
              className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                selectedCategory === 'lainnya'
                  ? 'border-[#4854FE] bg-blue-50/20 shadow-2xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex-1 mr-2">
                <span className="font-bold text-xs text-slate-900 block mb-0.5">Lainnya</span>
                <input
                  type="text"
                  placeholder="Masukan aktivitas lain anda..."
                  value={otherCategoryText}
                  onChange={(e) => {
                    setOtherCategoryText(e.target.value);
                    setSelectedCategory('lainnya');
                  }}
                  className="w-full text-xs text-slate-800 placeholder:text-slate-400 bg-transparent border-0 p-0 focus:outline-hidden"
                />
              </div>

              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedCategory === 'lainnya'
                    ? 'border-[#4854FE] bg-[#4854FE]'
                    : 'border-slate-300 bg-white'
                }`}
              >
                {selectedCategory === 'lainnya' && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Foto Bukti */}
        <section>
          <div className="mb-2">
            <h2 className="text-xs font-bold text-slate-900">Foto Bukti</h2>
            <p className="text-[11px] text-slate-500">Tambahkan foto agar laporan lebih akurat</p>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto py-1">
            {/* Upload Button Box */}
            <label className="w-24 h-24 border-2 border-dashed border-blue-200 hover:border-blue-400 bg-blue-50/20 rounded-2xl flex flex-col items-center justify-center cursor-pointer flex-shrink-0 transition-colors">
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
              <Camera className="w-6 h-6 text-[#4854FE] mb-1" />
              <span className="text-[10px] font-bold text-[#4854FE]">Tambah Foto</span>
            </label>

            {/* Thumbnail with Close Button matching Laporan.png */}
            {photoPreview && (
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-slate-200 flex-shrink-0">
                <img src={photoPreview} alt="Bukti" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setPhotoPreview(null)}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-white/90 text-slate-700 shadow-md flex items-center justify-center hover:bg-white cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Section 4: Catatan (Opsional) */}
        <section>
          <div className="mb-1.5">
            <h2 className="text-xs font-bold text-slate-900">Catatan (Opsional)</h2>
          </div>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Tambah keterangan..."
            className="w-full p-3.5 text-xs text-slate-800 placeholder:text-slate-400 bg-white border border-slate-200 rounded-2xl focus:outline-hidden focus:border-[#4854FE] focus:ring-1 focus:ring-[#4854FE] resize-none shadow-2xs"
          />
        </section>

        {/* Mobile Kirim Laporan Button (Inside form flow, never obscuring Catatan) */}
        <div className="md:hidden pt-2">
          <button
            onClick={handleSubmit}
            disabled={!canSubmit || isSubmitting}
            className={`w-full py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-md ${
              canSubmit && !isSubmitting
                ? 'bg-[#4854FE] hover:bg-blue-600 text-white shadow-blue-500/25'
                : 'bg-slate-300 text-slate-100 cursor-not-allowed'
            }`}
          >
            <span>{isSubmitting ? 'Mengirim...' : 'Kirim Laporan'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
