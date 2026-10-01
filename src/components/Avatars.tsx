import React from 'react';

interface AvatarProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showBadge?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  size = 'md',
  className = '',
  showBadge = false,
}) => {
  const sizeMap = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
  };

  const getAvatarGraphic = (charName: string) => {
    const lower = charName.toLowerCase();

    if (lower.includes('tasya') || lower.includes('zahra')) {
      // Hijab character
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="48" fill="#F1F5F9" />
          {/* Black Hijab */}
          <path
            d="M 50 14 C 28 14 22 36 22 62 C 22 84 34 94 50 94 C 66 94 78 84 78 62 C 78 36 72 14 50 14 Z"
            fill="#1E293B"
          />
          {/* Face oval */}
          <path
            d="M 50 28 C 39 28 35 39 35 55 C 35 68 41 74 50 74 C 59 74 65 68 65 55 C 65 39 61 28 50 28 Z"
            fill="#FDDFC7"
          />
          {/* Hijab fold under chin */}
          <path d="M 43 73 C 48 76 52 76 57 73 L 53 88 L 47 88 Z" fill="#0F172A" />
          {/* Eyes */}
          <circle cx="44" cy="52" r="2.8" fill="#1E293B" />
          <circle cx="56" cy="52" r="2.8" fill="#1E293B" />
          {/* Smile */}
          <path d="M 46 62 Q 50 66 54 62" stroke="#B45309" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          {/* Hijab wrap drape on chest */}
          <path d="M 28 85 C 36 80 64 80 72 85 C 76 92 68 98 50 98 C 32 98 24 92 28 85 Z" fill="#1E293B" />
        </svg>
      );
    }

    if (lower.includes('sintia') || lower.includes('bella') || lower.includes('profile')) {
      // Girl avatar with hair bun / ponytail (like in SintiaBella12 & header)
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="48" fill="#FFFBEB" />
          {/* Hair Bun */}
          <circle cx="50" cy="22" r="14" fill="#292524" />
          {/* Shirt */}
          <path d="M 20 96 C 24 72 40 70 50 70 C 60 70 76 72 80 96 Z" fill="#F97316" />
          {/* Neck */}
          <rect x="44" y="60" width="12" height="14" fill="#FED7AA" rx="4" />
          {/* Face */}
          <circle cx="50" cy="46" r="20" fill="#FED7AA" />
          {/* Hair Front */}
          <path
            d="M 30 46 C 30 30 40 26 50 26 C 60 26 70 30 70 46 C 65 38 56 36 50 36 C 44 36 35 38 30 46 Z"
            fill="#292524"
          />
          {/* Bangs side */}
          <path d="M 31 38 C 36 44 36 54 36 54 C 33 48 31 43 31 38 Z" fill="#292524" />
          <path d="M 69 38 C 64 44 64 54 64 54 C 67 48 69 43 69 38 Z" fill="#292524" />
          {/* Eyes */}
          <circle cx="43" cy="48" r="2.5" fill="#292524" />
          <circle cx="57" cy="48" r="2.5" fill="#292524" />
          {/* Smile */}
          <path d="M 45 56 Q 50 60 55 56" stroke="#C2410C" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        </svg>
      );
    }

    if (lower.includes('rahmadi') || lower.includes('adit')) {
      // Boy avatar with dark hair & green/slate shirt
      const shirtColor = lower.includes('rahmadi') ? '#10B981' : '#3B82F6';
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="48" fill="#F0FDF4" />
          {/* Hair back */}
          <path d="M 30 44 C 30 24 70 24 70 44 Z" fill="#1C1917" />
          {/* Shoulders / Shirt */}
          <path d="M 22 96 C 26 74 38 72 50 72 C 62 72 74 74 78 96 Z" fill={shirtColor} />
          {/* Collar */}
          <path d="M 44 72 L 50 80 L 56 72 Z" fill="#FFFFFF" opacity="0.8" />
          {/* Neck */}
          <rect x="44" y="58" width="12" height="16" fill="#FDBA74" rx="4" />
          {/* Face */}
          <circle cx="50" cy="46" r="20" fill="#FED7AA" />
          {/* Hair styled */}
          <path
            d="M 28 42 C 28 22 45 18 58 20 C 70 22 72 32 72 42 C 67 33 60 30 50 30 C 40 30 33 34 28 42 Z"
            fill="#1C1917"
          />
          {/* Eyes */}
          <circle cx="43" cy="46" r="2.5" fill="#1C1917" />
          <circle cx="57" cy="46" r="2.5" fill="#1C1917" />
          {/* Cheerful Smile */}
          <path d="M 44 55 Q 50 61 56 55" stroke="#C2410C" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        </svg>
      );
    }

    // Default: Aulia / boy in red shirt (matching Aulia in Shareloc_laptop.png)
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="48" fill="#FEF2F2" />
        {/* Hair */}
        <path d="M 28 40 C 28 20 72 20 72 40 Z" fill="#292524" />
        {/* Red Shirt */}
        <path d="M 20 96 C 24 74 38 72 50 72 C 62 72 76 74 80 96 Z" fill="#EF4444" />
        {/* Neck */}
        <rect x="44" y="58" width="12" height="16" fill="#FDBA74" rx="4" />
        {/* Face */}
        <circle cx="50" cy="45" r="20" fill="#FED7AA" />
        {/* Front Hair Cut */}
        <path
          d="M 28 38 C 28 22 48 18 64 22 C 72 25 72 36 72 38 C 65 32 58 30 50 30 C 40 30 33 34 28 38 Z"
          fill="#292524"
        />
        {/* Eyes */}
        <circle cx="43" cy="45" r="2.5" fill="#292524" />
        <circle cx="57" cy="45" r="2.5" fill="#292524" />
        {/* Smile */}
        <path d="M 45 54 Q 50 59 55 54" stroke="#B45309" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      </svg>
    );
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full overflow-hidden flex-shrink-0 shadow-xs ring-1 ring-slate-200/60 ${sizeMap[size]} ${className}`}
    >
      {getAvatarGraphic(name)}
      {showBadge && (
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
      )}
    </div>
  );
};
