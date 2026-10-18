import React, { useState } from 'react';
import {
  Clock,
  Plus,
  Trash2,
  Play,
  CheckCircle2,
  RotateCw,
  Terminal,
} from 'lucide-react';
import { CronJob } from '../types/cloud';

interface CronJobsViewProps {
  cronJobs: CronJob[];
  onAddCron: (cron: CronJob) => void;
  onDeleteCron: (id: string) => void;
}

export const CronJobsView: React.FC<CronJobsViewProps> = ({
  cronJobs,
  onAddCron,
  onDeleteCron,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCommand, setNewCommand] = useState('');
  const [preset, setPreset] = useState('daily');

  const handleCreateCron = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newCommand) return;

    let schedule = '0 0 * * *';
    let scheduleHuman = 'Every day at midnight';

    if (preset === 'minute') {
      schedule = '* * * * *';
      scheduleHuman = 'Every minute';
    } else if (preset === 'hourly') {
      schedule = '0 * * * *';
      scheduleHuman = 'Every hour';
    } else if (preset === 'daily') {
      schedule = '0 3 * * *';
      scheduleHuman = 'Every day at 03:00 AM UTC';
    } else if (preset === 'weekly') {
      schedule = '0 4 * * 0';
      scheduleHuman = 'Every Sunday at 04:00 AM';
    }

    const item: CronJob = {
      id: `cron-${Date.now()}`,
      name: newName,
      vpsId: 'vps-sgp-01',
      command: newCommand,
      schedule,
      scheduleHuman,
      lastRun: 'Scheduled',
      nextRun: 'Next upcoming slot',
      status: 'enabled',
      lastExitCode: 0,
    };

    onAddCron(item);
    setShowAddModal(false);
    setNewName('');
    setNewCommand('');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
            <Clock className="h-6 w-6 text-cyan-400" />
            Cron Jobs & Penjadwalan Tugas Otomatis
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Jalankan skrip backup otomatis, perpanjangan SSL, dan pembersihan cache berkala
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold px-4 py-2 text-xs shadow-md shadow-cyan-600/20 transition cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Tambah Cron Job</span>
          </button>
        </div>
      </div>

      {/* Crontab List */}
      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-4 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-white text-sm">Daftar Crontab Aktif</h3>
          <span className="text-xs text-slate-400 font-mono">{cronJobs.length} Jobs</span>
        </div>

        <div className="divide-y divide-slate-800">
          {cronJobs.map((job) => (
            <div key={job.id} className="p-4 hover:bg-slate-900/40 transition flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{job.name}</span>
                  <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                    {job.schedule}
                  </span>
                </div>
                <div className="font-mono text-slate-400 text-[11px] bg-slate-950 px-2 py-1 rounded border border-slate-800 inline-block">
                  $ {job.command}
                </div>
                <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                  <span>Jadwal: {job.scheduleHuman}</span>
                  <span>•</span>
                  <span className="text-emerald-400">Terakhir: {job.lastRun}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-center">
                <button
                  onClick={() => alert(`Menjalankan tugas: ${job.name} sekarang...`)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 transition"
                >
                  <Play className="h-3 w-3 fill-slate-300" />
                  <span>Jalankan Manual</span>
                </button>
                <button
                  onClick={() => onDeleteCron(job.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition"
                  title="Hapus Cron"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Cron Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-base">Tambah Cron Job Otomatis</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCron} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Nama Tugas:</label>
                <input
                  type="text"
                  required
                  placeholder="contoh: Auto Backup Database S3"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Perintah Shell (Command):</label>
                <input
                  type="text"
                  required
                  placeholder="php /var/www/artisan schedule:run atau /usr/bin/certbot renew"
                  value={newCommand}
                  onChange={(e) => setNewCommand(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Frekuensi Penjadwalan:</label>
                <select
                  value={preset}
                  onChange={(e) => setPreset(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                >
                  <option value="daily">Setiap Hari jam 03:00 AM (0 3 * * *)</option>
                  <option value="hourly">Setiap Jam (0 * * * *)</option>
                  <option value="weekly">Setiap Minggu jam 04:00 AM (0 4 * * 0)</option>
                  <option value="minute">Setiap Menit (* * * * *)</option>
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
                  Simpan Jadwal Cron
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
