{{-- 
    KOMPONEN BLADE CHATBOT PONDOK PESANTREN BAHRUL MAGHFIROH
    Cara pakai di Laravel:
    1. Simpan file ini di: resources/views/components/chatbot.blade.php (atau resources/views/partials/chatbot.blade.php)
    2. Panggil di layout utama Anda (misal: resources/views/layouts/app.blade.php) sebelum </body>:
       @include('components.chatbot')
       atau:
       <x-chatbot />
--}}

<!-- Script Widget Chatbot Bahrul Maghfiroh -->
<script src="{{ asset('js/chatbot-bahrulmaghfiroh.js') }}" defer></script>

<!-- Opsional: Konfigurasi Tambahan untuk Laravel (Bisa diisi jika mau dinamis dari controller/env) -->
<script>
    window.BM_CONFIG = {
        appEnv: "{{ config('app.env', 'production') }}",
        appName: "{{ config('app.name', 'Pondok Pesantren Bahrul Maghfiroh') }}",
        apiUrl: "{{ url('/api/chatbot/faq') }}", // Endpoint jika tersambung ke database MySQL Laravel
        geminiApiKey: "{{ config('services.gemini.key', '') }}" // API Key opsional dari .env
    };
</script>
