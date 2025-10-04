import { Berita } from '../models/berita.model';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class DataBerita {
    private dataBerita: Berita[] = [
        {
            id: 1,
            judul: 'MU kalah lagi ',
            konten: 'MU kalah lagi',
            foto: 'assets/MU.jpg',
            gambarHalaman: ["mrkrab.jpg", "mrkrab.jpg", "mrkrab.jpg", "mrkrab.jpg"], // Minimal 4 gambar untuk halaman baca berita
            categories: ['Olahraga'],
            rating: [5, 4, 3],
            komentar: [], // Daftar komentar dari user
            isFavorite: true
        },
        {
            id: 2,
            judul: 'Judul 2',
            konten: 'Lorem Ipsum Dolor SiS Jamet',
            foto: 'assets/mrkrab.jpg',
            gambarHalaman: ["mrkrab.jpg", "mrkrab.jpg", "mrkrab.jpg", "mrkrab.jpg"], // Minimal 4 gambar untuk halaman baca berita
            categories: ['Olahraga'],
            rating: [5, 4, 3],
            komentar: [], // Daftar komentar dari user
            isFavorite: true
        },
        {
            id: 3,
            judul: 'Judul 3',
            konten: 'Lorem Ipsum Dolor SiS Jamet',
            foto: 'assets/mrkrab.jpg',
            gambarHalaman: ["mrkrab.jpg", "mrkrab.jpg", "mrkrab.jpg", "mrkrab.jpg"], // Minimal 4 gambar untuk halaman baca berita
            categories: ['Olahraga'],
            rating: [5, 4, 3],
            komentar: [], // Daftar komentar dari user
            isFavorite: false
        },
        {
            id: 4,
            judul: 'Kalah di Laga Tandang, Pelatih Elang FC Soroti Lini Pertahanan',
            konten: 'Setelah menelan kekalahan pahit 2-1 dari rivalnya, Harimau FC, pelatih kepala Elang FC, Budi Santoso, menyatakan kekecewaannya terhadap kinerja lini belakang tim. "Kami membuat dua kesalahan fatal yang seharusnya tidak terjadi di level ini. Koordinasi antar pemain belakang harus segera kami perbaiki sebelum pertandingan berikutnya," ujarnya dalam konferensi pers pasca-pertandingan.',
            foto: 'assets/sports.jpg',
            gambarHalaman: ["assets/sports1.jpg", "assets/sports2.jpg", "assets/sports3.jpg", "assets/sports4.jpg"],
            categories: ['Olahraga'],
            rating: [4, 3, 4, 3],
            komentar: [],
            isFavorite: false
        },
        {
            id: 5,
            judul: 'Startup AI Lokal "NusantaraGPT" Raih Pendanaan Seri A',
            konten: 'Startup kecerdasan buatan asal Jakarta, NusantaraGPT, hari ini mengumumkan telah berhasil mengumpulkan pendanaan Seri A sebesar $10 juta. Pendanaan ini dipimpin oleh East Ventures dengan partisipasi dari beberapa investor lainnya. Dana segar ini rencananya akan digunakan untuk ekspansi tim riset dan pengembangan infrastruktur komputasi awan mereka.',
            foto: 'assets/tech.jpg',
            gambarHalaman: ["assets/tech1.jpg", "assets/tech2.jpg", "assets/tech3.jpg", "assets/tech4.jpg"],
            // Berita dengan multi-kategori
            categories: ['Teknologi', 'Ekonomi'], 
            rating: [5, 5, 4, 5],
            komentar: [],
            isFavorite: true
        },
        {
            id: 6,
            judul: 'Bank Sentral Pertahankan Suku Bunga Acuan di Level 5.75%',
            konten: 'Rapat Dewan Gubernur Bank Sentral yang diadakan hari ini memutuskan untuk mempertahankan suku bunga acuan di level 5.75%. Keputusan ini diambil dengan mempertimbangkan kondisi inflasi yang mulai terkendali serta ketidakpastian ekonomi global. Para analis pasar telah memprediksi langkah ini sebelumnya.',
            foto: 'assets/economy.jpeg',
            gambarHalaman: ["assets/economy1.jpg", "assets/economy2.jpeg", "assets/economy3.jpeg", "assets/economy4.jpeg"],
            categories: ['Ekonomi'],
            rating: [4, 4, 4, 5],
            komentar: [],
            isFavorite: false
        },
        {
            id: 7,
            judul: 'Tips Menjaga Kesehatan Mata di Era Digital',
            konten: 'Bekerja di depan layar selama berjam-jam dapat menyebabkan ketegangan pada mata. Para ahli kesehatan menyarankan untuk menerapkan aturan 20-20-20: setiap 20 menit, alihkan pandangan Anda untuk melihat sesuatu yang berjarak 20 kaki (sekitar 6 meter) selama 20 detik. Selain itu, pastikan pencahayaan ruangan cukup dan posisi layar sejajar dengan mata.',
            foto: 'assets/health.jpg',
            gambarHalaman: ["assets/health1.jpeg", "assets/health2.jpeg", "assets/health3.jpeg", "assets/health4.jpeg"],
            categories: ['Kesehatan'],
            rating: [5, 5, 5],
            komentar: [],
            isFavorite: false
        },
    ];
    getBerita(): Berita[] {
        return this.dataBerita;
    }
    toggleFavoriteStatus(id: number) {
        // Cari berita yang cocok dengan id yang dikirim
        const beritaItem = this.dataBerita.find(b => b.id === id); // cari berita yg cocok sm id yg dikirim
    
        // Jika berita ditemukan, balik nilainya
        if (beritaItem) {
            beritaItem.isFavorite = !beritaItem.isFavorite;
        }
    }
    getBeritaById(id: number){
        //cari dan kembalikan berita yg idnya sesuai
        return this.dataBerita.find(berita => berita.id === id);
    }
}
