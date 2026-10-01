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
    'Semua' | 'Komunitas' | 'PJU' | 'Kabel' | 'Jalan'
  >('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddActivityScreen, setShowAddActivityScreen] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [expandedCommentsPostId, setExpandedCommentsPostId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<{ [postId: string]: string }>({});

  // New post form fields
  const [newContent, setNewContent] = useState('');
  const [newTag, setNewTag] = useState<'PJU' | 'Kabel' | 'Jalan' | 'Lainnya'>('PJU');
  const [newPhotoPreview, setNewPhotoPreview] = useState<string | null>(
    'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=600&q=80'
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

  // Feed posts exactly matching Aktivitas_laptop.png
  const [posts, setPosts] = useState<ActivityPost[]>([
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
      upvotes: 15,
      commentsCount: 2,
      hasUpvoted: false,
      comments: [],
    },
  ]);

  const filterTabs: Array<'Semua' | 'Komunitas' | 'PJU' | 'Kabel' | 'Jalan'> = [
    'Semua',
    'Komunitas',
    'PJU',
    'Kabel',
    'Jalan',
  ];

  const handleUpvote = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const nextVoted = !post.hasUpvoted;
          return {
            ...post,
            hasUpvoted: nextVoted,
            upvotes: nextVoted ? post.upvotes + 1 : post.upvotes - 1,
          };
        }
        return post;
      })
    );
  };

  const toggleComments = (postId: string) => {
    setExpandedCommentsPostId((prev) => (prev === postId ? null : postId));
  };

  const handleAddReply = (postId: string) => {
    const text = replyText[postId];
    if (!text || !text.trim()) return;

    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            commentsCount: post.commentsCount + 1,
            comments: [
              ...(post.comments || []),
              {
                id: `c_${Date.now()}`,
                author: 'Ainun Nafisa (Anda)',
                avatar: 'Profile',
                text: text.trim(),
                timeAgo: 'Baru saja',
              },
            ],
          };
        }
        return post;
      })
    );

    setReplyText((prev) => ({ ...prev, [postId]: '' }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setNewPhotoPreview(url);
    }
  };

  const handlePublishPost = () => {
    if (!newContent.trim()) return;

    const newPostItem: ActivityPost = {
      id: `p_${Date.now()}`,
      author: 'Ainun Nafisa (Anda)',
      avatar: 'Profile',
      timeAgo: 'Baru Saja',
      tag: newTag,
      content: newContent,
      imageUrl: newPhotoPreview || undefined,
      upvotes: 0,
      commentsCount: 0,
      hasUpvoted: false,
      comments: [],
    };

    setPosts([newPostItem, ...posts]);
    setNewContent('');
    setShowAddActivityScreen(false);
    setShowSuccessScreen(true);
  };

  const toggleJoinCommunity = (commId: string) => {
    setJoinedCommunities((prev) =>
      prev.includes(commId) ? prev.filter((id) => id !== commId) : [...prev, commId]
    );
  };

  const filteredPosts = posts.filter((post) => {
    if (activeFilter === 'Semua') {
      if (searchQuery.trim()) {
        return (
          post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.author.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      return true;
    }
    if (activeFilter === 'Komunitas') return true;
    if (activeFilter === 'PJU') return post.tag === 'PJU';
    if (activeFilter === 'Kabel') return post.tag === 'Kabel';
    if (activeFilter === 'Jalan') return post.tag === 'Jalan' || post.tag === 'Kabel';
    return true;
  });

  // Screen 1: Add New Activity Screen
  if (showAddActivityScreen) {
    return (
      <div className="flex-1 bg-white min-h-screen overflow-y-auto no-scrollbar p-4 sm:p-8 max-w-xl mx-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddActivityScreen(false)}
              className="p-1 text-slate-600 hover:bg-slate-100 rounded-full cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-base font-bold text-slate-900">Tambah Aktivitas</h1>
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <Avatar name="Profile" size="md" />
            <div>
              <span className="font-bold text-xs text-slate-900 block">Ainun Nafisa</span>
              <span className="text-[10px] text-slate-400">Posting ke Aktivitas Publik</span>
            </div>
          </div>

          <div>
            <textarea
              rows={4}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Bagikan situasi perjalanan, kondisi jalan, atau informasi penting lainnya..."
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden"
            />
          </div>

          <div>
            <span className="block text-xs font-bold text-slate-900 mb-2">Pilih Tagar Terkait</span>
            <div className="flex flex-wrap gap-2">
              {(['PJU', 'Kabel', 'Jalan', 'Lainnya'] as const).map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setNewTag(tag)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                    newTag === tag
                      ? 'bg-[#4854FE] text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="block text-xs font-bold text-slate-900 mb-2">Lampirkan Foto</span>
            {newPhotoPreview ? (
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 h-44 group">
                <img
                  src={newPhotoPreview}
                  alt="Pratinjau Foto"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setNewPhotoPreview(null)}
                  className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 rounded-full text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 rounded-2xl hover:border-blue-400 bg-slate-50/50 cursor-pointer">
                <Camera className="w-6 h-6 text-slate-400 mb-2" />
                <span className="text-xs text-slate-600 font-medium">Unggah Foto Pendukung</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <div className="pt-4">
            <button
              onClick={handlePublishPost}
              disabled={!newContent.trim()}
              className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                newContent.trim()
                  ? 'bg-[#4854FE] hover:bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>Kirim Postingan</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Screen 2: Success Modal Screen
  if (showSuccessScreen) {
    return (
      <div className="flex-1 bg-white min-h-screen flex items-center justify-center p-6">
        <div className="max-w-sm w-full text-center">
          <div className="w-16 h-16 bg-blue-50 text-[#4854FE] rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-1">Postingan Terkirim!</h2>
          <p className="text-xs text-slate-500 mb-6">
            Terima kasih atas kontribusi Anda dalam menjaga keamanan perjalanan bersama.
          </p>
          <button
            onClick={() => setShowSuccessScreen(false)}
            className="w-full py-2.5 bg-[#4854FE] hover:bg-blue-600 text-white rounded-xl font-bold text-xs cursor-pointer shadow-xs"
          >
            Kembali ke Aktivitas
          </button>
        </div>
      </div>
    );
  }

  // Default Feeds View matching Aktivitas_laptop.png
  return (
    <div className="flex-1 bg-[#F8FAFF] min-h-screen overflow-y-auto no-scrollbar px-5 sm:px-8 lg:px-12 py-6 lg:py-8 relative">
      {/* Top Header Row matching Aktivitas_laptop.png */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        {/* Title */}
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Aktivitas
        </h1>

        {/* Right Section: Search Bar & Tambah Postingan Button */}
        <div className="flex items-center gap-3">
          {/* Search bar */}
          <div className="relative w-full sm:w-80 lg:w-96">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tambahkan akun, komunitas, atau aktivitas.."
              className="w-full pl-4 pr-10 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden shadow-2xs"
            />
            <Search className="w-4 h-4 text-[#4854FE] absolute right-3.5 top-1/2 -translate-y-1/2 stroke-[2.2]" />
          </div>

          {/* Tambah Postingan + Button */}
          <button
            onClick={() => setShowAddActivityScreen(true)}
            className="bg-[#4854FE] hover:bg-[#3D47E0] text-white font-semibold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-2xs whitespace-nowrap cursor-pointer transition-colors"
          >
            <span>Tambah Postingan</span>
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Filter Tabs matching Aktivitas_laptop.png */}
      <div
        ref={filterTabsDrag.ref}
        onMouseDown={filterTabsDrag.dragProps.onMouseDown}
        onClickCapture={filterTabsDrag.dragProps.onClickCapture}
        className={`flex items-center gap-2 overflow-x-auto no-scrollbar mb-6 pb-1 select-none cursor-grab active:cursor-grabbing ${
          filterTabsDrag.isDragging ? 'cursor-grabbing' : ''
        }`}
      >
        {filterTabs.map((tab) => {
          const isActive = activeFilter === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'border border-blue-500 bg-blue-50/70 text-[#4854FE] shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Main Feeds Content Area */}
      {activeFilter === 'Komunitas' ? (
        <div className="max-w-2xl space-y-3.5">
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
        </div>
      ) : (
        /* Case B: Feeds Posts List matching Aktivitas_laptop.png */
        <div className="space-y-4 max-w-2xl">
          {filteredPosts.map((post) => {
            const isCommentsOpen = expandedCommentsPostId === post.id;
            return (
              <div
                key={post.id}
                className="bg-white rounded-2xl p-5 shadow-2xs border border-slate-200/80"
              >
                {/* Author Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={post.avatar} size="sm" />
                    <div>
                      <h3 className="font-bold text-xs text-slate-900 leading-tight">
                        {post.author}
                      </h3>
                      <span className="text-[10px] text-slate-400 font-medium">{post.timeAgo}</span>
                    </div>
                  </div>

                  <span className="px-3 py-0.5 rounded-full text-[11px] font-semibold text-[#4F5BFF] bg-blue-50/50 border border-blue-200">
                    {post.tag}
                  </span>
                </div>

                {/* Content */}
                <p className="text-xs text-slate-800 leading-relaxed mb-3 font-medium">
                  {post.content}
                </p>

                {/* Photo matching Aktivitas_laptop.png */}
                {post.imageUrl && (
                  <div className="rounded-xl overflow-hidden mb-4 border border-slate-100 w-52 sm:w-60 h-36">
                    <img
                      src={post.imageUrl}
                      alt="Bukti foto"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Actions Bottom Bar */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    {/* Upvote Pill */}
                    <button
                      onClick={() => handleUpvote(post.id)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold border cursor-pointer transition-colors ${
                        post.hasUpvoted
                          ? 'bg-blue-50 border-[#4F5BFF] text-[#4F5BFF]'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <ArrowUp className="w-3.5 h-3.5 stroke-[2.2]" />
                      <span>{post.upvotes}</span>
                    </button>

                    {/* Comments Count Pill */}
                    <button
                      onClick={() => toggleComments(post.id)}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 stroke-[2.2]" />
                      <span>{post.commentsCount}</span>
                    </button>

                    {/* Chevron Toggle */}
                    <button
                      onClick={() => toggleComments(post.id)}
                      className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {isCommentsOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Balas Link */}
                  <button
                    onClick={() => toggleComments(post.id)}
                    className="text-xs font-bold text-[#4854FE] hover:underline cursor-pointer"
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
    </div>
  );
};
