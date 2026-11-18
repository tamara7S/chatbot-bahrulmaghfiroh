/**
 * WIDGET CHATBOT LAYANAN INFORMASI RESMI PONDOK PESANTREN BAHRUL MAGHFIROH MALANG
 * Dilengkapi Dual-Engine: Google Gemini AI (Generative) + Smart Offline Knowledge Base
 * Didesain ramah orang tua santri: Lengkap, Jelas, Santun & Terhubung WhatsApp Panitia
 * 
 * Dikembangkan oleh: Tim KKN Reguler Universitas Negeri Malang (UM) 2026
 */

(function () {
    // 1. INJEKSI FONT & CSS TAMPILAN RESPONSIVE
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap';
    document.head.appendChild(fontLink);

    const style = document.createElement('style');
    style.innerHTML = `
        .bm-chat-root * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
            -webkit-font-smoothing: antialiased;
        }

        .bm-chat-button {
            position: fixed;
            bottom: 24px;
            right: 24px;
            width: 62px;
            height: 62px;
            border-radius: 50%;
            background: linear-gradient(135deg, #15803d, #166534);
            box-shadow: 0 8px 24px rgba(21, 128, 61, 0.42);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 999999;
            transition: transform 0.25s ease, box-shadow 0.25s ease;
            border: 2.5px solid #ffffff;
        }

        .bm-chat-button:hover {
            transform: scale(1.08);
            box-shadow: 0 12px 30px rgba(21, 128, 61, 0.55);
        }

        .bm-chat-button svg {
            width: 30px;
            height: 30px;
            fill: #ffffff;
        }

        .bm-chat-badge-pulse {
            position: absolute;
            top: -2px;
            right: -2px;
            width: 16px;
            height: 16px;
            background: #22c55e;
            border: 2px solid #ffffff;
            border-radius: 50%;
            animation: bmPulse 2s infinite;
        }

        @keyframes bmPulse {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
            70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(34, 197, 94, 0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
        }

        .bm-chat-box {
            position: fixed;
            bottom: 98px;
            right: 24px;
            width: 395px;
            max-width: calc(100vw - 32px);
            height: 560px;
            max-height: calc(100vh - 120px);
            background: #ffffff;
            border-radius: 20px;
            box-shadow: 0 16px 40px rgba(0, 0, 0, 0.18);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            z-index: 999999;
            border: 1px solid #e2e8f0;
            transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease;
            transform-origin: bottom right;
        }

        .bm-chat-box.bm-hidden {
            display: none !important;
        }

        .bm-box-header {
            background: linear-gradient(135deg, #15803d 0%, #166534 100%);
            color: #ffffff;
            padding: 15px 18px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
        }

        .bm-header-left {
            display: flex;
            align-items: center;
            gap: 11px;
            user-select: none;
        }

        .bm-avatar-circle {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            border: 1.5px solid rgba(255, 255, 255, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
        }

        .bm-header-titles h4 {
            font-size: 14.5px;
            font-weight: 700;
            line-height: 1.25;
            letter-spacing: -0.2px;
        }

        .bm-header-status {
            display: flex;
            align-items: center;
            gap: 5px;
            margin-top: 3px;
        }

        .bm-status-dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #4ade80;
        }

        .bm-header-titles span {
            font-size: 11px;
            color: #dcfce7;
            font-weight: 500;
        }

        .bm-btn-close {
            background: rgba(255, 255, 255, 0.15);
            border: none;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            color: #ffffff;
            font-size: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: background 0.2s;
        }

        .bm-btn-close:hover {
            background: rgba(255, 255, 255, 0.3);
        }

        .bm-box-messages {
            flex: 1;
            padding: 16px;
            overflow-y: auto;
            background: #f8fafc;
            display: flex;
            flex-direction: column;
            gap: 12px;
            scroll-behavior: smooth;
        }

        .bm-box-messages::-webkit-scrollbar {
            width: 5px;
        }

        .bm-box-messages::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 10px;
        }

        .bm-msg-row {
            display: flex;
            flex-direction: column;
            max-width: 86%;
            animation: bmFadeIn 0.25s ease-out;
        }

        @keyframes bmFadeIn {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .bm-msg-row.bm-bot {
            align-self: flex-start;
        }

        .bm-msg-row.bm-user {
            align-self: flex-end;
        }

        .bm-msg-bubble {
            padding: 11px 15px;
            border-radius: 16px;
            font-size: 13.5px;
            line-height: 1.55;
            color: #1e293b;
            word-break: break-word;
        }

        .bm-bot .bm-msg-bubble {
            background: #ffffff;
            border-bottom-left-radius: 4px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
            border: 1px solid #f1f5f9;
        }

        .bm-bot .bm-msg-bubble strong {
            color: #15803d;
        }

        .bm-bot .bm-msg-bubble ul, .bm-bot .bm-msg-bubble ol {
            margin-left: 18px;
            margin-top: 6px;
            margin-bottom: 6px;
        }

        .bm-bot .bm-msg-bubble li {
            margin-bottom: 4px;
        }

        .bm-user .bm-msg-bubble {
            background: #15803d;
            color: #ffffff;
            border-bottom-right-radius: 4px;
            box-shadow: 0 3px 8px rgba(21, 128, 61, 0.28);
        }

        .bm-msg-time {
            font-size: 10px;
            color: #94a3b8;
            margin-top: 3px;
            padding: 0 4px;
        }

        .bm-user .bm-msg-time {
            align-self: flex-end;
        }

        .bm-typing-bubble {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 10px 14px;
            background: #ffffff;
            border-radius: 16px;
            border-bottom-left-radius: 4px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
            font-size: 12px;
            color: #64748b;
        }

        .bm-typing-dot {
            width: 6px;
            height: 6px;
            background: #16a34a;
            border-radius: 50%;
            animation: bmTyping 1.4s infinite ease-in-out;
        }

        .bm-typing-dot:nth-child(1) { animation-delay: 0s; }
        .bm-typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .bm-typing-dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes bmTyping {
            0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
            30% { transform: translateY(-4px); opacity: 1; }
        }

        .bm-chips-group {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 8px;
        }

        .bm-chip-item {
            background: #f0fdf4;
            color: #166534;
            border: 1px solid #bbf7d0;
            padding: 6px 11px;
            border-radius: 18px;
            font-size: 11.8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 4px;
        }

        .bm-chip-item:hover {
            background: #16a34a;
            color: #ffffff;
            border-color: #16a34a;
            transform: translateY(-1px);
        }

        .bm-wa-btn-card {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 7px;
            background: #25d366;
            color: #ffffff !important;
            padding: 8px 14px;
            border-radius: 12px;
            font-size: 12.5px;
            font-weight: 700;
            text-decoration: none;
            margin-top: 9px;
            box-shadow: 0 3px 8px rgba(37, 211, 102, 0.3);
            transition: background 0.2s, transform 0.2s;
        }

        .bm-wa-btn-card:hover {
            background: #1eb857;
            transform: translateY(-1px);
        }

        .bm-box-footer {
            padding: 10px 14px;
            background: #ffffff;
            border-top: 1px solid #f1f5f9;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .bm-text-input {
            flex: 1;
            border: 1px solid #cbd5e1;
            padding: 10px 14px;
            border-radius: 24px;
            font-size: 13.5px;
            outline: none;
            transition: border-color 0.2s, box-shadow 0.2s;
        }

        .bm-text-input:focus {
            border-color: #15803d;
            box-shadow: 0 0 0 2px rgba(21, 128, 61, 0.15);
        }

        .bm-btn-submit {
            background: #15803d;
            border: none;
            width: 38px;
            height: 38px;
            border-radius: 50%;
            color: #ffffff;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s, transform 0.15s;
            flex-shrink: 0;
        }

        .bm-btn-submit:hover {
            background: #166534;
            transform: scale(1.05);
        }

        .bm-btn-submit svg {
            width: 17px;
            height: 17px;
            fill: #ffffff;
        }
    `;
    document.head.appendChild(style);

    function getTimeString() {
        const d = new Date();
        return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
    }

    // 2. KNOWLEDGE BASE UTAMA RESMI DARI WEB BAHRULMAGHFIROHMALANG.OR.ID
    const OFFICIAL_PESANTREN_DATA = {
        name: "Pondok Pesantren Bahrul Maghfiroh Malang",
        yayasan: "Yayasan Bahrul Maghfiroh Cinta Indonesia (BMCI)",
        address: "Jl. Joyo Agung No. 02, Kelurahan Tlogomas, Kecamatan Lowokwaru, Kota Malang, Jawa Timur 65145",
        phoneWA: "08113648800",
        phoneWADisplay: "0811-3648-800",
        email: "yayasanbmci@gmail.com",
        webPSB: "psb.bahrulmaghfirohmalang.or.id",
        webOfficial: "bahrulmaghfirohmalang.or.id",
        rekeningPSB: "Bank Syariah Indonesia (BSI) a.n. Yayasan Bahrul Maghfiroh Cinta Indonesia",
        pendiri: "Didirikan tahun 1995 oleh Prof. Dr. Ir. Mohammad Bisri, MS. (mantan Rektor Universitas Brawijaya) dan dilanjutkan kepengasuhannya tahun 1998 oleh almaghfurlah KH. Luqmanul Karim (Gus Luqman). Saat ini dibina oleh jajaran dewan pengasuh bersama Prof. Bisri.",
        biayaPendaftaranFormulir: "Rp 75.000 s/d Rp 150.000 (tergantung jenjang PAUD/TK/SD/SMP/SMA)",
        jadwalSambangan: "Setiap hari Minggu pada pekan ke-2 dan pekan ke-4 setiap bulan, pukul 08.00 s/d 16.00 WIB di Gazebo dan Aula Utama.",
        aturanHP: "Santri asrama/mukim DILARANG KERAS membawa handphone/gawai pribadi demi menjaga kekhusyukan ibadah dan belajar. Komunikasi dengan orang tua difasilitasi terjadwal melalui nomor telepon kantor asrama atau ustadz pendamping.",
        jenjangFormal: "PAUD/TK, SD Terpadu, SMP Terpadu, MTs Terpadu, SMA Terpadu, MA Terpadu, dan Madrasah Diniyah.",
        pilihanSistem: "1) Fullday School (siswa pulang-pergi untuk SMP/SMA) dan 2) Boarding School / Mondok (santri tinggal mukim di asrama 24 jam putra/putri terpisah)."
    };

    // SYSTEM PROMPT GEMINI AI: Bertindak sebagai Ustadz Virtual Khusus Orang Tua / Calon Santri
    const GEMINI_SYSTEM_INSTRUCTION = `
Anda adalah "Ustadzah / Ustadz Virtual" asisten resmi customer service dari Pondok Pesantren Bahrul Maghfiroh Malang.
Karakter Anda: Sangat sopan, ramah, islami (selalu mengucap salam bila disapa), mengayomi, jelas, dan empatik.
Target utama pengguna adalah orang tua / wali santri yang sering kali sibuk atau malas membaca teks panjang di website, sehingga menginginkan penjelasan yang to-the-point, ringkas, mudah dipahami, dan akurat.

Berikut adalah BASIS PENGETAHUAN RESMI pesantren yang WAJIB Anda gunakan:
1. Profil & Sejarah: Didirikan tahun 1995 oleh Prof. Dr. Ir. Mohammad Bisri, MS. (mantan Rektor UB) dan dikembangkan oleh KH. Luqmanul Karim (Gus Luqman) di bawah naungan Yayasan Bahrul Maghfiroh Cinta Indonesia (BMCI). Beralamat di Jl. Joyo Agung No. 02, Tlogomas, Lowokwaru, Kota Malang.
2. Keunggulan & Karakteristik: Perpaduan salaf (kitab kuning) + Tahfidzul Qur'an 30 Juz + Kurikulum Formal Nasional + Jiwa Enterpreneur/Wirausaha Santri (BM Mart, Pertashop, Perikanan, Pertanian) + Unit Rehabilitasi Sosial Medis.
3. Jenjang Pendidikan:
   - Formal: PAUD, TK, SD, SMP Terpadu, MTs Terpadu, SMA Terpadu, dan Madrasah Aliyah (MA) Terpadu.
   - Pilihan Belajar: 
     a. Fullday School (pulang-pergi, santri tidak menginap)
     b. Boarding School / Mondok (santri mukim tinggal di asrama putra/putri terpisah)
4. Penerimaan Santri Baru (PSB):
   - Status: SEDANG DIBUKA.
   - Pendaftaran online via portal: psb.bahrulmaghfirohmalang.or.id atau website utama bahrulmaghfirohmalang.or.id.
   - Biaya formulir: Rp 75.000 s/d Rp 150.000 via BSI a.n. Yayasan Bahrul Maghfiroh Cinta Indonesia.
   - Syarat berkas: KK, Akta Kelahiran, KTP Orang Tua, NISN/surat keterangan sekolah asal, dan pas foto 3x4.
   - Alur: Daftar online -> Bayar pendaftaran -> Upload dokumen -> Tes seleksi (wawancara & tes baca Qur'an) -> Pengumuman -> Daftar ulang.
5. Biaya Pendidikan & Syahriah (SPP):
   - Uang Masuk/Pangkal: Meliputi paket seragam resmi, fasilitas asrama, buku/kitab, dan administrasi pesantren.
   - SPP Bulanan: Sudah mencakup sekolah, asrama, makan 3x sehari, bimbingan pengajian, dan poskestren. Konfirmasi nominal angka resmi gelombang aktif disarankan langsung ke nomor panitia.
6. Jadwal Sambangan (Jenguk Santri):
   - Hari: Setiap hari Minggu pekan ke-2 dan pekan ke-4 setiap bulan.
   - Jam: 08.00 s/d 16.00 WIB.
   - Tempat: Gazebo taman dan Aula Utama. Orang tua wajib lapor di pos gerbang dan berbusana muslim/muslimah rapi.
7. Aturan HP / Gadget:
   - Santri asrama TIDAK BOLEH membawa HP pribadi agar fokus mengaji dan belajar.
   - Komunikasi dengan wali santri terjadwal via telepon asrama/ustadz kamar.
8. Fasilitas: Masjid representatif, asrama putra & putri 3 lantai, ruang kelas ber-AC, Lab Komputer, Lab Digital & AI, GOR Multiguna, Poskestren 24 Jam, dan unit usaha santri.
9. Narahubung Resmi Panitia:
   - WhatsApp Resmi PSB: 0811-3648-800
   - Email: yayasanbmci@gmail.com

Format Jawaban & Batasan Ketat (STRICT GUARDRAILS):
- Anda HANYA DAN KHUSUS melayani informasi seputar Pondok Pesantren Bahrul Maghfiroh Malang (profil, pendiri Gus Luqman & Prof. Bisri, pendaftaran santri baru/PSB, rincian biaya & SPP, sistem fullday & mondok, fasilitas, jadwal sambangan, aturan HP, dan kontak panitia).
- JIKA pengguna bertanya hal di luar pesantren (seperti: matematika, coding/programming, resep masakan, politik, ramalan cuaca umum, berita selebriti, lelucon, atau materi umum lainnya yang TIDAK berhubungan dengan Bahrul Maghfiroh), Anda WAJIB menolak dengan santun:
  "Mohon maaf, sebagai asisten virtual resmi Pondok Pesantren Bahrul Maghfiroh Malang, saya hanya dapat melayani informasi seputar pesantren, pendaftaran santri baru (PSB), biaya pendidikan, jadwal sambangan, dan fasilitas di Bahrul Maghfiroh. 🌿 Apakah ada yang bisa kami bantu terkait pesantren?"
- DILARANG KERAS menjawab atau melayani pertanyaan di luar topik Bahrul Maghfiroh.
- Gunakan bahasa Indonesia yang santun, tertata rapi (gunakan poin-poin/bullet bila ada rincian).
- JANGAN BERHALUSINASI atau mengarang informasi di luar data resmi di atas.
- Jika ada hal teknis atau pertanyaan yang membutuhkan konfirmasi pembayaran personal, anjurkan menghubungi WhatsApp Panitia Resmi di 0811-3648-800.
`.trim();

    // 3. DATABASE OFFLINE CADANGAN (SMART RULE-BASED MATCHING)
    const DEFAULT_DATABASE = [
        {
            keywords: ['apa itu pondok', 'apa itu bahrul maghfiroh', 'profil pondok', 'tentang pondok', 'sejarah', 'latar belakang', 'berdirinya', 'profil', 'tentang bm'],
            answer: "<strong>Pondok Pesantren Bahrul Maghfiroh Malang:</strong><br><br>" +
                    "Pondok Pesantren Bahrul Maghfiroh adalah lembaga pendidikan Islam terpadu di bawah naungan <strong>Yayasan Bahrul Maghfiroh Cinta Indonesia (BMCI)</strong> yang berlokasi di Jl. Joyo Agung No. 02, Tlogomas, Kota Malang.<br><br>" +
                    "Pesantren ini memadukan kurikulum <strong>salafiyah (kitab kuning)</strong>, <strong>Tahfidzul Qur'an 30 Juz</strong>, pendidikan <strong>formal modern (SMP, MTs, SMA, MA Terpadu)</strong>, serta pembinaan karakter wirausaha santri (santripreneur)."
        },
        {
            keywords: ['siapa pemilik', 'pemilik', 'pendiri', 'pengasuh', 'kyai', 'kiai', 'gus luqman', 'bisri', 'pimpinan', 'ketua yayasan'],
            answer: "<strong>Pendiri & Pengasuh Pesantren:</strong><br><br>" +
                    "• <strong>Pendiri (1995):</strong> Didirikan oleh <strong>Prof. Dr. Ir. Mohammad Bisri, MS.</strong> (mantan Rektor Universitas Brawijaya).<br>" +
                    "• <strong>Pengasuh Sejarah (1998):</strong> Dilanjutkan oleh almaghfurlah <strong>KH. Luqmanul Karim (Gus Luqman)</strong>.<br>" +
                    "• <strong>Kepemimpinan Saat Ini:</strong> Diasuh oleh jajaran dewan pengasuh bersama Prof. Bisri dengan mengintegrasikan nilai salaf pesantren dan manajemen modern berbasis teknologi."
        },
        {
            keywords: ['kapan pendaftaran', 'kapan dibuka', 'jadwal pendaftaran', 'gelombang', 'kapan daftar', 'tanggal daftar', 'status pendaftaran'],
            answer: "<strong>Jadwal Penerimaan Santri Baru (PSB) 2026/2027:</strong><br><br>" +
                    "• <strong>Status:</strong> <span style='color:#16a34a;font-weight:700;'>SEDANG DIBUKA</span><br>" +
                    "• <strong>Pendaftaran Online:</strong> Melalui portal <a href='https://psb.bahrulmaghfirohmalang.or.id' target='_blank' style='color:#16a34a;font-weight:600;'>psb.bahrulmaghfirohmalang.or.id</a><br>" +
                    "• <strong>Gelombang 1:</strong> Oktober s/d Desember 2026<br>" +
                    "• <strong>Gelombang 2:</strong> Januari s/d Maret 2027<br>" +
                    "• <em>Pendaftaran ditutup sewaktu-waktu jika kuota asrama telah terpenuhi.</em>"
        },
        {
            keywords: ['syarat', 'berkas', 'dokumen', 'formulir', 'persyaratan', 'ijazah', 'akta', 'kk', 'nisn', 'pas foto'],
            answer: "<strong>Syarat Berkas Pendaftaran Santri Baru:</strong><br><br>" +
                    "1. Mengisi formulir online di website resmi.<br>" +
                    "2. Fotokopi Kartu Keluarga (KK) & KTP Orang Tua.<br>" +
                    "3. Fotokopi Akta Kelahiran calon santri.<br>" +
                    "4. Fotokopi Ijazah / SKL legalisir & bukti NISN.<br>" +
                    "5. Pas foto terbaru ukuran 3x4 berwarna.<br>" +
                    "6. Membayar biaya formulir (Rp 75.000 - Rp 150.000) via BSI a.n. Yayasan Bahrul Maghfiroh Cinta Indonesia."
        },
        {
            keywords: ['fullday', 'boarding', 'mondok', 'pulang', 'menginap', 'sistem belajar', 'non asrama'],
            answer: "<strong>Pilihan Sistem Belajar di Bahrul Maghfiroh:</strong><br><br>" +
                    "Pesantren menyediakan 2 opsi fleksibel untuk wali santri:<br>" +
                    "1. <strong>Fullday School:</strong> Siswa mengikuti sekolah formal terpadu dari pagi hingga sore hari, lalu pulang ke rumah (tanpa tinggal di asrama).<br>" +
                    "2. <strong>Boarding School (Mondok):</strong> Santri mukim menetap 24 jam di asrama putra/putri dengan pendalaman tahfidz dan kitab kuning."
        },
        {
            keywords: ['biaya', 'biaya pendaftaran', 'biaya daftar', 'biaya masuk', 'biaya sekolah', 'biaya asrama', 'spp', 'uang', 'bayar', 'syahriah', 'harga', 'angsuran', 'pangkal', 'formulir', 'daftar ulang'],
            answer: "<strong>Informasi Biaya Pendidikan & Asrama:</strong><br><br>" +
                    "• <strong>Biaya Formulir Pendaftaran:</strong> Rp 75.000 s/d Rp 150.000 (sesuai jenjang).<br>" +
                    "• <strong>Uang Pangkal Masuk:</strong> Meliputi paket seragam resmi, fasilitas asrama, kitab, dan sarana penunjang.<br>" +
                    "• <strong>SPP / Syahriah Bulanan:</strong> Sudah mencakup biaya sekolah formal, hunian asrama, konsumsi makan 3x sehari, dan pos kesehatan santri.<br><br>" +
                    "<em>Untuk rincian nominal angka gelombang aktif, Anda dapat langsung menghubungi WhatsApp Panitia PSB.</em>"
        },
        {
            keywords: ['jenjang', 'sekolah', 'pendidikan', 'smp', 'sma', 'mts', 'ma', 'madrasah', 'kelas', 'jurusan', 'formal'],
            answer: "<strong>Jenjang Pendidikan yang Tersedia:</strong><br><br>" +
                    "• <strong>Tingkat Dasar:</strong> PAUD, TK Islam Terpadu, dan SD Islam Terpadu.<br>" +
                    "• <strong>Tingkat Menengah Pertama:</strong> SMP Terpadu & MTs Terpadu.<br>" +
                    "• <strong>Tingkat Menengah Atas:</strong> SMA Terpadu & MA Terpadu (Program IPA, IPS, dan Keagamaan).<br>" +
                    "• <strong>Kepesantrenan:</strong> Madrasah Diniyah Salafiyah & Tahfidzul Qur'an 30 Juz."
        },
        {
            keywords: ['sambang', 'sambangan', 'kunjung', 'kunjungan', 'besuk', 'jenguk', 'hari apa', 'wali santri', 'ketemu anak'],
            answer: "<strong>Jadwal Sambangan (Kunjungan Wali Santri):</strong><br><br>" +
                    "• <strong>Waktu:</strong> Setiap hari <strong>Minggu pekan ke-2 dan pekan ke-4</strong> setiap bulan.<br>" +
                    "• <strong>Jam Kunjungan:</strong> Pukul 08.00 s/d 16.00 WIB.<br>" +
                    "• <strong>Tempat:</strong> Gazebo taman dan Aula Utama Serbaguna.<br>" +
                    "Wali santri diharapkan melapor di pos gerbang dan berbusana muslim/muslimah yang sopan."
        },
        {
            keywords: ['hp', 'gadget', 'handphone', 'aturan', 'tata tertib', 'boleh bawa hp', 'laptop', 'elektronik'],
            answer: "<strong>Aturan Penggunaan HP / Gadget:</strong><br><br>" +
                    "Santri mukim asrama <strong>TIDAK DIPERBOLEHKAN</strong> membawa handphone pribadi ke pondok demi menjaga kekhusyukan ibadah dan konsentrasi belajar.<br><br>" +
                    "Komunikasi santri dengan orang tua disediakan secara berkala melalui sambungan telepon kantor asrama atau ustadz kamar."
        },
        {
            keywords: ['fasilitas', 'gedung', 'kamar', 'asrama', 'toilet', 'lapangan', 'masjid', 'klinik', 'poskestren', 'sarana'],
            answer: "<strong>Fasilitas Unggulan Kawasan Pesantren:</strong><br><br>" +
                    "• Masjid Jami' Bahrul Maghfiroh (kapasitas ±2.000 jamaah).<br>" +
                    "• Gedung Asrama Putra (Al-Ikhlas) & Asrama Putri 3 lantai.<br>" +
                    "• Gedung Sekolah ber-AC, Lab Komputer, dan Lab Digital & AI.<br>" +
                    "• GOR Multiguna, Lapangan Futsal & Basket.<br>" +
                    "• Poskestren (Klinik 24 Jam) dan Unit Usaha Santri (BM Mart & Pertashop)."
        },
        {
            keywords: ['alamat', 'lokasi', 'dimana', 'jalan', 'rute', 'daerah', 'tlogomas', 'kontak', 'telepon', 'wa', 'nomor', 'maps'],
            answer: "<strong>Alamat & Kontak Resmi:</strong><br><br>" +
                    "📍 <strong>Alamat:</strong> Jl. Joyo Agung No. 02, Tlogomas, Kec. Lowokwaru, Kota Malang, Jawa Timur 65145.<br>" +
                    "📞 <strong>WhatsApp Layanan PSB:</strong> 0811-3648-800<br>" +
                    "✉️ <strong>Email:</strong> yayasanbmci@gmail.com<br>" +
                    "🌐 <strong>Website:</strong> bahrulmaghfirohmalang.or.id"
        },
        {
            keywords: ['assalam', 'halo', 'hai', 'pagi', 'siang', 'sore', 'malam', 'permisi', 'assalamu'],
            answer: "Wa'alaikumsalam Warahmatullahi Wabarakatuh! Selamat datang di layanan informasi Pondok Pesantren Bahrul Maghfiroh Malang. Ada yang bisa kami bantu seputar pendaftaran santri baru, biaya, atau sistem belajar?"
        },
        {
            keywords: ['terima kasih', 'makasih', 'syukron', 'ok', 'oke', 'baik', 'suwun'],
            answer: "Sama-sama! Semoga putra-putri Bapak/Ibu menjadi generasi yang sholeh, cerdas, dan berkah. Jika ada hal lain yang ingin ditanyakan, jangan ragu untuk bertanya lagi ya."
        }
    ];

    function getCustomDatabase() {
        const custom = localStorage.getItem('bm_custom_database');
        if (custom) {
            try {
                const arr = JSON.parse(custom);
                if (Array.isArray(arr) && arr.length > 0) return [...arr, ...DEFAULT_DATABASE];
            } catch (e) { }
        }
        return DEFAULT_DATABASE;
    }

    // 4. MEMBUAT ELEMEN TAMPILAN WIDGET
    const root = document.createElement('div');
    root.className = 'bm-chat-root';
    root.innerHTML = `
        <div class="bm-chat-button" id="bmLauncherBtn" title="Tanya Informasi Bahrul Maghfiroh">
            <span class="bm-chat-badge-pulse"></span>
            <svg viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
            </svg>
        </div>

        <div class="bm-chat-box bm-hidden" id="bmChatBox">
            <div class="bm-box-header">
                <div class="bm-header-left" id="bmSecretAdminTrigger" title="Pondok Pesantren Bahrul Maghfiroh">
                    <div class="bm-avatar-circle">🕌</div>
                    <div class="bm-header-titles">
                        <h4>Bahrul Maghfiroh Malang</h4>
                        <div class="bm-header-status">
                            <span class="bm-status-dot"></span>
                            <span>Layanan Informasi 24 Jam</span>
                        </div>
                    </div>
                </div>
                <button class="bm-btn-close" id="bmCloseBtn" title="Tutup Chat">&times;</button>
            </div>

            <div class="bm-box-messages" id="bmMessagesContainer">
                <div class="bm-msg-row bm-bot">
                    <div class="bm-msg-bubble">
                        Assalamu'alaikum Warahmatullahi Wabarakatuh! 🌿<br><br>
                        Selamat datang di layanan informasi resmi <strong>Pondok Pesantren Bahrul Maghfiroh Malang</strong>.<br><br>
                        Ada yang bisa kami bantu seputar pendaftaran, biaya, atau kehidupan santri? Silakan tanyakan hal apa saja atau klik topik cepat di bawah ini:
                        
                        <div class="bm-chips-group">
                            <button class="bm-chip-item" data-text="Apa itu Pondok Pesantren Bahrul Maghfiroh dan sejarahnya?">📖 Profil & Sejarah</button>
                            <button class="bm-chip-item" data-text="Kapan pendaftaran santri baru dibuka dan bagaimana alurnya?">📅 Info & Alur PSB</button>
                            <button class="bm-chip-item" data-text="Berapa rincian biaya pendaftaran dan SPP asrama?">💰 Biaya & SPP</button>
                            <button class="bm-chip-item" data-text="Apa perbedaan sistem Fullday School dan Boarding School (Mondok)?">🏫 Fullday vs Mondok</button>
                            <button class="bm-chip-item" data-text="Kapan jadwal sambangan atau jenguk santri?">🏡 Jadwal Sambangan</button>
                            <button class="bm-chip-item" data-text="Apakah santri boleh bawa HP ke asrama?">📱 Aturan HP</button>
                            <button class="bm-chip-item" data-text="Apa saja fasilitas gedung dan asrama santri?">🏢 Fasilitas Pondok</button>
                            <a class="bm-chip-item" style="background:#dcfce7;border-color:#86efac;color:#166534;" href="https://wa.me/${OFFICIAL_PESANTREN_DATA.phoneWA}?text=Assalamu%27alaikum%20Panitia%20Bahrul%20Maghfiroh%2C%20saya%20wali%20santri%20ingin%20bertanya%20informasi..." target="_blank">🟢 Hubungi WA Panitia</a>
                        </div>
                    </div>
                    <span class="bm-msg-time">${getTimeString()}</span>
                </div>
            </div>

            <div class="bm-box-footer">
                <input type="text" class="bm-text-input" id="bmInputText" placeholder="Ketik pertanyaan seputar pondok..." autocomplete="off">
                <button class="bm-btn-submit" id="bmSendBtn" title="Kirim Pesan">
                    <svg viewBox="0 0 24 24">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(root);

    // ELEMEN DOM
    const launcher = document.getElementById('bmLauncherBtn');
    const chatBox = document.getElementById('bmChatBox');
    const closeBtn = document.getElementById('bmCloseBtn');
    const container = document.getElementById('bmMessagesContainer');
    const input = document.getElementById('bmInputText');
    const sendBtn = document.getElementById('bmSendBtn');
    const secretTrigger = document.getElementById('bmSecretAdminTrigger');

    function toggleBox() {
        chatBox.classList.toggle('bm-hidden');
        if (!chatBox.classList.contains('bm-hidden')) {
            input.focus();
        }
    }

    launcher.addEventListener('click', toggleBox);
    closeBtn.addEventListener('click', toggleBox);

    // AKSES RAHASIA ADMIN (Klik 3x avatar oleh pengurus)
    let clickCount = 0;
    let clickTimer = null;
    secretTrigger.addEventListener('click', () => {
        clickCount++;
        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => { clickCount = 0; }, 800);
        if (clickCount >= 3) {
            clickCount = 0;
            const pin = prompt("🔐 Akses Khusus Pengurus (Masukkan PIN):");
            if (pin === "1234" || pin === "admin") {
                window.open('admin-chatbot.html', '_blank');
            } else if (pin !== null) {
                alert("PIN Pengurus Salah!");
            }
        }
    });

    function addMessage(htmlContent, type) {
        const row = document.createElement('div');
        row.className = 'bm-msg-row ' + (type === 'user' ? 'bm-user' : 'bm-bot');
        row.innerHTML = `
            <div class="bm-msg-bubble">${htmlContent}</div>
            <span class="bm-msg-time">${getTimeString()}</span>
        `;
        container.appendChild(row);
        container.scrollTop = container.scrollHeight;
        return row;
    }

    function showTypingIndicator() {
        const row = document.createElement('div');
        row.className = 'bm-msg-row bm-bot';
        row.id = 'bmTypingIndicator';
        row.innerHTML = `
            <div class="bm-typing-bubble">
                <span>Menyiapkan jawaban</span>
                <span class="bm-typing-dot"></span>
                <span class="bm-typing-dot"></span>
                <span class="bm-typing-dot"></span>
            </div>
        `;
        container.appendChild(row);
        container.scrollTop = container.scrollHeight;
        return row;
    }

    function removeTypingIndicator() {
        const el = document.getElementById('bmTypingIndicator');
        if (el) el.remove();
    }

    // FORMATTING MARKDOWN SEDERHANA KE HTML
    function formatMarkdownToHTML(text) {
        if (!text) return "";
        let formatted = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n\s*-\s+(.*?)(?=\n|$)/g, '<li>$1</li>')
            .replace(/\n\s*\*\s+(.*?)(?=\n|$)/g, '<li>$1</li>')
            .replace(/\n\s*(\d+)\.\s+(.*?)(?=\n|$)/g, '<li>$2</li>')
            .replace(/\n\n+/g, '<br><br>')
            .replace(/\n/g, '<br>');

        if (formatted.includes('<li>')) {
            formatted = formatted.replace(/(<li>.*?<\/li>)+/g, '<ul>$&</ul>');
        }
        return formatted;
    }

    // 5. ENGINE KECERDASAN BUATAN (GEMINI API) DENGAN FALLBACK CERDAS
    async function askGeminiAI(userPrompt, apiKey) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        const payload = {
            system_instruction: {
                parts: [{ text: GEMINI_SYSTEM_INSTRUCTION }]
            },
            contents: [
                {
                    role: "user",
                    parts: [{ text: userPrompt }]
                }
            ],
            generationConfig: {
                temperature: 0.4,
                maxOutputTokens: 600
            }
        };

        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            throw new Error(`Gemini API returned status ${res.status}`);
        }

        const data = await res.json();
        const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!rawText) throw new Error("No answer generated from Gemini API");

        let html = formatMarkdownToHTML(rawText);
        // Tambahkan tombol WhatsApp jika berkaitan dengan pendaftaran atau pertanyaan mendalam
        html += `<br><a class="bm-wa-btn-card" href="https://wa.me/${OFFICIAL_PESANTREN_DATA.phoneWA}?text=Assalamu%27alaikum%20Panitia%20Bahrul%20Maghfiroh%2C%20saya%20ingin%20konsultasi%20mengenai%20${encodeURIComponent(userPrompt)}" target="_blank">
            💬 Konsultasi via WhatsApp (${OFFICIAL_PESANTREN_DATA.phoneWADisplay})
        </a>`;
        return html;
    }

    // 5. ALGORITMA FUZZY STRING MATCHING (LEVENSHTEIN) & KAMUS NORMALISASI TYPO
    // Mengatasi salah ketik pengguna (misal: "pindok" -> "pondok", "byaya" -> "biaya", "daftr" -> "daftar")
    const TYPO_DICTIONARY = {
        // A. Typo & Kata Tidak Baku Lembaga
        'pindok': 'pondok',
        'pondek': 'pondok',
        'pndok': 'pondok',
        'pesntren': 'pesantren',
        'psntrn': 'pesantren',
        'pesntren': 'pesantren',
        'ponpes': 'pesantren',
        'pondokan': 'pesantren',
        'bm': 'bahrul maghfiroh',

        // B. Typo & Bahasa Santai Pemilik / Tokoh
        'sopo': 'siapa',
        'sapa': 'siapa',
        'sp': 'siapa',
        'sing': 'yang',
        'seng': 'yang',
        'nduwe': 'punya pemilik',
        'duwe': 'punya pemilik',
        'pemilik': 'pemilik pendiri',
        'pmilik': 'pemilik',
        'pndiri': 'pendiri',
        'kyai': 'kyai pengasuh',
        'kyaine': 'kyai pengasuh',
        'yayi': 'kyai pengasuh',

        // C. Typo & Slang Biaya / Keuangan
        'byaya': 'biaya',
        'biyaya': 'biaya',
        'bya': 'biaya',
        'biayane': 'biaya',
        'bayare': 'biaya',
        'piro': 'berapa biaya',
        'pirospp': 'biaya spp',
        'ongkos': 'biaya',
        'tarif': 'biaya',
        'spp': 'spp bulanan syahriah',
        'syahriah': 'syahriah spp bulanan',
        'brp': 'berapa',
        'brapa': 'berapa',

        // D. Typo & Slang Pendaftaran & Tanggal
        'daptar': 'daftar',
        'daftr': 'daftar',
        'dftar': 'daftar',
        'ndaftar': 'daftar',
        'pndaftaran': 'pendaftaran',
        'pendaftarane': 'pendaftaran',
        'kpn': 'kapan',
        'kpan': 'kapan',
        'tgl': 'tanggal',
        'kapane': 'kapan jadwal',

        // E. Typo & Slang Syarat & Berkas
        'syrt': 'syarat',
        'sarat': 'syarat',
        'syarate': 'syarat berkas',
        'berkase': 'berkas dokumen',
        'dokumene': 'dokumen berkas',

        // F. Typo & Bahasa Santai Sambangan / Kunjungan
        'sambang': 'sambangan',
        'nyambang': 'sambangan kunjungan',
        'sambangane': 'sambangan kunjungan',
        'jenguk': 'sambangan kunjungan',
        'besuk': 'sambangan kunjungan',
        'tilik': 'sambangan kunjungan',

        // G. Aturan HP / Elektronik
        'hape': 'hp',
        'henpon': 'hp',
        'handpon': 'hp',
        'gadget': 'hp',
        'gawai': 'hp',
        'laptop': 'hp gadget laptop',

        // H. Sistem Belajar & Asrama
        'fulldei': 'fullday',
        'fuldei': 'fullday',
        'mondok': 'boarding asrama',
        'nginep': 'boarding asrama',
        'mukim': 'boarding asrama',
        'asram': 'asrama',
        'asramae': 'asrama',
        'kamare': 'asrama fasilitas',

        // I. Pertanyaan Tanya Alur / Cara
        'gmn': 'bagaimana cara alur',
        'gmna': 'bagaimana cara alur',
        'gimana': 'bagaimana cara alur',
        'piye': 'bagaimana cara alur',
        'yaopo': 'bagaimana cara alur',

        // J. Alamat & Kontak
        'alamate': 'alamat lokasi',
        'lokasine': 'alamat lokasi',
        'ngendi': 'dimana alamat',
        'dmana': 'dimana alamat',
        'fasiltas': 'fasilitas',
        'fasilitase': 'fasilitas gedung'
    };

    function normalizeText(text) {
        if (!text) return "";
        let clean = text.toLowerCase()
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?'"“”]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

        const words = clean.split(' ');
        const normalizedWords = words.map(w => TYPO_DICTIONARY[w] || w);
        return normalizedWords.join(' ');
    }

    function levenshteinDistance(a, b) {
        if (a.length === 0) return b.length;
        if (b.length === 0) return a.length;
        const matrix = [];
        for (let i = 0; i <= b.length; i++) matrix[i] = [i];
        for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        return matrix[b.length][a.length];
    }

    function isWordFuzzyMatch(w1, w2) {
        if (!w1 || !w2) return false;
        if (w1 === w2) return true;
        const maxLen = Math.max(w1.length, w2.length);
        if (maxLen <= 3) return w1 === w2; // kata pendek seperti 'wa', 'hp', 'bm' harus tepat
        const dist = levenshteinDistance(w1, w2);
        if (maxLen <= 6) return dist <= 1; // misal 'pindok' vs 'pondok' (dist=1) -> MATCH
        return dist <= 2;                 // misal 'fasiltas' vs 'fasilitas' (dist=1) -> MATCH
    }

    const STOP_WORDS = new Set(['siapa', 'apa', 'kapan', 'bagaimana', 'berapa', 'kenapa', 'mengapa', 'dimana', 'ada', 'bisa', 'mau', 'yang', 'dan', 'di', 'ke', 'dari', 'itu', 'ini', 'gak', 'nggak', 'tidak']);

    // ENGINE OFFLINE MATCHING (RULE-BASED DENGAN FUZZY TOLERANSI TYPO & GUARDRAIL KETAT PESANTREN)
    function queryOfflineDatabase(queryText) {
        const rawQ = queryText.toLowerCase().trim();
        const rawWords = rawQ.split(/\s+/).filter(w => w.length > 0);
        const normalizedQ = normalizeText(queryText);
        const userWords = normalizedQ.split(/\s+/).filter(w => w.length > 0);

        const db = getCustomDatabase();
        let bestMatch = null;
        let highestScore = 0;

        for (const item of db) {
            let itemScore = 0;
            let itemMatchedNonStopword = false;

            for (const kw of item.keywords) {
                const kwClean = kw.toLowerCase().trim();
                const kwWords = kwClean.split(/\s+/).filter(w => w.length > 0);

                // 1. Direct Phrase Match (hanya jika frase multi-kata, misal 'biaya smp', 'apa itu pondok')
                if (kwWords.length > 1 && (rawQ.includes(kwClean) || normalizedQ.includes(kwClean))) {
                    itemScore += kwClean.length * 4;
                    itemMatchedNonStopword = true;
                    continue;
                }

                // 2. Token & Fuzzy Match (untuk kata per kata atau kata tunggal)
                let matchedWordsCount = 0;
                let nonStopwordMatched = 0;
                let tokenScore = 0;

                for (const kwW of kwWords) {
                    for (const uW of userWords) {
                        if (isWordFuzzyMatch(uW, kwW)) {
                            matchedWordsCount++;
                            if (!STOP_WORDS.has(kwW)) {
                                nonStopwordMatched++;
                            }
                            tokenScore += kwW.length * 2.8;
                            break;
                        }
                    }
                }

                if (nonStopwordMatched > 0) {
                    itemMatchedNonStopword = true;
                    itemScore += tokenScore;
                    if (matchedWordsCount === kwWords.length) {
                        itemScore += kwClean.length * 3.5;
                    }
                }
            }

            // Batalkan skor jika tidak ada kata benda inti yang cocok sama sekali
            if (!itemMatchedNonStopword) {
                itemScore = 0;
            }

            if (itemScore > highestScore) {
                highestScore = itemScore;
                bestMatch = item;
            }
        }

        // Ambang batas kecocokan minimal (Harus relevan dengan topik pesantren)
        if (bestMatch && highestScore >= 12) {
            let res = bestMatch.answer;
            res += `<br><a class="bm-wa-btn-card" href="https://wa.me/${OFFICIAL_PESANTREN_DATA.phoneWA}?text=Assalamu%27alaikum%20Panitia%20Bahrul%20Maghfiroh..." target="_blank">
                💬 Hubungi WhatsApp Panitia (${OFFICIAL_PESANTREN_DATA.phoneWADisplay})
            </a>`;
            return res;
        }

        // PENOLAKAN SANTUN UNTUK PERTANYAAN DI LUAR DOMAIN PESANTREN
        return `Mohon maaf, sebagai asisten virtual resmi <strong>Pondok Pesantren Bahrul Maghfiroh Malang</strong>, saya hanya dapat melayani informasi seputar pesantren, pendaftaran santri baru (PSB), rincian biaya, jadwal kunjungan (sambangan), dan fasilitas di Bahrul Maghfiroh. 🌿<br><br>Silakan ajukan pertanyaan seputar pesantren, atau hubungi langsung <strong>Panitia Resmi PSB Bahrul Maghfiroh</strong>:<br>
            <a class="bm-wa-btn-card" href="https://wa.me/${OFFICIAL_PESANTREN_DATA.phoneWA}?text=Assalamu%27alaikum%20Panitia%20Bahrul%20Maghfiroh%2C%20saya%20wali%20santri%20ingin%20bertanya%3A%20${encodeURIComponent(queryText)}" target="_blank">
                💬 Chat WhatsApp Panitia (${OFFICIAL_PESANTREN_DATA.phoneWADisplay})
            </a>`;
    }

    // 6. PROSES QUERY UTAMA
    async function processQuery(queryText) {
        const q = queryText.toLowerCase().trim();

        // Perintah Rahasia Admin
        if (q === '/admin' || q === 'admin') {
            const pin = prompt("🔐 Akses Khusus Pengurus (Masukkan PIN):");
            if (pin === "1234" || pin === "admin") {
                window.open('admin-chatbot.html', '_blank');
                addMessage("Membuka dasbor pengelolaan di tab baru...", 'bot');
                return;
            }
        }

        showTypingIndicator();

        const apiKey = localStorage.getItem('bm_gemini_api_key') || (window.BM_CONFIG && window.BM_CONFIG.geminiApiKey) || "";

        if (apiKey && apiKey.trim().length > 15) {
            try {
                const answerHTML = await askGeminiAI(queryText, apiKey.trim());
                removeTypingIndicator();
                addMessage(answerHTML, 'bot');
                return;
            } catch (err) {
                console.warn("[Chatbot Bahrul Maghfiroh] Gemini API dialihkan ke mode cerdas bawaan:", err);
            }
        }

        // Fallback otomatis ke Offline Database
        setTimeout(() => {
            removeTypingIndicator();
            const answerHTML = queryOfflineDatabase(queryText);
            addMessage(answerHTML, 'bot');
        }, 350);
    }

    function handleSend() {
        const txt = input.value.trim();
        if (!txt) return;
        addMessage(txt, 'user');
        input.value = '';
        processQuery(txt);
    }

    sendBtn.addEventListener('click', handleSend);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });

    container.addEventListener('click', (e) => {
        const chip = e.target.closest('.bm-chip-item');
        if (chip && chip.hasAttribute('data-text')) {
            const prompt = chip.getAttribute('data-text');
            addMessage(prompt, 'user');
            processQuery(prompt);
        }
    });

    // FUNGSI GLOBAL PEMANGGIL DARI LUAR
    window.queryOfflineDatabase = queryOfflineDatabase;
    window.normalizeText = normalizeText;
    window.openBMChat = function (topic) {
        if (chatBox.classList.contains('bm-hidden')) {
            chatBox.classList.remove('bm-hidden');
        }
        if (topic) {
            addMessage(topic, 'user');
            processQuery(topic);
        }
    };
})();
