export type NavigationTab = 'beranda' | 'laporan' | 'lokasi' | 'aktivitas';

export interface ActivityPost {
  id: string;
  author: string;
  avatar: string;
  timeAgo: string;
  tag: 'PJU' | 'Kabel' | 'Jalan' | 'Komunitas' | 'Trotoar';
  content: string;
  imageUrl?: string;
  upvotes: number;
  commentsCount: number;
  hasUpvoted?: boolean;
  comments?: Array<{
    id: string;
    author: string;
    avatar: string;
    text: string;
    timeAgo: string;
  }>;
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  status?: string;
  coordinates?: { x: number; y: number };
}

export type ReportCategory =
  | 'penerang_rusak'
  | 'jalan_rusak'
  | 'rambu_rusak'
  | 'trotoar_rusak'
  | 'lainnya';

export interface RouteDetail {
  id: string;
  title: string;
  type: 'safe' | 'risky';
  badgeLabel: string;
  duration: string;
  distance: string;
  description: string;
  lightingScore: number; // e.g. 87%
  riskLevel: 'Rendah' | 'Sedang' | 'Tinggi';
  crowdLevel: 'Rendah' | 'Sedang' | 'Tinggi';
  estimatedArrival: string;
  departureTime: string;
  waypoints: Array<{
    title: string;
    subtitle: string;
    time: string;
    statusText?: string;
    statusType?: 'good' | 'warning' | 'info';
    badges?: string[];
  }>;
}
