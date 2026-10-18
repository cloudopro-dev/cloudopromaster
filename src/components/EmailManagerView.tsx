import React, { useState } from 'react';
import {
  Mail,
  Plus,
  Trash2,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  HardDrive,
  Key,
  Lock,
} from 'lucide-react';
import { EmailAccount } from '../types/cloud';

interface EmailManagerViewProps {
  emails: EmailAccount[];
  onAddEmail: (email: EmailAccount) => void;
  onDeleteEmail: (id: string) => void;
}

export const EmailManagerView: React.FC<EmailManagerViewProps> = ({
  emails,
  onAddEmail,
  onDeleteEmail,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPrefix, setNewPrefix] = useState('');
  const [newPassword, setNewPassword] = useState('CloudoMail2026!');
  const [newQuota, setNewQuota] = useState(5120);

  const handleCreateEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrefix) return;

    const email: EmailAccount = {
      id: `mail-${Date.now()}`,
      email: `${newPrefix.toLowerCase()}@cloudo.biz.id`,
      domain: 'cloudo.biz.id',
      quotaMb: Number(newQuota),
      usedMb: 24,
      status: 'active',
      spamScore: 0.1,
      dkimActive: true,
      spfActive: true,
    };

    onAddEmail(email);
    setShowAddModal(false);
    setNewPrefix('');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
            <Mail className="h-6 w-6 text-cyan-400" />
            Email Bisnis & Webmail (@cloudo.biz.id)
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Kelola kotak surat korporat dengan verifikasi DKIM/SPF 100%, filter SpamAssassin, dan webmail
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Membuka Roundcube Webmail SSL client untuk cloudo.biz.id...')}
            className="flex items-center gap-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700 px-3.5 py-2 text-xs font-semibold transition"
          >
            <ExternalLink className="h-4 w-4" />
            <span>Launch Webmail</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold px-4 py-2 text-xs shadow-md shadow-cyan-600/20 transition cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Buat Email Baru</span>
          </button>
        </div>
      </div>

      {/* Mail Server Connection Settings Box */}
      <div className="glass-card rounded-2xl border border-slate-800 p-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-slate-400 text-[11px] block font-sans">Incoming IMAP (SSL):</span>
          <span className="text-white font-bold block mt-1">mail.cloudo.biz.id</span>
          <span className="text-cyan-400 text-[11px]">Port 993 (TLS Encrypted)</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-slate-400 text-[11px] block font-sans">Outgoing SMTP (TLS):</span>
          <span className="text-white font-bold block mt-1">mail.cloudo.biz.id</span>
          <span className="text-cyan-400 text-[11px]">Port 465 / 587 (Authentication Required)</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-slate-400 text-[11px] block font-sans">Deliverability Shield:</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" /> SPF Pass
            </span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" /> DKIM Valid
            </span>
          </div>
        </div>
      </div>

      {/* Mail Accounts Table */}
      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-4 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-white text-sm">Daftar Akun Email Aktif</h3>
          <span className="text-xs text-slate-400 font-mono">{emails.length} Mailbox</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Alamat Email</th>
                <th className="py-3 px-4">Kapasitas Quota</th>
                <th className="py-3 px-4">Penggunaan Disk</th>
                <th className="py-3 px-4">Keamanan / Spam</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {emails.map((m) => {
                const percent = Math.round((m.usedMb / m.quotaMb) * 100);
                return (
                  <tr key={m.id} className="hover:bg-slate-900/40 transition">
                    <td className="py-3 px-4 font-bold text-cyan-300">{m.email}</td>
                    <td className="py-3 px-4 text-slate-300">
                      {(m.quotaMb / 1024).toFixed(1)} GB
                    </td>
                    <td className="py-3 px-4">
                      <div className="w-36 space-y-1">
                        <div className="flex justify-between text-[10px] text-slate-400">
                          <span>{m.usedMb} MB</span>
                          <span>{percent}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-cyan-400 rounded-full"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-300 font-sans">
                      <span className="flex items-center gap-1 text-emerald-400 text-[11px]">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        DKIM & SPF OK (Score: {m.spamScore})
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {m.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onDeleteEmail(m.id)}
                        className="p-1 rounded text-slate-400 hover:text-rose-400 transition"
                        title="Hapus Akun Email"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Email Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-base">Buat Akun Email Bisnis Baru</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateEmail} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Prefix Email:</label>
                <div className="flex items-center rounded-xl bg-slate-950 border border-slate-800 overflow-hidden font-mono">
                  <input
                    type="text"
                    required
                    placeholder="kontak atau halo"
                    value={newPrefix}
                    onChange={(e) => setNewPrefix(e.target.value)}
                    className="flex-1 p-2.5 bg-transparent text-white focus:outline-none"
                  />
                  <span className="px-3 text-cyan-400 bg-slate-900 text-xs">@cloudo.biz.id</span>
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Password Kotak Masuk:</label>
                <input
                  type="text"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Kapasitas Quota:</label>
                <select
                  value={newQuota}
                  onChange={(e) => setNewQuota(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                >
                  <option value={2048}>2 GB Quota</option>
                  <option value={5120}>5 GB Quota</option>
                  <option value={10240}>10 GB Quota</option>
                  <option value={25600}>25 GB Enterprise Quota</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
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
                  Buat Mailbox
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
