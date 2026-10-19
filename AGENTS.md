# Aturan Kerja untuk AI Agent (Makaroni Keju Lestari)

Setiap perintah perubahan dari pemilik proyek wajib mematuhi aturan berikut:

1. **Ubah hanya yang diminta**: Halaman, fitur, komponen, gaya, teks, dan dokumen lain dibiarkan persis seperti sebelumnya.
2. **Jangan refaktor tanpa izin**: Jangan merapikan, memformat ulang, atau mengganti dependensi di luar yang diminta.
3. **Wajib Langsung Commit & Push ke GitHub Setiap Ada Perubahan**:
   Setiap kali selesai menyelesaikan perubahan (kode, style, teks, aset, atau konfigurasi), agent **wajib langsung** melakukan git commit dan push ke GitHub:
   - Jalankan `git add .`
   - Buat pesan commit yang jelas dan deskriptif dengan format:
     `git commit -m "update <bagian>: <keterangan detail perubahan>"`
     *(Contoh: `git commit -m "update kontak: hapus kata resmi pada platform media sosial"`)*
   - Jalankan `git push origin main` (atau branch aktif).
   - Laporkan hasil push dan pesan commit kepada pengguna.
4. Panduan lengkap dan struktur PRD & Desain mengacu pada `prd,design.agent.md/agent.md`.
