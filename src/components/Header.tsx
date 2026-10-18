import React, { useState } from 'react';
import {
  Terminal,
  ShieldCheck,
  Globe,
  Bell,
  Plus,
  Search,
  ExternalLink,
  ChevronDown,
  Activity,
  CheckCircle2,
  RefreshCw,
  Home,
  LogOut,
  User,
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
    }, 800);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 gap-3">
        {/* Brand with New Logo */}
        <div className="flex items-center gap-4">
          <div
            onClick={() => setActiveTab('dashboard')}
            className="cursor-pointer group"
          >
            <Logo size="md" />
          </div>

          {/* Primary Domain cloudo.biz.id Live Pill */}
          <div className="hidden md:flex items-center gap-2 rounded-full bg-slate-900/90 border border-cyan-500/30 px-3 py-1 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Globe className="h-3.5 w-3.5 text-cyan-400" />
            <span className="font-medium text-slate-200">Domain:</span>
            <span className="font-mono font-semibold text-cyan-300">cloudo.biz.id</span>
            <span className="rounded bg-emerald-500/15 text-emerald-400 px-1.5 py-0.2 text-[10px] font-mono">
              HTTPS
            </span>
            <button
              onClick={onOpenLivePreview}
              title="Inspect Live cloudo.biz.id website & SSL status"
              className="ml-1 flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 hover:underline cursor-pointer font-medium"
            >
              <span>Live Test</span>
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search server, domain, IP (e.g. cloudo.biz.id, Nginx, MySQL)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg bg-slate-900/80 border border-slate-800 pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-all font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-xs text-slate-400 hover:text-slate-200"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Refresh Status */}
          <button
            onClick={handleRefresh}
            title="Refresh Server Telemetry"
            className="flex items-center justify-center h-8 w-8 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-slate-700 transition"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin text-cyan-400' : ''}`} />
          </button>

          {/* Currency Toggle */}
          <div className="flex items-center rounded-lg bg-slate-900 p-0.5 border border-slate-800 text-xs">
            <button
              onClick={() => setCurrency('IDR')}
              className={`px-2 py-1 rounded text-[11px] font-semibold transition ${
                currency === 'IDR'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              IDR (Rp)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-2 py-1 rounded text-[11px] font-semibold transition ${
                currency === 'USD'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              USD ($)
            </button>
          </div>

          {/* Web SSH Terminal Quick Button */}
          <button
            onClick={onToggleTerminal}
            className="flex items-center gap-1.5 rounded-lg bg-slate-900 hover:bg-slate-800/90 border border-slate-800 px-2.5 py-1.5 text-xs font-mono text-slate-200 transition group"
            title="Open Web SSH Terminal"
          >
            <Terminal className="h-3.5 w-3.5 text-emerald-400 group-hover:text-emerald-300" />
            <span className="hidden sm:inline">SSH Console</span>
          </button>

          {/* Deploy New Button */}
          <button
            onClick={onOpenDeployModal}
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium px-3 py-1.5 text-xs shadow-md shadow-cyan-600/25 transition active:scale-95 cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">New Service</span>
          </button>

          {/* Notifications Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500 text-[9px] font-bold text-slate-950">
                3
              </span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    System Alerts & Telemetry
                  </span>
                  <span className="text-[10px] text-cyan-400 font-mono">Live Stream</span>
                </div>
                <div className="mt-2 space-y-2 max-h-60 overflow-y-auto">
                  <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50 text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>DDoS Mitigated for cloudo.biz.id</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Cloudflare edge absorbed 4.2 Gbps UDP flood automatically.
                    </p>
                    <span className="text-[9px] text-slate-500 font-mono">10 min ago</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50 text-xs">
                    <div className="flex items-center gap-1.5 text-cyan-400 font-medium">
                      <Activity className="h-3 w-3" />
                      <span>Let's Encrypt Auto-Renewal</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Certificate for cloudo.biz.id verified and active.
                    </p>
                    <span className="text-[9px] text-slate-500 font-mono">35 min ago</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50 text-xs">
                    <div className="flex items-center gap-1.5 text-amber-400 font-medium">
                      <ShieldCheck className="h-3 w-3" />
                      <span>Fail2ban Banned Suspicious IP</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      IP 185.220.101.4 blocked on port 2222.
                    </p>
                    <span className="text-[9px] text-slate-500 font-mono">1 hr ago</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Admin Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 rounded-lg bg-slate-900 border border-slate-800 pl-2 pr-2.5 py-1 hover:border-slate-700 transition cursor-pointer"
            >
              <div className="h-6 w-6 rounded-md bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white uppercase shadow-sm">
                CP
              </div>
              <div className="hidden xl:block text-left">
                <p className="text-xs font-semibold text-slate-200 leading-tight">Admin Root</p>
                <p className="text-[10px] text-slate-400 leading-none">{currentUserRole || 'Super Administrator'}</p>
              </div>
              <ChevronDown className="h-3 w-3 text-slate-400" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-2 z-50 text-xs animate-in fade-in">
                <div className="px-3 py-2 border-b border-slate-800 mb-1">
                  <p className="font-semibold text-white">{currentUserRole || 'Super Administrator'}</p>
                  <p className="text-[11px] text-slate-400 font-mono truncate">admin@cloudo.biz.id</p>
                  <div className="mt-1 flex items-center gap-1 text-[10px] text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                    <span>{runningServers} / {servers.length} VPS Nodes Running</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onGoToLanding();
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-cyan-300 font-semibold transition flex items-center gap-2 cursor-pointer"
                >
                  <Home className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Halaman Depan (Landing)</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('security');
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
                >
                  SSH Keys & 2FA Security
                </button>

                <button
                  onClick={() => {
                    setActiveTab('billing');
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
                >
                  Cloud Billing & Invoices
                </button>

                <button
                  onClick={() => {
                    onOpenLivePreview();
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-cyan-400 hover:text-cyan-300 transition flex items-center justify-between cursor-pointer"
                >
                  <span>Test cloudo.biz.id</span>
                  <ExternalLink className="h-3 w-3" />
                </button>

                <div className="pt-1 mt-1 border-t border-slate-800">
                  <button
                    onClick={() => {
                      onLogout();
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-rose-950/40 text-rose-400 font-medium transition flex items-center gap-2 cursor-pointer"
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
