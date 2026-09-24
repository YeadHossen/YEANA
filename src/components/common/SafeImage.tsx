import React, { useState } from 'react';
import { ImageOff, MapPin, Building2, Utensils, Bus, Compass } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackCategory?: 'place' | 'hotel' | 'food' | 'transport' | 'general';
  containerClassName?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = 'YEANA Travel Bangladesh',
  className = '',
  containerClassName = '',
  fallbackCategory = 'general',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getCategoryIcon = () => {
    switch (fallbackCategory) {
      case 'hotel':
        return <Building2 className="w-8 h-8 text-amber-500/70" />;
      case 'food':
        return <Utensils className="w-8 h-8 text-rose-500/70" />;
      case 'transport':
        return <Bus className="w-8 h-8 text-blue-500/70" />;
      case 'place':
        return <MapPin className="w-8 h-8 text-emerald-500/70" />;
      default:
        return <Compass className="w-8 h-8 text-teal-500/70" />;
    }
  };

  if (!src || hasError) {
    return (
      <div 
        className={`w-full h-full min-h-[140px] bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col items-center justify-center p-4 text-center select-none overflow-hidden relative ${containerClassName}`}
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#2dd4bf_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-inner">
            {getCategoryIcon()}
          </div>
          <span className="text-[11px] font-bold text-slate-300 max-w-[200px] truncate">
            {alt}
          </span>
          <span className="text-[9px] uppercase tracking-widest text-slate-400 font-extrabold flex items-center gap-1">
            <ImageOff className="w-3 h-3" /> Offline Preview
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-slate-200/60 animate-pulse flex items-center justify-center z-10">
          <div className="w-6 h-6 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        loading="lazy"
        {...props}
      />
    </div>
  );
};
