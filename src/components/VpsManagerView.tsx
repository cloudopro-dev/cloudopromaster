import React, { useState } from 'react';
import {
  Server,
  Power,
  RotateCw,
  HardDrive,
  Cpu,
  Activity,
  ShieldCheck,
  Terminal,
  Settings,
  Layers,
  Copy,
  Check,
  Plus,
  RefreshCw,
  Sliders,
  Database,
  ArrowUpRight,
  ExternalLink,
  Lock,
} from 'lucide-react';
import { VpsInstance } from '../types/cloud';

interface VpsManagerViewProps {
  servers: VpsInstance[];
  selectedServer: VpsInstance;
  setSelectedServer: (server: VpsInstance) => void;
  onPowerToggle: (id: string) => void;
  onReboot: (id: string) => void;
  onOpenDeployModal: () => void;
  onOpenTerminal: () => void;
  currency: 'IDR' | 'USD';
  onUpdateServerSpecs: (id: string, vcpu: number, ramGb: number, diskGb: number) => void;
}

export const VpsManagerView: React.FC<VpsManagerViewProps> = ({
  servers,
  selectedServer,
  setSelectedServer,
  onPowerToggle,
  onReboot,
  onOpenDeployModal,
  onOpenTerminal,
  currency,
  onUpdateServerSpecs,
}) => {
  const [copiedIp, setCopiedIp] = useState<string | null>(null);
  const [showScaleModal, setShowScaleModal] = useState(false);
  const [showReinstallModal, setShowReinstallModal] = useState(false);
  const [newOs, setNewOs] = useState('ubuntu-24-04');
  const [isRebuilding, setIsRebuilding] = useState(false);

  // Scaling state
  const [scaleCpu, setScaleCpu] = useState(selectedServer.vcpu);
  const [scaleRam, setScaleRam] = useState(selectedServer.ramGb);
  const [scaleDisk, setScaleDisk] = useState(selectedServer.diskGb);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIp(text);
    setTimeout(() => setCopiedIp(null), 2000);
  };

  const isRunning = selectedServer.status === 'running';

  const handleScaleSave = () => {
    onUpdateServerSpecs(selectedServer.id, scaleCpu, scaleRam, scaleDisk);
    setShowScaleModal(false);
  };

  const handleReinstall = () => {
    setIsRebuilding(true);
    setTimeout(() => {
      setIsRebuilding(false);
      setShowReinstallModal(false);
    }, 1800);
  };

  const formatCost = (idr: number, usd: number) => {
    return currency === 'IDR' ? `Rp ${idr.toLocaleString('id-ID')}` : `$${usd}`;
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Server Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
            <Server className="h-6 w-6 text-cyan-400" />
            Manajemen Cloud VPS & Dedicated Node
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Pantau performa real-time, kontrol daya instan, resize hardware, dan akses Web SSH
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenTerminal}
            className="flex items-center gap-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 px-3.5 py-2 text-xs font-mono text-emerald-400 font-semibold transition"
          >
            <Terminal className="h-4 w-4" />
            <span>Launch Web SSH</span>
          </button>
          <button
            onClick={onOpenDeployModal}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold px-4 py-2 text-xs shadow-md shadow-cyan-600/20 transition cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Tambah Server Baru</span>
          </button>
        </div>
      </div>

      {/* Server Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {servers.map((s) => {
          const isSelected = s.id === selectedServer.id;
          return (
            <button
              key={s.id}
              onClick={() => {
                setSelectedServer(s);
                setScaleCpu(s.vcpu);
                setScaleRam(s.ramGb);
                setScaleDisk(s.diskGb);
              }}
              className={`p-3 rounded-xl border text-left transition cursor-pointer relative ${
                isSelected
                  ? 'bg-gradient-to-br from-slate-900 to-slate-900/90 border-cyan-500 shadow-md shadow-cyan-500/10'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xl">{s.flag}</span>
                <span
                  className={`h-2 w-2 rounded-full ${
                    s.status === 'running' ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'
                  }`}
                />
              </div>
              <p className="font-bold text-xs text-white mt-2 truncate font-mono">{s.name}</p>
              <p className="text-[11px] text-cyan-400 font-mono truncate">{s.ipv4}</p>
              <p className="text-[10px] text-slate-400 truncate">{s.region}</p>
            </button>
          );
        })}
      </div>

      {/* Selected Server Full Details Card */}
      <div className="glass-card rounded-2xl border border-slate-800 p-6 space-y-6">
        {/* Main Server Header Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-slate-800 gap-4">
          <div className="flex items-start gap-4">
            <div className="text-4xl p-2 rounded-2xl bg-slate-900 border border-slate-800">
              {selectedServer.flag}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-extrabold text-white font-mono">
                  {selectedServer.name}
                </h2>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold flex items-center gap-1.5 ${
                    isRunning
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isRunning ? 'bg-emerald-400' : 'bg-rose-400'
                    }`}
                  />
                  {selectedServer.status.toUpperCase()}
                </span>
                <span className="rounded bg-slate-800 border border-slate-700 px-2 py-0.5 text-[11px] text-slate-300 font-mono">
                  Uptime: {Math.floor(selectedServer.uptimeHours / 24)}d {selectedServer.uptimeHours % 24}h
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Datacenter: {selectedServer.datacenter}
              </p>
            </div>
          </div>

          {/* Power Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onReboot(selectedServer.id)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold transition"
            >
              <RotateCw className="h-3.5 w-3.5 text-cyan-400" />
              <span>Reboot</span>
            </button>
            <button
              onClick={() => onPowerToggle(selectedServer.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition ${
                isRunning
                  ? 'bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 border-rose-800/60'
                  : 'bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 border-emerald-800/60'
              }`}
            >
              <Power className="h-3.5 w-3.5" />
              <span>{isRunning ? 'Power Off' : 'Power On'}</span>
            </button>
            <button
              onClick={() => setShowScaleModal(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition"
            >
              <Sliders className="h-3.5 w-3.5" />
              <span>Resize Hardware</span>
            </button>
            <button
              onClick={() => setShowReinstallModal(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-semibold transition"
            >
              <Settings className="h-3.5 w-3.5" />
              <span>Reinstall OS</span>
            </button>
          </div>
        </div>

        {/* Live Gauges Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl bg-slate-900/70 border border-slate-800/80 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Cpu className="h-4 w-4 text-cyan-400" /> CPU Allocation
              </span>
              <span className="font-mono text-sm font-bold text-cyan-300">
                {selectedServer.cpuUsagePercent}%
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-cyan-400 rounded-full transition-all duration-700"
                style={{ width: `${selectedServer.cpuUsagePercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>{selectedServer.vcpu} vCPU Cores</span>
              <span>AMD EPYC™ Genoa 3.7GHz</span>
            </div>
          </div>

          <div className="rounded-xl bg-slate-900/70 border border-slate-800/80 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Activity className="h-4 w-4 text-emerald-400" /> Memory (RAM)
              </span>
              <span className="font-mono text-sm font-bold text-emerald-300">
                {selectedServer.ramUsagePercent}%
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-emerald-400 rounded-full transition-all duration-700"
                style={{ width: `${selectedServer.ramUsagePercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>
                {((selectedServer.ramGb * selectedServer.ramUsagePercent) / 100).toFixed(1)} GB /{' '}
                {selectedServer.ramGb} GB
              </span>
              <span>DDR5 ECC Registered</span>
            </div>
          </div>

          <div className="rounded-xl bg-slate-900/70 border border-slate-800/80 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <HardDrive className="h-4 w-4 text-indigo-400" /> NVMe Storage
              </span>
              <span className="font-mono text-sm font-bold text-indigo-300">
                {selectedServer.diskUsagePercent}%
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-indigo-400 rounded-full transition-all duration-700"
                style={{ width: `${selectedServer.diskUsagePercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>
                {Math.round((selectedServer.diskGb * selectedServer.diskUsagePercent) / 100)} GB /{' '}
                {selectedServer.diskGb} GB
              </span>
              <span>PCIe 4.0 NVMe (120k IOPS)</span>
            </div>
          </div>
        </div>

        {/* Network & Access Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
          {/* Left: Network IP Configuration */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-cyan-400" />
              Alamat IP & Konfigurasi Jaringan
            </h3>

            <div className="space-y-2 rounded-xl bg-slate-900/60 border border-slate-800 p-4 text-xs font-mono">
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-400">Public IPv4:</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-cyan-300">{selectedServer.ipv4}</span>
                  <button
                    onClick={() => copyToClipboard(selectedServer.ipv4)}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                  >
                    {copiedIp === selectedServer.ipv4 ? (
                      <Check className="h-3 w-3 text-emerald-400" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-400">Public IPv6:</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-300 text-[11px] truncate max-w-[200px]">
                    {selectedServer.ipv6}
                  </span>
                  <button
                    onClick={() => copyToClipboard(selectedServer.ipv6)}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                  >
                    {copiedIp === selectedServer.ipv6 ? (
                      <Check className="h-3 w-3 text-emerald-400" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-400">SSH Port:</span>
                <span className="text-slate-200">{selectedServer.sshPort} (Standard Rate Limited)</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-400">Bandwidth Bulan Ini:</span>
                <span className="text-slate-200">
                  {selectedServer.bandwidthUsedGb} GB / {selectedServer.bandwidthTb * 1000} GB
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5">
                <span className="text-slate-400">DDoS Mitigation:</span>
                <span className="text-emerald-400 font-sans font-semibold flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Active 2.5 Tbps Shield
                </span>
              </div>
            </div>
          </div>

          {/* Right: Operating System & Environment */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Layers className="h-4 w-4 text-cyan-400" />
              Sistem Operasi & Lingkungan
            </h3>

            <div className="space-y-2 rounded-xl bg-slate-900/60 border border-slate-800 p-4 text-xs font-mono">
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-400">Distro OS:</span>
                <span className="font-semibold text-white">{selectedServer.os.name} {selectedServer.os.version}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-400">Kernel Version:</span>
                <span className="text-slate-300 text-[11px]">{selectedServer.os.kernel}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-400">Virtualization:</span>
                <span className="text-slate-200">KVM (Hardware Virtualization)</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-400">Auto Backup:</span>
                <span className="text-emerald-400 font-sans font-medium">Daily Snapshot OK (03:00 UTC)</span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-slate-400">Biaya Bulanan:</span>
                <span className="text-cyan-300 font-sans font-bold">
                  {formatCost(selectedServer.monthlyCostIdr, selectedServer.monthlyCostUsd)} / bulan
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resize Modal */}
      {showScaleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Sliders className="h-5 w-5 text-cyan-400" />
                Resize Hardware: {selectedServer.name}
              </h3>
              <button
                onClick={() => setShowScaleModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* CPU Slider */}
              <div>
                <div className="flex justify-between text-slate-300 mb-2">
                  <span className="font-semibold">vCPU Cores</span>
                  <span className="font-mono text-cyan-400 font-bold">{scaleCpu} Cores</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="32"
                  step="2"
                  value={scaleCpu}
                  onChange={(e) => setScaleCpu(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              {/* RAM Slider */}
              <div>
                <div className="flex justify-between text-slate-300 mb-2">
                  <span className="font-semibold">Memory (RAM)</span>
                  <span className="font-mono text-emerald-400 font-bold">{scaleRam} GB</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="64"
                  step="4"
                  value={scaleRam}
                  onChange={(e) => setScaleRam(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Disk Slider */}
              <div>
                <div className="flex justify-between text-slate-300 mb-2">
                  <span className="font-semibold">NVMe Storage</span>
                  <span className="font-mono text-indigo-400 font-bold">{scaleDisk} GB</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="1000"
                  step="40"
                  value={scaleDisk}
                  onChange={(e) => setScaleDisk(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
              <span className="text-slate-400">Estimasi Tagihan Baru:</span>
              <span className="font-bold text-cyan-400 font-mono text-sm">
                Rp {(scaleCpu * 45000 + scaleRam * 18000 + scaleDisk * 800).toLocaleString('id-ID')} / bln
              </span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowScaleModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Batal
              </button>
              <button
                onClick={handleScaleSave}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold transition shadow-md shadow-cyan-600/30"
              >
                Konfirmasi Resize Instan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reinstall OS Modal */}
      {showReinstallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-base">Reinstall Operating System</h3>
              <button
                onClick={() => setShowReinstallModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-amber-400 bg-amber-950/30 border border-amber-800/50 p-3 rounded-xl">
              ⚠️ Peringatan: Reinstall OS akan memformat ulang root drive. Pastikan file penting telah
              di-backup ke snapshot atau S3.
            </p>

            <div className="space-y-2 text-xs">
              <label className="text-slate-300 font-semibold">Pilih Distribusi OS:</label>
              {[
                { id: 'ubuntu-24-04', label: 'Ubuntu 24.04.1 LTS (Noble Numbat)' },
                { id: 'debian-12', label: 'Debian 12 Bookworm' },
                { id: 'rocky-9', label: 'Rocky Linux 9.4 Enterprise' },
                { id: 'alpine-320', label: 'Alpine Linux 3.20 Hardened' },
                { id: 'windows-2025', label: 'Windows Server 2025 Datacenter Edition' },
              ].map((os) => (
                <label
                  key={os.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${
                    newOs === os.id
                      ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="os"
                    value={os.id}
                    checked={newOs === os.id}
                    onChange={(e) => setNewOs(e.target.value)}
                    className="accent-cyan-500"
                  />
                  <span className="font-medium">{os.label}</span>
                </label>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                onClick={() => setShowReinstallModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Batal
              </button>
              <button
                onClick={handleReinstall}
                disabled={isRebuilding}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition flex items-center gap-1.5"
              >
                {isRebuilding ? (
                  <>
                    <RefreshCw className="h-3 w-3 animate-spin" />
                    <span>Reinstalling OS...</span>
                  </>
                ) : (
                  <span>Mulai Reinstall Sekarang</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
