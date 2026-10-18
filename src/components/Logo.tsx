import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showBadge = true,
  className = '',
}) => {
  const iconSizes = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  const titleSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
    xl: 'text-2xl',
  };

  const subSizes = {
    sm: 'text-[9px]',
    md: 'text-[11px]',
    lg: 'text-xs',
    xl: 'text-sm',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Hexagonal Futuristic Cloud & Server Core Icon */}
      <div
        className={`relative flex items-center justify-center rounded-2xl p-0.5 bg-gradient-to-tr from-cyan-500 via-sky-400 to-indigo-600 shadow-xl shadow-cyan-500/25 ${iconSizes[size]} transition-transform duration-300 hover:scale-105`}
      >
        <div className="w-full h-full rounded-[14px] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-1.5 relative overflow-hidden">
          {/* Subtle background glow mesh */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-blue-600/30" />

          {/* Custom Vector Emblem: Isometric Cloud Hyper-Node */}
          <svg
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full relative z-10 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]"
          >
            {/* Outer Hexagon Shield Ring */}
            <path
              d="M18 2L31 9.5V26.5L18 34L5 26.5V9.5L18 2Z"
              stroke="url(#shield-grad)"
              strokeWidth="2"
              strokeLinejoin="round"
              className="opacity-70"
            />
            {/* Stylized Cloud Topology */}
            <path
              d="M12.5 21C10.5 21 9 19.5 9 17.5C9 15.7 10.3 14.2 12.1 14C12.7 11.2 15.1 9 18 9C21.3 9 24 11.5 24.3 14.7C25.8 15.2 27 16.6 27 18.2C27 20.3 25.3 21 23.5 21H12.5Z"
              fill="url(#cloud-grad)"
              fillOpacity="0.85"
            />
            {/* Center Core Cube / Server Chip */}
            <rect
              x="14"
              y="18"
              width="8"
              height="8"
              rx="2"
              fill="#080e1a"
              stroke="#00f2fe"
              strokeWidth="1.5"
            />
            <circle cx="18" cy="22" r="1.5" fill="#38bdf8" />
            <path d="M18 14V18" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M14 22H10" stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M22 22H26" stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round" />

            <defs>
              <linearGradient id="shield-grad" x1="5" y1="2" x2="31" y2="34" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00f2fe" />
                <stop offset="0.5" stopColor="#38bdf8" />
                <stop offset="1" stopColor="#6366f1" />
              </linearGradient>
              <linearGradient id="cloud-grad" x1="9" y1="9" x2="27" y2="21" gradientUnits="userSpaceOnUse">
                <stop stopColor="#38bdf8" />
                <stop offset="1" stopColor="#0284c7" />
              </linearGradient>
            </defs>
          </svg>

          {/* Active online indicator dot */}
          <div className="absolute top-1 right-1 h-2 w-2 rounded-full bg-emerald-400 border border-slate-950 animate-pulse shadow-[0_0_6px_#34d399]" />
        </div>
      </div>

      {/* Typography & Brand Slogan */}
      <div>
        <div className="flex items-center gap-2">
          <span className={`font-black tracking-tight text-white ${titleSizes[size]} font-['Plus_Jakarta_Sans',sans-serif]`}>
            CLOUDO
          </span>
          {showBadge && (
            <span className="rounded-md bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 px-1.5 py-0.5 text-[9px] font-extrabold text-cyan-300 uppercase tracking-widest shadow-sm">
              PRO MASTER
            </span>
          )}
        </div>
        <p className={`${subSizes[size]} text-slate-400 font-mono tracking-wide`}>
          cloudo.biz.id <span className="text-emerald-400 font-sans font-bold">• Tier-IV</span>
        </p>
      </div>
    </div>
  );
};
