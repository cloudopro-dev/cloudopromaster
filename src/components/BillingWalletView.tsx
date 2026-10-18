import React, { useState } from 'react';
import {
  CreditCard,
  Wallet,
  Download,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Plus,
  Shield,
  Zap,
} from 'lucide-react';
import { Invoice } from '../types/cloud';
import { INITIAL_INVOICES } from '../data/mockInitialData';

interface BillingWalletViewProps {
  currency: 'IDR' | 'USD';
}

export const BillingWalletView: React.FC<BillingWalletViewProps> = ({ currency }) => {
  const [invoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [walletBalanceIdr, setWalletBalanceIdr] = useState(4500000);
  const [walletBalanceUsd, setWalletBalanceUsd] = useState(285);
  const [showTopupModal, setShowTopupModal] = useState(false);
  const [topupAmount, setTopupAmount] = useState(500000);
  const [selectedPayment, setSelectedPayment] = useState('qris');

  const formatCost = (idr: number, usd: number) => {
    return currency === 'IDR'
      ? `Rp ${idr.toLocaleString('id-ID')}`
      : `$${usd.toLocaleString()}`;
  };

  const handleTopup = (e: React.FormEvent) => {
    e.preventDefault();
    setWalletBalanceIdr((prev) => prev + topupAmount);
    setWalletBalanceUsd((prev) => prev + Math.round(topupAmount / 15700));
    setShowTopupModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-emerald-400" />
            Billing, Invoices & Saldo Cloud Wallet
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Pantau tagihan server, unduh kwitansi resmi, dan kelola auto-debit domain cloudo.biz.id
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTopupModal(true)}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold px-4 py-2 text-xs shadow-md shadow-emerald-600/20 transition cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Top Up Saldo Cloud</span>
          </button>
        </div>
      </div>

      {/* Wallet Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Wallet Balance */}
        <div className="glass-card rounded-2xl border border-emerald-500/30 p-5 space-y-3 bg-gradient-to-br from-slate-900 to-emerald-950/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-2">
              <Wallet className="h-4 w-4 text-emerald-400" />
              Saldo Cloud Wallet Aktif
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Auto-Debit OK
            </span>
          </div>

          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
            {formatCost(walletBalanceIdr, walletBalanceUsd)}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] text-slate-400">
            <span>Estimasi Durasi: 2.5 Bulan</span>
            <span className="text-emerald-400">Tanpa Gangguan</span>
          </div>
        </div>

        {/* Next Bill */}
        <div className="glass-card rounded-2xl border border-slate-800 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-2">
              <Clock className="h-4 w-4 text-cyan-400" />
              Jatuh Tempo Berikutnya
            </span>
            <span className="text-[10px] font-mono text-cyan-400">14 Hari Lagi</span>
          </div>

          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
            {formatCost(1835000, 117)}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] text-slate-400">
            <span>01 November 2026</span>
            <span className="text-cyan-300">Auto-Dipotong Saldo</span>
          </div>
        </div>

        {/* SLA Guarantee */}
        <div className="glass-card rounded-2xl border border-slate-800 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-2">
              <Shield className="h-4 w-4 text-amber-400" />
              Jaminan SLA Enterprise
            </span>
            <span className="text-[10px] font-mono text-emerald-400">Verified</span>
          </div>

          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
            99.99% Uptime
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] text-slate-400">
            <span>Dukungan 24/7 Priority NOC</span>
            <span className="text-slate-300">Tier-IV Data Center</span>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-4 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-white text-sm">Riwayat Faktur & Pembayaran</h3>
          <span className="text-xs text-slate-400 font-mono">
            Total {invoices.length} Faktur
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">No. Faktur</th>
                <th className="py-3 px-4">Tanggal Diterbitkan</th>
                <th className="py-3 px-4">Deskripsi Layanan</th>
                <th className="py-3 px-4">Total Biaya</th>
                <th className="py-3 px-4">Metode Bayar</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Kwitansi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-900/40 transition">
                  <td className="py-3 px-4 font-bold text-cyan-300">{inv.number}</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">{inv.date}</td>
                  <td className="py-3 px-4 text-slate-300 font-sans max-w-xs truncate">
                    {inv.items.join(', ')}
                  </td>
                  <td className="py-3 px-4 font-bold text-white">
                    {formatCost(inv.amountIdr, inv.amountUsd)}
                  </td>
                  <td className="py-3 px-4 text-slate-400 font-sans">{inv.paymentMethod}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        inv.status === 'paid'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {inv.status === 'paid' ? 'LUNAS (PAID)' : 'MENUNGGU'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => alert(`Mengunduh PDF Kwitansi Resmi: ${inv.number}`)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 transition"
                      title="Download PDF Invoice"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Topup Modal */}
      {showTopupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-base">Top Up Saldo Cloud Wallet</h3>
              <button
                onClick={() => setShowTopupModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleTopup} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-2">Pilih Nominal Top Up:</label>
                <div className="grid grid-cols-2 gap-2">
                  {[250000, 500000, 1000000, 2500000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setTopupAmount(amt)}
                      className={`p-2.5 rounded-xl border text-center font-mono font-bold transition ${
                        topupAmount === amt
                          ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      Rp {amt.toLocaleString('id-ID')}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-2">Metode Pembayaran:</label>
                <div className="space-y-2">
                  {[
                    { id: 'qris', label: 'QRIS Instant (GoPay, OVO, Dana, ShopeePay)' },
                    { id: 'bca', label: 'BCA Virtual Account (Auto-Verifikasi 24 Jam)' },
                    { id: 'mandiri', label: 'Bank Mandiri / BRI / BNI Virtual Account' },
                    { id: 'cc', label: 'Kartu Kredit Visa / MasterCard / PayPal' },
                  ].map((p) => (
                    <label
                      key={p.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${
                        selectedPayment === p.id
                          ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="pay"
                        value={p.id}
                        checked={selectedPayment === p.id}
                        onChange={() => setSelectedPayment(p.id)}
                        className="accent-cyan-500"
                      />
                      <span className="font-medium font-sans">{p.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowTopupModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold transition shadow-md shadow-emerald-600/30"
                >
                  Konfirmasi Pembayaran
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
