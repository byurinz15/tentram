import React, { useState } from 'react';
import {
  Search,
  Plus,
  ArrowUp,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Send,
  X,
  Camera,
  ArrowLeft,
  Bell,
  MapPin,
  Crosshair,
  Users,
  CheckCircle2,
} from 'lucide-react';
import { Avatar } from '../components/Avatars';
import { TentramLogo } from '../components/TentramLogo';
import { ActivityPost } from '../types';
import { useDragScroll } from '../hooks/useDragScroll';

export const AktivitasView: React.FC = () => {
  const filterTabsDrag = useDragScroll<HTMLDivElement>();
  const [activeFilter, setActiveFilter] = useState<
    'Untuk Anda' | 'Komunitas' | 'Terdekat' | 'Terbaru' | 'Jalan'
  >('Untuk Anda');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddActivityScreen, setShowAddActivityScreen] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [expandedCommentsPostId, setExpandedCommentsPostId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<{ [postId: string]: string }>({});

  // New post form fields
  const [newContent, setNewContent] = useState('');
  const [newTag, setNewTag] = useState<
    'Penerang Jalanan Umum (PJU)' | 'Kondisi Jalanan' | 'Rambu lalu lintas' | 'Trotoar' | 'Lainnya'
  >('Penerang Jalanan Umum (PJU)');
  const [newPhotoPreview, setNewPhotoPreview] = useState<string | null>(
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80'
  );
  const [locationText, setLocationText] = useState(
    'Jl. Pulau Kapuk No. 129, Cengkareng, Jakarta Barat'
  );

  // Communities state
  const [joinedCommunities, setJoinedCommunities] = useState<string[]>(['c2']);
  const communities = [
    {
      id: 'c1',
      name: 'Itpin bagian hmali',
      members: '50 Anggota',
      distance: '0,8 km',
      desc: 'Berbagi info seputar perjalanan kampus dan lingkungan sekitar ITPLN',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 'c2',
      name: 'St. Rawa Buaya shelter',
      members: '96 Anggota',
      distance: '1,8 km',
      desc: 'Berbagi info seputar stasiun rawa buaya dan lingkungan sekitarnya',
      image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=200&q=80',
    },
  ];

  // Feed posts exactly matching Feeds.png
  const [posts, setPosts] = useState<ActivityPost[]>([
    {
      id: 'p_ainun',
      author: 'Ainun Nafisa (Anda)',
      avatar: 'Profile',
      timeAgo: 'Baru Saja',
      tag: 'PJU',
      content:
        'Salut banget sama petugasnya, jalanan terang banget jadi ga takut kalo lewat sini sendirian',
      imageUrl:
        'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80',
      upvotes: 0,
      commentsCount: 0,
      hasUpvoted: false,
      comments: [],
    },
    {
      id: 'p1',
      author: 'SintiaBella12',
      avatar: 'SintiaBella12',
      timeAgo: '2 j lalu',
      tag: 'PJU',
      content:
        'Tolong kepada pihak PLN, lampu jalan di kawasan jalan Raya Pasteur agak redup. Tolong diperbaiki',
      imageUrl:
        'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80',
      upvotes: 23,
      commentsCount: 1,
      hasUpvoted: false,
      comments: [
        {
          id: 'c1',
          author: 'Petugas PLN Cengkareng',
          avatar: 'Rahman',
          text: 'Terima kasih laporannya, tim teknis kami sedang menuju ke lokasi.',
          timeAgo: '1 j lalu',
        },
      ],
    },
    {
      id: 'p2',
      author: 'Rahmadi Almubarok',
      avatar: 'Rahmadi Almubarok',
      timeAgo: '2 j lalu',
      tag: 'Kabel',
      content: 'Hati hati gais, ada lubang besar di jalan tol Pacer KM. 871.',
      imageUrl:
        'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
      upvotes: 110,
      commentsCount: 20,
      hasUpvoted: false,
      comments: [],
    },
  ]);

  const filterTabs: Array<'Untuk Anda' | 'Komunitas' | 'Terdekat' | 'Terbaru' | 'Jalan'> = [
    'Untuk Anda',
    'Komunitas',
    'Terdekat',
    'Terbaru',
    'Jalan',
  ];

  const handleUpvote = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const hasUpvoted = !post.hasUpvoted;
          return {
            ...post,
            hasUpvoted,
            upvotes: hasUpvoted ? post.upvotes + 1 : post.upvotes - 1,
          };
        }
        return post;
      })
    );
  };

  const toggleComments = (postId: string) => {
    setExpandedCommentsPostId(expandedCommentsPostId === postId ? null : postId);
  };

  const handleAddReply = (postId: string) => {
    const text = replyText[postId];
    if (!text || !text.trim()) return;

    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const newComments = [
            ...(post.comments || []),
            {
              id: `c_${Date.now()}`,
              author: 'Anda',
              avatar: 'Profile',
              text: text.trim(),
              timeAgo: 'Baru saja',
            },
          ];
          return {
            ...post,
            comments: newComments,
            commentsCount: newComments.length,
          };
        }
        return post;
      })
    );

    setReplyText((prev) => ({ ...prev, [postId]: '' }));
    setExpandedCommentsPostId(postId);
  };

  const handleSubmitActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    const newPost: ActivityPost = {
      id: `p_${Date.now()}`,
      author: 'Ainun Nafisa (Anda)',
      avatar: 'Profile',
      timeAgo: 'Baru saja',
      tag: 'PJU',
      content: newContent,
      imageUrl:
        newPhotoPreview ||
        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
      upvotes: 0,
      commentsCount: 0,
      hasUpvoted: false,
      comments: [],
    };

    setPosts([newPost, ...posts]);
    setShowAddActivityScreen(false);
    setShowSuccessScreen(true);
  };

  const toggleJoinCommunity = (id: string) => {
    if (joinedCommunities.includes(id)) {
      setJoinedCommunities(joinedCommunities.filter((cId) => cId !== id));
    } else {
      setJoinedCommunities([...joinedCommunities, id]);
    }
  };

  // State 3: Activity Published Success Screen matching Feeds.png
  if (showSuccessScreen) {
    return (
      <div className="flex-1 bg-white min-h-screen flex flex-col justify-between p-6 pb-24 md:pb-12 max-w-md mx-auto">
        <div className="pt-2 text-center" />
        <div className="text-center my-auto py-12">
          {/* Blue Send Plane Circular Badge */}
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-emerald-50/60 border border-emerald-100 flex items-center justify-center text-[#4854FE]">
            <Send className="w-16 h-16 fill-[#4854FE] -rotate-12 translate-x-1" />
          </div>

          <h3 className="text-xl font-bold text-slate-900 mb-2">Aktivitas berhasil dikirim</h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
            Terima kasih, telah berkontribusi untuk kota yang lebih aman!
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setShowSuccessScreen(false)}
            className="w-full py-3.5 bg-[#4854FE] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
          >
            Lihat Aktivitas
          </button>
          <button
            onClick={() => {
              setShowSuccessScreen(false);
              setShowAddActivityScreen(true);
            }}
            className="w-full py-2.5 text-xs font-semibold text-[#4854FE] hover:underline cursor-pointer"
          >
            Tambah Lagi +
          </button>
        </div>
      </div>
    );
  }

  // State 2: Full Screen "Tambah Aktivitas" matching Feeds.png (Screen 2 & 3)
  if (showAddActivityScreen) {
    return (
      <div className="flex-1 bg-[#F8FAFF] min-h-screen overflow-y-auto no-scrollbar px-5 py-5 pb-28 md:pb-8 max-w-lg mx-auto">
        <div className="flex items-center gap-3 mb-5">
          <button
            onClick={() => setShowAddActivityScreen(false)}
            className="p-1.5 hover:bg-slate-200/60 rounded-full text-slate-700 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-bold text-slate-900">Tambah Aktivitas</h1>
        </div>

        {/* Notice Info Banner matching Feeds.png */}
        <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-3 flex items-start gap-2.5 mb-5 text-xs text-[#4854FE]">
          <span className="w-5 h-5 rounded-full border border-blue-400 flex items-center justify-center font-bold text-[11px] flex-shrink-0 mt-0.5">
            !
          </span>
          <p className="leading-snug">
            Laporan akan dilengkapi dengan alamat otomatis dan foto agar lebih mudah ditindaklanjuti
          </p>
        </div>

        <form onSubmit={handleSubmitActivity} className="space-y-5">
          {/* Kirim untuk dropdown */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">Kirim untuk</span>
            <select className="text-xs font-semibold text-[#4854FE] bg-transparent border-0 focus:outline-hidden cursor-pointer">
              <option value="Semua">Semua ▾</option>
              <option value="Komunitas">Hanya Komunitas ▾</option>
            </select>
          </div>

          {/* Foto Section */}
          <div>
            <span className="text-xs font-bold text-slate-900 block mb-2">Foto</span>
            <div className="flex items-center gap-3">
              {newPhotoPreview && (
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-slate-200 flex-shrink-0">
                  <img src={newPhotoPreview} alt="Bukti" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setNewPhotoPreview(null)}
                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-white/90 text-slate-700 shadow-md flex items-center justify-center cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
              <label className="w-24 h-24 border-2 border-dashed border-blue-200 hover:border-blue-400 bg-blue-50/20 rounded-2xl flex flex-col items-center justify-center cursor-pointer flex-shrink-0 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) setNewPhotoPreview(URL.createObjectURL(f));
                  }}
                  className="hidden"
                />
                <Camera className="w-6 h-6 text-[#4854FE] mb-1" />
                <span className="text-[10px] font-bold text-[#4854FE]">Tambah Foto</span>
              </label>
            </div>
          </div>

          {/* Lokasi Terkait */}
          <div>
            <span className="text-xs font-bold text-slate-900 block mb-1">Lokasi Terkait</span>
            <p className="text-[10px] text-slate-400 mb-2">
              Lokasi akan terdeteksi secara otomatis. Jika tidak sesuai, anda dapat mengatur ulang lokasi
            </p>
            <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-2xl">
              <div className="flex items-center gap-2 flex-1 mr-2">
                <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <input
                    type="text"
                    value={locationText}
                    onChange={(e) => setLocationText(e.target.value)}
                    className="w-full text-xs font-bold text-slate-900 bg-transparent border-0 focus:outline-hidden truncate"
                  />
                  <span className="block text-[10px] text-slate-400">Lokasi terdeteksi otomatis</span>
                </div>
              </div>
              <Crosshair className="w-4 h-4 text-[#4854FE] cursor-pointer" />
            </div>
          </div>

          {/* Deskripsi (Opsional) */}
          <div>
            <span className="text-xs font-bold text-slate-900 block mb-1">Deskripsi (Opsional)</span>
            <textarea
              rows={3}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Salut banget sama petugasnya, jalanan terang banget jadi ga takut kalo lewat sini sendirian"
              className="w-full p-3 text-xs text-slate-800 placeholder:text-slate-400 bg-white border border-slate-200 rounded-2xl focus:outline-hidden focus:border-[#4854FE] resize-none"
              required
            />
          </div>

          {/* Kategori Aktivitas */}
          <div>
            <span className="text-xs font-bold text-slate-900 block mb-1">Kategori Aktivitas</span>
            <p className="text-[10px] text-slate-400 mb-2.5">
              Pilih kategori yang berkaitan dengan aktivitas anda
            </p>
            <div className="space-y-2">
              {[
                'Penerang Jalanan Umum (PJU)',
                'Kondisi Jalanan',
                'Rambu lalu lintas',
                'Trotoar',
                'Lainnya',
              ].map((cat) => (
                <div
                  key={cat}
                  onClick={() => setNewTag(cat as any)}
                  className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer ${
                    newTag === cat
                      ? 'border-[#4854FE] bg-blue-50/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <span className="text-xs font-bold text-slate-800">{cat}</span>
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      newTag === cat ? 'border-[#4854FE] bg-[#4854FE]' : 'border-slate-300'
                    }`}
                  >
                    {newTag === cat && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#4854FE] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Bagikan</span>
            <Send className="w-3.5 h-3.5 fill-white" />
          </button>
        </form>
      </div>
    );
  }

  // Default Feeds View
  return (
    <div className="flex-1 bg-[#F8FAFF] min-h-screen overflow-y-auto no-scrollbar px-4 sm:px-8 lg:px-14 py-4 pb-28 md:pb-8 relative">
      {/* Top Header matching Feeds.png */}
      <div className="flex items-center justify-between mb-3 max-w-2xl mx-auto">
        <div className="flex items-center gap-2">
          <TentramLogo size="sm" showText={false} />
          <h1 className="text-lg lg:text-2xl font-extrabold text-slate-900 tracking-tight">
            Aktivitas
          </h1>
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

      {/* Search Bar matching Feeds.png */}
      <div className="max-w-2xl mx-auto mb-3">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Temukan akun, komunitas, dan hal lain..."
            className="w-full pl-4 pr-11 py-2.5 bg-white border border-slate-200 rounded-full text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden shadow-2xs"
          />
          <Search className="w-4 h-4 text-blue-600 absolute right-4 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Filter Tabs matching Feeds.png (Draggable with mouse hold & swipeable with touch) */}
      <div
        ref={filterTabsDrag.ref}
        onMouseDown={filterTabsDrag.dragProps.onMouseDown}
        onClickCapture={filterTabsDrag.dragProps.onClickCapture}
        className={`max-w-2xl mx-auto mb-4 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 cursor-grab active:cursor-grabbing select-none ${
          filterTabsDrag.isDragging ? 'cursor-grabbing' : ''
        }`}
      >
        {filterTabs.map((tab) => {
          const isActive = activeFilter === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#4854FE] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Case A: Komunitas View when activeFilter === 'Komunitas' */}
      {activeFilter === 'Komunitas' ? (
        <div className="max-w-2xl mx-auto space-y-3.5">
          <span className="block text-xs font-bold text-slate-800 mb-1">
            Hasil Pencarian Komunitas
          </span>
          {communities.map((comm) => {
            const isJoined = joinedCommunities.includes(comm.id);
            return (
              <div
                key={comm.id}
                className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-2xs flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={comm.image}
                    alt={comm.name}
                    className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{comm.name}</h4>
                    <span className="text-[10px] text-slate-400 font-medium block">
                      {comm.members} • {comm.distance}
                    </span>
                    <p className="text-[11px] text-slate-600 line-clamp-1 mt-0.5">{comm.desc}</p>
                  </div>
                </div>

                <button
                  onClick={() => toggleJoinCommunity(comm.id)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex-shrink-0 ${
                    isJoined
                      ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      : 'bg-[#4854FE] hover:bg-blue-600 text-white shadow-xs'
                  }`}
                >
                  {isJoined ? 'Bergabung' : 'Gabung'}
                </button>
              </div>
            );
          })}

          {/* Bottom Community CTA banner matching Feeds.png */}
          <div className="mt-8 p-4 bg-blue-50/70 border border-blue-200 rounded-2xl flex items-center justify-between gap-3">
            <p className="text-xs text-slate-700 leading-snug">
              Ayo, tambahkan komunitas baru agar dapat mengetahui informasi perjalanan anda!
            </p>
            <button
              onClick={() => setShowAddActivityScreen(true)}
              className="px-3.5 py-1.5 bg-[#4854FE] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs whitespace-nowrap cursor-pointer"
            >
              Buat Baru +
            </button>
          </div>
        </div>
      ) : (
        /* Case B: Feeds Posts List */
        <div className="space-y-4 max-w-2xl mx-auto">
          {posts.map((post) => {
            const isCommentsOpen = expandedCommentsPostId === post.id;
            return (
              <div
                key={post.id}
                className="bg-white rounded-2xl p-4 shadow-2xs border border-slate-100"
              >
                {/* Author Header */}
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={post.avatar} size="sm" />
                    <div>
                      <h3 className="font-bold text-xs text-slate-900 leading-tight">
                        {post.author}
                      </h3>
                      <span className="text-[10px] text-slate-400 font-medium">{post.timeAgo}</span>
                    </div>
                  </div>

                  <span className="px-3 py-0.5 rounded-full text-[10px] font-semibold text-[#4F5BFF] bg-blue-50 border border-blue-200">
                    {post.tag}
                  </span>
                </div>

                {/* Content */}
                <p className="text-xs text-slate-800 leading-relaxed mb-3">{post.content}</p>

                {/* Photo */}
                {post.imageUrl && (
                  <div className="rounded-xl overflow-hidden mb-3 border border-slate-100 max-h-60">
                    <img
                      src={post.imageUrl}
                      alt="Bukti foto"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleUpvote(post.id)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border cursor-pointer ${
                        post.hasUpvoted
                          ? 'bg-blue-50 border-[#4F5BFF] text-[#4F5BFF]'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                      <span>{post.upvotes}</span>
                    </button>

                    <button
                      onClick={() => toggleComments(post.id)}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-600 cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{post.commentsCount}</span>
                    </button>

                    <button
                      onClick={() => toggleComments(post.id)}
                      className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {isCommentsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  <button
                    onClick={() => toggleComments(post.id)}
                    className="text-xs font-bold text-[#4F5BFF] hover:underline cursor-pointer"
                  >
                    Balas
                  </button>
                </div>

                {/* Comment replies */}
                {isCommentsOpen && (
                  <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
                    {post.comments?.map((c) => (
                      <div key={c.id} className="bg-slate-50 p-2.5 rounded-xl text-xs flex gap-2">
                        <Avatar name={c.avatar} size="xs" />
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="font-bold text-slate-800">{c.author}</span>
                            <span className="text-[10px] text-slate-400">{c.timeAgo}</span>
                          </div>
                          <p className="text-slate-600 leading-snug">{c.text}</p>
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="text"
                        placeholder="Tulis balasan..."
                        value={replyText[post.id] || ''}
                        onChange={(e) => setReplyText({ ...replyText, [post.id]: e.target.value })}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleAddReply(post.id);
                        }}
                        className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden"
                      />
                      <button
                        onClick={() => handleAddReply(post.id)}
                        className="p-1.5 bg-[#4F5BFF] text-white rounded-xl cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Floating Action Button (FAB) `+` in Blue on Bottom-Right (Matches Feeds.png) */}
      <div className="fixed right-5 bottom-20 md:bottom-8 z-30 pointer-events-auto">
        <button
          onClick={() => setShowAddActivityScreen(true)}
          title="Tambah Aktivitas"
          className="w-13 h-13 rounded-full bg-[#4854FE] hover:bg-blue-600 shadow-xl flex items-center justify-center text-white transition-transform active:scale-95 cursor-pointer ring-4 ring-blue-200"
        >
          <Plus className="w-6 h-6 stroke-[2.8]" />
        </button>
      </div>
    </div>
  );
};
