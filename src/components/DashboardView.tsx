import React from 'react';
import {
  Server,
  Globe,
  Database,
  ShieldCheck,
  TrendingUp,
  Cpu,
  HardDrive,
  Activity,
  ArrowUpRight,
  ExternalLink,
  Power,
  RotateCw,
  Terminal,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Lock,
} from 'lucide-react';
import { VpsInstance, DomainSite, ActivityLog } from '../types/cloud';

interface DashboardViewProps {
  servers: VpsInstance[];
  domains: DomainSite[];
  logs: ActivityLog[];
  currency: 'IDR' | 'USD';
  onSelectServer: (server: VpsInstance) => void;
  onPowerToggle: (id: string) => void;
  onReboot: (id: string) => void;
  onNavigate: (tab: string) => void;
  onOpenLivePreview: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  servers,
  domains,
  logs,
  currency,
  onSelectServer,
  onPowerToggle,
  onReboot,
  onNavigate,
  onOpenLivePreview,
}) => {
  const runningCount = servers.filter((s) => s.status === 'running').length;
  const primaryDomain = domains.find((d) => d.domain === 'cloudo.biz.id') || domains[0];

  const formatCurrency = (idr: number, usd: number) => {
    if (currency === 'IDR') {
      return `Rp ${idr.toLocaleString('id-ID')}`;
    }
    return `$${usd.toLocaleString()}`;
  };

  const totalMonthlyCostIdr = servers.reduce((acc, s) => acc + s.monthlyCostIdr, 0);
  const totalMonthlyCostUsd = servers.reduce((acc, s) => acc + s.monthlyCostUsd, 0);

  return (
    <div className="space-y-6">
      {/* Top Welcome & Live Status Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 p-6 shadow-xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Cluster Nodes 100% Operational
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Tier-IV Anycast Global Backbone
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              CLOUDO PRO MASTER{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">
                Control Hub
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Pusat kendali infrastruktur cloud hosting, VPS node multi-region, DNS zone Anycast,
              dan perlindungan DDoS aktif untuk domain utama{' '}
              <span className="font-mono text-cyan-300 font-semibold underline underline-offset-4 decoration-cyan-500/50">
                cloudo.biz.id
              </span>
              .
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenLivePreview}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-cyan-500/25 transition cursor-pointer"
            >
              <Globe className="h-4 w-4" />
              <span>Live Website cloudo.biz.id</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => onNavigate('vps')}
              className="flex items-center gap-2 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 px-4 py-2.5 text-xs font-semibold text-slate-200 transition cursor-pointer"
            >
              <Server className="h-4 w-4 text-cyan-400" />
              <span>Kelola VPS ({runningCount})</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: VPS Fleet */}
        <div
          onClick={() => onNavigate('vps')}
          className="glass-card glass-card-hover p-4 rounded-xl cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium uppercase tracking-wider">Cloud VPS Nodes</span>
            <div className="h-8 w-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 transition">
              <Server className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white font-mono">{runningCount}</span>
            <span className="text-xs text-slate-400 font-medium">/ {servers.length} Online</span>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>SG, JKT, TYO, FRA Cluster</span>
          </div>
        </div>

        {/* Card 2: Domains & SSL */}
        <div
          onClick={() => onNavigate('domains')}
          className="glass-card glass-card-hover p-4 rounded-xl cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium uppercase tracking-wider">Active Websites</span>
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 transition">
              <Globe className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white font-mono">{domains.length}</span>
            <span className="text-xs text-slate-400 font-medium">Domain & Sub</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-cyan-300">
            <Lock className="h-3 w-3 text-emerald-400" />
            <span className="font-mono text-[11px] truncate">cloudo.biz.id (ECC SSL)</span>
          </div>
        </div>

        {/* Card 3: Bandwidth Usage */}
        <div className="glass-card p-4 rounded-xl">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium uppercase tracking-wider">Total Bandwidth</span>
            <div className="h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white font-mono">19.8</span>
            <span className="text-xs text-slate-400 font-medium">TB / 50 TB Terpakai</span>
          </div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full"
              style={{ width: '39.6%' }}
            />
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-slate-400 font-mono">
            <span>39.6% Terpakai</span>
            <span>Speed: 10 Gbps Edge</span>
          </div>
        </div>

        {/* Card 4: Monthly Cost */}
        <div
          onClick={() => onNavigate('billing')}
          className="glass-card glass-card-hover p-4 rounded-xl cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium uppercase tracking-wider">Estimasi Biaya</span>
            <div className="h-8 w-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-500/20 transition">
              <Zap className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl sm:text-2xl font-extrabold text-white font-mono">
              {formatCurrency(totalMonthlyCostIdr, totalMonthlyCostUsd)}
            </span>
            <span className="text-xs text-slate-400 font-medium">/ bln</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Tagihan Terbayar Otomatis</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Server Fleet Table & Domain Spotlight */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: VPS Fleet List (2 cols on large screen) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Server className="h-4 w-4 text-cyan-400" />
                Daftar Instance VPS Aktif
              </h2>
              <p className="text-xs text-slate-400">
                Pilih server untuk melihat metrik detail, konsol terminal, dan manajemen resource
              </p>
            </div>
            <button
              onClick={() => onNavigate('vps')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
            >
              <span>Lihat Semua</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {servers.map((server) => {
              const isRunning = server.status === 'running';
              return (
                <div
                  key={server.id}
                  className="glass-card p-4 rounded-xl border border-slate-800/80 hover:border-slate-700/80 transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl mt-0.5">{server.flag}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onSelectServer(server)}
                            className="font-bold text-sm text-white hover:text-cyan-400 transition cursor-pointer text-left font-mono"
                          >
                            {server.name}
                          </button>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold flex items-center gap-1 ${
                              isRunning
                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                isRunning ? 'bg-emerald-400' : 'bg-rose-400'
                              }`}
                            />
                            {server.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-0.5 font-mono">
                          <span>{server.hostname}</span>
                          <span>•</span>
                          <span className="text-cyan-400">{server.ipv4}</span>
                          <span>•</span>
                          <span className="text-slate-400">{server.region}</span>
                        </div>
                      </div>
                    </div>

                    {/* Server Actions */}
                    <div className="flex items-center gap-1.5 self-end sm:self-center">
                      <button
                        onClick={() => onReboot(server.id)}
                        title="Reboot Instance"
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 transition"
                      >
                        <RotateCw className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => onPowerToggle(server.id)}
                        title={isRunning ? 'Stop Server' : 'Start Server'}
                        className={`p-1.5 rounded-lg transition ${
                          isRunning
                            ? 'bg-slate-800 hover:bg-rose-950/60 text-slate-300 hover:text-rose-400'
                            : 'bg-emerald-900/40 text-emerald-400 hover:bg-emerald-800/40'
                        }`}
                      >
                        <Power className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => onSelectServer(server)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-cyan-600/30 text-xs font-medium text-cyan-300 border border-slate-700/60 transition"
                      >
                        Kelola
                      </button>
                    </div>
                  </div>

                  {/* Resource Gauges */}
                  <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-800/60 text-xs">
                    <div>
                      <div className="flex justify-between text-slate-400 mb-1">
                        <span className="flex items-center gap-1 text-[11px]">
                          <Cpu className="h-3 w-3 text-cyan-400" /> CPU
                        </span>
                        <span className="font-mono text-slate-200">
                          {isRunning ? `${server.cpuUsagePercent}%` : '0%'}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-cyan-400 rounded-full transition-all duration-500"
                          style={{ width: `${isRunning ? server.cpuUsagePercent : 0}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1 font-mono">{server.vcpu} vCPU</p>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-400 mb-1">
                        <span className="flex items-center gap-1 text-[11px]">
                          <Activity className="h-3 w-3 text-emerald-400" /> RAM
                        </span>
                        <span className="font-mono text-slate-200">
                          {isRunning ? `${server.ramUsagePercent}%` : '0%'}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                          style={{ width: `${isRunning ? server.ramUsagePercent : 0}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1 font-mono">{server.ramGb} GB RAM</p>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-400 mb-1">
                        <span className="flex items-center gap-1 text-[11px]">
                          <HardDrive className="h-3 w-3 text-indigo-400" /> NVMe
                        </span>
                        <span className="font-mono text-slate-200">{server.diskUsagePercent}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-400 rounded-full transition-all duration-500"
                          style={{ width: `${server.diskUsagePercent}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1 font-mono">{server.diskGb} GB NVMe</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: cloudo.biz.id Spotlight & Live Activity Feed */}
        <div className="space-y-6">
          {/* Spotlight: cloudo.biz.id Web Hosting Card */}
          <div className="glass-card p-5 rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                PRO HOSTING
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Globe className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base font-mono">cloudo.biz.id</h3>
                <p className="text-xs text-slate-400">Main Production Domain</p>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Status Server:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live & Online
                </span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">SSL Certificate:</span>
                <span className="text-cyan-300 font-mono text-[11px]">ECC 384-bit (Auto-Renew)</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Web Engine:</span>
                <span className="text-slate-200 font-medium">Nginx + HTTP/3 QUIC</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">DDoS Mitigation:</span>
                <span className="text-emerald-400 font-medium">Enterprise Shield Active</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-400">Target Node:</span>
                <span className="text-slate-200 font-mono">103.176.78.42 (SG-Tuas)</span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800 flex items-center gap-2">
              <button
                onClick={onOpenLivePreview}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 py-2 text-xs font-bold transition cursor-pointer"
              >
                <Globe className="h-3.5 w-3.5" />
                <span>Tes Live Preview</span>
                <ExternalLink className="h-3 w-3" />
              </button>
              <button
                onClick={() => onNavigate('dns')}
                className="rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 text-xs font-semibold transition"
                title="Manage DNS Zone"
              >
                DNS Zone
              </button>
            </div>
          </div>

          {/* Real-time Activity Log */}
          <div className="glass-card p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Activity className="h-3.5 w-3.5 text-cyan-400" />
                Aktivitas Sistem Terbaru
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">Real-time</span>
            </div>

            <div className="space-y-3">
              {logs.slice(0, 4).map((log) => {
                let badgeColor = 'bg-cyan-500/10 text-cyan-400';
                if (log.level === 'success') badgeColor = 'bg-emerald-500/10 text-emerald-400';
                if (log.level === 'warning') badgeColor = 'bg-amber-500/10 text-amber-400';
                if (log.level === 'error') badgeColor = 'bg-rose-500/10 text-rose-400';

                return (
                  <div key={log.id} className="text-xs space-y-1 pb-2 border-b border-slate-800/60 last:border-none last:pb-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-200">{log.title}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{log.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2">{log.description}</p>
                    {log.server && (
                      <span className="inline-block text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                        {log.server}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
