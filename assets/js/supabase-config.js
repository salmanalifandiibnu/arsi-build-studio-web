// ====================================================================
// KONFIGURASI SUPABASE — isi dua nilai di bawah ini
// ====================================================================
// 1. Buat project gratis di https://supabase.com/dashboard
// 2. Buka Project Settings > API
// 3. Copy "Project URL" dan "anon public" key ke bawah ini
//
// PENTING: anon key ini AMAN untuk ditaruh di kode frontend (memang
// didesain publik oleh Supabase). Yang TIDAK BOLEH pernah ditaruh di
// sini atau di file manapun yang dikirim ke browser adalah
// "service_role" key — itu kunci rahasia penuh, kalau bocor semua
// data bisa dibaca/diubah orang lain.
//
// Selama nilai di bawah masih "PASTE_..." (default), form kontak akan
// tetap berfungsi seperti biasa (hanya buka WhatsApp, tanpa simpan ke
// database) — jadi aman dibiarkan kosong dulu sebelum kamu setup Supabase.
// ====================================================================

window.SUPABASE_CONFIG = {
  url: "PASTE_PROJECT_URL_DI_SINI",       // contoh: https://xxxxxxxxxxxx.supabase.co
  anonKey: "PASTE_ANON_PUBLIC_KEY_DI_SINI" // contoh: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
};
