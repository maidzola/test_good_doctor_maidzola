// gooddoctor.spec.js
// Automation sederhana menggunakan Playwright Test untuk situs https://www.gooddoctor.co.id/
//
// Cara menjalankan:
//   1. npm init -y
//   2. npm install -D @playwright/test
//   3. npx playwright install
//   4. npx playwright test gooddoctor.spec.js

const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://www.gooddoctor.co.id/';

test.describe('Good Doctor - Skenario Simple', () => {

  test('Buka homepage dan cek judul halaman', async ({ page }) => {
    await page.goto(BASE_URL);

    // Pastikan title halaman mengandung "Good Doctor"
    await expect(page).toHaveTitle(/Good Doctor/i);

    // Pastikan logo di header tampil
    const logo = page.locator('header img[alt="Good Doctor"]').first();
    await expect(logo).toBeVisible();
  });

  test('Navigasi ke menu "Untuk Anda"', async ({ page }) => {
    await page.goto(BASE_URL);

    // Klik menu "Untuk Anda" di navigasi utama
    await page.getByRole('link', { name: 'Untuk Anda', exact: true }).first().click();

    // Pastikan URL berpindah ke halaman /untuk-anda/
    await expect(page).toHaveURL(/\/untuk-anda\/?$/);

    // Pastikan salah satu section (mis. "Konsultasi") ada di halaman
    await expect(page.locator('body')).toContainText(/Konsultasi/i);
  });

  test('Navigasi ke halaman Berita dan buka salah satu artikel', async ({ page }) => {
    await page.goto(BASE_URL);

    // Klik menu "Berita"
    await page.getByRole('link', { name: 'Berita', exact: true }).first().click();
    await expect(page).toHaveURL(/\/berita\/?$/);

    // Klik artikel pertama yang muncul di listing berita
    const firstArticle = page.locator('article a, h2 a, h3 a').first();
    const articleTitle = await firstArticle.textContent();
    await firstArticle.click();

    // Pastikan berhasil masuk ke halaman detail artikel (bukan lagi di /berita/ listing)
    await expect(page).not.toHaveURL(/\/berita\/?$/);

    console.log('Artikel yang dibuka:', articleTitle?.trim());
  });

  test('Screenshot halaman utama', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.screenshot({ path: 'gooddoctor-homepage.png', fullPage: true });
  });

});
