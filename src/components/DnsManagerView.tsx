import React, { useState } from 'react';
import {
  Radio,
  Plus,
  Trash2,
  CheckCircle2,
  Globe,
  Cloud,
  CloudOff,
  Search,
  Download,
  RefreshCw,
  ExternalLink,
  Shield,
} from 'lucide-react';
import { DnsRecord, DnsRecordType } from '../types/cloud';

interface DnsManagerViewProps {
  records: DnsRecord[];
  onAddRecord: (rec: Omit<DnsRecord, 'id'>) => void;
  onDeleteRecord: (id: string) => void;
  onToggleProxy: (id: string) => void;
}

export const DnsManagerView: React.FC<DnsManagerViewProps> = ({
  records,
  onAddRecord,
  onDeleteRecord,
  onToggleProxy,
}) => {
  const [filterType, setFilterType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSimulatingPropagation, setIsSimulatingPropagation] = useState(false);
  const [propagationDone, setPropagationDone] = useState(false);

  // New record form state
  const [newType, setNewType] = useState<DnsRecordType>('A');
  const [newName, setNewName] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newTtl, setNewTtl] = useState(300);
  const [newPriority, setNewPriority] = useState<number | undefined>(undefined);
  const [newProxied, setNewProxied] = useState(true);
  const [newComment, setNewComment] = useState('');

  const filteredRecords = records.filter((r) => {
    const matchesType = filterType === 'ALL' || r.type === filterType;
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.comment && r.comment.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  const handleCreateRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newValue) return;

    onAddRecord({
      domain: 'cloudo.biz.id',
      type: newType,
      name: newName,
      value: newValue,
      ttl: Number(newTtl),
      priority: newType === 'MX' ? Number(newPriority) || 10 : undefined,
      proxied: newProxied,
      comment: newComment || undefined,
    });

    setShowAddModal(false);
    setNewName('');
    setNewValue('');
    setNewComment('');
  };

  const handleTestPropagation = () => {
    setIsSimulatingPropagation(true);
    setPropagationDone(false);
    setTimeout(() => {
      setIsSimulatingPropagation(false);
      setPropagationDone(true);
    }, 1500);
  };

  const handleExportZone = () => {
    let zoneContent = `; BIND Zone File for cloudo.biz.id\n; Exported from CLOUDO PRO MASTER\n$ORIGIN cloudo.biz.id.\n$TTL 3600\n\n`;
    records.forEach((r) => {
      zoneContent += `${r.name.padEnd(20)} ${r.ttl} IN ${r.type.padEnd(6)} ${r.priority ? `${r.priority} ` : ''}${r.value}\n`;
    });

    const blob = new Blob([zoneContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cloudo.biz.id.zone';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
            <Radio className="h-6 w-6 text-cyan-400" />
            Anycast DNS Zone Editor (cloudo.biz.id)
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Pengaturan rute DNS global latensi rendah dengan Anycast routing dan proteksi proxy Cloudflare
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportZone}
            className="flex items-center gap-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 px-3.5 py-2 text-xs font-semibold transition"
          >
            <Download className="h-4 w-4 text-slate-400" />
            <span>Export BIND Zone</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold px-4 py-2 text-xs shadow-md shadow-cyan-600/20 transition cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Tambah DNS Record</span>
          </button>
        </div>
      </div>

      {/* DNS Propagation Global Status Card */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Anycast DNS Global Health
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Nameservers: ns1.cloudo.biz.id • ns2.cloudo.biz.id
            </span>
          </div>

          <button
            onClick={handleTestPropagation}
            disabled={isSimulatingPropagation}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition"
          >
            <RefreshCw className={`h-3 w-3 ${isSimulatingPropagation ? 'animate-spin' : ''}`} />
            <span>{isSimulatingPropagation ? 'Checking 28 PoPs...' : 'Test Propagasi Global'}</span>
          </button>
        </div>

        {propagationDone && (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 pt-2 border-t border-slate-800/60 text-[11px] font-mono">
            {[
              { loc: 'Jakarta (JKT)', status: 'OK • 3ms' },
              { loc: 'Singapore (SIN)', status: 'OK • 12ms' },
              { loc: 'Tokyo (NRT)', status: 'OK • 45ms' },
              { loc: 'Frankfurt (FRA)', status: 'OK • 82ms' },
              { loc: 'Silicon Valley (SJC)', status: 'OK • 110ms' },
              { loc: 'Sydney (SYD)', status: 'OK • 68ms' },
            ].map((node, i) => (
              <div key={i} className="p-2 rounded bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-300">{node.loc}</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  {node.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['ALL', 'A', 'AAAA', 'CNAME', 'MX', 'TXT'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition ${
                filterType === type
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Cari host atau record..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
          />
        </div>
      </div>

      {/* DNS Records Table */}
      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Tipe</th>
                <th className="py-3 px-4">Nama Record</th>
                <th className="py-3 px-4">Konten / Nilai Target</th>
                <th className="py-3 px-4">TTL</th>
                <th className="py-3 px-4">Proxy Status</th>
                <th className="py-3 px-4">Keterangan</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredRecords.map((r) => (
                <tr key={r.id} className="hover:bg-slate-900/40 transition">
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded font-bold text-[11px] ${
                        r.type === 'A'
                          ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                          : r.type === 'CNAME'
                          ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30'
                          : r.type === 'MX'
                          ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                          : r.type === 'TXT'
                          ? 'bg-purple-500/15 text-purple-400 border border-purple-500/30'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {r.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-white">{r.name}</td>
                  <td className="py-3 px-4 text-slate-300 max-w-xs truncate" title={r.value}>
                    {r.priority ? `[Priority: ${r.priority}] ` : ''}
                    {r.value}
                  </td>
                  <td className="py-3 px-4 text-slate-400">
                    {r.ttl === 300 ? 'Auto (5 min)' : `${r.ttl}s`}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => onToggleProxy(r.id)}
                      className={`flex items-center gap-1.5 px-2 py-1 rounded text-[11px] font-sans font-medium transition cursor-pointer ${
                        r.proxied
                          ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                      title={
                        r.proxied
                          ? 'Proxied: Menyembunyikan origin IP & memfilter serangan DDoS'
                          : 'DNS Only: Resolusi langsung tanpa proteksi proxy'
                      }
                    >
                      {r.proxied ? (
                        <>
                          <Cloud className="h-3 w-3 fill-orange-400" />
                          <span>Proxied</span>
                        </>
                      ) : (
                        <>
                          <CloudOff className="h-3 w-3" />
                          <span>DNS Only</span>
                        </>
                      )}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-slate-400 font-sans text-[11px]">
                    {r.comment || '-'}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onDeleteRecord(r.id)}
                      className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition"
                      title="Hapus Record"
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

      {/* Add DNS Record Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-base">Tambah Record DNS untuk cloudo.biz.id</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateRecord} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Tipe Record:</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as DnsRecordType)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                  >
                    <option value="A">A (IPv4 Address)</option>
                    <option value="AAAA">AAAA (IPv6 Address)</option>
                    <option value="CNAME">CNAME (Alias)</option>
                    <option value="MX">MX (Mail Exchange)</option>
                    <option value="TXT">TXT (SPF / DKIM / Verification)</option>
                    <option value="NS">NS (Name Server)</option>
                    <option value="CAA">CAA (Certificate Authority)</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Nama Subhost (@ atau sub):</label>
                  <input
                    type="text"
                    required
                    placeholder="@ atau panel atau api"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  Konten / Nilai Target:
                </label>
                <input
                  type="text"
                  required
                  placeholder={
                    newType === 'A'
                      ? '103.176.78.42'
                      : newType === 'CNAME'
                      ? 'cloudo.biz.id'
                      : 'Isi value record'
                  }
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                />
              </div>

              {newType === 'MX' && (
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Priority:</label>
                  <input
                    type="number"
                    value={newPriority || 10}
                    onChange={(e) => setNewPriority(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">TTL (Time to Live):</label>
                  <select
                    value={newTtl}
                    onChange={(e) => setNewTtl(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                  >
                    <option value={300}>Auto (5 menit)</option>
                    <option value={600}>10 menit</option>
                    <option value={3600}>1 jam</option>
                    <option value={86400}>1 hari</option>
                  </select>
                </div>

                <div className="flex items-center gap-3 pt-6">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                    <input
                      type="checkbox"
                      checked={newProxied}
                      onChange={(e) => setNewProxied(e.target.checked)}
                      className="h-4 w-4 rounded accent-orange-500"
                    />
                    <span className="font-semibold text-orange-400">Aktifkan Cloudflare Proxy</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Keterangan / Catatan:</label>
                <input
                  type="text"
                  placeholder="Opsional: Keterangan record"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
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
                  Simpan DNS Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
