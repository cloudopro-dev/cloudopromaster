import React, { useState } from 'react';
import {
  Lock,
  Mail,
  Key,
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowRight,
  Globe,
  CheckCircle2,
  Zap,
  Server,
  Fingerprint,
  ChevronLeft,
} from 'lucide-react';
import { Logo } from './Logo';

interface LoginViewProps {
  onLoginSuccess: (userRole: string) => void;
  onGoToLanding: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onLoginSuccess,
  onGoToLanding,
}) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('admin@cloudo.biz.id');
  const [password, setPassword] = useState('CloudoMaster2026!');
  const [fullName, setFullName] = useState('Super Admin Cloudo');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(isRegister ? 'New Administrator' : 'Super Administrator');
    }, 900);
  };

  const handleQuickDemoAdmin = () => {
    setEmail('admin@cloudo.biz.id');
    setPassword('CloudoMaster2026!');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess('Super Administrator (Root)');
    }, 600);
  };

  const handleQuickDemoDevops = () => {
    setEmail('devops@cloudo.biz.id');
    setPassword('DevOpsCloudo99!');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess('DevOps Engineer');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Background Cyber Ambient Lights */}
      <div className="absolute top-0 left-1/4 -mt-32 w-96 h-96 rounded-full bg-cyan-500/15 blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 -mb-32 w-96 h-96 rounded-full bg-indigo-600/15 blur-[128px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0a_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Top Navigation Bar */}
      <header className="relative z-10 w-full border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-xl px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <button
          onClick={onGoToLanding}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-300 transition"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Kembali ke Halaman Depan</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Gateway: auth.cloudo.biz.id</span>
          <span className="hidden sm:inline text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 rounded text-[10px]">
            TLS 1.3 OK
          </span>
        </div>
      </header>

      {/* Main Login Card Section */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 my-auto">
        <div className="w-full max-w-md rounded-3xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl shadow-cyan-950/30 space-y-6">
          {/* Logo & Headline */}
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-3">
              <Logo size="lg" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {isRegister ? 'Buat Akun Cloudo Pro' : 'Masuk ke Control Panel'}
            </h1>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Akses konsol manajemen cloud server VPS, hosting, DNS Anycast, dan basis data terpusat
            </p>
          </div>

          {/* Quick Demo Login Badges */}
          <div className="p-3 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-slate-300 flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-cyan-400" />
                Demo 1-Klik Langsung Masuk:
              </span>
              <span className="text-[10px] text-cyan-400 font-mono">Tanpa Ketik</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleQuickDemoAdmin}
                className="py-1.5 px-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <Fingerprint className="h-3.5 w-3.5" />
                <span>Root Admin</span>
              </button>
              <button
                type="button"
                onClick={handleQuickDemoDevops}
                className="py-1.5 px-2 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-300 text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <Server className="h-3.5 w-3.5" />
                <span>DevOps NOC</span>
              </button>
            </div>
          </div>

          {/* Tab Selector: Login vs Register */}
          <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setIsRegister(false)}
              className={`flex-1 py-1.5 rounded-lg transition ${
                !isRegister
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Masuk (Login)
            </button>
            <button
              onClick={() => setIsRegister(true)}
              className={`flex-1 py-1.5 rounded-lg transition ${
                isRegister
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Daftar Akun
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {isRegister && (
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Nama Lengkap:</label>
                <input
                  type="text"
                  required
                  placeholder="Nama Anda atau Perusahaan"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            )}

            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                Alamat Email / ID Admin:
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder="admin@cloudo.biz.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-slate-300 font-semibold">Kata Sandi (Password):</label>
                {!isRegister && (
                  <button
                    type="button"
                    onClick={() => alert('Link reset password telah dikirim ke email admin@cloudo.biz.id.')}
                    className="text-[11px] text-cyan-400 hover:text-cyan-300 hover:underline"
                  >
                    Lupa Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-slate-400 text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded accent-cyan-500"
                />
                <span>Ingat sesi browser ini (30 Hari)</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 via-sky-500 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-600/30 transition active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Mengautentikasi Sesi...</span>
                </>
              ) : (
                <>
                  <span>{isRegister ? 'Daftar & Buka Panel' : 'Masuk ke Panel Kontrol'}</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Security Assurance */}
          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Dilindungi Cloudflare Anycast & Enkripsi AES-256</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full py-4 text-center text-xs text-slate-500 border-t border-slate-900">
        © 2026 CLOUDO PRO MASTER (cloudo.biz.id). All rights reserved. Tier-IV Hypervisor Network.
      </footer>
    </div>
  );
};
