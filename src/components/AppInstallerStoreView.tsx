import React, { useState } from 'react';
import {
  Grid,
  Layers,
  Globe,
  Database,
  Code,
  Cpu,
  Box,
  Package,
  FileText,
  CheckCircle2,
  ExternalLink,
  Download,
  RefreshCw,
  Search,
} from 'lucide-react';
import { OneClickApp, DomainSite } from '../types/cloud';
import { ONE_CLICK_APPS } from '../data/mockInitialData';

interface AppInstallerStoreViewProps {
  domains: DomainSite[];
  onOpenLivePreview: () => void;
}

export const AppInstallerStoreView: React.FC<AppInstallerStoreViewProps> = ({
  domains,
  onOpenLivePreview,
}) => {
  const [apps] = useState<OneClickApp[]>(ONE_CLICK_APPS);
  const [selectedApp, setSelectedApp] = useState<OneClickApp | null>(null);
  const [selectedDomain, setSelectedDomain] = useState(domains[0]?.domain || 'cloudo.biz.id');
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isInstalling, setIsInstalling] = useState(false);
  const [installStep, setInstallStep] = useState(0);
  const [installComplete, setInstallComplete] = useState(false);

  const categories = ['ALL', 'CMS', 'Framework', 'Database', 'Automation', 'Tools'];

  const filteredApps = apps.filter((app) => {
    const matchesCat = filterCategory === 'ALL' || app.category === filterCategory;
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleStartInstall = () => {
    setIsInstalling(true);
    setInstallStep(1);
    setInstallComplete(false);

    setTimeout(() => setInstallStep(2), 800);
    setTimeout(() => setInstallStep(3), 1600);
    setTimeout(() => {
      setInstallStep(4);
      setIsInstalling(false);
      setInstallComplete(true);
    }, 2400);
  };

  const getAppIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe':
        return Globe;
      case 'Layers':
        return Layers;
      case 'FileText':
        return FileText;
      case 'Database':
        return Database;
      case 'Code':
        return Code;
      case 'Cpu':
        return Cpu;
      case 'Box':
        return Box;
      default:
        return Package;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
            <Grid className="h-6 w-6 text-purple-400" />
            1-Click App Catalog & Docker Stack
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Pasang WordPress, Next.js, Ghost, n8n, dan aplikasi modern ke domain Anda dalam hitungan detik
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari aplikasi atau framework..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
              filterCategory === cat
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* App Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredApps.map((app) => {
          const IconComponent = getAppIcon(app.icon);
          return (
            <div
              key={app.id}
              className="glass-card glass-card-hover rounded-2xl border border-slate-800 p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className="h-10 w-10 rounded-xl flex items-center justify-center text-white shadow-lg"
                    style={{ backgroundColor: `${app.color}25`, borderColor: `${app.color}50`, borderWidth: '1px' }}
                  >
                    <IconComponent className="h-5 w-5" style={{ color: app.color }} />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                    {app.version}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-white text-sm">{app.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {app.description}
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-800/80">
                <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                  <span>Mem: {app.memoryReq}</span>
                  <span>Disk: {app.diskReq}</span>
                </div>

                <button
                  onClick={() => {
                    setSelectedApp(app);
                    setInstallComplete(false);
                    setInstallStep(0);
                  }}
                  className="w-full py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/40 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>1-Click Install</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Install Wizard Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div
                  className="h-9 w-9 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${selectedApp.color}25` }}
                >
                  <Package className="h-5 w-5" style={{ color: selectedApp.color }} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Install {selectedApp.name}</h3>
                  <p className="text-xs text-slate-400">Versi {selectedApp.version}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {!installComplete ? (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">
                    Target Domain / Subdomain:
                  </label>
                  <select
                    value={selectedDomain}
                    onChange={(e) => setSelectedDomain(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                  >
                    {domains.map((d) => (
                      <option key={d.id} value={d.domain}>
                        https://{d.domain}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Admin Username:</label>
                    <input
                      type="text"
                      defaultValue="admin_cloudo"
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Admin Email:</label>
                    <input
                      type="email"
                      defaultValue="admin@cloudo.biz.id"
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Database Provision:</label>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 font-mono text-[11px] flex items-center justify-between">
                    <span>Auto-create dedicated DB & user credentials</span>
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                </div>

                {isInstalling && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-[11px]">
                    <div className="flex items-center gap-2 text-cyan-400">
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                      <span>
                        {installStep === 1 && `Pulling image ${selectedApp.dockerImage}...`}
                        {installStep === 2 && 'Configuring Nginx Reverse Proxy & ECC SSL...'}
                        {installStep === 3 && 'Initializing database tables & schemas...'}
                        {installStep === 4 && 'Finalizing installation...'}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-cyan-400 transition-all duration-500 rounded-full"
                        style={{ width: `${(installStep / 4) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedApp(null)}
                    disabled={isInstalling}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={handleStartInstall}
                    disabled={isInstalling}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold transition shadow-lg shadow-purple-600/30 flex items-center gap-2 cursor-pointer"
                  >
                    <span>Mulai Install Sekarang</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-center py-4">
                <div className="h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">
                    {selectedApp.name} Berhasil Terpasang!
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Aplikasi telah aktif dan siap diakses secara live pada domain{' '}
                    <span className="font-mono text-cyan-300">https://{selectedDomain}</span>
                  </p>
                </div>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setSelectedApp(null);
                      onOpenLivePreview();
                    }}
                    className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition flex items-center gap-2 cursor-pointer"
                  >
                    <span>Buka Web Live</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setSelectedApp(null)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
