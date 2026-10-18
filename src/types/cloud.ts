export type ServerStatus = 'running' | 'stopped' | 'rebooting' | 'rebuilding' | 'rescue';

export interface VpsInstance {
  id: string;
  name: string;
  hostname: string;
  ipv4: string;
  ipv6: string;
  region: string;
  regionCode: string;
  datacenter: string;
  flag: string;
  os: {
    id: string;
    name: string;
    version: string;
    distro: 'ubuntu' | 'debian' | 'rocky' | 'almalinux' | 'alpine' | 'windows';
    kernel: string;
  };
  status: ServerStatus;
  vcpu: number;
  ramGb: number;
  diskGb: number;
  diskType: 'NVMe Gen4 Enterprise' | 'High-Speed SSD';
  bandwidthTb: number;
  bandwidthUsedGb: number;
  cpuUsagePercent: number;
  ramUsagePercent: number;
  diskUsagePercent: number;
  uptimeHours: number;
  monthlyCostIdr: number;
  monthlyCostUsd: number;
  createdAt: string;
  tags: string[];
  autoBackup: boolean;
  ddosProtection: boolean;
  firewallEnabled: boolean;
  sshPort: number;
}

export interface DomainSite {
  id: string;
  domain: string;
  rootPath: string;
  targetVpsId: string;
  status: 'active' | 'deploying' | 'suspended';
  sslStatus: 'active' | 'expired' | 'renewing' | 'inactive';
  sslIssuer: string;
  sslExpiry: string;
  runtime: 'php' | 'nodejs' | 'python' | 'static' | 'docker';
  runtimeVersion: string;
  webServer: 'Nginx Enterprise' | 'OpenLiteSpeed' | 'Caddy v2';
  forceHttps: boolean;
  http3: boolean;
  brotli: boolean;
  wafShield: boolean;
  bandwidthUsageGb: number;
  visitorsToday: number;
  diskUsageMb: number;
  appType?: string;
}

export type DnsRecordType = 'A' | 'AAAA' | 'CNAME' | 'MX' | 'TXT' | 'NS' | 'SRV' | 'CAA';

export interface DnsRecord {
  id: string;
  domain: string;
  type: DnsRecordType;
  name: string;
  value: string;
  ttl: number; // in seconds
  priority?: number;
  proxied: boolean; // Cloudflare-style proxy
  comment?: string;
}

export interface DatabaseInstance {
  id: string;
  name: string;
  type: 'mysql' | 'postgres' | 'redis' | 'mongodb';
  version: string;
  vpsId: string;
  sizeMb: number;
  maxConnections: number;
  activeConnections: number;
  charset: string;
  collate: string;
  host: string;
  port: number;
  userCount: number;
  status: 'online' | 'optimizing' | 'offline';
  lastBackup: string;
}

export interface FileItem {
  id: string;
  name: string;
  path: string;
  type: 'file' | 'folder';
  sizeBytes: number;
  modified: string;
  permissions: string;
  extension?: string;
  content?: string;
}

export interface FirewallRule {
  id: string;
  name: string;
  vpsId: string;
  port: string;
  protocol: 'TCP' | 'UDP' | 'ANY';
  action: 'ALLOW' | 'DENY';
  sourceIp: string;
  status: 'active' | 'disabled';
  hits: number;
  createdAt: string;
}

export interface BannedIp {
  ip: string;
  reason: string;
  bannedAt: string;
  jail: string;
  countryCode: string;
  countryName: string;
}

export interface EmailAccount {
  id: string;
  email: string;
  domain: string;
  quotaMb: number;
  usedMb: number;
  forwardTo?: string;
  status: 'active' | 'suspended';
  spamScore: number;
  dkimActive: boolean;
  spfActive: boolean;
}

export interface CronJob {
  id: string;
  name: string;
  vpsId: string;
  command: string;
  schedule: string;
  scheduleHuman: string;
  lastRun: string;
  nextRun: string;
  status: 'enabled' | 'disabled';
  lastExitCode: number;
}

export interface OneClickApp {
  id: string;
  name: string;
  category: 'CMS' | 'Database' | 'Framework' | 'Tools' | 'Automation';
  icon: string;
  description: string;
  version: string;
  memoryReq: string;
  diskReq: string;
  dockerImage: string;
  popular: boolean;
  color: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  category: 'vps' | 'domain' | 'dns' | 'database' | 'security' | 'billing';
  title: string;
  description: string;
  level: 'info' | 'success' | 'warning' | 'error';
  server?: string;
}

export interface Invoice {
  id: string;
  number: string;
  date: string;
  dueDate: string;
  amountIdr: number;
  amountUsd: number;
  items: string[];
  status: 'paid' | 'pending' | 'unpaid';
  paymentMethod: string;
}

export interface CloudflareConfig {
  domain: string;
  zoneId: string;
  accountId: string;
  apiToken: string;
  email: string;
  status: 'active' | 'pending' | 'disconnected';
  nameservers: string[];
  sslMode: 'flexible' | 'full' | 'strict';
  securityLevel: 'essentially_off' | 'low' | 'medium' | 'high' | 'under_attack';
  alwaysUseHttps: boolean;
  http3: boolean;
  brotli: boolean;
  rocketLoader: boolean;
  earlyHints: boolean;
  autoMinify: {
    html: boolean;
    css: boolean;
    js: boolean;
  };
  botFightMode: boolean;
  turnstileEnabled: boolean;
  cacheHitRatio: number;
  bandwidthSavedGb: number;
  threatsBlocked: number;
  lastPurgedAt: string | null;
}

