import React, { useState } from 'react';
import {
  Globe,
  Lock,
  ShieldCheck,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  Server,
  Zap,
  Layers,
  ArrowRight,
  Code,
  Copy,
  Check,
} from 'lucide-react';
import { DomainSite } from '../types/cloud';

interface LiveDomainPreviewModalProps {
  domain: DomainSite;
  onClose: () => void;
}

export const LiveDomainPreviewModal: React.FC<LiveDomainPreviewModalProps> = ({
  domain,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'headers' | 'dns'>('preview');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pingLatency, setPingLatency] = useState(1.42);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setPingLatency(Number((1.2 + Math.random() * 0.6).toFixed(2)));
    }, 600);
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(`https://${domain.domain}`);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 animate-in fade-in">
      <div className="w-full max-w-5xl rounded-2xl bg-slate-950 border border-cyan-500/40 shadow-2xl overflow-hidden flex flex-col h-[90vh] max-h-[850px]">
        {/* Browser Chrome Header */}
        <div className="bg-slate-900 border-b border-slate-800 p-3 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block cursor-pointer" onClick={onClose} />
                <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="text-xs font-bold text-slate-300 ml-2 hidden sm:inline">
                Live Domain Inspector — {domain.domain}
              </span>
            </div>

            {/* Tab switchers in chrome */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer ${
                  activeTab === 'preview'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Web Preview
              </button>
              <button
                onClick={() => setActiveTab('headers')}
                className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer ${
                  activeTab === 'headers'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                HTTP Headers
              </button>
              <button
                onClick={() => setActiveTab('dns')}
                className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer ${
                  activeTab === 'dns'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                DNS & Latency
              </button>
            </div>

            <button
              onClick={onClose}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
            >
              Tutup (ESC)
            </button>
          </div>

          {/* Browser URL Address Bar */}
          <div className="flex items-center gap-2 bg-slate-950 rounded-xl border border-slate-800 px-3 py-2 text-xs font-mono">
            <button
              onClick={handleRefresh}
              className="text-slate-400 hover:text-cyan-400 transition"
              title="Reload Web Page"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin text-cyan-400' : ''}`} />
            </button>

            <div className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded text-[11px] font-sans font-medium">
              <Lock className="h-3 w-3" />
              <span>Secure SSL</span>
            </div>

            <span className="text-slate-500">https://</span>
            <span className="font-bold text-cyan-300 font-mono">{domain.domain}</span>
            <span className="text-slate-500">/</span>

            <div className="ml-auto flex items-center gap-2">
              <span className="hidden md:inline text-[10px] bg-slate-800 text-cyan-400 px-2 py-0.5 rounded">
                HTTP/3 QUIC
              </span>
              <span className="hidden md:inline text-[10px] bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded">
                200 OK • {pingLatency}ms
              </span>
              <button
                onClick={copyUrl}
                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                title="Copy Web URL"
              >
                {copiedUrl ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
              </button>
            </div>
          </div>
        </div>

        {/* Tab 1: Live Web Display */}
        {activeTab === 'preview' && (
          <div className="flex-1 overflow-y-auto bg-slate-950 p-6 sm:p-10 select-text">
            <div className="max-w-3xl mx-auto space-y-8">
              {/* Site Hero Banner */}
              <div className="rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-slate-900 via-slate-900 to-cyan-950/40 p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 -mt-16 -mr-16 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-4">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live Hosted on CLOUDO PRO MASTER
                </div>

                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Welcome to{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">
                    {domain.domain}
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto mt-3 leading-relaxed">
                  Domain ini aktif dan beroperasi pada infrastruktur cloud VPS generasi terbaru dengan
                  percepatan Anycast, kompresi Brotli, dan perlindungan keamanan enterprise.
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <span className="px-3 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-slate-200 font-mono">
                    Node: SGP-Tuas (103.176.78.42)
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-emerald-400 font-mono">
                    SSL: Let's Encrypt ECC 384
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-cyan-300 font-mono">
                    Protocol: HTTP/3 (QUIC 0-RTT)
                  </span>
                </div>
              </div>

              {/* Server Feature Highlights on Domain */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="h-8 w-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Zap className="h-4 w-4" />
                  </div>
                  <h3 className="font-bold text-white text-sm">Ultra Low Latency</h3>
                  <p className="text-xs text-slate-400">
                    Routing Anycast Tier-IV memastikan pengunjung dari Indonesia mendapatkan latensi di bawah 5 ms.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <h3 className="font-bold text-white text-sm">2.5 Tbps DDoS Shield</h3>
                  <p className="text-xs text-slate-400">
                    Mitigasi serangan volumetrik otomatis dan perlindungan WAF terhadap ancaman SQLi dan bot.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Server className="h-4 w-4" />
                  </div>
                  <h3 className="font-bold text-white text-sm">NVMe Gen4 Storage</h3>
                  <p className="text-xs text-slate-400">
                    Kecepatan baca/tulis disk hingga 7,000 MB/s untuk performa database MySQL & PostgreSQL optimal.
                  </p>
                </div>
              </div>

              {/* Simulated API Endpoint Tester */}
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Code className="h-4 w-4 text-cyan-400" />
                    Live Edge API Ping Response
                  </span>
                  <span className="text-xs font-mono text-emerald-400">Status 200 OK</span>
                </div>

                <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
{`{
  "status": "online",
  "domain": "${domain.domain}",
  "ssl_cipher": "TLS_AES_256_GCM_SHA384 (TLSv1.3)",
  "http_version": "HTTP/3 QUIC",
  "edge_cluster": "cloudo-anycast-sgp-01",
  "roundtrip_ms": ${pingLatency},
  "timestamp": "${new Date().toISOString()}"
}`}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: HTTP Headers Inspector */}
        {activeTab === 'headers' && (
          <div className="flex-1 overflow-y-auto bg-slate-950 p-6 font-mono text-xs select-text">
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
                <div className="text-emerald-400 font-bold text-sm">
                  HTTP/3 200 OK (Connection: keep-alive)
                </div>
                <div className="divide-y divide-slate-800/60 text-slate-300">
                  <div className="py-2 flex justify-between">
                    <span className="text-cyan-400">alt-svc:</span>
                    <span>h3=":443"; ma=86400, quic=":443"</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-cyan-400">server:</span>
                    <span>Nginx-Enterprise/1.26.2 (Cloudo Core)</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-cyan-400">strict-transport-security:</span>
                    <span>max-age=31536000; includeSubDomains; preload</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-cyan-400">content-type:</span>
                    <span>text/html; charset=UTF-8</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-cyan-400">content-encoding:</span>
                    <span>br (Brotli Level 6)</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-cyan-400">x-cloudo-edge-cluster:</span>
                    <span>SGP-EQ-TUAS-01 (103.176.78.42)</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-cyan-400">x-frame-options:</span>
                    <span>SAMEORIGIN</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-cyan-400">x-xss-protection:</span>
                    <span>1; mode=block</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-cyan-400">x-content-type-options:</span>
                    <span>nosniff</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: DNS Resolution */}
        {activeTab === 'dns' && (
          <div className="flex-1 overflow-y-auto bg-slate-950 p-6 font-mono text-xs select-text">
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
                <h4 className="font-bold text-white text-sm">
                  Global DNS Resolution & Round-Trip Latency
                </h4>
                <div className="space-y-2">
                  {[
                    { node: 'Jakarta (IDC 3D Duren Tiga)', ip: '103.190.214.88', rtt: '3.1 ms' },
                    { node: 'Singapore (Equinix Tuas)', ip: '103.176.78.42', rtt: '11.8 ms' },
                    { node: 'Tokyo (Shinagawa TY2)', ip: '139.180.201.15', rtt: '58.2 ms' },
                    { node: 'Frankfurt (Interxion)', ip: '159.69.112.77', rtt: '84.6 ms' },
                    { node: 'San Jose Silicon Valley', ip: '103.176.78.42', rtt: '112.0 ms' },
                  ].map((n, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 rounded bg-slate-950 border border-slate-800">
                      <div>
                        <span className="text-white font-bold">{n.node}</span>
                        <span className="text-slate-400 text-[11px] block">{n.ip}</span>
                      </div>
                      <span className="text-emerald-400 font-bold">{n.rtt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="bg-slate-900 border-t border-slate-800 px-4 py-2.5 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Target Host: https://{domain.domain}</span>
          <span className="text-emerald-400">● 100% Live Simulated Edge</span>
        </div>
      </div>
    </div>
  );
};
