import React, { useState } from 'react';
import {
  Server,
  Globe,
  Zap,
  ShieldCheck,
  Cpu,
  HardDrive,
  Activity,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Lock,
  Layers,
  Database,
  Terminal,
  Radio,
  Clock,
  Sparkles,
  ChevronDown,
  Search,
  Check,
  Play,
  RotateCw,
} from 'lucide-react';
import { Logo } from './Logo';

interface LandingPageViewProps {
  onGoToDashboard: () => void;
  onGoToLogin: () => void;
  onOpenLivePreview: () => void;
  currency: 'IDR' | 'USD';
  setCurrency: (c: 'IDR' | 'USD') => void;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({
  onGoToDashboard,
  onGoToLogin,
  onOpenLivePreview,
  currency,
  setCurrency,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [domainSearch, setDomainSearch] = useState('');
  const [domainResult, setDomainResult] = useState<any | null>(null);
  const [isSearchingDomain, setIsSearchingDomain] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [isPinging, setIsPinging] = useState(false);
  const [pings, setPings] = useState({
    jkt: 3.2,
    sin: 11.5,
    tyo: 48.0,
    fra: 82.4,
  });

  const formatPrice = (idr: number, usd: number) => {
    const discount = billingCycle === 'yearly' ? 0.8 : 1.0;
    const finalIdr = Math.round(idr * discount);
    const finalUsd = Math.round(usd * discount);

    if (currency === 'IDR') {
      return `Rp ${finalIdr.toLocaleString('id-ID')}`;
    }
    return `$${finalUsd.toLocaleString()}`;
  };

  const handleDomainCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainSearch) return;

    setIsSearchingDomain(true);
    setTimeout(() => {
      setIsSearchingDomain(false);
      const clean = domainSearch.toLowerCase().trim();
      setDomainResult({
        domain: clean.includes('.') ? clean : `${clean}.biz.id`,
        available: true,
        priceIdr: clean.endsWith('.biz.id') ? 15000 : 145000,
        priceUsd: clean.endsWith('.biz.id') ? 1 : 9,
      });
    }, 700);
  };

  const handleTestPing = () => {
    setIsPinging(true);
    setTimeout(() => {
      setIsPinging(false);
      setPings({
        jkt: Number((2.8 + Math.random() * 0.8).toFixed(1)),
        sin: Number((10.5 + Math.random() * 2.0).toFixed(1)),
        tyo: Number((46.0 + Math.random() * 4.0).toFixed(1)),
        fra: Number((80.0 + Math.random() * 5.0).toFixed(1)),
      });
    }, 800);
  };

  const faqs = [
    {
      q: 'Apa itu CLOUDO PRO MASTER & cloudo.biz.id?',
      a: 'CLOUDO PRO MASTER adalah platform kontrol hosting & VPS generasi modern yang dirancang sebagai alternatif superior untuk cPanel dan CloudPanel. Didukung domain resmi cloudo.biz.id dengan Anycast DNS, SSL otomatis Let\'s Encrypt, web terminal, basis data MySQL/Postgres/Redis, dan proteksi DDoS 2.5 Tbps.',
    },
    {
      q: 'Apakah saya bisa langsung mencoba panel kontrolnya secara live?',
      a: 'Tentu saja! Anda dapat langsung mengklik tombol "Buka Panel Live" di sudut kanan atas untuk mengeksplorasi seluruh fitur manajemen VPS, DNS zone, file manager, dan web terminal tanpa hambatan.',
    },
    {
      q: 'Di mana saja lokasi datacenter server Cloudo?',
      a: 'Kami mengoperasikan 4 titik datacenter utama Tier-IV: Jakarta (Cyber 2 Kuningan / IDC 3D Duren Tiga dengan latensi 3ms ke IIX), Singapura (Equinix SG1 Tuas), Tokyo (Equinix TY2), dan Frankfurt (Interxion Campus).',
    },
    {
      q: 'Apakah sudah termasuk SSL gratis dan proteksi DDoS?',
      a: 'Ya, seluruh domain dan subdomain yang dipasang otomatis mendapatkan sertifikat SSL ECC 384-bit Let\'s Encrypt dengan auto-renewal berkala dan perlindungan mitigasi DDoS Anycast 2.5 Tbps terpadu.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-cyan-500 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="cursor-pointer">
            <Logo size="md" />
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-300">
            <a href="#vps" className="hover:text-cyan-400 transition">Paket VPS & Hosting</a>
            <a href="#fitur" className="hover:text-cyan-400 transition">Fitur Panel</a>
            <a href="#datacenter" className="hover:text-cyan-400 transition">Datacenter & Latensi</a>
            <a href="#domain" className="hover:text-cyan-400 transition">Cek Domain .biz.id</a>
            <a href="#faq" className="hover:text-cyan-400 transition">FAQ</a>
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Currency Switcher */}
            <div className="hidden sm:flex items-center rounded-lg bg-slate-900 p-0.5 border border-slate-800 text-xs">
              <button
                onClick={() => setCurrency('IDR')}
                className={`px-2 py-1 rounded text-[11px] font-semibold transition ${
                  currency === 'IDR'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                IDR
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2 py-1 rounded text-[11px] font-semibold transition ${
                  currency === 'USD'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                USD
              </button>
            </div>

            {/* Login Button */}
            <button
              onClick={onGoToLogin}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 hover:text-white transition cursor-pointer"
            >
              Masuk
            </button>

            {/* Launch Dashboard Button */}
            <button
              onClick={onGoToDashboard}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 via-sky-500 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-600/30 transition active:scale-95 cursor-pointer"
            >
              <span>Buka Panel Live</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -mt-32 w-[680px] h-[360px] rounded-full bg-cyan-500/15 blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-indigo-600/15 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 backdrop-blur-xl shadow-lg shadow-cyan-500/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-cyan-300">
              CLOUDO PRO MASTER v4.8
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-xs font-mono text-slate-300">cloudo.biz.id (100% Live)</span>
          </div>

          {/* Headline */}
          <div className="max-w-4xl mx-auto space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
              Infrastruktur Cloud VPS &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
                Panel Hosting Tercepat
              </span>{' '}
              di Indonesia
            </h1>
            <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Solusi hosting enterprise dengan prosesor <strong>AMD EPYC™ Genoa</strong>, penyimpanan ultra-cepat{' '}
              <strong>PCIe 4.0 NVMe</strong>, Anycast DNS zone, dan mitigasi DDoS 2.5 Tbps untuk domain utama{' '}
              <span className="font-mono text-cyan-300 font-semibold underline decoration-cyan-500/50">
                cloudo.biz.id
              </span>
              .
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
            <button
              onClick={onGoToDashboard}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-600 via-sky-500 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-extrabold text-sm shadow-xl shadow-cyan-600/30 transition active:scale-95 cursor-pointer"
            >
              <Zap className="h-4 w-4" />
              <span>Mulai Kelola Server (Akses Live)</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={onOpenLivePreview}
              className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-semibold text-sm transition cursor-pointer"
            >
              <Globe className="h-4 w-4 text-cyan-400" />
              <span>Tes Live Web cloudo.biz.id</span>
              <ExternalLink className="h-4 w-4 text-slate-400" />
            </button>
          </div>

          {/* 4 Pillars Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md space-y-1">
              <span className="text-2xl sm:text-3xl font-black text-white font-mono">99.99%</span>
              <p className="text-xs text-slate-400 font-medium">Jaminan SLA Uptime</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md space-y-1">
              <span className="text-2xl sm:text-3xl font-black text-cyan-300 font-mono">&lt; 4ms</span>
              <p className="text-xs text-slate-400 font-medium">Latensi Jakarta IIX/OpenIXP</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md space-y-1">
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">2.5 Tbps</span>
              <p className="text-xs text-slate-400 font-medium">Anycast Anti-DDoS Shield</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md space-y-1">
              <span className="text-2xl sm:text-3xl font-black text-indigo-400 font-mono">Tier-IV</span>
              <p className="text-xs text-slate-400 font-medium">Datacenter Global Terverifikasi</p>
            </div>
          </div>
        </div>
      </section>

      {/* Domain Search / WHOIS Section */}
      <section id="domain" className="py-12 border-y border-slate-800/80 bg-slate-950/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Registrasi & Pencarian Domain
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Cari Nama Domain Terbaik untuk Bisnis Anda
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Domain resmi <strong>.biz.id</strong> promo hanya Rp 15.000 / tahun dengan DNS Anycast instan
            </p>
          </div>

          <form onSubmit={handleDomainCheck} className="flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Ketik nama domain impian Anda (contoh: tokoku.biz.id)..."
                value={domainSearch}
                onChange={(e) => setDomainSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-white font-mono text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>
            <button
              type="submit"
              disabled={isSearchingDomain}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-sm transition shadow-lg shadow-cyan-600/25 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSearchingDomain ? (
                <>
                  <RotateCw className="h-4 w-4 animate-spin" />
                  <span>Mengecek...</span>
                </>
              ) : (
                <>
                  <span>Cek Domain</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Domain Result Pill */}
          {domainResult && (
            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 max-w-lg mx-auto flex items-center justify-between text-xs font-mono animate-in fade-in">
              <div className="text-left">
                <span className="font-bold text-emerald-400 block text-sm">
                  ✓ {domainResult.domain} Tersedia!
                </span>
                <span className="text-slate-400 text-[11px]">
                  Siap dihubungkan ke server cloudo.biz.id
                </span>
              </div>
              <div className="text-right">
                <span className="font-bold text-white text-sm block">
                  {currency === 'IDR'
                    ? `Rp ${domainResult.priceIdr.toLocaleString('id-ID')}`
                    : `$${domainResult.priceUsd}`}
                  /thn
                </span>
                <button
                  onClick={onGoToDashboard}
                  className="mt-1 px-3 py-1 rounded-lg bg-emerald-500 text-slate-950 font-bold text-[10px] hover:bg-emerald-400 transition"
                >
                  Pesan & Hubungkan
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 pt-2">
            <span>.biz.id: <strong className="text-cyan-400">Rp 15.000</strong></span>
            <span>•</span>
            <span>.com: <strong className="text-slate-200">Rp 145.000</strong></span>
            <span>•</span>
            <span>.id: <strong className="text-slate-200">Rp 220.000</strong></span>
            <span>•</span>
            <span>.my.id: <strong className="text-cyan-400">Rp 12.000</strong></span>
          </div>
        </div>
      </section>

      {/* Pricing Matrix Section */}
      <section id="vps" className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            Pilihan Paket Cloud Server
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Spesifikasi Tinggi, Harga Masuk Akal
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Seluruh paket dilengkapi lisensi panel Cloudo Pro Master lengkap, Web SSH, dan SSL ECC tanpa biaya tambahan
          </p>

          {/* Billing cycle toggle */}
          <div className="pt-2 flex items-center justify-center gap-3 text-xs font-semibold">
            <span className={billingCycle === 'monthly' ? 'text-white' : 'text-slate-400'}>
              Tagihan Bulanan
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="w-12 h-6 rounded-full bg-slate-900 border border-slate-700 p-0.5 relative transition"
            >
              <div
                className={`w-5 h-5 rounded-full bg-cyan-400 transition transform ${
                  billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={billingCycle === 'yearly' ? 'text-cyan-400' : 'text-slate-400'}>
              Tahunan <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">HEMAT 20%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: 'Cloud Starter Edge',
              desc: 'Cocok untuk web blog, portal company profile, & API ringan',
              vcpu: '2 vCPU Cores',
              ram: '4 GB RAM DDR5',
              disk: '80 GB NVMe Gen4',
              bw: '3 TB Anycast Bandwidth',
              idr: 95000,
              usd: 6,
              popular: false,
            },
            {
              name: 'Pro Master VPS',
              desc: 'Solusi terbaik untuk eCommerce, SaaS, & aplikasi produksi',
              vcpu: '4 vCPU Cores',
              ram: '8 GB RAM DDR5',
              disk: '160 GB NVMe Gen4',
              bw: '5 TB Anycast Bandwidth',
              idr: 285000,
              usd: 18,
              popular: true,
            },
            {
              name: 'Enterprise Compute',
              desc: 'Untuk beban database tinggi, cluster Redis, & traffic masif',
              vcpu: '8 vCPU Cores',
              ram: '16 GB RAM DDR5',
              disk: '240 GB NVMe Gen4',
              bw: '10 TB Anycast Bandwidth',
              idr: 450000,
              usd: 29,
              popular: false,
            },
            {
              name: 'Dedicated Bare Metal',
              desc: 'Node eksklusif tanpa tetangga, kontrol 100% hardware KVM',
              vcpu: '16 vCPU Cores',
              ram: '32 GB RAM DDR5',
              disk: '480 GB NVMe Gen4',
              bw: '20 TB Anycast Bandwidth',
              idr: 890000,
              usd: 58,
              popular: false,
            },
          ].map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 relative ${
                plan.popular
                  ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-cyan-950/40 border-2 border-cyan-500 shadow-2xl shadow-cyan-500/20 scale-105 z-10'
                  : 'glass-card border border-slate-800 hover:border-slate-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-md">
                  Paling Populer & Direkomendasikan
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="font-extrabold text-white text-lg">{plan.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{plan.desc}</p>
                </div>

                <div className="pt-2">
                  <span className="text-3xl font-black text-white font-mono">
                    {formatPrice(plan.idr, plan.usd)}
                  </span>
                  <span className="text-xs text-slate-400"> / bulan</span>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-slate-800 text-xs font-mono">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Cpu className="h-4 w-4 text-cyan-400" />
                    <span>{plan.vcpu} AMD EPYC™</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Activity className="h-4 w-4 text-emerald-400" />
                    <span>{plan.ram}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <HardDrive className="h-4 w-4 text-indigo-400" />
                    <span>{plan.disk}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Globe className="h-4 w-4 text-cyan-400" />
                    <span>{plan.bw}</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400 font-sans">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Dedicated IPv4 & IPv6 Anycast</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400 font-sans">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Anti-DDoS 2.5 Tbps Shield</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={onGoToDashboard}
                  className={`w-full py-3 rounded-2xl font-bold text-xs transition cursor-pointer flex items-center justify-center gap-2 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-600/30'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  <span>Pesan & Deploy Instan</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section id="fitur" className="py-20 bg-slate-900/40 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Fitur Panel Terintegrasi
            </span>
            <h2 className="text-3xl font-extrabold text-white">
              Semua yang Anda Butuhkan dalam 1 Konsol
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Tidak perlu membayar lisensi cPanel mahal. Cloudo Pro Master memberikan fitur komprehensif langsung bawaan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-3xl space-y-3 border border-slate-800">
              <div className="h-10 w-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Terminal className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-white text-base">Web SSH Terminal Langsung</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Akses konsol root tanpa perlu membuka PuTTY atau aplikasi eksternal. Mendukung perintah Bash, htop, Docker, dan Nginx.
              </p>
            </div>

            <div className="glass-card p-6 rounded-3xl space-y-3 border border-slate-800">
              <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Radio className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-white text-base">Anycast DNS Zone Editor</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Kelola record A, CNAME, MX, TXT (SPF/DKIM) dengan fitur proxy ala Cloudflare untuk menyembunyikan origin IP Anda.
              </p>
            </div>

            <div className="glass-card p-6 rounded-3xl space-y-3 border border-slate-800">
              <div className="h-10 w-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Database className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-white text-base">SQL Query Console & Redis</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Kelola MySQL 8.4, PostgreSQL 16, dan Redis cluster in-memory dengan web query runner interaktif dan auto-backup.
              </p>
            </div>

            <div className="glass-card p-6 rounded-3xl space-y-3 border border-slate-800">
              <div className="h-10 w-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-white text-base">1-Click App Installer</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pasang WordPress, Next.js 15, Ghost CMS, n8n Automation, dan phpMyAdmin hanya dengan sekali klik tanpa ribet.
              </p>
            </div>

            <div className="glass-card p-6 rounded-3xl space-y-3 border border-slate-800">
              <div className="h-10 w-10 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-white text-base">WAF & Fail2ban Defense</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Otomatis memblokir serangan brute force SSH, SQL injection, serta saklar "Under Attack Mode" untuk menangkis botnet.
              </p>
            </div>

            <div className="glass-card p-6 rounded-3xl space-y-3 border border-slate-800">
              <div className="h-10 w-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-white text-base">SSL ECC & HTTP/3 QUIC</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Sertifikat Let's Encrypt ECC 384-bit otomatis terpasang dengan dukungan HTTP/3 QUIC protokol untuk transfer kilat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Datacenter & Latency Tester Interactive */}
      <section id="datacenter" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Jaringan Global Anycast
            </span>
            <h2 className="text-3xl font-extrabold text-white">
              Datacenter Tier-IV dengan Latensi Terendah
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Terhubung langsung ke bursa pertukaran internet IIX, OpenIXP, Equinix Singapore, dan JPNAP Tokyo dengan bandwidth 10 Gbps edge.
            </p>
          </div>

          <button
            onClick={handleTestPing}
            disabled={isPinging}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 font-bold text-xs transition cursor-pointer self-start lg:self-auto"
          >
            <RotateCw className={`h-4 w-4 ${isPinging ? 'animate-spin' : ''}`} />
            <span>{isPinging ? 'Menguji Latensi Node...' : 'Uji Ping & Latensi Sekarang'}</span>
          </button>
        </div>

        {/* 4 Datacenter Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-3xl">🇮🇩</span>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                {pings.jkt} ms (Ultra Fast)
              </span>
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Jakarta, Indonesia</h3>
              <p className="text-xs text-slate-400 mt-0.5">Cyber 2 Kuningan / IDC 3D</p>
            </div>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
              IP: 103.190.214.88
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-3xl">🇸🇬</span>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                {pings.sin} ms
              </span>
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Singapore</h3>
              <p className="text-xs text-slate-400 mt-0.5">Equinix SG1 Tuas (10 Gbps)</p>
            </div>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
              IP: 103.176.78.42
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-3xl">🇯🇵</span>
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
                {pings.tyo} ms
              </span>
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Tokyo, Japan</h3>
              <p className="text-xs text-slate-400 mt-0.5">Equinix TY2 Shinagawa</p>
            </div>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
              IP: 139.180.201.15
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-3xl">🇩🇪</span>
              <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                {pings.fra} ms
              </span>
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Frankfurt, Germany</h3>
              <p className="text-xs text-slate-400 mt-0.5">Interxion Campus FRA-1</p>
            </div>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
              IP: 159.69.112.77
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section id="faq" className="py-20 bg-slate-900/40 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Pertanyaan yang Sering Diajukan
            </span>
            <h2 className="text-3xl font-extrabold text-white">FAQ Cloudo Pro Master</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = activeFaq === i;
              return (
                <div
                  key={i}
                  className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden transition"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : i)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-900/60 transition"
                  >
                    <span className="font-bold text-white text-sm">{faq.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-cyan-400 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="p-5 pt-0 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/60 mt-1">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/60 via-slate-900 to-indigo-950/60 p-8 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Siap Mengelola Server Hosting & VPS Anda?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              Akses panel kontrol CLOUDO PRO MASTER sekarang juga atau tes performa live domain cloudo.biz.id secara instan.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onGoToDashboard}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-extrabold text-sm shadow-xl shadow-cyan-600/30 transition cursor-pointer"
            >
              Masuk ke Panel Kontrol
            </button>
            <button
              onClick={onGoToLogin}
              className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm transition cursor-pointer"
            >
              Autentikasi Akun
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-12 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <Logo size="md" />
            <div className="flex flex-wrap items-center gap-6 text-slate-300">
              <a href="#vps" className="hover:text-cyan-400 transition">Paket VPS</a>
              <a href="#fitur" className="hover:text-cyan-400 transition">Fitur Panel</a>
              <a href="#datacenter" className="hover:text-cyan-400 transition">Datacenter</a>
              <button onClick={onOpenLivePreview} className="hover:text-cyan-400 transition">
                Live Test cloudo.biz.id
              </button>
              <button onClick={onGoToLogin} className="hover:text-cyan-400 transition">
                Login Panel
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-slate-500 text-[11px]">
            <p>© 2026 CLOUDO PRO MASTER (cloudo.biz.id). Dilindungi Hak Cipta.</p>
            <p className="flex items-center gap-3">
              <span>Metode Bayar: QRIS Instant • BCA • Mandiri • BRI • Visa/Mastercard • PayPal</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
