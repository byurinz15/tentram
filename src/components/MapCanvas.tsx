import React, { useState, useRef, useEffect } from 'react';
import {
  Plus,
  Minus,
  Crosshair,
  Compass,
  MapPin,
  CircleDot,
  CheckCircle2,
} from 'lucide-react';
import { Avatar } from './Avatars';
import { Friend } from '../types';

export interface LocationPoint {
  name: string;
  x: number;
  y: number;
}

interface MapCanvasProps {
  originPoint?: LocationPoint | null;
  destinationPoint?: LocationPoint | null;
  activeSelectionStep?: 'origin' | 'destination';
  isRoutePlannerOpen?: boolean;
  showRoute?: boolean;
  activeRouteType?: 'safe' | 'risky';
  onSelectRoute?: (type: 'safe' | 'risky') => void;
  isSharingLocation?: boolean;
  sharedFriends?: Friend[];
  onSelectLocationPoint?: (point: LocationPoint) => void;
  className?: string;
  isNavigating?: boolean;
}

export const MapCanvas: React.FC<MapCanvasProps> = ({
  originPoint = null,
  destinationPoint = null,
  activeSelectionStep = 'origin',
  isRoutePlannerOpen = false,
  showRoute = false,
  activeRouteType = 'risky',
  onSelectRoute,
  isSharingLocation = false,
  sharedFriends = [],
  onSelectLocationPoint,
  className = '',
  isNavigating = false,
}) => {
  // Pan and Zoom states for Google Maps-like dragging
  const [zoomLevel, setZoomLevel] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ startX: number; startY: number; initialPanX: number; initialPanY: number }>({
    startX: 0,
    startY: 0,
    initialPanX: 0,
    initialPanY: 0,
  });
  const hasMovedRef = useRef(false);

  // Mouse drag handlers with window-level tracking
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    hasMovedRef.current = false;
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialPanX: pan.x,
      initialPanY: pan.y,
    };
  };

  useEffect(() => {
    if (!isDragging) return;

    const onWindowMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - dragStartRef.current.startX;
      const dy = e.clientY - dragStartRef.current.startY;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        hasMovedRef.current = true;
      }
      const maxPan = 600 * zoomLevel;
      const newX = Math.max(-maxPan, Math.min(maxPan, dragStartRef.current.initialPanX + dx));
      const newY = Math.max(-maxPan, Math.min(maxPan, dragStartRef.current.initialPanY + dy));
      setPan({ x: newX, y: newY });
    };

    const onWindowMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', onWindowMouseMove);
    window.addEventListener('mouseup', onWindowMouseUp);
    return () => {
      window.removeEventListener('mousemove', onWindowMouseMove);
      window.removeEventListener('mouseup', onWindowMouseUp);
    };
  }, [isDragging, zoomLevel]);

  // Touch drag handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      hasMovedRef.current = false;
      dragStartRef.current = {
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
        initialPanX: pan.x,
        initialPanY: pan.y,
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - dragStartRef.current.startX;
    const dy = e.touches[0].clientY - dragStartRef.current.startY;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      hasMovedRef.current = true;
    }
    const maxPan = 600 * zoomLevel;
    const newX = Math.max(-maxPan, Math.min(maxPan, dragStartRef.current.initialPanX + dx));
    const newY = Math.max(-maxPan, Math.min(maxPan, dragStartRef.current.initialPanY + dy));
    setPan({ x: newX, y: newY });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.15 : 0.88;
    setZoomLevel((prev) => Math.min(Math.max(prev * zoomFactor, 0.7), 2.5));
  };

  const resetView = () => {
    setPan({ x: 0, y: 0 });
    setZoomLevel(1);
  };

  // Landmark places with coordinates in SVG viewBox (1200 x 800)
  const landmarks: LocationPoint[] = [
    { name: 'Mayora Group Headquarters', x: 310, y: 120 },
    { name: "Masjid Raya KH. Hasyim Asy'ari Jakarta", x: 520, y: 135 },
    { name: 'Cove West Vista - Apartemen Cengkareng', x: 780, y: 110 },
    { name: 'Taman Kosambi', x: 560, y: 270 },
    { name: 'Klinik Tentram Medika', x: 580, y: 340 },
    { name: 'Willy Soemantri Music School Permata Buana', x: 820, y: 320 },
    { name: 'PULITO LAUNDRY PURI', x: 700, y: 430 },
    { name: 'Poris Indah', x: 250, y: 390 },
    { name: 'La Vela', x: 430, y: 540 },
    { name: 'Mandaya Royal Hospital Puri', x: 560, y: 640 },
    { name: 'Puri Indah Mall', x: 740, y: 540 },
    { name: 'CROCS LIPPO MALL', x: 850, y: 550 },
    { name: 'Situ Cipondoh', x: 200, y: 630 },
    { name: 'Institut Teknologi PLN', x: 920, y: 200 },
    { name: 'Jl. Merdeka No. 123, Tangerang', x: 270, y: 590 },
  ];

  // Dynamic route calculation between origin and destination
  const getRoutePaths = () => {
    if (!originPoint || !destinationPoint) return { safe: '', risky: '' };
    const ox = originPoint.x;
    const oy = originPoint.y;
    const dx = destinationPoint.x;
    const dy = destinationPoint.y;

    const mx = (ox + dx) / 2;
    const my = (oy + dy) / 2;

    // Safe route has wider detour for well-lit avenues
    const safeC1x = ox + (dx - ox) * 0.25 - 60;
    const safeC1y = oy + (dy - oy) * 0.25 - 80;
    const safeC2x = ox + (dx - ox) * 0.75 + 40;
    const safeC2y = oy + (dy - oy) * 0.75 - 70;
    const safePath = `M ${ox} ${oy} C ${safeC1x} ${safeC1y} ${safeC2x} ${safeC2y} ${dx} ${dy}`;

    // Risky route is more direct with slight bend
    const riskyC1x = ox + (dx - ox) * 0.35 + 30;
    const riskyC1y = oy + (dy - oy) * 0.35 + 40;
    const riskyC2x = ox + (dx - ox) * 0.7 - 20;
    const riskyC2y = oy + (dy - oy) * 0.7 + 30;
    const riskyPath = `M ${ox} ${oy} C ${riskyC1x} ${riskyC1y} ${riskyC2x} ${riskyC2y} ${dx} ${dy}`;

    return { safe: safePath, risky: riskyPath };
  };

  const { safe: safeRoutePath, risky: riskyRoutePath } = getRoutePaths();

  // User position on map for Shareloc view
  const userPos = { x: 450, y: 500 };
  const friendPositions = [
    { friendId: 'f1', name: 'Aulia', x: 310, y: 420 },
    { friendId: 'f2', name: 'Tasya', x: 670, y: 410 },
  ];

  const handleLandmarkClick = (landmark: LocationPoint, e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasMovedRef.current) return;
    if (onSelectLocationPoint) {
      onSelectLocationPoint(landmark);
    }
  };

  const handleSvgMapClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (hasMovedRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 1200;
    const clickY = ((e.clientY - rect.top) / rect.height) * 800;

    // Pick closest street name or generate custom point
    if (onSelectLocationPoint) {
      const nearest = landmarks.reduce((prev, curr) => {
        const dPrev = Math.hypot(prev.x - clickX, prev.y - clickY);
        const dCurr = Math.hypot(curr.x - clickX, curr.y - clickY);
        return dCurr < dPrev ? curr : prev;
      });

      if (Math.hypot(nearest.x - clickX, nearest.y - clickY) < 60) {
        onSelectLocationPoint(nearest);
      } else {
        onSelectLocationPoint({
          name: `Titik Peta (${Math.round(clickX)}, ${Math.round(clickY)})`,
          x: Math.round(clickX),
          y: Math.round(clickY),
        });
      }
    }
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
      className={`relative w-full h-full bg-[#f3f7fb] overflow-hidden select-none touch-none ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      } ${className}`}
      style={{
        backgroundImage: `
          radial-gradient(#d3e1ee 1.3px, transparent 1.3px),
          radial-gradient(#d3e1ee 1.3px, #f4f8fc 1.3px)
        `,
        backgroundSize: '24px 24px',
        backgroundPosition: `${pan.x % 24}px ${pan.y % 24}px`,
      }}
    >
      {/* Draggable & Scalable Map Layer */}
      <div
        className="w-full h-full origin-center transition-transform duration-75 ease-out pointer-events-none"
        style={{
          transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoomLevel})`,
        }}
      >
        <svg
          viewBox="0 0 1200 800"
          onClick={handleSvgMapClick}
          className="w-full h-full min-w-[1200px] min-h-[800px] pointer-events-auto"
        >
          <defs>
            {/* Water gradient */}
            <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C4E0FA" />
              <stop offset="100%" stopColor="#A8D4F9" />
            </linearGradient>

            {/* Green park gradient */}
            <linearGradient id="parkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E2F5E9" />
              <stop offset="100%" stopColor="#D2EFDC" />
            </linearGradient>

            {/* Glowing route filters */}
            <filter id="glow-orange" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#F97316" floodOpacity="0.5" />
            </filter>
            <filter id="glow-green" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#10B981" floodOpacity="0.5" />
            </filter>
            <filter id="radar-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#3B82F6" floodOpacity="0.6" />
            </filter>
          </defs>

          {/* 1. Parks and Green Reserves */}
          <path
            d="M 500 220 C 550 210 630 230 620 310 C 590 330 520 320 500 280 Z"
            fill="url(#parkGrad)"
            stroke="#C2E6CE"
            strokeWidth="1.5"
          />
          <path
            d="M 760 260 C 840 250 890 300 870 350 C 810 370 760 340 760 260 Z"
            fill="url(#parkGrad)"
            stroke="#C2E6CE"
            strokeWidth="1.5"
          />
          <path
            d="M 120 100 C 180 80 220 130 190 180 C 140 200 100 160 120 100 Z"
            fill="url(#parkGrad)"
            stroke="#C2E6CE"
            strokeWidth="1.5"
          />

          {/* 2. Water Bodies (Situ Cipondoh & Angke River streams) */}
          <path
            d="M 90 600 C 150 570 240 610 270 680 C 240 760 130 770 80 720 C 60 670 70 620 90 600 Z"
            fill="url(#waterGrad)"
            stroke="#8FC6F5"
            strokeWidth="2"
          />
          <path
            d="M 170 10 C 200 160 230 290 240 420 C 260 520 290 640 320 790"
            stroke="#BEE0F9"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 780 10 C 760 180 750 350 770 490 C 790 610 830 700 860 790"
            stroke="#BEE0F9"
            strokeWidth="9"
            fill="none"
            strokeLinecap="round"
          />

          {/* 3. Base Secondary Roads Network with fill="none" */}
          <g stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M 0 150 L 1200 170" strokeWidth="7" />
            <path d="M 0 320 L 1200 320" strokeWidth="7" />
            <path d="M 0 470 L 1200 470" strokeWidth="7" />
            <path d="M 0 620 L 1200 620" strokeWidth="8" />

            <path d="M 370 20 L 380 780" strokeWidth="7" />
            <path d="M 610 20 L 600 780" strokeWidth="8" />
            <path d="M 880 20 L 870 780" strokeWidth="7" />
            <path d="M 1060 20 L 1050 780" strokeWidth="7" />

            <path d="M 130 720 Q 390 560 620 460 T 1140 250" strokeWidth="6" />
            <path d="M 260 120 Q 450 350 780 430 T 1190 520" strokeWidth="6" />
            <path d="M 190 550 Q 450 450 710 570" strokeWidth="6" />
          </g>

          {/* Road Borders */}
          <g stroke="#D4DFE8" strokeLinecap="round" strokeWidth="1" fill="none">
            <path d="M 0 150 L 1200 170" />
            <path d="M 0 320 L 1200 320" />
            <path d="M 0 470 L 1200 470" />
            <path d="M 0 620 L 1200 620" />
          </g>

          {/* 4. Major Highways (Tol Jakarta-Merak / JORR) */}
          <path
            d="M 20 400 C 280 390 530 440 790 490 C 980 520 1100 570 1190 600"
            stroke="#F8E3A1"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 20 400 C 280 390 530 440 790 490 C 980 520 1100 570 1190 600"
            stroke="#E8BC50"
            strokeWidth="1.4"
            fill="none"
            strokeDasharray="8 6"
          />

          {/* Outer Ring Road */}
          <path
            d="M 940 10 C 950 200 960 450 970 790"
            stroke="#F6D38B"
            strokeWidth="11"
            fill="none"
            strokeLinecap="round"
          />

          {/* 5. Railway tracks */}
          <path
            d="M 20 360 Q 320 350 640 350 T 1190 340"
            stroke="#94A3B8"
            strokeWidth="4"
            fill="none"
            strokeDasharray="7 5"
          />

          {/* 6. Provincial Boundary Dashed Line */}
          <path
            d="M 370 20 Q 380 350 290 600 T 230 790"
            stroke="#64748B"
            strokeWidth="2"
            strokeDasharray="8 6 2 6"
            fill="none"
          />
          <text
            x="310"
            y="320"
            transform="rotate(65 310 320)"
            fill="#64748B"
            fontSize="11"
            fontWeight="bold"
            letterSpacing="2"
            opacity="0.85"
          >
            DAERAH KHUSUS IBUKOTA JAKARTA
          </text>
          <text
            x="240"
            y="390"
            transform="rotate(65 240 390)"
            fill="#64748B"
            fontSize="11"
            fontWeight="bold"
            letterSpacing="2"
            opacity="0.85"
          >
            BANTEN
          </text>

          {/* 7. Street Labels */}
          <text x="730" y="200" transform="rotate(80 730 200)" fill="#94A3B8" fontSize="9" fontWeight="600">
            Jl. Kembangan Baru
          </text>
          <text x="640" y="590" fill="#94A3B8" fontSize="9" fontWeight="600">
            Jl. Raya Kresek
          </text>
          <text x="170" y="700" fill="#94A3B8" fontSize="9" fontWeight="600">
            Jl. Irigasi Sipon
          </text>
          <text x="990" y="670" fill="#94A3B8" fontSize="9" fontWeight="600">
            Jl. Puri Indah Raya
          </text>

          {/* 8. Routes Display (Only when BOTH origin and destination exist and showRoute is true) */}
          {showRoute && originPoint && destinationPoint && (
            <g>
              {/* Safe Route (Green) */}
              <path
                d={safeRoutePath}
                stroke="#10B981"
                strokeWidth={activeRouteType === 'safe' ? 8 : 4}
                strokeOpacity={activeRouteType === 'safe' ? 0.95 : 0.4}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter={activeRouteType === 'safe' ? 'url(#glow-green)' : undefined}
                className="cursor-pointer transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!hasMovedRef.current && onSelectRoute) onSelectRoute('safe');
                }}
              />

              {/* Risky Route (Orange) */}
              <path
                d={riskyRoutePath}
                stroke="#F97316"
                strokeWidth={activeRouteType === 'risky' ? 8 : 4}
                strokeOpacity={activeRouteType === 'risky' ? 0.95 : 0.4}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter={activeRouteType === 'risky' ? 'url(#glow-orange)' : undefined}
                className="cursor-pointer transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!hasMovedRef.current && onSelectRoute) onSelectRoute('risky');
                }}
              />

              {/* Animated vehicle/marker if navigating */}
              {isNavigating && (
                <circle
                  cx={(originPoint.x + destinationPoint.x) / 2}
                  cy={(originPoint.y + destinationPoint.y) / 2}
                  r="10"
                  fill="#2563EB"
                  stroke="#FFFFFF"
                  strokeWidth="3.5"
                  className="animate-pulse shadow-lg"
                />
              )}
            </g>
          )}

          {/* Origin Marker (Lokasi Awal) */}
          {originPoint && (
            <g
              transform={`translate(${originPoint.x}, ${originPoint.y})`}
              className="transition-transform duration-200"
            >
              {/* Outer pulsing ring */}
              <circle cx="0" cy="0" r="22" fill="#3B82F6" fillOpacity="0.2" className="animate-ping" />
              <circle cx="0" cy="0" r="14" fill="#2563EB" stroke="#FFFFFF" strokeWidth="3" />
              <circle cx="0" cy="0" r="5" fill="#FFFFFF" />

              {/* Origin badge text */}
              <rect
                x="-36"
                y="-38"
                width="72"
                height="22"
                rx="11"
                fill="#1E293B"
                className="drop-shadow-md"
              />
              <text
                x="0"
                y="-24"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="10"
                fontWeight="bold"
              >
                ● Awal
              </text>
            </g>
          )}

          {/* Destination Marker (Lokasi Akhir) */}
          {destinationPoint && (
            <g
              transform={`translate(${destinationPoint.x}, ${destinationPoint.y})`}
              className="transition-transform duration-200"
            >
              {/* Outer pulsing ring */}
              <circle cx="0" cy="0" r="22" fill="#EF4444" fillOpacity="0.2" className="animate-ping" />
              <circle cx="0" cy="0" r="15" fill="#DC2626" stroke="#FFFFFF" strokeWidth="3" />
              <text x="0" y="5" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="bold">
                H
              </text>

              {/* Destination badge text */}
              <rect
                x="-40"
                y="-38"
                width="80"
                height="22"
                rx="11"
                fill="#DC2626"
                className="drop-shadow-md"
              />
              <text
                x="0"
                y="-24"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="10"
                fontWeight="bold"
              >
                📍 Tujuan
              </text>
            </g>
          )}

          {/* Share Location Radar Lines */}
          {isSharingLocation && (
            <g>
              <circle
                cx={userPos.x}
                cy={userPos.y}
                r="45"
                fill="#3B82F6"
                fillOpacity="0.08"
                stroke="#3B82F6"
                strokeOpacity="0.3"
                strokeWidth="1.5"
              />
              <circle
                cx={userPos.x}
                cy={userPos.y}
                r="90"
                fill="#3B82F6"
                fillOpacity="0.04"
                stroke="#3B82F6"
                strokeOpacity="0.2"
                strokeDasharray="4 4"
                strokeWidth="1.2"
              />

              <path
                d={`M ${userPos.x} ${userPos.y} Q 370 470 ${friendPositions[0].x} ${friendPositions[0].y}`}
                stroke="#4F46E5"
                strokeWidth="2.5"
                strokeDasharray="6 5"
                fill="none"
                filter="url(#radar-glow)"
              />
              <path
                d={`M ${userPos.x} ${userPos.y} Q 550 450 ${friendPositions[1].x} ${friendPositions[1].y}`}
                stroke="#4F46E5"
                strokeWidth="2.5"
                strokeDasharray="6 5"
                fill="none"
                filter="url(#radar-glow)"
              />

              <g transform={`translate(${friendPositions[0].x - 18}, ${friendPositions[0].y - 20})`}>
                <circle cx="18" cy="20" r="22" fill="#FFFFFF" stroke="#EF4444" strokeWidth="2.5" />
                <foreignObject x="0" y="2" width="36" height="36">
                  <Avatar name="Aulia" size="sm" />
                </foreignObject>
              </g>

              <g transform={`translate(${friendPositions[1].x - 18}, ${friendPositions[1].y - 20})`}>
                <circle cx="18" cy="20" r="22" fill="#FFFFFF" stroke="#3B82F6" strokeWidth="2.5" />
                <foreignObject x="0" y="2" width="36" height="36">
                  <Avatar name="Tasya" size="sm" />
                </foreignObject>
              </g>

              <g transform={`translate(${userPos.x - 20}, ${userPos.y - 22})`}>
                <circle cx="20" cy="22" r="25" fill="#FFFFFF" stroke="#3B82F6" strokeWidth="3" />
                <foreignObject x="0" y="2" width="40" height="40">
                  <Avatar name="Profile" size="md" />
                </foreignObject>
              </g>
            </g>
          )}

          {/* Landmark POIs */}
          {!isSharingLocation &&
            landmarks.map((poi) => {
              const isOrigin = originPoint?.name === poi.name;
              const isDestination = destinationPoint?.name === poi.name;

              return (
                <g
                  key={poi.name}
                  transform={`translate(${poi.x}, ${poi.y})`}
                  className="cursor-pointer group"
                  onClick={(e) => handleLandmarkClick(poi, e)}
                >
                  {/* Pin Badge Circle */}
                  <circle
                    cx="0"
                    cy="0"
                    r={isOrigin || isDestination ? 16 : 13}
                    fill={isOrigin ? '#2563EB' : isDestination ? '#DC2626' : '#FFFFFF'}
                    stroke={isOrigin ? '#93C5FD' : isDestination ? '#FCA5A5' : '#475569'}
                    strokeWidth={isOrigin || isDestination ? 3 : 2}
                    className="group-hover:scale-125 transition-transform duration-200 shadow-sm"
                  />

                  {/* Inner Icon */}
                  {isOrigin ? (
                    <circle cx="0" cy="0" r="4.5" fill="#FFFFFF" />
                  ) : isDestination ? (
                    <text x="0" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">
                      H
                    </text>
                  ) : (
                    <circle cx="0" cy="0" r="4" fill="#475569" />
                  )}

                  {/* Place Label */}
                  <text
                    x="18"
                    y="2"
                    fill={isOrigin ? '#2563EB' : isDestination ? '#DC2626' : '#1E293B'}
                    fontSize="11"
                    fontWeight="700"
                    className="drop-shadow-[0_1px_2px_rgba(255,255,255,0.95)] group-hover:fill-blue-600 transition-colors"
                  >
                    {poi.name}
                  </text>
                </g>
              );
            })}
        </svg>
      </div>

      {/* Interactive Step Guide Banner on Top-Left of Map */}
      {isRoutePlannerOpen && (
        <div className="absolute top-4 left-4 z-20 pointer-events-auto animate-in fade-in slide-in-from-top-2 duration-150">
          {!originPoint ? (
            <div className="flex items-center gap-2 px-3.5 py-2 bg-[#008985] text-white rounded-xl shadow-md text-xs font-semibold">
              <CircleDot className="w-4 h-4" />
              <span>Langkah 1: Klik titik di peta untuk memilih Titik Awal</span>
            </div>
          ) : !destinationPoint ? (
            <div className="flex items-center gap-2 px-3.5 py-2 bg-amber-500 text-white rounded-xl shadow-md text-xs font-semibold">
              <MapPin className="w-4 h-4" />
              <span>Langkah 2: Klik titik di peta untuk memilih Titik Tujuan</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3.5 py-2 bg-emerald-600 text-white rounded-xl shadow-md text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Rute Ditemukan: {originPoint.name} → {destinationPoint.name}</span>
            </div>
          )}
        </div>
      )}

      {/* Floating Google Maps-Style Control Panel */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl shadow-md border border-slate-200/90 pointer-events-auto">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setZoomLevel((z) => Math.min(z + 0.25, 2.5));
          }}
          title="Perbesar (Zoom In)"
          className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setZoomLevel((z) => Math.max(z - 0.25, 0.7));
          }}
          title="Perkecil (Zoom Out)"
          className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
        >
          <Minus className="w-4 h-4" />
        </button>
        <div className="h-px bg-slate-200 mx-1" />
        <button
          onClick={(e) => {
            e.stopPropagation();
            resetView();
          }}
          title="Pusatkan Kembali (Recenter)"
          className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-blue-50 text-[#4F5BFF] transition-colors cursor-pointer"
        >
          <Crosshair className="w-4 h-4" />
        </button>
      </div>

      {/* Small drag hint badge on bottom left of map */}
      <div className="absolute bottom-3 left-4 z-10 hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-white/80 backdrop-blur-xs rounded-full border border-slate-200/80 text-[10px] text-slate-500 shadow-2xs pointer-events-none">
        <Compass className="w-3 h-3 text-[#4F5BFF]" />
        <span>Geser untuk memindahkan peta (drag & pan)</span>
      </div>
    </div>
  );
};
