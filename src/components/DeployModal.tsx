import React, { useState } from 'react';
import {
  Server,
  Plus,
  RefreshCw,
  CheckCircle2,
  Shield,
  Zap,
  Globe,
  Sliders,
} from 'lucide-react';
import { VpsInstance } from '../types/cloud';

interface DeployModalProps {
  onClose: () => void;
  onDeploy: (server: VpsInstance) => void;
  currency: 'IDR' | 'USD';
}

export const DeployModal: React.FC<DeployModalProps> = ({
  onClose,
  onDeploy,
  currency,
}) => {
  const [region, setRegion] = useState({
    code: 'SG-SIN',
    name: 'Singapore',
    datacenter: 'Equinix SG1 Tuas',
    flag: '🇸🇬',
  });

  const [os, setOs] = useState<{
    id: string;
    name: string;
    version: string;
    distro: 'ubuntu' | 'debian' | 'rocky' | 'almalinux' | 'alpine' | 'windows';
    kernel: string;
  }>({
    id: 'ubuntu-24-04',
    name: 'Ubuntu',
    version: '24.04.1 LTS',
    distro: 'ubuntu',
    kernel: 'Linux 6.8.0-40-generic x86_64',
  });

  const [plan, setPlan] = useState({
    name: 'Pro Master Node',
    vcpu: 4,
    ramGb: 8,
    diskGb: 160,
    bandwidthTb: 5,
    costIdr: 285000,
    costUsd: 18,
  });

  const [hostname, setHostname] = useState('node-app3.cloudo.biz.id');
  const [rootPassword, setRootPassword] = useState('CloudoMaster2026!');
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [provisionStep, setProvisionStep] = useState(0);

  const formatCost = (idr: number, usd: number) => {
    return currency === 'IDR'
      ? `Rp ${idr.toLocaleString('id-ID')}`
      : `$${usd}`;
  };

  const handleStartDeploy = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProvisioning(true);
    setProvisionStep(1);

    setTimeout(() => setProvisionStep(2), 800);
    setTimeout(() => setProvisionStep(3), 1600);
    setTimeout(() => {
      setProvisionStep(4);
      const generatedIp = `103.${Math.floor(Math.random() * 80 + 100)}.${Math.floor(
        Math.random() * 200 + 10
      )}.${Math.floor(Math.random() * 240 + 10)}`;

      const newServer: VpsInstance = {
        id: `vps-${Date.now()}`,
        name: hostname.split('.')[0].toUpperCase(),
        hostname,
        ipv4: generatedIp,
        ipv6: `2a02:4780:20:${Math.floor(Math.random() * 900 + 100)}::1`,
        region: region.name,
        regionCode: region.code,
        datacenter: region.datacenter,
        flag: region.flag,
        os,
        status: 'running',
        vcpu: plan.vcpu,
        ramGb: plan.ramGb,
        diskGb: plan.diskGb,
        diskType: 'NVMe Gen4 Enterprise',
        bandwidthTb: plan.bandwidthTb,
        bandwidthUsedGb: 14,
        cpuUsagePercent: 8,
        ramUsagePercent: 18,
        diskUsagePercent: 6,
        uptimeHours: 1,
        monthlyCostIdr: plan.costIdr,
        monthlyCostUsd: plan.costUsd,
        createdAt: new Date().toISOString().split('T')[0],
        tags: ['New Instance', 'Production', 'NVMe'],
        autoBackup: true,
        ddosProtection: true,
        firewallEnabled: true,
        sshPort: 2222,
      };

      onDeploy(newServer);
      setIsProvisioning(false);
      onClose();
    }, 2400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in">
      <div className="w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-6 my-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Server className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Deploy Cloud VPS Instance Baru</h3>
              <p className="text-xs text-slate-400">Infrastruktur Tier-IV dengan NVMe Gen4 & Proteksi DDoS</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleStartDeploy} className="space-y-5 text-xs">
          {/* Step 1: Region Selection */}
          <div>
            <label className="text-slate-300 font-semibold block mb-2">
              1. Pilih Lokasi Datacenter:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { code: 'SG-SIN', name: 'Singapore', datacenter: 'Equinix SG1 Tuas', flag: '🇸🇬' },
                { code: 'ID-JKT', name: 'Jakarta, ID', datacenter: 'Cyber 2 / IDC 3D', flag: '🇮🇩' },
                { code: 'JP-TYO', name: 'Tokyo, JP', datacenter: 'Equinix TY2', flag: '🇯🇵' },
                { code: 'EU-FRA', name: 'Frankfurt, DE', datacenter: 'Interxion Campus', flag: '🇩🇪' },
              ].map((loc) => (
                <button
                  key={loc.code}
                  type="button"
                  onClick={() => setRegion(loc)}
                  className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                    region.code === loc.code
                      ? 'bg-cyan-500/20 border-cyan-500/50 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="text-xl block">{loc.flag}</span>
                  <span className="font-bold text-white block mt-1">{loc.name}</span>
                  <span className="text-[10px] text-slate-500 truncate block">{loc.datacenter}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: OS Selection */}
          <div>
            <label className="text-slate-300 font-semibold block mb-2">
              2. Pilih Sistem Operasi:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono">
              {[
                { id: 'ubuntu-24-04', name: 'Ubuntu', version: '24.04 LTS', distro: 'ubuntu' as const, kernel: 'Linux 6.8' },
                { id: 'debian-12', name: 'Debian', version: '12 Bookworm', distro: 'debian' as const, kernel: 'Linux 6.1' },
                { id: 'rocky-9', name: 'Rocky Linux', version: '9.4 Enterprise', distro: 'rocky' as const, kernel: 'Linux 5.14' },
                { id: 'alpine-320', name: 'Alpine', version: '3.20 Hardened', distro: 'alpine' as const, kernel: 'Linux 6.6' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setOs(item)}
                  className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                    os.id === item.id
                      ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="font-bold text-white block">{item.name}</span>
                  <span className="text-[11px] text-slate-400">{item.version}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Hardware Plan */}
          <div>
            <label className="text-slate-300 font-semibold block mb-2">
              3. Pilih Paket Spesifikasi VPS:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                { name: 'Starter Edge', vcpu: 2, ramGb: 4, diskGb: 80, bandwidthTb: 3, costIdr: 180000, costUsd: 11 },
                { name: 'Pro Master Node', vcpu: 4, ramGb: 8, diskGb: 160, bandwidthTb: 5, costIdr: 285000, costUsd: 18 },
                { name: 'Enterprise Cluster', vcpu: 8, ramGb: 16, diskGb: 240, bandwidthTb: 10, costIdr: 450000, costUsd: 29 },
              ].map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => setPlan(p)}
                  className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                    plan.name === p.name
                      ? 'bg-cyan-500/20 border-cyan-500/50 shadow-md shadow-cyan-500/10'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span className="font-bold text-white block">{p.name}</span>
                  <span className="text-cyan-300 font-bold font-mono text-sm block mt-1">
                    {formatCost(p.costIdr, p.costUsd)} / bln
                  </span>
                  <div className="mt-2 text-[11px] text-slate-400 space-y-0.5 font-mono">
                    <div>• {p.vcpu} vCPU AMD EPYC™</div>
                    <div>• {p.ramGb} GB RAM DDR5</div>
                    <div>• {p.diskGb} GB NVMe Gen4</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Hostname & Credentials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Hostname Server:</label>
              <input
                type="text"
                required
                value={hostname}
                onChange={(e) => setHostname(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
              />
            </div>
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Root Password:</label>
              <input
                type="text"
                required
                value={rootPassword}
                onChange={(e) => setRootPassword(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
              />
            </div>
          </div>

          {/* Provisioning progress */}
          {isProvisioning && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
              <div className="flex items-center gap-2 text-cyan-400">
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>
                  {provisionStep === 1 && `Mengalokasikan KVM node di ${region.name}...`}
                  {provisionStep === 2 && `Menginstall OS ${os.name} ${os.version}...`}
                  {provisionStep === 3 && 'Mengonfigurasi IPv4, UFW firewall & Anycast DNS...'}
                  {provisionStep === 4 && 'Server siap digunakan!'}
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-400 transition-all duration-500 rounded-full"
                  style={{ width: `${(provisionStep / 4) * 100}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              disabled={isProvisioning}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isProvisioning}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold transition shadow-lg shadow-cyan-600/30 flex items-center gap-2 cursor-pointer"
            >
              <Zap className="h-4 w-4" />
              <span>Deploy Instan ({formatCost(plan.costIdr, plan.costUsd)})</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
