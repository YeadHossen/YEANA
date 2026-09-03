import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  subtext?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  subtext = true
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10 md:w-11 md:h-11',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20'
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Visual Logo Emblem */}
      <div className={`relative ${sizeMap[size]} shrink-0 rounded-2xl p-0.5 bg-gradient-to-tr from-emerald-600 via-teal-500 to-amber-400 shadow-md shadow-emerald-950/20 group-hover:scale-105 group-hover:shadow-glow-emerald transition-all duration-300`}>
        <div className="w-full h-full rounded-[14px] bg-slate-950 overflow-hidden flex items-center justify-center relative">
          <svg 
            viewBox="0 0 512 512" 
            className="w-full h-full object-cover"
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="blBg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#022c22"/>
                <stop offset="50%" stopColor="#064e3b"/>
                <stop offset="100%" stopColor="#0f766e"/>
              </linearGradient>
              <linearGradient id="blGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a"/>
                <stop offset="50%" stopColor="#f59e0b"/>
                <stop offset="100%" stopColor="#d97706"/>
              </linearGradient>
              <linearGradient id="blSun" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ea580c"/>
                <stop offset="100%" stopColor="#fbbf24"/>
              </linearGradient>
              <linearGradient id="blRiver" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8"/>
                <stop offset="100%" stopColor="#0284c7"/>
              </linearGradient>
            </defs>

            {/* Background */}
            <rect width="512" height="512" fill="url(#blBg)"/>

            {/* Top Compass Star */}
            <g transform="translate(256, 140)">
              <polygon points="0,-85 18,-25 78,-25 28,10 46,68 0,35 -46,68 -28,10 -78,-25 -18,-25" fill="url(#blGold)"/>
              <polygon points="0,-85 12,-20 0,-10 -12,-20" fill="#fffbeb"/>
              <circle cx="0" cy="0" r="14" fill="#022c22"/>
              <circle cx="0" cy="0" r="7" fill="url(#blGold)"/>
            </g>

            {/* Crest Frame */}
            <g>
              <clipPath id="blCrestClip">
                <path d="M 146 220 Q 146 360 256 420 Q 366 360 366 220 Z"/>
              </clipPath>

              <g clipPath="url(#blCrestClip)">
                <rect x="140" y="180" width="232" height="250" fill="#064e3b"/>
                {/* Sun */}
                <circle cx="285" cy="275" r="38" fill="url(#blSun)"/>
                {/* Hills */}
                <path d="M 140 330 Q 220 280 320 320 Q 355 335 375 350 L 375 430 L 140 430 Z" fill="#10b981"/>
                <path d="M 140 375 Q 230 320 375 350 L 375 430 L 140 430 Z" fill="#34d399"/>
                {/* River */}
                <path d="M 285 315 Q 275 335 250 350 Q 220 370 245 400 Q 255 415 256 425 L 282 425 Q 285 410 270 395 Q 245 375 275 350 Q 295 335 292 315 Z" fill="url(#blRiver)"/>
              </g>

              {/* Crest Border */}
              <path d="M 146 220 Q 146 360 256 420 Q 366 360 366 220 Z" fill="none" stroke="url(#blGold)" strokeWidth="8"/>
            </g>

            {/* Soaring Airplane */}
            <g transform="translate(4, -8)">
              <path d="M 155 255 L 210 235 L 215 195 L 238 200 L 242 225 L 345 190 Q 372 180 378 195 Q 378 208 355 218 L 260 262 L 265 295 L 245 298 L 230 273 L 175 292 Q 150 300 145 290 Q 142 275 155 255 Z" fill="url(#blGold)"/>
              <path d="M 245 228 L 340 196 Q 355 191 356 198 Q 356 205 342 211 L 255 250 Z" fill="#ffffff" opacity="0.6"/>
            </g>
          </svg>
        </div>

        {/* Bangladesh Pride Indicator Dot */}
        <span 
          className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-rose-600 to-amber-500 border-2 border-white shadow-xs animate-pulse" 
          title="Explore Bangladesh" 
        />
      </div>

      {/* Brand Typography */}
      {showText && (
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-emerald-950 to-teal-900 bg-clip-text text-transparent font-heading">
              YEANA
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg bg-gradient-to-r from-emerald-800 to-teal-800 text-amber-300 border border-emerald-600/40 shadow-xs flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006a4e] flex items-center justify-center shrink-0 border border-white/20 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f42a41]" />
              </span>
              <span>BD</span>
            </span>
          </div>
          {subtext && (
            <p className="text-[11px] text-slate-500 font-medium hidden sm:flex items-center gap-1.5">
              <span className="text-emerald-700 font-bold">রূপসী বাংলাদেশ</span>
              <span className="text-slate-300">•</span>
              <span className="text-amber-600 font-semibold">Travel & Explore</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
};
