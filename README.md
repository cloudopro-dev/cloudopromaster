# CLOUDO PRO MASTER (cloudo.biz.id)

> Enterprise Cloud Hosting, Anycast DNS & VPS Infrastructure Management Platform

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![React](https://img.shields.io/badge/React-19.0-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178c6.svg)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8.svg)
![Status](https://img.shields.io/badge/Status-100%25%20Live-emerald.svg)

**CLOUDO PRO MASTER** adalah platform kontrol panel hosting dan server VPS generasi modern yang dirancang khusus untuk domain **`cloudo.biz.id`**. Menawarkan kontrol armada server cloud multi-region (Jakarta IDC 3D, Singapore Equinix, Tokyo TY2, Frankfurt), editor zona DNS Anycast terpadu, basis data relasional MySQL & PostgreSQL, in-memory cache Redis, web SSH terminal interaktif, dan mitigasi DDoS 2.5 Tbps.

---

## 🌟 Fitur Utama

- **Landing Page & Identity Access Portal**: Desain cyber-glassmorphism mewah dengan showcase fitur, WHOIS domain search, latency matrix real-time, dan demo 1-klik login (*Root Admin* dan *DevOps NOC*).
- **Fleet Telemetry & VPS Management**: Pemantauan beban CPU, RAM, NVMe disk, dan bandwidth secara langsung dengan kontrol daya instan (*Reboot*, *Power On/Off*, *Reinstall OS*, *Hardware Resizing Slider*).
- **Web Hosting & Subdomain Manager**: Konfigurasi vhost Nginx Enterprise & OpenLiteSpeed, sertifikat SSL Let's Encrypt ECC 384-bit otomatis, saklar *Force HTTPS*, *HTTP/3 QUIC*, *Brotli*, dan *WAF Anti-Bot Shield*.
- **Anycast DNS Zone Editor**: Pengelolaan record DNS lengkap (A, AAAA, CNAME, MX, TXT/SPF/DKIM/DMARC, NS, CAA) dengan saklar Cloudflare Proxy dan alat uji propagasi ke 6 titik PoP global.
- **Basis Data Relasional & Cache**: Kluster MySQL 8.4 LTS, PostgreSQL 16.4 High-Availability, dan Redis 7.2 dengan *Interactive Web SQL Query Runner*.
- **Web File Manager & Code Editor**: Navigasi direktori `/var/www/cloudo.biz.id/public_html`, editor kode dengan line numbers, dan tombol simpan langsung.
- **Web SSH Terminal Console**: Konsol shell interaktif (`root@cloudo:~#`) dengan riwayat perintah dan perintah diagnostik (`neofetch`, `htop`, `systemctl status nginx`, `docker ps`, `ufw status`, `curl`, `ping`).
- **1-Click App Installer**: Pasang WordPress Enterprise, Next.js 15, Ghost CMS, phpMyAdmin, Laravel 11, n8n Automation, Portainer, dan Strapi dalam hitungan detik.
- **Keamanan & Mitigasi DDoS**: Firewall port UFW, daftar IP terblokir otomatis Fail2ban dengan tombol *Unban IP*, dan saklar proteksi *Under Attack Mode*.
- **Email Bisnis & Webmail**: Akun mailbox `@cloudo.biz.id`, verifikasi reputasi DKIM/SPF, dan peluncur Webmail client.
- **Cron Jobs**: Penjadwalan backup dan pemeliharaan server otomatis.
- **Billing & Cloud Wallet**: Dukungan multi-mata uang (**Rupiah IDR** & **USD $**), faktur resmi, dan top-up saldo wallet otomatis.

---

## 🚀 Memulai (Getting Started)

### Prasyarat
- Node.js >= 20
- npm atau pnpm / yarn

### Instalasi
```bash
# Clone repositori
git clone https://github.com/cloudopro-dev/cloudopromaster.git

# Masuk ke direktori
cd cloudopromaster

# Install dependensi
npm install

# Jalankan development server
npm run dev
```

Aplikasi akan berjalan secara lokal di `http://localhost:3000`.

---

## 🛠️ Stack Teknologi

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Motion
- **Tooling**: Vite 8, tsx
- **Infrastruktur Target**: Nginx Enterprise, Let's Encrypt SSL, Anycast Routing
- **Domain Resmi**: [cloudo.biz.id](https://cloudo.biz.id)

---

## 📄 Lisensi
Didistribusikan di bawah lisensi Apache-2.0.
