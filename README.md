# 🕌 Chatbot Layanan Informasi & PSB Pondok Pesantren Bahrul Maghfiroh Malang

[![Live Demo](https://img.shields.io/badge/Demo-GitHub%20Pages-success?style=for-the-badge&logo=github)](https://tamara7s.github.io/chatbot-bahrulmaghfiroh/)
[![Universitas Negeri Malang](https://img.shields.io/badge/KKN%20Reguler-Universitas%20Negeri%20Malang%202026-blue?style=for-the-badge)](https://um.ac.id)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

Asisten virtual cerdas 24 jam berbasis web untuk **Pondok Pesantren Bahrul Maghfiroh Malang**. Dirancang ramah bagi orang tua dan calon wali santri dengan kemampuan mentoleransi salah ketik (*typo*), mengenali dialek Jawa Timuran, dilengkapi proteksi domain (*guardrail*), serta terhubung langsung ke layanan resmi WhatsApp Panitia PSB.

---

## ✨ Fitur Unggulan

- ⚡ **Dual-Engine Response:**
  - **Smart Offline Engine (Rule-Based & Fuzzy Matching):** Tetap responsif instan tanpa jeda server dan tanpa biaya API.
  - **Generative AI Engine:** Terkoneksi dengan Google Gemini AI untuk penalaran kontekstual alami.
- 🔤 **Toleransi Typo (Levenshtein Distance):** Mampu memahami pertanyaan meskipun terjadi salah ketik kata per kata (misal: *pindok*, *byaya*, *fasiltas*).
- 🗣️ **Normalisasi Dialek Slang Jawa Timuran:** Mengenali kosakata khas daerah dan bahasa santai sehari-hari:
  - `byaya` / `piro` $\rightarrow$ biaya / berapa
  - `daftr` / `ndaftar` $\rightarrow$ pendaftaran
  - `nyambang` / `sambang` $\rightarrow$ jadwal kunjungan wali santri
  - `sopo` / `seng nduwe` $\rightarrow$ pengasuh / kyai
  - `alamate ngendi` $\rightarrow$ alamat / lokasi
  - `hape` / `gowo` $\rightarrow$ aturan handphone santri
- 🛡️ **Pesantren Domain Guardrails (Anti-OOT):** Pertanyaan di luar topik pesantren (seperti matematika, politik, resep, atau pengetahuan umum dunia) akan ditolak secara santun dan diarahkan kembali ke informasi pondok atau CS Panitia.
- 💬 **Integrasi Langsung WhatsApp Panitia:** Kartu jawaban menyediakan tombol satu klik ke WhatsApp Panitia Resmi PSB (`0811-3648-800`).
- ⚙️ **Panel Admin Kelola FAQ (`admin-chatbot.html`):** Dashboard visual bagi pengurus pondok untuk menambah, menyunting, dan memperbarui basis pengetahuan tanya-jawab secara mandiri tanpa koding.
- 🚀 **Portabel & Siap Embed:** Cukup memanggil satu baris `<script src="chatbot-bahrulmaghfiroh.js"></script>` pada website HTML murni, WordPress, maupun Laravel.

---

## 📂 Struktur Berkas

```text
project_chatbot/
├── index.html                           # Halaman showcase & live preview widget chatbot
├── admin-chatbot.html                   # Dashboard admin untuk mengelola FAQ pondok
├── chatbot-bahrulmaghfiroh.js           # Mesin utama chatbot (Fuzzy Levenshtein, Normalizer, Guardrails)
├── JALANKAN_CHATBOT.bat                 # Script batch sekali klik untuk membuka di browser
├── demo_chatbot_ponpes.html             # Demo alternatif antarmuka
├── chatbot.blade.php                    # Template Blade untuk integrasi Laravel
├── ChatbotController.php                # Controller Laravel untuk integrasi API backend
├── KODE_EMBED_UNTUK_ADMIN_WEB_PONPES.txt# Panduan integrasi 1 baris bagi webmaster pondok
├── README.md                            # Dokumentasi resmi proyek
└── .gitignore                           # File filter Git
```

---

## 🚀 Cara Menjalankan Secara Lokal

1. **Unduh atau Clone Repositori:**
   ```bash
   git clone https://github.com/tamara7S/chatbot-bahrulmaghfiroh.git
   cd chatbot-bahrulmaghfiroh
   ```
2. **Jalankan:**
   - Cukup **klik 2x file `JALANKAN_CHATBOT.bat`** (Windows), atau
   - Buka langsung file `index.html` menggunakan browser apa pun (Google Chrome, Edge, Firefox).

---

## 🌐 Menjalankan Secara Online (GitHub Pages)

Agar teman atau penguji dapat langsung mencoba chatbot dari HP/laptop tanpa unduh file:
1. Buka repositori ini di GitHub.
2. Masuk ke menu **Settings** > **Pages**.
3. Pada bagian **Build and deployment** > **Source**, pilih **Deploy from a branch**.
4. Pilih branch `main` (atau `master`) dan folder `/ (root)`, lalu klik **Save**.
5. Tunggu 1–2 menit, website live demo akan aktif di:
   `https://tamara7s.github.io/chatbot-bahrulmaghfiroh/`

---

## 👥 Tim Pengembang (KKN Reguler UM 2026)

Proyek ini dikembangkan dalam rangka Program Pengabdian Masyarakat Kuliah Kerja Nyata (KKN) Universitas Negeri Malang Semester Gasal 2026/2027:

| No | Nama Lengkap | NIM | Program Studi | Peran |
| :---: | :--- | :---: | :---: | :--- |
| 1 | **Ahmad Farid Nugraha Satria Pradana** | 230535609346 | S1 Teknik Informatika | **Ketua Tim Pelaksana** |
| 2 | **Azarine Nadya Arfionika** | 230535609064 | S1 Teknik Informatika | Desain UI/UX & Antarmuka |
| 3 | **Mochammad Aditya Baharianto** | 230535609839 | S1 Teknik Informatika | Kurasi Basis Data & NLP |
| 4 | **Septa Agil Nur Nandyas** | 230535605736 | S1 Teknik Informatika | Pengujian Sistem & QA |
| 5 | **Tamara Rani Meilita** | 230535607601 | S1 Teknik Informatika | Pengembang Front-End & Korespondensi |

- **Dosen Pembimbing Lapangan (DPL):**  
  **Januar Kustiandi, S.Pd., M.Pd., Ph.D.** (NIP. 201801198512281035)
- **Mitra Program:**  
  **Yayasan Pondok Pesantren Bahrul Maghfiroh Cinta Indonesia Malang**  
  *Pengasuh: Prof. Dr. Ir. KH. Mohammad Bisri, M.S., IPU*  
  *Alamat: Jl. Joyo Agung No. 02, Tlogomas, Kec. Lowokwaru, Kota Malang, Jawa Timur 65144*

---

## 📄 Lisensi
Hak cipta terbuka di bawah lisensi [MIT](LICENSE). Dikembangkan untuk kemaslahatan umat dan kemudahan santri/wali santri Bahrul Maghfiroh.
