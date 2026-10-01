import React, { useId } from 'react';

interface TentramLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  layout?: 'horizontal' | 'vertical';
  textClassName?: string;
}

export const TentramLogo: React.FC<TentramLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  layout = 'horizontal',
  textClassName = '',
}) => {
  const clipId = useId();

  const iconSizes = {
    sm: 'w-7 h-8.5',
    md: 'w-9 h-11',
    lg: 'w-12 h-14.5',
    xl: 'w-16 h-19.5',
  };

  const textSizes = {
    sm: 'text-base tracking-[0.14em]',
    md: 'text-lg lg:text-xl tracking-[0.15em]',
    lg: 'text-2xl tracking-[0.16em]',
    xl: 'text-3xl tracking-[0.18em]',
  };

  return (
    <div
      className={`select-none flex ${
        layout === 'vertical'
          ? 'flex-col items-center gap-2 text-center'
          : 'items-center gap-2.5'
      } ${className}`}
    >
      {/* Official Tentram Location Pin + Street Lamp (PJU) + Curved Road Logo */}
      <div className={`${iconSizes[size]} relative flex-shrink-0 flex items-center justify-center`}>
        <svg
          viewBox="0 0 100 120"
          className="w-full h-full drop-shadow-[0_2px_6px_rgba(67,43,110,0.12)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Location Pin Mask */}
            <clipPath id={clipId}>
              <path
                d="M 50 10 C 29 10 14 26 14 47 C 14 67.5 30 86.5 48.5 105 C 49.3 105.8 50.2 106 50.8 105.2 C 51.5 104.4 52.2 102.8 53 100.8 C 69 83.5 86 66 86 47 C 86 26 71 10 50 10 Z"
              />
            </clipPath>

            {/* Subtle Gradient for Pin Body */}
            <linearGradient id={`${clipId}-pin-bg`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#876CB8" />
              <stop offset="100%" stopColor="#755AA5" />
            </linearGradient>
          </defs>

          {/* Masked Pin Content */}
          <g clipPath={`url(#${clipId})`}>
            {/* 1. Pin Background Body */}
            <rect x="0" y="0" width="100" height="120" fill={`url(#${clipId}-pin-bg)`} />

            {/* 2. Conical Light Beam radiating from the street lamp to the right */}
            <polygon
              points="49.5,35 56.5,35 88,67 43,77"
              fill="#ECE6F8"
            />

            {/* 3. Curved Asphalt Road under the lamp */}
            <path
              d="M 12 73.5 Q 48 57.5 88 57 L 88 120 L 12 120 Z"
              fill="#432B6E"
            />

            {/* 4. White Center Lane Road Stripe (Perspective Curve) */}
            <path
              d="M 48.5 105 C 47 91 42.5 81 37.5 70.5 C 39.5 70.5 40.8 71 42 71.5 C 46.2 81 50.5 91.5 53 105 Z"
              fill="#FFFFFF"
            />

            {/* 5. Street Lamppost (PJU) with curved top arch */}
            <path
              d="M 44.5 77 L 44.5 35.5 C 44.5 28 48 24 53.5 24 C 55.5 24 57 25.5 57 27.5 L 57 31"
              stroke="#432B6E"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* 6. Lamppost Fixture Cap / Hood */}
            <path
              d="M 49.5 33.5 C 49.5 30.5 58 30.5 58 33.5 Z"
              fill="#432B6E"
            />

            {/* 7. Luminous Lamp Bulb underneath */}
            <path
              d="M 50.5 33.8 C 50.5 36.8 57 36.8 57 33.8 Z"
              fill="#FFFFFF"
            />
          </g>
        </svg>
      </div>

      {/* Brand Wordmark matching uploaded image typography */}
      {showText && (
        <span
          className={`font-black text-[#3E2768] font-['Plus_Jakarta_Sans',sans-serif] uppercase leading-none select-none ${textSizes[size]} ${textClassName}`}
        >
          Tentram
        </span>
      )}
    </div>
  );
};
