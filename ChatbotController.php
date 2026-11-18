<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

/**
 * Controller untuk Menghubungkan Chatbot ke Database MySQL Laravel
 * 
 * Cara Penggunaan:
 * 1. Simpan di: app/Http/Controllers/ChatbotController.php
 * 2. Tambahkan route di routes/api.php:
 *    Route::get('/chatbot/faq', [ChatbotController::class, 'getKnowledge']);
 */
class ChatbotController extends Controller
{
    /**
     * Mengambil daftar pengetahuan / FAQ dari database atau konfigurasi Laravel
     */
    public function getKnowledge(): JsonResponse
    {
        // Jika pondok sudah punya tabel di MySQL (misal: Faq atau ChatbotKnowledge),
        // pihak IT tinggal memanggil model: $data = Faq::where('is_active', true)->get();

        $knowledgeData = [
            [
                'keywords' => ['profil', 'apa itu pondok', 'bahrul maghfiroh', 'sejarah'],
                'answer'   => "Pondok Pesantren Bahrul Maghfiroh didirikan tahun 1995 oleh Prof. Dr. Ir. Mohammad Bisri, MS. dan diasuh oleh almaghfurlah KH. Luqmanul Karim (Gus Luqman) di bawah naungan Yayasan BMCI di Tlogomas, Kota Malang."
            ],
            [
                'keywords' => ['pendaftaran', 'psb', 'kapan buka', 'jadwal'],
                'answer'   => "Penerimaan Santri Baru (PSB) Tahun Ajaran 2026/2027 saat ini SEDANG DIBUKA melalui portal resmi psb.bahrulmaghfirohmalang.or.id."
            ],
            [
                'keywords' => ['biaya', 'spp', 'uang pangkal', 'syahriah'],
                'answer'   => "Biaya formulir Rp 75.000 - Rp 150.000. Uang pangkal mencakup seragam resmi & fasilitas asrama, sedangkan SPP bulanan mencakup sekolah, asrama, makan 3x sehari, dan pos kesehatan."
            ],
            [
                'keywords' => ['sambangan', 'jenguk', 'kunjungan wali'],
                'answer'   => "Jadwal kunjungan/sambangan santri dilaksanakan setiap hari Minggu pada pekan ke-2 dan pekan ke-4 setiap bulan (pukul 08.00 - 16.00 WIB)."
            ],
            [
                'keywords' => ['hp', 'gadget', 'handphone', 'aturan'],
                'answer'   => "Santri asrama dilarang membawa HP pribadi demi fokus ibadah dan belajar. Komunikasi difasilitasi melalui telepon asrama atau ustadz kamar."
            ]
        ];

        return response()->json([
            'status'  => 'success',
            'contact_wa' => '08113648800',
            'data'    => $knowledgeData
        ]);
    }
}
