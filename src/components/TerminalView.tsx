import React, { useState, useRef, useEffect } from 'react';
import {
  Terminal as TerminalIcon,
  Maximize2,
  Minimize2,
  Trash2,
  RotateCw,
  Copy,
  Check,
  Play,
  Server,
  Zap,
} from 'lucide-react';
import { VpsInstance } from '../types/cloud';

interface TerminalViewProps {
  servers: VpsInstance[];
  activeServer: VpsInstance;
}

interface CommandLog {
  id: string;
  command: string;
  output: string;
  timestamp: string;
  isHtml?: boolean;
}

export const TerminalView: React.FC<TerminalViewProps> = ({
  servers,
  activeServer,
}) => {
  const [selectedServerId, setSelectedServerId] = useState(activeServer.id);
  const [inputCommand, setInputCommand] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [isCopied, setIsCopied] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const currentServer =
    servers.find((s) => s.id === selectedServerId) || activeServer;

  const initialLogs: CommandLog[] = [
    {
      id: 'init-1',
      command: 'neofetch',
      output: `
   ____ _      ___  _   _ ____   ___     cloudo@${currentServer.hostname}
  / ___| |    / _ \\| | | |  _ \\ / _ \\    --------------------------
 | |   | |   | | | | | | | | | | | | |   OS: ${currentServer.os.name} ${currentServer.os.version}
 | |___| |___| |_| | |_| | |_| | |_| |   Host: Cloudo Pro Master Hypervisor KVM
  \\____|_____|\\___/ \\___/|____/ \\___/    Kernel: ${currentServer.os.kernel}
                                         Uptime: 59 days, 4 hours, 18 mins
                                         Packages: 1420 (dpkg), 12 (snap)
                                         Shell: bash 5.2.21
                                         Terminal: Cloudo WebSSH v4.8
                                         CPU: AMD EPYC™ 9654 96-Core Processor (${currentServer.vcpu} vCPU)
                                         Memory: 8320MiB / ${currentServer.ramGb * 1024}MiB (${currentServer.ramUsagePercent}%)
                                         Disk: ${Math.round(currentServer.diskGb * 0.41)}G / ${currentServer.diskGb}G (${currentServer.diskType})
                                         IPv4 Edge: ${currentServer.ipv4}
                                         Primary Host: cloudo.biz.id (Active SSL ECC)
`,
      timestamp: '04:28:10',
    },
    {
      id: 'init-2',
      command: 'systemctl status nginx',
      output: `● nginx.service - A high performance web server and reverse proxy for cloudo.biz.id
     Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
     Active: active (running) since Sun 2026-10-18 00:00:02 UTC; 4h 28min ago
       Docs: man:nginx(8)
   Main PID: 1842 (nginx)
      Tasks: 9 (limit: 19124)
     Memory: 64.2M
        CPU: 1.842s
     CGroup: /system.slice/nginx.service
             ├─1842 nginx: master process /usr/sbin/nginx -g daemon on; master_process on;
             ├─1843 nginx: worker process (HTTP/3 QUIC enabled)
             ├─1844 nginx: worker process (HTTP/3 QUIC enabled)
             ├─1845 nginx: worker process (HTTP/3 QUIC enabled)
             └─1846 nginx: worker process (FastCGI Cache ready)`,
      timestamp: '04:28:15',
    },
  ];

  const [logs, setLogs] = useState<CommandLog[]>(initialLogs);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIdx(-1);

    const now = new Date().toLocaleTimeString();

    if (trimmed === 'clear') {
      setLogs([]);
      setInputCommand('');
      return;
    }

    let output = '';
    const low = trimmed.toLowerCase();

    if (low === 'help') {
      output = `CLOUDO PRO MASTER Shell (v4.8) - Supported commands:
  • neofetch           - Tampilkan spesifikasi server & logo ASCII
  • htop               - Snapshot monitor proses sistem & penggunaan CPU/RAM
  • systemctl status nginx  - Cek status Nginx Enterprise server
  • docker ps          - Tampilkan status container Docker aktif
  • free -m            - Tampilkan alokasi RAM (Total, Used, Free)
  • df -h              - Tampilkan penggunaan partisi NVMe disk
  • ufw status         - Cek aturan firewall & proteksi port
  • curl cloudo.biz.id - Uji request HTTP/3 ke domain utama
  • ping cloudo.biz.id - Tes latensi ICMP ke cloudo.biz.id
  • clear              - Bersihkan layar konsol`;
    } else if (low === 'neofetch') {
      output = `
   ____ _      ___  _   _ ____   ___     root@${currentServer.hostname}
  / ___| |    / _ \\| | | |  _ \\ / _ \\    --------------------------
 | |   | |   | | | | | | | | | | | | |   OS: ${currentServer.os.name} ${currentServer.os.version}
 | |___| |___| |_| | |_| | |_| | |_| |   Host: Cloudo Pro Master Hypervisor KVM
  \\____|_____|\\___/ \\___/|____/ \\___/    Kernel: ${currentServer.os.kernel}
                                         Uptime: ${currentServer.uptimeHours} hours
                                         CPU: AMD EPYC™ 9654 (${currentServer.vcpu} vCPU)
                                         Memory: ${currentServer.ramUsagePercent}% of ${currentServer.ramGb}GB
                                         Disk: ${currentServer.diskGb}GB NVMe Gen4
                                         IPv4: ${currentServer.ipv4}
                                         Domain: cloudo.biz.id (Let's Encrypt ECC)`;
    } else if (low === 'htop') {
      output = `  CPU[||||||||||||||||                      34.2%]   Tasks: 182, 432 thr; 1 running
  Mem[||||||||||||||||||||||||              52.1%]   Load average: 0.24 0.31 0.28
  Swp[|                                      2.4%]   Uptime: 59 days, 04:28:30

  PID USER      PRI  NI  VIRT   RES   SHR S CPU% MEM%   TIME+  Command
 1842 root       20   0  142M 64.2M 18.2M S  2.8  0.4  1:42.12 /usr/sbin/nginx -g daemon on;
 2140 www-data   20   0  380M  142M 24.1M S  5.1  0.9  4:12.80 php-fpm: pool cloudo.biz.id
 3120 node       20   0  820M  312M 42.0M S  8.4  1.9 12:44.20 node /app/dist/server.js
 4012 mysql      20   0 1840M  642M 31.4M S  3.2  4.0  8:19.45 /usr/sbin/mysqld
 5210 redis      20   0  210M  184M 12.0M S  1.0  1.1  0:42.10 redis-server *:6379`;
    } else if (low === 'free -m') {
      const totalRamMb = currentServer.ramGb * 1024;
      const usedRamMb = Math.round((totalRamMb * currentServer.ramUsagePercent) / 100);
      const freeRamMb = totalRamMb - usedRamMb;
      output = `               total        used        free      shared  buff/cache   available
Mem:           ${totalRamMb}        ${usedRamMb}        ${freeRamMb}         142        2180        ${freeRamMb + 1800}
Swap:           4096          98        3998`;
    } else if (low === 'df -h') {
      output = `Filesystem      Size  Used Avail Use% Mounted on
udev            7.8G     0  7.8G   0% /dev
tmpfs           1.6G  1.8M  1.6G   1% /run
/dev/nvme0n1p1  ${currentServer.diskGb}G   ${Math.round(currentServer.diskGb * 0.41)}G  ${Math.round(currentServer.diskGb * 0.59)}G  ${currentServer.diskUsagePercent}% /
/dev/nvme0n1p15  124M   12M  112M  10% /boot/efi
/var/www/cloudo.biz.id (NVMe Enterprise Array)`;
    } else if (low === 'docker ps') {
      output = `CONTAINER ID   IMAGE                          COMMAND                  CREATED        STATUS        PORTS                               NAMES
a8f102c98d71   node:22-alpine                 "npm start"              3 days ago     Up 3 days     0.0.0.0:3000->3000/tcp              cloudo_nextjs_prod
4b99812e1a32   wordpress:php8.3-fpm-alpine    "docker-entrypoint.s…"   5 days ago     Up 5 days     9000/tcp                            cloudo_wordpress_app
7c33190ab421   redis:7.2-alpine               "docker-entrypoint.s…"   2 weeks ago    Up 2 weeks    0.0.0.0:6379->6379/tcp              cloudo_redis_cache
e0984f47a112   n8nio/n8n:latest               "tini -- /docker-ent…"   1 week ago     Up 1 week     0.0.0.0:5678->5678/tcp              cloudo_workflow_n8n`;
    } else if (low.includes('systemctl status nginx')) {
      output = `● nginx.service - Nginx Enterprise High-Performance Web Server
     Loaded: loaded (/lib/systemd/system/nginx.service; enabled)
     Active: active (running) • HTTP/3 QUIC Supported
     Vhost: cloudo.biz.id, api.cloudo.biz.id, panel.cloudo.biz.id
     SSL: Let's Encrypt ECC 384-bit [Valid]`;
    } else if (low === 'ufw status') {
      output = `Status: active
Logging: on (low)
Default: deny (incoming), allow (outgoing), disabled (routed)

To                         Action      From
--                         ------      ----
2222/tcp (SSH Secure)      ALLOW IN    Anywhere (Rate Limited)
80/tcp (HTTP)              ALLOW IN    Anywhere
443 (HTTPS/QUIC)           ALLOW IN    Anywhere
3306/tcp (MySQL)           DENY IN     Anywhere
5432/tcp (Postgres)        ALLOW IN    10.8.0.0/24 (VPN only)`;
    } else if (low.includes('curl cloudo.biz.id') || low.includes('curl https://cloudo.biz.id')) {
      output = `HTTP/2 200 OK
server: Nginx-Enterprise/1.26.2
date: Sun, 18 Oct 2026 04:28:30 GMT
content-type: text/html; charset=UTF-8
alt-svc: quic=":443"; h3-29=":443"; h3=":443"
strict-transport-security: max-age=31536000; includeSubDomains; preload
x-cloudo-edge: SGP-Tuas-Node-01
x-frame-options: SAMEORIGIN

<!DOCTYPE html><html><head><title>cloudo.biz.id</title>...</head><body><h1>cloudo.biz.id is LIVE!</h1></body></html>`;
    } else if (low.includes('ping')) {
      output = `PING cloudo.biz.id (${currentServer.ipv4}) 56(84) bytes of data.
64 bytes from ${currentServer.hostname} (${currentServer.ipv4}): icmp_seq=1 ttl=60 time=1.42 ms
64 bytes from ${currentServer.hostname} (${currentServer.ipv4}): icmp_seq=2 ttl=60 time=1.28 ms
64 bytes from ${currentServer.hostname} (${currentServer.ipv4}): icmp_seq=3 ttl=60 time=1.35 ms
64 bytes from ${currentServer.hostname} (${currentServer.ipv4}): icmp_seq=4 ttl=60 time=1.40 ms

--- cloudo.biz.id ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3004ms
rtt min/avg/max/mdev = 1.280/1.362/1.420/0.052 ms`;
    } else {
      output = `bash: ${trimmed}: command not found. Ketik 'help' untuk daftar perintah yang didukung.`;
    }

    setLogs((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        command: trimmed,
        output,
        timestamp: now,
      },
    ]);

    setInputCommand('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputCommand);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIdx + 1;
        if (nextIdx < history.length) {
          setHistoryIdx(nextIdx);
          setInputCommand(history[history.length - 1 - nextIdx]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputCommand(history[history.length - 1 - nextIdx]);
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInputCommand('');
      }
    }
  };

  const copyTerminalOutput = () => {
    const text = logs.map((l) => `$ ${l.command}\n${l.output}`).join('\n\n');
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
            <TerminalIcon className="h-6 w-6 text-emerald-400" />
            Web SSH Terminal Console
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Akses langsung root console melalui WebSocket terenkripsi TLS 1.3 ke semua VPS node
          </p>
        </div>

        {/* Server Target Switcher */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400 font-mono hidden sm:inline">Target Node:</label>
          <select
            value={selectedServerId}
            onChange={(e) => setSelectedServerId(e.target.value)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-300 focus:outline-none"
          >
            {servers.map((s) => (
              <option key={s.id} value={s.id}>
                {s.flag} {s.name} ({s.ipv4})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quick Command Toolbar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
        <span className="text-slate-500 shrink-0 text-[11px]">Quick Exec:</span>
        {['neofetch', 'htop', 'systemctl status nginx', 'docker ps', 'free -m', 'df -h', 'ufw status', 'curl cloudo.biz.id', 'clear'].map(
          (cmd) => (
            <button
              key={cmd}
              onClick={() => executeCommand(cmd)}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 text-[11px] whitespace-nowrap transition cursor-pointer"
            >
              {cmd}
            </button>
          )
        )}
      </div>

      {/* Terminal Window Box */}
      <div className="rounded-2xl border border-slate-800 bg-[#070b14] shadow-2xl overflow-hidden font-mono flex flex-col h-[580px]">
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0d1322] border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="text-xs text-slate-400 font-semibold ml-2">
              root@{currentServer.hostname}: ~ (SSH-2.0-OpenSSH_9.6p1)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyTerminalOutput}
              className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition"
              title="Copy terminal session"
            >
              {isCopied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
            <button
              onClick={() => setLogs([])}
              className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition"
              title="Clear Terminal"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Terminal Screen & History */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-mono select-text">
          <div className="text-slate-400 text-[11px] pb-2 border-b border-slate-800/50">
            Connected to {currentServer.name} [{currentServer.ipv4}:2222] via Secure WebSocket proxy.
            Ketik <span className="text-cyan-400 font-bold">help</span> untuk melihat daftar perintah.
          </div>

          {logs.map((log) => (
            <div key={log.id} className="space-y-1">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <span className="text-cyan-400">root@{currentServer.hostname.split('.')[0]}</span>
                <span className="text-slate-400">:</span>
                <span className="text-blue-400">~</span>
                <span className="text-slate-300">#</span>
                <span className="text-white">{log.command}</span>
              </div>
              <pre className="text-slate-300 text-[11px] whitespace-pre-wrap leading-relaxed pl-2 font-mono">
                {log.output}
              </pre>
            </div>
          ))}

          {/* Active Input Line */}
          <div className="flex items-center gap-2 text-emerald-400 font-bold pt-1">
            <span className="text-cyan-400">root@{currentServer.hostname.split('.')[0]}</span>
            <span className="text-slate-400">:</span>
            <span className="text-blue-400">~</span>
            <span className="text-slate-300">#</span>
            <input
              type="text"
              autoFocus
              value={inputCommand}
              onChange={(e) => setInputCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white focus:outline-none font-mono text-xs caret-cyan-400"
              placeholder="Ketik perintah (contoh: help, neofetch, htop, curl cloudo.biz.id)..."
            />
          </div>

          <div ref={terminalEndRef} />
        </div>

        {/* Status Bar */}
        <div className="px-4 py-2 bg-[#0d1322] border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Connected (TLS 1.3)
            </span>
            <span>Encoding: UTF-8</span>
            <span>Host: cloudo.biz.id</span>
          </div>
          <span>Press Enter to execute</span>
        </div>
      </div>
    </div>
  );
};
