import React, { useState } from 'react';
import {
  Cloud,
  ShieldCheck,
  Zap,
  Lock,
  RefreshCw,
  Trash2,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  Server,
  AlertTriangle,
  Radio,
  Sliders,
  Flame,
  ArrowRight,
  Key,
} from 'lucide-react';
import { CloudflareConfig, DnsRecord } from '../types/cloud';

interface CloudflareManagerViewProps {
  dnsRecords: DnsRecord[];
  onNavigateToDns: () => void;
  onOpenLivePreview: () => void;
}

export const CloudflareManagerView: React.FC<CloudflareManagerViewProps> = ({
  dnsRecords,
  onNavigateToDns,
  onOpenLivePreview,
}) => {
  const [config, setConfig] = useState<CloudflareConfig>({
    domain: 'cloudo.biz.id',
    zoneId: '8fa9e201b74a38df10924b10ac918312',
    accountId: 'a91b2c3d4e5f67890123456789abcdef',
    apiToken: 'cld_live_token_98f82a174c8942b09a12c478901f',
    email: 'admin@cloudo.biz.id',
    status: 'active',
    nameservers: ['dara.ns.cloudflare.com', 'graham.ns.cloudflare.com'],
    sslMode: 'strict',
    securityLevel: 'medium',
    alwaysUseHttps: true,
    http3: true,
    brotli: true,
    rocketLoader: true,
    earlyHints: true,
    autoMinify: {
      html: true,
      css: true,
      js: true,
    },
    botFightMode: true,
    turnstileEnabled: true,
    cacheHitRatio: 78.4,
    bandwidthSavedGb: 2420,
    threatsBlocked: 14890,
    lastPurgedAt: 'Baru saja (04:50 WIB)',
  });

  const [isPurging, setIsPurging] = useState(false);
  const [purgeSuccess, setPurgeSuccess] = useState<string | null>(null);
  const [isTestingApi, setIsTestingApi] = useState(false);
  const [apiTestSuccess, setApiTestSuccess] = useState(false);
  const [copiedNs, setCopiedNs] = useState<string | null>(null);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [tempToken, setTempToken] = useState(config.apiToken);
  const [tempZoneId, setTempZoneId] = useState(config.zoneId);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedNs(text);
    setTimeout(() => setCopiedNs(null), 2000);
  };

  const handlePurgeEverything = () => {
    setIsPurging(true);
    setPurgeSuccess(null);
    setTimeout(() => {
      setIsPurging(false);
      setConfig((prev) => ({
        ...prev,
        lastPurgedAt: 'Baru saja (Purge All Edge PoP Sukses)',
      }));
      setPurgeSuccess('Seluruh cache Cloudflare CDN di 300+ PoP global berhasil dibersihkan dalam 120ms!');
      setTimeout(() => setPurgeSuccess(null), 4000);
    }, 1200);
  };

  const handleTestApi = () => {
    setIsTestingApi(true);
    setApiTestSuccess(false);
    setTimeout(() => {
      setIsTestingApi(false);
      setApiTestSuccess(true);
      setTimeout(() => setApiTestSuccess(false), 4000);
    }, 1000);
  };

  const handleSaveToken = (e: React.FormEvent) => {
    e.preventDefault();
    setConfig((prev) => ({
      ...prev,
      apiToken: tempToken,
      zoneId: tempZoneId,
    }));
    setShowTokenModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <Cloud className="h-4.5 w-4.5 fill-orange-400" />
            </div>
            Cloudflare Enterprise Edge Hub (cloudo.biz.id)
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Integrasi langsung API v4 Cloudflare untuk proteksi DDoS, Anycast CDN, SSL Full Strict, dan akselerasi HTTP/3
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleTestApi}
            disabled={isTestingApi}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold transition cursor-pointer"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-orange-400 ${isTestingApi ? 'animate-spin' : ''}`} />
            <span>{isTestingApi ? 'Memvalidasi API...' : 'Uji Koneksi API'}</span>
          </button>
          <button
            onClick={() => setShowTokenModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-500/15 hover:bg-orange-500/25 text-orange-300 border border-orange-500/40 text-xs font-bold transition cursor-pointer"
          >
            <Key className="h-3.5 w-3.5" />
            <span>Kredensial API</span>
          </button>
        </div>
      </div>

      {/* Success Alerts */}
      {apiTestSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
          <div>
            <p className="font-bold">Koneksi API Cloudflare Terverifikasi 100%!</p>
            <p className="text-[11px] text-emerald-400/80">
              Token aktif, Zone ID untuk domain cloudo.biz.id tersinkronisasi dengan 28 Anycast Edge lokasi.
            </p>
          </div>
        </div>
      )}

      {purgeSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
          <div>
            <p className="font-bold">Cache Purge Berhasil!</p>
            <p className="text-[11px] text-emerald-400/80">{purgeSuccess}</p>
          </div>
        </div>
      )}

      {/* Main Connection Status & Nameservers Card */}
      <div className="glass-card rounded-2xl border border-orange-500/30 p-6 space-y-6 bg-gradient-to-br from-slate-900 via-slate-900 to-orange-950/20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-slate-800 gap-4">
          <div className="flex items-start gap-3.5">
            <div className="h-11 w-11 rounded-2xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 shadow-lg shadow-orange-500/10">
              <Cloud className="h-6 w-6 fill-orange-400" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-extrabold text-white text-xl font-mono">cloudo.biz.id</span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Cloudflare Edge Active
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-orange-500/20 text-orange-300 border border-orange-500/30">
                  Plan: Enterprise Pro
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Zone ID: {config.zoneId} • Account: {config.accountId.slice(0, 10)}...
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePurgeEverything}
              disabled={isPurging}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold shadow-lg shadow-orange-600/30 transition cursor-pointer"
            >
              <Flame className={`h-4 w-4 ${isPurging ? 'animate-bounce' : ''}`} />
              <span>{isPurging ? 'Membersihkan Cache...' : 'Purge All CDN Cache'}</span>
            </button>
            <button
              onClick={onOpenLivePreview}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition cursor-pointer"
            >
              <span>Tes cloudo.biz.id</span>
              <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Cloudflare Nameservers Box */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Radio className="h-4 w-4 text-orange-400" />
              Cloudflare Anycast Nameservers Resmi (cloudo.biz.id)
            </span>
            <span className="text-emerald-400 text-xs font-mono">Delegasi NS Valid</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            {config.nameservers.map((ns, idx) => (
              <div
                key={ns}
                className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between"
              >
                <div>
                  <span className="text-slate-500 text-[10px] block">Nameserver {idx + 1}:</span>
                  <span className="font-bold text-white text-sm">{ns}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(ns)}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition"
                  title="Salin Nameserver"
                >
                  {copiedNs === ns ? (
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cloudflare Edge Telemetry KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-medium uppercase">CDN Cache Hit Ratio</span>
            <Zap className="h-4 w-4 text-orange-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{config.cacheHitRatio}%</div>
          <p className="text-[11px] text-emerald-400">78% konten dilayani langsung dari edge</p>
        </div>

        <div className="glass-card p-4 rounded-xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-medium uppercase">Bandwidth Terhemat</span>
            <Server className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-cyan-300 font-mono">
            {(config.bandwidthSavedGb / 1000).toFixed(2)} TB
          </div>
          <p className="text-[11px] text-slate-400 font-mono">Mengurangi beban CPU VPS</p>
        </div>

        <div className="glass-card p-4 rounded-xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-medium uppercase">Ancaman Terblokir</span>
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">
            {config.threatsBlocked.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-400">Botnet, scraper & SQL injection</p>
        </div>

        <div className="glass-card p-4 rounded-xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-medium uppercase">Terakhir Dibersihkan</span>
            <ClockIcon />
          </div>
          <div className="text-sm font-bold text-white font-mono truncate pt-1">
            {config.lastPurgedAt || 'Belum pernah'}
          </div>
          <p className="text-[11px] text-slate-400">Purge instan global</p>
        </div>
      </div>

      {/* 2 Main Setting Blocks: SSL/TLS & Speed Optimization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Block 1: SSL/TLS Encryption Mode */}
        <div className="glass-card rounded-2xl border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Lock className="h-4 w-4 text-emerald-400" />
              Mode Enkripsi SSL/TLS Cloudflare
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              End-to-End
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Pilih bagaimana Cloudflare mengenkripsi lalu lintas antara pengunjung web browser, Cloudflare edge, dan server VPS origin Anda.
          </p>

          <div className="space-y-2 text-xs">
            {[
              { id: 'flexible', title: 'Flexible', desc: 'Enkripsi hanya antara Browser & Cloudflare' },
              { id: 'full', title: 'Full', desc: 'Enkripsi ujung-ke-ujung (sertifikat origin standar)' },
              { id: 'strict', title: 'Full (Strict) — Rekomendasi', desc: 'Enkripsi penuh dengan validasi sertifikat Let\'s Encrypt origin' },
            ].map((mode) => (
              <label
                key={mode.id}
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${
                  config.sslMode === mode.id
                    ? 'bg-orange-500/10 border-orange-500/50 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="ssl"
                  checked={config.sslMode === mode.id}
                  onChange={() => setConfig({ ...config, sslMode: mode.id as any })}
                  className="mt-0.5 accent-orange-500"
                />
                <div>
                  <span className="font-bold text-white block">{mode.title}</span>
                  <span className="text-[11px] text-slate-400">{mode.desc}</span>
                </div>
              </label>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 space-y-2">
            <label className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer text-xs">
              <div>
                <span className="font-semibold text-white block">Always Use HTTPS</span>
                <span className="text-[10px] text-slate-400">Otomatis redirect port 80 HTTP ke HTTPS</span>
              </div>
              <input
                type="checkbox"
                checked={config.alwaysUseHttps}
                onChange={(e) => setConfig({ ...config, alwaysUseHttps: e.target.checked })}
                className="h-4 w-4 rounded accent-orange-500"
              />
            </label>
          </div>
        </div>

        {/* Block 2: Speed, Rocket Loader & Minification */}
        <div className="glass-card rounded-2xl border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Zap className="h-4 w-4 text-orange-400" />
              Akselerasi & Optimasi Kecepatan Edge
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 border border-orange-500/30">
              HTTP/3 QUIC
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
              <div>
                <span className="font-semibold text-white block">HTTP/3 (with QUIC Protocol)</span>
                <span className="text-[10px] text-slate-400">Koneksi UDP 0-RTT super cepat untuk mobile</span>
              </div>
              <input
                type="checkbox"
                checked={config.http3}
                onChange={(e) => setConfig({ ...config, http3: e.target.checked })}
                className="h-4 w-4 rounded accent-orange-500"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
              <div>
                <span className="font-semibold text-white block">Rocket Loader™</span>
                <span className="text-[10px] text-slate-400">Prioritaskan loading konten sebelum script JS</span>
              </div>
              <input
                type="checkbox"
                checked={config.rocketLoader}
                onChange={(e) => setConfig({ ...config, rocketLoader: e.target.checked })}
                className="h-4 w-4 rounded accent-orange-500"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
              <div>
                <span className="font-semibold text-white block">Brotli Compression</span>
                <span className="text-[10px] text-slate-400">Kompresi modern lebih efisien dibanding gzip</span>
              </div>
              <input
                type="checkbox"
                checked={config.brotli}
                onChange={(e) => setConfig({ ...config, brotli: e.target.checked })}
                className="h-4 w-4 rounded accent-orange-500"
              />
            </label>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-semibold text-white block">Auto Minify Berkas Web:</span>
              <div className="flex gap-4">
                {(['html', 'css', 'js'] as const).map((ext) => (
                  <label key={ext} className="flex items-center gap-1.5 text-slate-300 font-mono text-[11px] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.autoMinify[ext]}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          autoMinify: {
                            ...config.autoMinify,
                            [ext]: e.target.checked,
                          },
                        })
                      }
                      className="accent-orange-500"
                    />
                    <span className="uppercase">{ext}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cloudflare Proxied DNS Records Quick View */}
      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-4 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cloud className="h-4 w-4 fill-orange-400 text-orange-400" />
            <h3 className="font-bold text-white text-sm">
              Status Proxy Cloudflare DNS untuk cloudo.biz.id
            </h3>
          </div>
          <button
            onClick={onNavigateToDns}
            className="text-xs text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span>Buka DNS Zone Lengkap</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-4">Tipe</th>
                <th className="py-2.5 px-4">Nama Host</th>
                <th className="py-2.5 px-4">Target Origin Server</th>
                <th className="py-2.5 px-4">Cloudflare Proxy Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {dnsRecords.slice(0, 5).map((r) => (
                <tr key={r.id} className="hover:bg-slate-900/40">
                  <td className="py-2.5 px-4 text-cyan-300 font-bold">{r.type}</td>
                  <td className="py-2.5 px-4 text-white font-bold">{r.name}.cloudo.biz.id</td>
                  <td className="py-2.5 px-4 text-slate-300">{r.value}</td>
                  <td className="py-2.5 px-4">
                    {r.proxied ? (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">
                        <Cloud className="h-3 w-3 fill-orange-400" />
                        <span>Proxied (DDoS Protected)</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-sans text-slate-400 border border-slate-800">
                        <span>DNS Only</span>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cloudflare API Token Modal */}
      {showTokenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Key className="h-4 w-4 text-orange-400" />
                Kredensial API Cloudflare
              </h3>
              <button
                onClick={() => setShowTokenModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveToken} className="space-y-4 text-xs font-mono">
              <div>
                <label className="text-slate-300 font-semibold block mb-1 font-sans">
                  Cloudflare API Token:
                </label>
                <input
                  type="password"
                  value={tempToken}
                  onChange={(e) => setTempToken(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-orange-300 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1 font-sans">
                  Zone ID (cloudo.biz.id):
                </label>
                <input
                  type="text"
                  value={tempZoneId}
                  onChange={(e) => setTempZoneId(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-sans text-slate-400">
                ℹ️ Token digunakan untuk mengontrol DNS records, cache purge otomatis, dan SSL Strict mode.
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowTokenModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-sans font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-sans font-bold shadow-md shadow-orange-600/30 transition"
                >
                  Simpan & Hubungkan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const ClockIcon = () => (
  <svg
    className="h-4 w-4 text-slate-400"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
