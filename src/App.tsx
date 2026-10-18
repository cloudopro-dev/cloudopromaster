/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { VpsManagerView } from './components/VpsManagerView';
import { DomainHostingView } from './components/DomainHostingView';
import { DnsManagerView } from './components/DnsManagerView';
import { DatabaseManagerView } from './components/DatabaseManagerView';
import { FileManagerView } from './components/FileManagerView';
import { TerminalView } from './components/TerminalView';
import { AppInstallerStoreView } from './components/AppInstallerStoreView';
import { SecurityFirewallView } from './components/SecurityFirewallView';
import { EmailManagerView } from './components/EmailManagerView';
import { CronJobsView } from './components/CronJobsView';
import { BillingWalletView } from './components/BillingWalletView';
import { LiveDomainPreviewModal } from './components/LiveDomainPreviewModal';
import { DeployModal } from './components/DeployModal';
import { LandingPageView } from './components/LandingPageView';
import { LoginView } from './components/LoginView';
import { CloudflareManagerView } from './components/CloudflareManagerView';

import {
  VpsInstance,
  DomainSite,
  DnsRecord,
  DatabaseInstance,
  FileItem,
  FirewallRule,
  BannedIp,
  EmailAccount,
  CronJob,
  ActivityLog,
} from './types/cloud';

import {
  INITIAL_SERVERS,
  INITIAL_DOMAINS,
  INITIAL_DNS_RECORDS,
  INITIAL_DATABASES,
  INITIAL_FILES,
  INITIAL_FIREWALL_RULES,
  INITIAL_BANNED_IPS,
  INITIAL_EMAILS,
  INITIAL_CRON_JOBS,
  INITIAL_ACTIVITY_LOGS,
} from './data/mockInitialData';

export default function App() {
  // Page mode: 'landing' | 'login' | 'panel'
  const [currentPage, setCurrentPage] = useState<'landing' | 'login' | 'panel'>('landing');
  const [currentUserRole, setCurrentUserRole] = useState<string>('Super Administrator (Root)');

  const [servers, setServers] = useState<VpsInstance[]>(() => {
    const saved = localStorage.getItem('cloudo_servers');
    return saved ? JSON.parse(saved) : INITIAL_SERVERS;
  });

  const [domains, setDomains] = useState<DomainSite[]>(() => {
    const saved = localStorage.getItem('cloudo_domains');
    return saved ? JSON.parse(saved) : INITIAL_DOMAINS;
  });

  const [dnsRecords, setDnsRecords] = useState<DnsRecord[]>(() => {
    const saved = localStorage.getItem('cloudo_dns');
    return saved ? JSON.parse(saved) : INITIAL_DNS_RECORDS;
  });

  const [databases, setDatabases] = useState<DatabaseInstance[]>(() => {
    const saved = localStorage.getItem('cloudo_dbs');
    return saved ? JSON.parse(saved) : INITIAL_DATABASES;
  });

  const [files, setFiles] = useState<FileItem[]>(() => {
    const saved = localStorage.getItem('cloudo_files');
    return saved ? JSON.parse(saved) : INITIAL_FILES;
  });

  const [firewallRules, setFirewallRules] = useState<FirewallRule[]>(() => {
    const saved = localStorage.getItem('cloudo_firewall');
    return saved ? JSON.parse(saved) : INITIAL_FIREWALL_RULES;
  });

  const [bannedIps, setBannedIps] = useState<BannedIp[]>(() => {
    const saved = localStorage.getItem('cloudo_banned_ips');
    return saved ? JSON.parse(saved) : INITIAL_BANNED_IPS;
  });

  const [emails, setEmails] = useState<EmailAccount[]>(() => {
    const saved = localStorage.getItem('cloudo_emails');
    return saved ? JSON.parse(saved) : INITIAL_EMAILS;
  });

  const [cronJobs, setCronJobs] = useState<CronJob[]>(() => {
    const saved = localStorage.getItem('cloudo_cron');
    return saved ? JSON.parse(saved) : INITIAL_CRON_JOBS;
  });

  const [logs, setLogs] = useState<ActivityLog[]>(INITIAL_ACTIVITY_LOGS);

  // Navigation & UI state
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [currency, setCurrency] = useState<'IDR' | 'USD'>('IDR');
  const [selectedServer, setSelectedServer] = useState<VpsInstance>(servers[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [showLivePreview, setShowLivePreview] = useState(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('cloudo_servers', JSON.stringify(servers));
  }, [servers]);

  useEffect(() => {
    localStorage.setItem('cloudo_domains', JSON.stringify(domains));
  }, [domains]);

  useEffect(() => {
    localStorage.setItem('cloudo_dns', JSON.stringify(dnsRecords));
  }, [dnsRecords]);

  useEffect(() => {
    localStorage.setItem('cloudo_dbs', JSON.stringify(databases));
  }, [databases]);

  useEffect(() => {
    localStorage.setItem('cloudo_files', JSON.stringify(files));
  }, [files]);

  useEffect(() => {
    localStorage.setItem('cloudo_firewall', JSON.stringify(firewallRules));
  }, [firewallRules]);

  useEffect(() => {
    localStorage.setItem('cloudo_banned_ips', JSON.stringify(bannedIps));
  }, [bannedIps]);

  useEffect(() => {
    localStorage.setItem('cloudo_emails', JSON.stringify(emails));
  }, [emails]);

  useEffect(() => {
    localStorage.setItem('cloudo_cron', JSON.stringify(cronJobs));
  }, [cronJobs]);

  // Periodic simulated live telemetry tick
  useEffect(() => {
    const interval = setInterval(() => {
      setServers((prev) =>
        prev.map((s) => {
          if (s.status !== 'running') return s;
          const cpuDelta = (Math.random() - 0.5) * 6;
          const ramDelta = (Math.random() - 0.5) * 2;
          return {
            ...s,
            cpuUsagePercent: Math.max(8, Math.min(94, Math.round(s.cpuUsagePercent + cpuDelta))),
            ramUsagePercent: Math.max(15, Math.min(92, Math.round(s.ramUsagePercent + ramDelta))),
          };
        })
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Handlers
  const handlePowerToggle = (id: string) => {
    setServers((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        const newStatus = s.status === 'running' ? 'stopped' : 'running';
        const newLog: ActivityLog = {
          id: `act-${Date.now()}`,
          timestamp: 'Baru saja',
          category: 'vps',
          title: `Server ${s.name} ${newStatus === 'running' ? 'Dinyalakan (Power On)' : 'Dimatikan (Power Off)'}`,
          description: `Perubahan status daya instance ${s.hostname} oleh Root Admin.`,
          level: newStatus === 'running' ? 'success' : 'warning',
          server: s.name,
        };
        setLogs((current) => [newLog, ...current]);
        return { ...s, status: newStatus };
      })
    );
  };

  const handleReboot = (id: string) => {
    setServers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'rebooting' } : s))
    );

    const s = servers.find((item) => item.id === id);
    const rebootLog: ActivityLog = {
      id: `act-${Date.now()}`,
      timestamp: 'Baru saja',
      category: 'vps',
      title: `Server ${s?.name || id} Melakukan Reboot`,
      description: 'Sinyal ACPI reboot dikirimkan ke hypervisor kernel.',
      level: 'info',
      server: s?.name,
    };
    setLogs((current) => [rebootLog, ...current]);

    setTimeout(() => {
      setServers((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: 'running' } : item))
      );
    }, 1500);
  };

  const handleUpdateServerSpecs = (
    id: string,
    vcpu: number,
    ramGb: number,
    diskGb: number
  ) => {
    const costIdr = vcpu * 45000 + ramGb * 18000 + diskGb * 800;
    const costUsd = Math.round(costIdr / 15700);

    setServers((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              vcpu,
              ramGb,
              diskGb,
              monthlyCostIdr: costIdr,
              monthlyCostUsd: costUsd,
            }
          : s
      )
    );

    const targetServer = servers.find((s) => s.id === id);
    if (targetServer && selectedServer.id === id) {
      setSelectedServer({
        ...targetServer,
        vcpu,
        ramGb,
        diskGb,
        monthlyCostIdr: costIdr,
        monthlyCostUsd: costUsd,
      });
    }

    const log: ActivityLog = {
      id: `act-${Date.now()}`,
      timestamp: 'Baru saja',
      category: 'vps',
      title: `Hardware Resized: ${targetServer?.name}`,
      description: `Spesifikasi diubah ke ${vcpu} vCPU, ${ramGb}GB RAM, ${diskGb}GB NVMe.`,
      level: 'success',
      server: targetServer?.name,
    };
    setLogs((current) => [log, ...current]);
  };

  const handleDeployServer = (newServer: VpsInstance) => {
    setServers((prev) => [newServer, ...prev]);
    setSelectedServer(newServer);
    setActiveTab('vps');

    const log: ActivityLog = {
      id: `act-${Date.now()}`,
      timestamp: 'Baru saja',
      category: 'vps',
      title: `Instance Baru Dideploy: ${newServer.name}`,
      description: `KVM Node berhasil online di ${newServer.datacenter} dengan IPv4 ${newServer.ipv4}.`,
      level: 'success',
      server: newServer.name,
    };
    setLogs((current) => [log, ...current]);
  };

  const handleAddDomain = (newDom: DomainSite) => {
    setDomains((prev) => [...prev, newDom]);
    const log: ActivityLog = {
      id: `act-${Date.now()}`,
      timestamp: 'Baru saja',
      category: 'domain',
      title: `Domain Ditambahkan: ${newDom.domain}`,
      description: `Vhost Nginx dan SSL otomatis aktif untuk ${newDom.domain}.`,
      level: 'success',
    };
    setLogs((current) => [log, ...current]);
  };

  const handleAddDnsRecord = (rec: Omit<DnsRecord, 'id'>) => {
    const item: DnsRecord = {
      ...rec,
      id: `dns-${Date.now()}`,
    };
    setDnsRecords((prev) => [...prev, item]);
  };

  const handleDeleteDnsRecord = (id: string) => {
    setDnsRecords((prev) => prev.filter((r) => r.id !== id));
  };

  const handleToggleProxy = (id: string) => {
    setDnsRecords((prev) =>
      prev.map((r) => (r.id === id ? { ...r, proxied: !r.proxied } : r))
    );
  };

  const handleAddDatabase = (db: DatabaseInstance) => {
    setDatabases((prev) => [...prev, db]);
  };

  const handleDeleteDatabase = (id: string) => {
    setDatabases((prev) => prev.filter((d) => d.id !== id));
  };

  const handleUpdateFileContent = (id: string, content: string) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, content, modified: 'Just now' } : f))
    );
  };

  const handleAddFile = (file: FileItem) => {
    setFiles((prev) => [...prev, file]);
  };

  const handleDeleteFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleAddFirewallRule = (rule: FirewallRule) => {
    setFirewallRules((prev) => [...prev, rule]);
  };

  const handleDeleteFirewallRule = (id: string) => {
    setFirewallRules((prev) => prev.filter((r) => r.id !== id));
  };

  const handleUnbanIp = (ip: string) => {
    setBannedIps((prev) => prev.filter((b) => b.ip !== ip));
    const log: ActivityLog = {
      id: `act-${Date.now()}`,
      timestamp: 'Baru saja',
      category: 'security',
      title: `IP ${ip} Di-unban Manual`,
      description: 'Aturan blokir iptables & fail2ban dihapus.',
      level: 'info',
    };
    setLogs((current) => [log, ...current]);
  };

  const handleAddEmail = (email: EmailAccount) => {
    setEmails((prev) => [...prev, email]);
  };

  const handleDeleteEmail = (id: string) => {
    setEmails((prev) => prev.filter((e) => e.id !== id));
  };

  const handleAddCron = (cron: CronJob) => {
    setCronJobs((prev) => [...prev, cron]);
  };

  const handleDeleteCron = (id: string) => {
    setCronJobs((prev) => prev.filter((c) => c.id !== id));
  };

  const primaryDomain = domains.find((d) => d.domain === 'cloudo.biz.id') || domains[0];

  // 1. Landing Page View
  if (currentPage === 'landing') {
    return (
      <>
        <LandingPageView
          currency={currency}
          setCurrency={setCurrency}
          onGoToDashboard={() => setCurrentPage('panel')}
          onGoToLogin={() => setCurrentPage('login')}
          onOpenLivePreview={() => setShowLivePreview(true)}
        />
        {showLivePreview && (
          <LiveDomainPreviewModal
            domain={primaryDomain}
            onClose={() => setShowLivePreview(false)}
          />
        )}
      </>
    );
  }

  // 2. Login Page View
  if (currentPage === 'login') {
    return (
      <LoginView
        onLoginSuccess={(role) => {
          setCurrentUserRole(role);
          setCurrentPage('panel');
        }}
        onGoToLanding={() => setCurrentPage('landing')}
      />
    );
  }

  // 3. Control Panel View
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header */}
      <Header
        servers={servers}
        currency={currency}
        setCurrency={setCurrency}
        onOpenDeployModal={() => setShowDeployModal(true)}
        onToggleTerminal={() => setActiveTab(activeTab === 'terminal' ? 'dashboard' : 'terminal')}
        onOpenLivePreview={() => setShowLivePreview(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onGoToLanding={() => setCurrentPage('landing')}
        onLogout={() => setCurrentPage('login')}
        currentUserRole={currentUserRole}
      />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          servers={servers}
          domainCount={domains.length}
          dbCount={databases.length}
          onGoToLanding={() => setCurrentPage('landing')}
        />

        {/* Main Workspace Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full pb-20 md:pb-8 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <DashboardView
              servers={servers}
              domains={domains}
              logs={logs}
              currency={currency}
              onSelectServer={(s) => {
                setSelectedServer(s);
                setActiveTab('vps');
              }}
              onPowerToggle={handlePowerToggle}
              onReboot={handleReboot}
              onNavigate={(tab) => setActiveTab(tab)}
              onOpenLivePreview={() => setShowLivePreview(true)}
            />
          )}

          {activeTab === 'vps' && (
            <VpsManagerView
              servers={servers}
              selectedServer={selectedServer}
              setSelectedServer={setSelectedServer}
              onPowerToggle={handlePowerToggle}
              onReboot={handleReboot}
              onOpenDeployModal={() => setShowDeployModal(true)}
              onOpenTerminal={() => setActiveTab('terminal')}
              currency={currency}
              onUpdateServerSpecs={handleUpdateServerSpecs}
            />
          )}

          {activeTab === 'domains' && (
            <DomainHostingView
              domains={domains}
              onOpenLivePreview={() => setShowLivePreview(true)}
              onNavigateToFileManager={() => setActiveTab('files')}
              onAddDomain={handleAddDomain}
            />
          )}

          {activeTab === 'dns' && (
            <DnsManagerView
              records={dnsRecords}
              onAddRecord={handleAddDnsRecord}
              onDeleteRecord={handleDeleteDnsRecord}
              onToggleProxy={handleToggleProxy}
            />
          )}

          {activeTab === 'cloudflare' && (
            <CloudflareManagerView
              dnsRecords={dnsRecords}
              onNavigateToDns={() => setActiveTab('dns')}
              onOpenLivePreview={() => setShowLivePreview(true)}
            />
          )}

          {activeTab === 'databases' && (
            <DatabaseManagerView
              databases={databases}
              onAddDatabase={handleAddDatabase}
              onDeleteDatabase={handleDeleteDatabase}
            />
          )}

          {activeTab === 'files' && (
            <FileManagerView
              files={files}
              onUpdateFileContent={handleUpdateFileContent}
              onAddFile={handleAddFile}
              onDeleteFile={handleDeleteFile}
            />
          )}

          {activeTab === 'terminal' && (
            <TerminalView
              servers={servers}
              activeServer={selectedServer}
            />
          )}

          {activeTab === 'apps' && (
            <AppInstallerStoreView
              domains={domains}
              onOpenLivePreview={() => setShowLivePreview(true)}
            />
          )}

          {activeTab === 'security' && (
            <SecurityFirewallView
              firewallRules={firewallRules}
              bannedIps={bannedIps}
              onAddFirewallRule={handleAddFirewallRule}
              onDeleteFirewallRule={handleDeleteFirewallRule}
              onUnbanIp={handleUnbanIp}
            />
          )}

          {activeTab === 'email' && (
            <EmailManagerView
              emails={emails}
              onAddEmail={handleAddEmail}
              onDeleteEmail={handleDeleteEmail}
            />
          )}

          {activeTab === 'cron' && (
            <CronJobsView
              cronJobs={cronJobs}
              onAddCron={handleAddCron}
              onDeleteCron={handleDeleteCron}
            />
          )}

          {activeTab === 'billing' && (
            <BillingWalletView currency={currency} />
          )}
        </main>
      </div>

      {/* Mobile Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 border-t border-slate-800 p-2 flex items-center justify-around backdrop-blur-xl text-[10px]">
        {[
          { id: 'dashboard', label: 'Ringkasan' },
          { id: 'vps', label: 'VPS' },
          { id: 'domains', label: 'Domain' },
          { id: 'dns', label: 'DNS' },
          { id: 'terminal', label: 'Terminal' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`px-2 py-1 rounded font-medium ${
              activeTab === item.id ? 'text-cyan-400 font-bold' : 'text-slate-400'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Live Preview Modal */}
      {showLivePreview && (
        <LiveDomainPreviewModal
          domain={primaryDomain}
          onClose={() => setShowLivePreview(false)}
        />
      )}

      {/* Deploy VPS Modal */}
      {showDeployModal && (
        <DeployModal
          currency={currency}
          onClose={() => setShowDeployModal(false)}
          onDeploy={handleDeployServer}
        />
      )}
    </div>
  );
}
