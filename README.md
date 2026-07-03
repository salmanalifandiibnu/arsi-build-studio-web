# Website Arsi Build Studio (versi statis, gratis hosting)

Struktur:
```
index.html        -> Beranda
tentang.html       -> Tentang Kami
layanan.html       -> Layanan
portofolio.html    -> Portofolio
kontak.html        -> Kontak
assets/css/style.css
assets/js/main.js
assets/img/        -> foto (diambil dari company profile PDF)
```

## Cara hosting gratis (pilih salah satu)

**1. Netlify Drop (paling gampang)**
1. Buka https://app.netlify.com/drop
2. Drag & drop seluruh folder ini ke halaman tersebut
3. Selesai — dapat link `namaacak.netlify.app`, bisa diganti domain sendiri nanti (gratis subdomain, atau sambungkan domain `arsibuildstudio.com` yang sudah ada)

**2. Vercel**
1. Buat akun di https://vercel.com
2. New Project > Upload folder ini (atau hubungkan ke GitHub repo)
3. Deploy — otomatis dapat link gratis

**3. GitHub Pages**
1. Upload semua file ke repository GitHub baru
2. Settings > Pages > Branch: main > Save
3. Situs aktif di `namauser.github.io/namarepo`

## Coba form kontak + database (Supabase) di localhost

Form kontak saat ini berfungsi tanpa setup apapun (langsung buka WhatsApp). Bagian ini opsional, untuk yang mau data form juga tersimpan ke database.

**1. Buat project Supabase (gratis)**
1. Daftar/login di https://supabase.com/dashboard
2. New Project > kasih nama bebas (mis. `arsi-build-studio`) > pilih region Singapore (paling dekat) > Create
3. Tunggu ±2 menit sampai project aktif

**2. Buat tabel `leads`**
1. Di dashboard project, buka menu **SQL Editor** > New query
2. Copy-paste seluruh isi file `supabase/schema.sql` (ada di folder ini) > klik **Run**
3. Cek di menu **Table Editor**, tabel `leads` harus sudah muncul (masih kosong)

**3. Ambil kredensial**
1. Buka **Project Settings** (ikon gear) > **API**
2. Copy **Project URL** dan key **anon public**
3. Buka file `assets/js/supabase-config.js`, ganti `PASTE_PROJECT_URL_DI_SINI` dan `PASTE_ANON_PUBLIC_KEY_DI_SINI` dengan nilai yang kamu copy

**4. Jalankan di localhost**
Buka folder ini lewat terminal, lalu jalankan salah satu:
```bash
# kalau ada Python
python3 -m http.server 5500

# atau kalau ada Node.js
npx serve .
```
Buka `http://localhost:5500/kontak.html` di browser (jangan double-click file HTML langsung — beberapa browser memblokir request ke Supabase dari alamat `file://`).

**5. Tes**
1. Isi & kirim form kontak
2. WhatsApp tetap terbuka seperti biasa
3. Cek di Supabase **Table Editor > leads** — baris baru harusnya muncul di sana
4. Untuk pastikan keamanannya: buka Console browser (F12), coba jalankan
   ```js
   supabase.from('leads').select('*').then(r => console.log(r))
   ```
   Hasilnya harus **kosong/error** (bukan menampilkan data) — itu tandanya RLS bekerja, anon key cuma bisa kirim data, tidak bisa membacanya.

Kalau sudah yakin jalan lancar di localhost, kredensial yang sama dipakai lagi persis begitu website di-deploy ke hosting (Netlify/Vercel/GitHub Pages) — tidak ada yang perlu diubah.

## Yang perlu diganti nanti
- **Portofolio**: kartu di `portofolio.html` dan bagian "Dari Konsep ke Karya" di `index.html` masih placeholder (belum ada foto proyek asli). Ganti dengan foto proyek nyata begitu tersedia.
- **Nomor WhatsApp**: form kontak & tombol WA mengarah ke `6282211226123`. Ubah di `assets/js/main.js` (variabel `waPhone`) dan setiap link `wa.me/...` di file HTML bila nomor berubah.
- **Domain**: arahkan `arsibuildstudio.com` ke hosting pilihan Anda lewat pengaturan DNS di penyedia domain.

## Kenapa desainnya begini
Palet warna maroon diambil dari brand asli Arsi Build Studio (bukan biru seperti web inspirasi), dengan tema visual "blueprint arsitektur" — garis tipis, tanda siku ala gambar teknik, label huruf mono — supaya terasa related dengan jasa arsitektur & surveyor tanpa meniru mentah-mentah web referensi.
