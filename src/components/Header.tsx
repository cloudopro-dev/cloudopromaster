import React, { useState } from 'react';
import {
  Terminal,
  Globe,
  Bell,
  Plus,
  Search,
  ExternalLink,
  ChevronDown,
  CheckCircle2,
  Home,
  LogOut,
  RefreshCw,
  Coins,
} from 'lucide-react';
import { VpsInstance } from '../types/cloud';
import { Logo } from './Logo';

interface HeaderProps {
  servers: VpsInstance[];
  currency: 'IDR' | 'USD';
  setCurrency: (c: 'IDR' | 'USD') => void;
  onOpenDeployModal: () => void;
  onToggleTerminal: () => void;
  onOpenLivePreview: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSelectServer?: (serverId: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onGoToLanding: () => void;
  onLogout: () => void;
  currentUserRole: string;
}

export const Header: React.FC<HeaderProps> = ({
  servers,
  currency,
  setCurrency,
  onOpenDeployModal,
  onToggleTerminal,
  onOpenLivePreview,
  searchQuery,
  setSearchQuery,
  setActiveTab,
  onGoToLanding,
  onLogout,
  currentUserRole,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const runningServers = servers.filter((s) => s.status === 'running').length;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="flex h-15 items-center justify-between px-4 sm:px-6 gap-4">
        {/* Left: Clean Brand Logo & Minimalist Live Domain Pill */}
        <div className="flex items-center gap-3 shrink-0">
          <div
            onClick={() => setActiveTab('dashboard')}
            className="cursor-pointer transition hover:opacity-90"
            title="Ke Dashboard"
          >
            <Logo size="sm" showBadge={false} />
          </div>

          <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-slate-800/80 text-xs">
            <button
              onClick={onOpenLivePreview}
              title="Periksa status live cloudo.biz.id"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-cyan-500/30 text-[11px] font-mono text-cyan-300 transition cursor-pointer group"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span>cloudo.biz.id</span>
              <ExternalLink className="h-2.5 w-2.5 opacity-60 group-hover:opacity-100 transition" />
            </button>
          </div>
        </div>

        {/* Center: Streamlined Search Bar */}
        <div className="flex-1 max-w-sm hidden md:block">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Cari server, domain, IP..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl bg-slate-900/60 border border-slate-800/80 pl-8 pr-7 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:bg-slate-900 font-mono transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2 text-xs text-slate-500 hover:text-slate-300"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Right: Clean, Uncluttered Action Hub */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Quick Terminal Icon Button */}
          <button
            onClick={onToggleTerminal}
            className="flex items-center justify-center h-8 w-8 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-emerald-400 hover:text-emerald-300 transition"
            title="Buka Web SSH Console"
          >
            <Terminal className="h-4 w-4" />
          </button>

          {/* Deploy Action Button */}
          <button
            onClick={onOpenDeployModal}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold px-3 py-1.5 text-xs shadow-md shadow-cyan-600/20 transition active:scale-95 cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Deploy</span>
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white transition"
              title="Notifikasi Sistem"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute 1 top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-slate-900/95 border border-slate-800 shadow-2xl p-3 z-50 animate-in fade-in backdrop-blur-xl">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Sistem Alerts
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono">Live</span>
                </div>
                <div className="mt-2 space-y-2 max-h-56 overflow-y-auto text-xs">
                  <div className="p-2 rounded-lg bg-slate-800/50 border border-slate-700/40">
                    <p className="font-semibold text-emerald-400">DDoS Shield Aktif</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      4.2 Gbps UDP flood disaring di edge cloudo.biz.id.
                    </p>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-800/50 border border-slate-700/40">
                    <p className="font-semibold text-cyan-400">SSL Auto-Renewed</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Sertifikat Let's Encrypt ECC 384-bit valid.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Single Clean Profile Menu (Houses Currency, Landing, Settings, Logout) */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-1.5 rounded-xl bg-slate-900/90 border border-slate-800 p-1 pl-1.5 pr-2 hover:border-slate-700 transition cursor-pointer"
            >
              <div className="h-6 w-6 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-[11px] font-bold text-white shadow-sm">
                CP
              </div>
              <ChevronDown className="h-3 w-3 text-slate-400" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-slate-900/95 border border-slate-800 shadow-2xl p-2.5 z-50 text-xs backdrop-blur-xl animate-in fade-in space-y-2">
                {/* Account info */}
                <div className="px-2.5 py-1.5 border-b border-slate-800">
                  <p className="font-bold text-white">{currentUserRole || 'Super Administrator'}</p>
                  <p className="text-[11px] text-cyan-400 font-mono">admin@cloudo.biz.id</p>
                  <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                    <span>{runningServers} / {servers.length} VPS Node Online</span>
                  </div>
                </div>

                {/* Currency switch item inside menu */}
                <div className="px-2.5 py-1 flex items-center justify-between text-slate-300">
                  <span className="text-[11px] flex items-center gap-1.5 text-slate-400">
                    <Coins className="h-3.5 w-3.5 text-amber-400" />
                    Mata Uang:
                  </span>
                  <div className="flex rounded-lg bg-slate-950 p-0.5 border border-slate-800 text-[10px]">
                    <button
                      onClick={() => setCurrency('IDR')}
                      className={`px-2 py-0.5 rounded font-bold transition ${
                        currency === 'IDR'
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      IDR
                    </button>
                    <button
                      onClick={() => setCurrency('USD')}
                      className={`px-2 py-0.5 rounded font-bold transition ${
                        currency === 'USD'
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      USD
                    </button>
                  </div>
                </div>

                {/* Menu Links */}
                <div className="space-y-0.5 pt-1 border-t border-slate-800">
                  <button
                    onClick={() => {
                      onGoToLanding();
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-slate-200 hover:text-cyan-300 transition flex items-center gap-2 cursor-pointer"
                  >
                    <Home className="h-3.5 w-3.5 text-cyan-400" />
                    <span>Halaman Depan (Landing)</span>
                  </button>

                  <button
                    onClick={() => {
                      handleRefresh();
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-slate-200 transition flex items-center gap-2 cursor-pointer"
                  >
                    <RefreshCw className="h-3.5 w-3.5 text-slate-400" />
                    <span>Segarkan Telemetri</span>
                  </button>

                  <button
                    onClick={() => {
                      onOpenLivePreview();
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-slate-200 transition flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Globe className="h-3.5 w-3.5 text-slate-400" />
                      <span>Tes cloudo.biz.id</span>
                    </span>
                    <ExternalLink className="h-3 w-3 text-slate-500" />
                  </button>
                </div>

                {/* Logout */}
                <div className="pt-1 border-t border-slate-800">
                  <button
                    onClick={() => {
                      onLogout();
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-rose-950/40 text-rose-400 transition flex items-center gap-2 cursor-pointer font-medium"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Keluar (Logout)</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
