import React, { useState } from 'react';
import {
  Globe,
  Lock,
  ShieldCheck,
  Server,
  Zap,
  Folder,
  ExternalLink,
  Plus,
  RefreshCw,
  Sliders,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Code,
  Terminal,
} from 'lucide-react';
import { DomainSite } from '../types/cloud';

interface DomainHostingViewProps {
  domains: DomainSite[];
  onOpenLivePreview: () => void;
  onNavigateToFileManager: (path: string) => void;
  onAddDomain: (newDom: DomainSite) => void;
}

export const DomainHostingView: React.FC<DomainHostingViewProps> = ({
  domains,
  onOpenLivePreview,
  onNavigateToFileManager,
  onAddDomain,
}) => {
  const [selectedDomain, setSelectedDomain] = useState<DomainSite>(
    domains.find((d) => d.domain === 'cloudo.biz.id') || domains[0]
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDomainName, setNewDomainName] = useState('');
  const [newRuntime, setNewRuntime] = useState<'nodejs' | 'php' | 'python' | 'docker'>('php');
  const [isRenewingSsl, setIsRenewingSsl] = useState(false);
  const [sslSuccessMessage, setSslSuccessMessage] = useState<string | null>(null);

  // Editable settings
  const [forceHttps, setForceHttps] = useState(selectedDomain.forceHttps);
  const [http3, setHttp3] = useState(selectedDomain.http3);
  const [brotli, setBrotli] = useState(selectedDomain.brotli);
  const [wafShield, setWafShield] = useState(selectedDomain.wafShield);

  const handleRenewSsl = () => {
    setIsRenewingSsl(true);
    setTimeout(() => {
      setIsRenewingSsl(false);
      setSslSuccessMessage("Sertifikat SSL Let's Encrypt ECC 384-bit berhasil diperbarui hingga 2027!");
      setTimeout(() => setSslSuccessMessage(null), 4000);
    }, 1500);
  };

  const handleCreateDomain = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDomainName) return;

    const newSite: DomainSite = {
      id: `dom-${Date.now()}`,
      domain: newDomainName.toLowerCase(),
      rootPath: `/var/www/${newDomainName.toLowerCase()}/public_html`,
      targetVpsId: 'vps-sgp-01',
      status: 'active',
      sslStatus: 'active',
      sslIssuer: "Let's Encrypt Authority X3",
      sslExpiry: '2027-01-01',
      runtime: newRuntime,
      runtimeVersion: newRuntime === 'php' ? 'PHP 8.3-FPM' : 'Node.js 22 LTS',
      webServer: 'Nginx Enterprise',
      forceHttps: true,
      http3: true,
      brotli: true,
      wafShield: true,
      bandwidthUsageGb: 12.4,
      visitorsToday: 140,
      diskUsageMb: 120,
      appType: 'Custom Web Application',
    };

    onAddDomain(newSite);
    setSelectedDomain(newSite);
    setShowAddModal(false);
    setNewDomainName('');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
            <Globe className="h-6 w-6 text-cyan-400" />
            Hosting & Manajemen Domain Web
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Konfigurasi web server Nginx Enterprise, sertifikat SSL ECC, versi PHP/Node.js, dan optimasi HTTP/3
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenLivePreview}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold px-4 py-2 text-xs shadow-md shadow-cyan-600/20 transition cursor-pointer"
          >
            <Globe className="h-4 w-4" />
            <span>Tes Live cloudo.biz.id</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 px-3.5 py-2 text-xs font-semibold transition"
          >
            <Plus className="h-4 w-4 text-cyan-400" />
            <span>Tambah Domain / Sub</span>
          </button>
        </div>
      </div>

      {/* Domain Quick Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {domains.map((d) => {
          const isSelected = d.id === selectedDomain.id;
          const isMain = d.domain === 'cloudo.biz.id';
          return (
            <button
              key={d.id}
              onClick={() => {
                setSelectedDomain(d);
                setForceHttps(d.forceHttps);
                setHttp3(d.http3);
                setBrotli(d.brotli);
                setWafShield(d.wafShield);
              }}
              className={`p-3 rounded-xl border text-left transition cursor-pointer relative ${
                isSelected
                  ? 'bg-slate-900 border-cyan-500 shadow-md shadow-cyan-500/10'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <Globe className={`h-4 w-4 ${isMain ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              <p className="font-bold text-xs text-white mt-2 truncate font-mono">{d.domain}</p>
              <div className="flex items-center gap-1 mt-1">
                <Lock className="h-3 w-3 text-emerald-400" />
                <span className="text-[10px] text-emerald-400 font-mono">SSL Active</span>
              </div>
              <p className="text-[10px] text-slate-400 truncate mt-0.5">{d.webServer}</p>
            </button>
          );
        })}
      </div>

      {/* Selected Domain Deep Management Panel */}
      <div className="glass-card rounded-2xl border border-slate-800 p-6 space-y-6">
        {/* Banner with Live indicators */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-slate-800 gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xl sm:text-2xl font-extrabold text-white">
                https://{selectedDomain.domain}
              </span>
              <span className="rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" />
                ONLINE • 200 OK
              </span>
              {selectedDomain.domain === 'cloudo.biz.id' && (
                <span className="rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                  PRIMARY PRODUCTION DOMAIN
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 font-mono flex items-center gap-2">
              <span>Path: {selectedDomain.rootPath}</span>
              <button
                onClick={() => onNavigateToFileManager(selectedDomain.rootPath)}
                className="text-cyan-400 hover:text-cyan-300 underline font-sans text-xs flex items-center gap-1"
              >
                <Folder className="h-3 w-3" />
                <span>Buka di File Manager</span>
              </button>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenLivePreview}
              className="flex items-center gap-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 px-4 py-2 text-xs font-bold transition"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Live Test View</span>
            </button>
          </div>
        </div>

        {/* SSL Notification banner */}
        {sslSuccessMessage && (
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800 text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>{sslSuccessMessage}</span>
          </div>
        )}

        {/* 3 Main Configuration Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Block 1: SSL / TLS Certificate */}
          <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Lock className="h-4 w-4 text-emerald-400" />
                Sertifikat SSL / TLS
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                A+ Rating
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Issuer:</span>
                <span className="text-slate-200 truncate max-w-[170px]">{selectedDomain.sslIssuer}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Enkripsi:</span>
                <span className="text-cyan-300">ECDSA P-384 / SHA-384</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Kadaluarsa:</span>
                <span className="text-slate-200">{selectedDomain.sslExpiry}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">OCSP Stapling:</span>
                <span className="text-emerald-400">Aktif & Terverifikasi</span>
              </div>
            </div>

            <button
              onClick={handleRenewSsl}
              disabled={isRenewingSsl}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition"
            >
              <RefreshCw className={`h-3.5 w-3.5 text-cyan-400 ${isRenewingSsl ? 'animate-spin' : ''}`} />
              <span>{isRenewingSsl ? 'Memperbarui Sertifikat...' : 'Perbarui SSL Let\'s Encrypt'}</span>
            </button>
          </div>

          {/* Block 2: Runtime & Engine */}
          <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Code className="h-4 w-4 text-cyan-400" />
                Runtime & Web Engine
              </span>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                Production
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Web Server Core:</label>
                <div className="font-mono text-white p-2 rounded-lg bg-slate-950 border border-slate-800 font-semibold">
                  {selectedDomain.webServer}
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Runtime Version:</label>
                <div className="font-mono text-cyan-300 p-2 rounded-lg bg-slate-950 border border-slate-800 text-[11px]">
                  {selectedDomain.runtimeVersion}
                </div>
              </div>

              <div className="flex justify-between text-slate-400 text-xs pt-1">
                <span>OPcache Status:</span>
                <span className="text-emerald-400 font-mono">100% Hit Rate</span>
              </div>
            </div>
          </div>

          {/* Block 3: Edge Optimizations & Security Toggles */}
          <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-amber-400" />
                Edge & Security Toggles
              </span>
              <span className="text-[10px] font-mono text-emerald-400">Live Config</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <label className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800/80 cursor-pointer">
                <div>
                  <span className="font-semibold text-slate-200 block">Force HTTPS Redirect</span>
                  <span className="text-[10px] text-slate-400">HTTP 301 ke HTTPS port 443</span>
                </div>
                <input
                  type="checkbox"
                  checked={forceHttps}
                  onChange={(e) => setForceHttps(e.target.checked)}
                  className="h-4 w-4 rounded accent-cyan-500"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800/80 cursor-pointer">
                <div>
                  <span className="font-semibold text-slate-200 block">HTTP/3 (QUIC Protocol)</span>
                  <span className="text-[10px] text-slate-400">UDP 0-RTT latency super cepat</span>
                </div>
                <input
                  type="checkbox"
                  checked={http3}
                  onChange={(e) => setHttp3(e.target.checked)}
                  className="h-4 w-4 rounded accent-cyan-500"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800/80 cursor-pointer">
                <div>
                  <span className="font-semibold text-slate-200 block">Brotli + Gzip Compression</span>
                  <span className="text-[10px] text-slate-400">Menghemat 70% data transfer</span>
                </div>
                <input
                  type="checkbox"
                  checked={brotli}
                  onChange={(e) => setBrotli(e.target.checked)}
                  className="h-4 w-4 rounded accent-cyan-500"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800/80 cursor-pointer">
                <div>
                  <span className="font-semibold text-slate-200 block">WAF DDoS Anti-Bot Shield</span>
                  <span className="text-[10px] text-slate-400">Blokir otomatis scraper & spam</span>
                </div>
                <input
                  type="checkbox"
                  checked={wafShield}
                  onChange={(e) => setWafShield(e.target.checked)}
                  className="h-4 w-4 rounded accent-cyan-500"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Traffic Telemetry for this domain */}
        <div className="pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
            Statistik Lalu Lintas Hari Ini
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 text-[11px] block">Total Kunjungan Hari Ini:</span>
              <span className="text-lg font-bold text-white">
                {selectedDomain.visitorsToday.toLocaleString('id-ID')} Hits
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 text-[11px] block">Penggunaan Bandwidth:</span>
              <span className="text-lg font-bold text-cyan-300">
                {selectedDomain.bandwidthUsageGb} GB
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 text-[11px] block">Ukuran File Disk:</span>
              <span className="text-lg font-bold text-emerald-300">
                {selectedDomain.diskUsageMb} MB
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Add Domain Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-base">Tambah Domain / Subdomain Baru</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateDomain} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  Nama Domain / Subdomain:
                </label>
                <input
                  type="text"
                  required
                  placeholder="contoh: blog.cloudo.biz.id atau domainku.com"
                  value={newDomainName}
                  onChange={(e) => setNewDomainName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Runtime Environment:</label>
                <select
                  value={newRuntime}
                  onChange={(e) => setNewRuntime(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono focus:outline-none focus:border-cyan-500"
                >
                  <option value="php">PHP 8.3-FPM (WordPress, Laravel)</option>
                  <option value="nodejs">Node.js 22 LTS (Next.js, Express)</option>
                  <option value="python">Python 3.12 (Django, FastAPI)</option>
                  <option value="docker">Docker Containerized App</option>
                </select>
              </div>

              <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-cyan-300 text-[11px]">
                ℹ️ Sertifikat SSL Let's Encrypt dan Nginx vhost akan otomatis diterbitkan dan dikonfigurasi.
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold transition shadow-md shadow-cyan-600/30"
                >
                  Deploy Web Host
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
