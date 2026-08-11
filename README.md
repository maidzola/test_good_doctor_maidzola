# Good Doctor - Web Automation Test

## Deskripsi

Repository ini berisi automation test sederhana menggunakan **Playwright**
yang menguji situs publik **Good Doctor** (`https://www.gooddoctor.co.id/`).

Automation ini dibuat sebagai bagian dari pengerjaan **Test Case No. 4**
(SQA Engineer Test), yang aslinya meminta automation test untuk skenario
**TC_001 - Start a Consultation with a Doctor** pada **aplikasi mobile**
Good Doctor.

## Batasan / Ruang Lingkup

Automation pada repository ini **tidak** mencakup skenario penuh TC_001
karena dua kendala teknis berikut:

1. **Tidak ada APK dummy / environment testing.**
   TC_001 mensyaratkan aksi di dalam aplikasi mobile native (login,
   navigasi ke "Consult a Doctor", pilih dokter, mulai konsultasi).
   Tanpa APK dummy/staging build dan tanpa akses inspect elemen
   (resource-id) aplikasi produksi, automation mobile (Appium/Espresso)
   tidak bisa dibuat secara akurat dan aman untuk dijalankan.

2. **Skenario login tidak diikutsertakan.**
   Login memerlukan kredensial pengguna. Karena kredensial ini sensitif
   (terhubung ke akun asuransi pribadi/CAR Syariah milik penulis) dan
   tidak boleh disimpan/dihardcode di dalam script, skenario yang
   memerlukan login (baik di web maupun mobile) **tidak** dijalankan
   di automation ini.

Sebagai gantinya, automation ini menguji hal-hal yang **bisa diakses
publik tanpa login**, yaitu website marketing Good Doctor
(`www.gooddoctor.co.id`), sebagai bukti kemampuan menyusun automation
test dengan Playwright: navigasi antar halaman, verifikasi konten, dan
pengambilan screenshot.

> Catatan: Jika ke depannya tersedia APK/staging build dan akun test
> (bukan akun pribadi), kerangka automation ini bisa diperluas ke
> Appium untuk menguji TC_001 secara end-to-end, termasuk context
> switching antara native view dan WebView pada bagian chat/video
> konsultasi.

## Skenario yang Diuji

File: `gooddoctor.spec.js`

| No | Skenario | Yang diverifikasi |
|----|----------|---------------------|
| 1 | Buka homepage | Title halaman mengandung "Good Doctor", logo header tampil |
| 2 | Navigasi ke menu "Untuk Anda" | URL berpindah ke `/untuk-anda/`, teks "Konsultasi" muncul di halaman |
| 3 | Navigasi ke "Berita" lalu buka salah satu artikel | URL berpindah ke `/berita/`, klik artikel pertama, berhasil masuk ke halaman detail artikel |
| 4 | Screenshot homepage | Screenshot halaman utama tersimpan (`gooddoctor-homepage.png`) |

## Tools yang Digunakan

- **Playwright Test** (`@playwright/test`) — framework automation web, berjalan di Chromium/Firefox/WebKit.
- **Node.js** — runtime untuk menjalankan Playwright.

## Prasyarat

- Node.js sudah terinstall (v16 ke atas).
- Koneksi internet (karena test mengakses situs live `gooddoctor.co.id`).

## Instalasi

```bash
# 1. Inisialisasi project (jika belum ada package.json)
npm init -y

# 2. Install Playwright Test
npm install -D @playwright/test

# 3. Install browser yang dibutuhkan Playwright
npx playwright install
```

## Cara Menjalankan

> File test ada di dalam folder `tests/`, tapi karena `playwright.config.js`
> sudah diatur dengan `testDir: './tests'`, kamu tidak perlu menyebut path
> lengkap — cukup jalankan `npx playwright test` dari root project.

**Jalankan semua test (mode headless / tanpa tampilan browser):**
```bash
npx playwright test
```

**Jalankan sambil melihat browser-nya secara langsung:**
```bash
npx playwright test --headed
```

**Jalankan dengan UI Mode (paling enak untuk cek step demi step):**
```bash
npx playwright test --ui
```
Lalu pilih file `gooddoctor.spec.js` dan klik tombol ▶️ run. Kamu bisa
melihat browser di sisi kanan dan timeline tiap langkah di sisi kiri.

**Jalankan dengan mode debug (browser + inspector, bisa pause manual):**
```bash
npx playwright test --debug
```

## Melihat Hasil / Report

Setelah test selesai, buka report HTML bawaan Playwright:
```bash
npx playwright show-report
```

Screenshot homepage akan tersimpan di root folder project sebagai
`gooddoctor-homepage.png`.

## Hasil Test Run

Berikut hasil run terakhir (11/08/2026, 16:44:16 — total waktu 8.4s),
semua skenario **passed**:

| Status | Test | Durasi |
|--------|------|--------|
| ✅ Passed | Buka homepage dan cek judul halaman | 1.9s |
| ✅ Passed | Navigasi ke menu "Untuk Anda" | 1.8s |
| ✅ Passed | Navigasi ke halaman Berita dan buka salah satu artikel | 2.1s |
| ✅ Passed | Screenshot halaman utama | 2.1s |

**Ringkasan:** All 4 · Passed 4 · Failed 0 · Flaky 0 · Skipped 0

Report lengkap (HTML) dapat dilihat dengan menjalankan:
```bash
npx playwright show-report
```

## Struktur File

```
.
├── tests/
│   └── gooddoctor.spec.js   # Script automation test
├── playwright.config.js     # Konfigurasi Playwright (testDir, reporter HTML)
├── package.json
└── README.md                 # Dokumen ini
```
