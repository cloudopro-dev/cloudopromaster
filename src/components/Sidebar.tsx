import React from 'react';
import {
  LayoutDashboard,
  Server,
  Globe,
  Radio,
  Database,
  FolderTree,
  Terminal,
  Grid,
  ShieldCheck,
  Mail,
  Clock,
  CreditCard,
  Cpu,
  HardDrive,
  Zap,
  Cloud,
} from 'lucide-react';
import { VpsInstance } from '../types/cloud';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  servers: VpsInstance[];
  domainCount: number;
  dbCount: number;
  onGoToLanding?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  servers,
  domainCount,
  dbCount,
  onGoToLanding,
}) => {
  const runningServers = servers.filter((s) => s.status === 'running').length;

  const navItems = [
    {
      id: 'dashboard',
      label: 'Ringkasan / Dashboard',
      icon: LayoutDashboard,
      badge: null,
      category: 'Utama',
    },
    {
      id: 'vps',
      label: 'VPS & Cloud Server',
      icon: Server,
      badge: `${runningServers} Aktif`,
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      category: 'Infrastruktur',
    },
    {
      id: 'domains',
      label: 'Hosting & Domain',
      icon: Globe,
      badge: `${domainCount} Web`,
      badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      category: 'Infrastruktur',
    },
    {
      id: 'dns',
      label: 'DNS Zone Manager',
      icon: Radio,
      badge: 'Anycast',
      badgeColor: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
      category: 'Infrastruktur',
    },
    {
      id: 'cloudflare',
      label: 'Cloudflare Edge Hub',
      icon: Cloud,
      badge: 'Connected',
      badgeColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      category: 'Infrastruktur',
    },
    {
      id: 'databases',
      label: 'Basis Data (SQL/Redis)',
      icon: Database,
      badge: `${dbCount}`,
      badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      category: 'Infrastruktur',
    },
    {
      id: 'files',
      label: 'File Manager & Editor',
      icon: FolderTree,
      badge: null,
      category: 'Aplikasi',
    },
    {
      id: 'terminal',
      label: 'Web SSH Terminal',
      icon: Terminal,
      badge: 'BASH',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 font-mono',
      category: 'Aplikasi',
    },
    {
      id: 'apps',
      label: '1-Click App Installer',
      icon: Grid,
      badge: '8+ Apps',
      badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      category: 'Aplikasi',
    },
    {
      id: 'security',
      label: 'Keamanan, WAF & UFW',
      icon: ShieldCheck,
      badge: 'Protected',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      category: 'Sistem',
    },
    {
      id: 'email',
      label: 'Email & Webmail',
      icon: Mail,
      badge: '@cloudo',
      badgeColor: 'bg-slate-700/50 text-slate-300 border-slate-600/30',
      category: 'Sistem',
    },
    {
      id: 'cron',
      label: 'Cron & Tugas Otomatis',
      icon: Clock,
      badge: null,
      category: 'Sistem',
    },
    {
      id: 'billing',
      label: 'Billing & Invoices',
      icon: CreditCard,
      badge: 'Active',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      category: 'Sistem',
    },
  ];

  // Group by category
  const categories = ['Utama', 'Infrastruktur', 'Aplikasi', 'Sistem'];

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-800/80 bg-slate-950/70 p-4 flex flex-col justify-between hidden md:flex min-h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        {categories.map((cat) => {
          const items = navItems.filter((item) => item.category === cat);
          if (items.length === 0) return null;
          return (
            <div key={cat} className="space-y-1">
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {cat}
              </p>
              <div className="space-y-0.5">
                {items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-300 border border-cyan-500/30 shadow-sm shadow-cyan-500/10'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className={`h-4 w-4 transition-colors ${
                            isActive
                              ? 'text-cyan-400'
                              : 'text-slate-400 group-hover:text-slate-200'
                          }`}
                        />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded border ${item.badgeColor}`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Node Resource Widget */}
      <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900/60 p-3 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5 font-semibold text-slate-300">
            <Zap className="h-3.5 w-3.5 text-cyan-400" />
            Cluster Node Telemetry
          </span>
          <span className="text-[10px] font-mono text-emerald-400">SLA 99.99%</span>
        </div>

        <div className="space-y-2 text-[11px]">
          <div>
            <div className="flex justify-between text-slate-400 mb-1">
              <span className="flex items-center gap-1">
                <Cpu className="h-3 w-3 text-slate-400" /> Total vCPU
              </span>
              <span className="font-mono text-slate-300">24 Cores (31% Load)</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                style={{ width: '31%' }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-slate-400 mb-1">
              <span className="flex items-center gap-1">
                <HardDrive className="h-3 w-3 text-slate-400" /> NVMe Storage
              </span>
              <span className="font-mono text-slate-300">1.88 TB (48% Used)</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"
                style={{ width: '48%' }}
              />
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-mono">
          <span>Primary: cloudo.biz.id</span>
          <span className="text-emerald-400">● Edge Online</span>
        </div>

        {onGoToLanding && (
          <button
            onClick={onGoToLanding}
            className="w-full mt-2 py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 text-[11px] font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>← Halaman Depan</span>
          </button>
        )}
      </div>
    </aside>
  );
};
