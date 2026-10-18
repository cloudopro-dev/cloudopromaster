import React, { useState } from 'react';
import {
  Database,
  Plus,
  Play,
  Download,
  Trash2,
  ExternalLink,
  CheckCircle2,
  Server,
  Zap,
  Key,
  Layers,
  Copy,
  Check,
} from 'lucide-react';
import { DatabaseInstance } from '../types/cloud';

interface DatabaseManagerViewProps {
  databases: DatabaseInstance[];
  onAddDatabase: (db: DatabaseInstance) => void;
  onDeleteDatabase: (id: string) => void;
}

export const DatabaseManagerView: React.FC<DatabaseManagerViewProps> = ({
  databases,
  onAddDatabase,
  onDeleteDatabase,
}) => {
  const [selectedDb, setSelectedDb] = useState<DatabaseInstance>(databases[0]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [sqlQuery, setSqlQuery] = useState('SELECT table_name, table_rows, data_length FROM information_schema.tables WHERE table_schema = "cloudo_prod_master" LIMIT 5;');
  const [queryResult, setQueryResult] = useState<any[] | null>([
    { table_name: 'users', table_rows: '42,190', data_length: '18.4 MB' },
    { table_name: 'vps_nodes', table_rows: '1,280', data_length: '2.8 MB' },
    { table_name: 'dns_records', table_rows: '9,410', data_length: '4.1 MB' },
    { table_name: 'invoices', table_rows: '15,300', data_length: '8.6 MB' },
    { table_name: 'activity_audit_logs', table_rows: '380,410', data_length: '92.5 MB' },
  ]);
  const [isExecutingQuery, setIsExecutingQuery] = useState(false);
  const [copiedHost, setCopiedHost] = useState(false);

  // New DB form
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState<'mysql' | 'postgres' | 'redis'>('mysql');
  const [newUser, setNewUser] = useState('');
  const [newPassword, setNewPassword] = useState('SecretCloudo2026!');

  const handleRunSql = () => {
    setIsExecutingQuery(true);
    setTimeout(() => {
      setIsExecutingQuery(false);
      if (sqlQuery.toLowerCase().includes('select')) {
        setQueryResult([
          { result: 'Query OK', rows_affected: 5, execution_time: '1.24 ms', buffer_pool_hit: '99.8%' },
          { column_1: 'sample_record_a', status: 'verified', timestamp: new Date().toISOString() },
        ]);
      } else {
        setQueryResult([{ status: 'Query OK', message: 'Statement executed successfully', time: '0.8 ms' }]);
      }
    }, 600);
  };

  const handleCreateDb = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;

    const newDb: DatabaseInstance = {
      id: `db-${Date.now()}`,
      name: newName.toLowerCase().replace(/[^a-z0-9_]/g, '_'),
      type: newType,
      version:
        newType === 'mysql'
          ? 'MySQL 8.4 LTS'
          : newType === 'postgres'
          ? 'PostgreSQL 16.4'
          : 'Redis 7.2',
      vpsId: 'vps-sgp-01',
      sizeMb: 12.0,
      maxConnections: newType === 'redis' ? 10000 : 300,
      activeConnections: 1,
      charset: newType === 'postgres' ? 'UTF8' : 'utf8mb4',
      collate: newType === 'postgres' ? 'en_US.UTF-8' : 'utf8mb4_unicode_ci',
      host: '127.0.0.1',
      port: newType === 'mysql' ? 3306 : newType === 'postgres' ? 5432 : 6379,
      userCount: 1,
      status: 'online',
      lastBackup: 'Initial snapshot created',
    };

    onAddDatabase(newDb);
    setSelectedDb(newDb);
    setShowAddModal(false);
    setNewName('');
    setNewUser('');
  };

  const copyHost = () => {
    navigator.clipboard.writeText(`${selectedDb.host}:${selectedDb.port}`);
    setCopiedHost(true);
    setTimeout(() => setCopiedHost(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
            <Database className="h-6 w-6 text-amber-400" />
            Manajemen Basis Data Relasional & Cache In-Memory
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Kluster database terenkripsi MySQL 8.4, PostgreSQL 16, dan Redis dengan auto-backup berkala
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-semibold px-4 py-2 text-xs shadow-md shadow-amber-600/20 transition cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Buat Database Baru</span>
          </button>
        </div>
      </div>

      {/* Database Quick Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {databases.map((db) => {
          const isSelected = db.id === selectedDb.id;
          return (
            <div
              key={db.id}
              onClick={() => setSelectedDb(db)}
              className={`p-4 rounded-xl border transition cursor-pointer relative ${
                isSelected
                  ? 'bg-slate-900 border-amber-500/80 shadow-md shadow-amber-500/10'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold uppercase ${
                    db.type === 'mysql'
                      ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                      : db.type === 'postgres'
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  }`}
                >
                  {db.type}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {db.status}
                </span>
              </div>
              <p className="font-bold text-sm text-white mt-2 truncate font-mono">{db.name}</p>
              <p className="text-xs text-slate-400 mt-0.5">{db.version}</p>
              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-300 font-mono pt-2 border-t border-slate-800">
                <span>Ukuran: {db.sizeMb} MB</span>
                <span className="text-amber-400">{db.activeConnections} Aktif</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Database Detail & SQL Console */}
      <div className="glass-card rounded-2xl border border-slate-800 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-white font-mono">{selectedDb.name}</h2>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                Port {selectedDb.port}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Host: {selectedDb.host} • Charset: {selectedDb.charset} • Backup: {selectedDb.lastBackup}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyHost}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition"
            >
              {copiedHost ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>Copy Endpoint</span>
            </button>
            <button
              onClick={() => alert(`Mengunduh Dump SQL untuk ${selectedDb.name}...`)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-semibold transition"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Dump SQL .gz</span>
            </button>
          </div>
        </div>

        {/* Interactive SQL Query Console */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2 font-mono">
              <Zap className="h-4 w-4 text-amber-400" />
              Web SQL Query Console ({selectedDb.type.toUpperCase()})
            </span>
            <span className="text-[11px] text-slate-400 font-mono">Read & Write Allowed</span>
          </div>

          <div className="rounded-xl bg-slate-950 border border-slate-800 p-3 font-mono space-y-3">
            <textarea
              rows={3}
              value={sqlQuery}
              onChange={(e) => setSqlQuery(e.target.value)}
              className="w-full bg-transparent text-xs text-cyan-300 font-mono focus:outline-none resize-none leading-relaxed"
              placeholder="Ketik query SQL di sini..."
            />

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
              <span className="text-[10px] text-slate-500">Shortcut: Tekan Run Query</span>
              <button
                onClick={handleRunSql}
                disabled={isExecutingQuery}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-bold font-mono transition shadow"
              >
                <Play className="h-3 w-3 fill-white" />
                <span>{isExecutingQuery ? 'Running...' : 'Run Query'}</span>
              </button>
            </div>
          </div>

          {/* Results Table */}
          {queryResult && (
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase text-[10px]">
                  <tr>
                    {Object.keys(queryResult[0]).map((key) => (
                      <th key={key} className="py-2.5 px-3">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {queryResult.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30">
                      {Object.values(row).map((val: any, colIdx) => (
                        <td key={colIdx} className="py-2.5 px-3 text-slate-200">
                          {String(val)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add Database Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-base">Buat Database Baru</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateDb} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Tipe Database:</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                >
                  <option value="mysql">MySQL 8.4 LTS Enterprise</option>
                  <option value="postgres">PostgreSQL 16.4 HA</option>
                  <option value="redis">Redis 7.2 In-Memory</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Nama Database:</label>
                <input
                  type="text"
                  required
                  placeholder="contoh: cloudo_ecommerce"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Database Username:</label>
                <input
                  type="text"
                  placeholder="user_cloudo"
                  value={newUser}
                  onChange={(e) => setNewUser(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Database Password:</label>
                <input
                  type="text"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
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
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold transition shadow-md shadow-amber-600/30"
                >
                  Inisialisasi Database
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
