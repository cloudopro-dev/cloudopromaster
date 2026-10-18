import React, { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Lock,
  Plus,
  Trash2,
  AlertTriangle,
  RefreshCw,
  CheckCircle2,
  UserX,
  Globe,
  Sliders,
  Zap,
} from 'lucide-react';
import { FirewallRule, BannedIp } from '../types/cloud';

interface SecurityFirewallViewProps {
  firewallRules: FirewallRule[];
  bannedIps: BannedIp[];
  onAddFirewallRule: (rule: FirewallRule) => void;
  onDeleteFirewallRule: (id: string) => void;
  onUnbanIp: (ip: string) => void;
}

export const SecurityFirewallView: React.FC<SecurityFirewallViewProps> = ({
  firewallRules,
  bannedIps,
  onAddFirewallRule,
  onDeleteFirewallRule,
  onUnbanIp,
}) => {
  const [underAttackMode, setUnderAttackMode] = useState(false);
  const [rateLimitEnabled, setRateLimitEnabled] = useState(true);
  const [showAddRuleModal, setShowAddRuleModal] = useState(false);

  // New rule state
  const [newRuleName, setNewRuleName] = useState('');
  const [newPort, setNewPort] = useState('');
  const [newProtocol, setNewProtocol] = useState<'TCP' | 'UDP' | 'ANY'>('TCP');
  const [newAction, setNewAction] = useState<'ALLOW' | 'DENY'>('ALLOW');
  const [newSource, setNewSource] = useState('0.0.0.0/0');

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPort || !newRuleName) return;

    const rule: FirewallRule = {
      id: `fw-${Date.now()}`,
      name: newRuleName,
      vpsId: 'vps-sgp-01',
      port: newPort,
      protocol: newProtocol,
      action: newAction,
      sourceIp: newSource,
      status: 'active',
      hits: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };

    onAddFirewallRule(rule);
    setShowAddRuleModal(false);
    setNewRuleName('');
    setNewPort('');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-cyan-400" />
            Keamanan, WAF & Perlindungan DDoS
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manajemen firewall port UFW, mitigasi DDoS 2.5 Tbps, filter Fail2ban, dan inspeksi sertifikat SSL
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddRuleModal(true)}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold px-4 py-2 text-xs shadow-md shadow-cyan-600/20 transition cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Tambah Aturan Firewall</span>
          </button>
        </div>
      </div>

      {/* DDoS Shield & Under Attack Mode Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card rounded-2xl border border-cyan-500/30 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Cloudo Anti-DDoS Anycast Shield</h3>
                <p className="text-xs text-slate-400">Proteksi aktif untuk cloudo.biz.id</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Active • 2.5 Tbps
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Menyaring lalu lintas volumetrik UDP flood, SYN flood, dan Layer 7 HTTP request attack
            sebelum menyentuh server asal.
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs font-mono text-slate-400">
            <span>Serangan Terblokir 24 Jam:</span>
            <span className="font-bold text-cyan-300">142,890 Request</span>
          </div>
        </div>

        <div className="glass-card rounded-2xl border border-slate-800 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div
                className={`h-9 w-9 rounded-xl flex items-center justify-center transition ${
                  underAttackMode
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                <ShieldAlert className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Mode "Under Attack"</h3>
                <p className="text-xs text-slate-400">Tampilkan interstitial challenge browser</p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={underAttackMode}
                onChange={(e) => setUnderAttackMode(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
            </label>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Gunakan saat server mengalami lonjakan traffic bot yang tidak wajar. Setiap pengunjung
            akan diverifikasi melalui cryptographic proof-of-work 5 detik.
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs font-mono text-slate-400">
            <span>Status Mode:</span>
            <span className={underAttackMode ? 'text-amber-400 font-bold' : 'text-slate-400'}>
              {underAttackMode ? 'Aktif (Challenge 5s)' : 'Normal (Transparan)'}
            </span>
          </div>
        </div>
      </div>

      {/* Firewall Rules Table */}
      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-4 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-white text-sm flex items-center gap-2">
            <Lock className="h-4 w-4 text-cyan-400" />
            Aturan Port Firewall (UFW)
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            Total {firewallRules.length} Aturan Aktif
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Nama Layanan</th>
                <th className="py-3 px-4">Port</th>
                <th className="py-3 px-4">Protokol</th>
                <th className="py-3 px-4">Aksi</th>
                <th className="py-3 px-4">Sumber IP</th>
                <th className="py-3 px-4">Paket Terproses</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {firewallRules.map((rule) => (
                <tr key={rule.id} className="hover:bg-slate-900/40 transition">
                  <td className="py-3 px-4 font-bold text-white font-sans">{rule.name}</td>
                  <td className="py-3 px-4 text-cyan-300 font-bold">{rule.port}</td>
                  <td className="py-3 px-4 text-slate-300">{rule.protocol}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        rule.action === 'ALLOW'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {rule.action}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-400">{rule.sourceIp}</td>
                  <td className="py-3 px-4 text-slate-300">{rule.hits.toLocaleString()} hits</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onDeleteFirewallRule(rule.id)}
                      className="p-1 rounded text-slate-400 hover:text-rose-400 transition"
                      title="Hapus Aturan"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fail2ban Banned IPs Section */}
      <div className="glass-card rounded-2xl border border-slate-800 p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <UserX className="h-4 w-4 text-rose-400" />
              Fail2ban: Alamat IP Terblokir Otomatis
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Daftar IP yang otomatis di-jail karena percobaan login brute force atau injeksi SQL
            </p>
          </div>
          <span className="text-xs font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
            {bannedIps.length} IP Banned
          </span>
        </div>

        <div className="space-y-2">
          {bannedIps.map((banned) => (
            <div
              key={banned.ip}
              className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-rose-400">{banned.ip}</span>
                  <span className="px-1.5 py-0.2 rounded bg-slate-800 text-[10px] text-slate-300">
                    {banned.countryName} ({banned.countryCode})
                  </span>
                  <span className="text-slate-400 text-[11px] font-sans">• {banned.jail}</span>
                </div>
                <p className="text-[11px] text-slate-400 font-sans mt-0.5">{banned.reason}</p>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <span className="text-slate-500 text-[10px]">{banned.bannedAt}</span>
                <button
                  onClick={() => onUnbanIp(banned.ip)}
                  className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-emerald-950/40 text-slate-300 hover:text-emerald-400 border border-slate-700 text-xs font-sans font-medium transition cursor-pointer"
                >
                  Unban IP
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Firewall Rule Modal */}
      {showAddRuleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-base">Tambah Aturan Firewall UFW</h3>
              <button
                onClick={() => setShowAddRuleModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateRule} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Nama Layanan / Catatan:</label>
                <input
                  type="text"
                  required
                  placeholder="contoh: Redis Internal Port atau Custom API"
                  value={newRuleName}
                  onChange={(e) => setNewRuleName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Nomor Port:</label>
                  <input
                    type="text"
                    required
                    placeholder="8080 atau 3000-4000"
                    value={newPort}
                    onChange={(e) => setNewPort(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Protokol:</label>
                  <select
                    value={newProtocol}
                    onChange={(e) => setNewProtocol(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                  >
                    <option value="TCP">TCP</option>
                    <option value="UDP">UDP</option>
                    <option value="ANY">TCP & UDP (ANY)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Tindakan (Action):</label>
                  <select
                    value={newAction}
                    onChange={(e) => setNewAction(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                  >
                    <option value="ALLOW">ALLOW (Izinkan)</option>
                    <option value="DENY">DENY (Tolak)</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Sumber IP:</label>
                  <input
                    type="text"
                    value={newSource}
                    onChange={(e) => setNewSource(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddRuleModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold transition shadow-md shadow-cyan-600/30"
                >
                  Simpan Aturan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
