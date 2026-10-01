import React from 'react';

interface TentramLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const TentramLogo: React.FC<TentramLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Tentram 4-petal geometric brand icon */}
      <div className={`${iconSizes[size]} relative flex-shrink-0`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
          {/* Top-left yellow leaf */}
          <path
            d="M 50 50 C 35 50 16 35 16 20 C 16 10 28 8 36 12 C 45 18 50 35 50 50 Z"
            fill="#FBBF24"
          />
          {/* Top-right royal blue leaf */}
          <path
            d="M 50 50 C 50 35 65 16 80 16 C 90 16 92 28 88 36 C 82 45 65 50 50 50 Z"
            fill="#3B82F6"
          />
          {/* Bottom-left turquoise / teal petal */}
          <path
            d="M 50 50 C 50 65 35 84 20 84 C 10 84 8 72 12 64 C 18 55 35 50 50 50 Z"
            fill="#06B6D4"
          />
          {/* Center-bottom vibrant deep blue petal */}
          <path
            d="M 50 50 C 65 50 84 65 84 80 C 84 90 72 92 64 88 C 55 82 50 65 50 50 Z"
            fill="#2563EB"
          />
          {/* Center soft highlight */}
          <circle cx="50" cy="50" r="5" fill="#FFFFFF" fillOpacity="0.4" />
        </svg>
      </div>

      {showText && (
        <span
          className={`font-bold tracking-tight text-slate-900 ${textSizes[size]}`}
          style={{ letterSpacing: '-0.03em' }}
        >
          Tentram
        </span>
      )}
    </div>
  );
};
