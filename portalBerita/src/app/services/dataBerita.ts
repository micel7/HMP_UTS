import { Berita } from '../models/berita.model';
import { Injectable } from '@angular/core';
import { Komentar } from '../models/komentar.model';

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
            isFavorite: true,
            views: 0
        },
        {
            id: 2,
            judul: 'Mr Krab cuci uang',
            konten: 'Mr Krab cuci uang, Mr Krab cuci uang, Mr Krab cuci uang',
            foto: 'assets/mrkrab.jpg',
            gambarHalaman: ["mrkrab.jpg", "mrkrab.jpg", "mrkrab.jpg", "mrkrab.jpg"], // Minimal 4 gambar untuk halaman baca berita
            categories: ['Ekonomi'],
            rating: [5, 4, 3],
            komentar: [], // Daftar komentar dari user
            isFavorite: true,
            views: 0
        },
        {
            id: 3,
            judul: 'Mr Krab mengalami kerugian di Q4',
            konten: 'Mr Krab mengalami kerugian di Q4',
            foto: 'assets/mrkrab.jpg',
            gambarHalaman: ["mrkrab.jpg", "mrkrab.jpg", "mrkrab.jpg", "mrkrab.jpg"], // Minimal 4 gambar untuk halaman baca berita
            categories: ['Ekonomi'],
            rating: [5, 4, 3],
            komentar: [], // Daftar komentar dari user
            isFavorite: false,
            views: 0
        },
        {
            id: 4,
            judul: 'Kalah di Laga Tandang, Pelatih Elang FC Soroti Lini Pertahanan',
            konten: 'Setelah menelan kekalahan pahit 2-1 dari rivalnya, Harimau FC, pelatih kepala Elang FC, Budi Santoso, menyatakan kekecewaannya terhadap kinerja lini belakang tim. "Kami membuat dua kesalahan fatal yang seharusnya tidak terjadi di level ini. Koordinasi antar pemain belakang harus segera kami perbaiki sebelum pertandingan berikutnya," ujarnya dalam konferensi pers pasca-pertandingan.',
            foto: 'assets/elangfc.png',
            gambarHalaman: ["assets/sports1.jpg", "assets/sports2.jpg", "assets/sports3.jpg", "assets/sports4.jpg"],
            categories: ['Olahraga'],
            rating: [4, 3, 4, 3],
            komentar: [],
            isFavorite: false,
            views: 0
        },
        {
            id: 5,
            judul: 'Startup AI Lokal "NusantaraGPT" Raih Pendanaan Seri A',
            konten: 'Startup kecerdasan buatan asal Jakarta, NusantaraGPT, hari ini mengumumkan telah berhasil mengumpulkan pendanaan Seri A sebesar $10 juta. Pendanaan ini dipimpin oleh East Ventures dengan partisipasi dari beberapa investor lainnya. Dana segar ini rencananya akan digunakan untuk ekspansi tim riset dan pengembangan infrastruktur komputasi awan mereka.',
            foto:  "assets/gpt.jpg",
            gambarHalaman: ["assets/tech1.jpg", "assets/tech2.jpg", "assets/tech3.jpg", "assets/tech4.jpg"],
            // Berita dengan multi-kategori
            categories: ['Teknologi', 'Ekonomi'], 
            rating: [5, 5, 4, 5],
            komentar: [],
            isFavorite: true,
            views: 0
        },
        {
            id: 6,
            judul: 'Bank Sentral Pertahankan Suku Bunga Acuan di Level 5.75%',
            konten: '## Bank Indonesia Pertahankan Suku Bunga Acuan di Level 5.75%, Fokus Jaga Stabilitas Rupiah\nJakarta – Rapat Dewan Gubernur (RDG) Bank Indonesia yang diadakan hari ini, Minggu, 5 Oktober 2025, secara konsisten memutuskan untuk mempertahankan suku bunga acuan atau BI-Rate di level 5.75%. Keputusan ini, yang telah sejalan dengan ekspektasi mayoritas ekonom dan analis pasar, diambil sebagai langkah strategis untuk menjaga stabilitas di tengah kondisi inflasi domestik yang mulai terkendali serta meningkatnya ketidakpastian ekonomi global.\n### Inflasi Domestik Terkendali\nLandasan utama dari keputusan ini adalah kondisi inflasi di dalam negeri yang menunjukkan tren moderat. Data terkini menunjukkan bahwa inflasi Indeks Harga Konsumen (IHK) telah kembali ke jalur target, didukung oleh melandainya inflasi harga pangan bergejolak (volatile food) berkat sinergi kebijakan antara pemerintah pusat dan daerah.\n\n"Inflasi inti tetap terjaga rendah, mengindikasikan bahwa ekspektasi inflasi di masyarakat berjangkar dengan baik dan tekanan dari sisi permintaan domestik tidak berlebihan. Hal ini memberikan ruang bagi Bank Indonesia untuk tidak menaikkan suku bunga lebih lanjut, sehingga dapat menjaga momentum pertumbuhan ekonomi nasional," jelas seorang ekonom dari Universitas Gadjah Mada.\n### Antisipasi Gejolak Global\n\n\nDi sisi eksternal, Bank Indonesia tetap waspada terhadap ketidakpastian yang bersumber dari kebijakan suku bunga bank sentral negara maju, terutama The Federal Reserve AS, yang diperkirakan akan mempertahankan suku bunga tinggi untuk waktu yang lebih lama (higher for longer). Selain itu, eskalasi ketegangan geopolitik di beberapa kawasan turut meningkatkan risiko di pasar keuangan global.\n\n\nLangkah mempertahankan BI-Rate di level 5.75% dipandang sebagai bauran kebijakan yang optimal untuk memperkuat ketahanan eksternal. Suku bunga yang kompetitif diharapkan dapat menjaga daya tarik aset keuangan domestik, sehingga mampu menahan potensi aliran modal keluar (capital outflow) dan menjaga stabilitas nilai tukar Rupiah yang menjadi garda terdepan dalam meredam inflasi barang impor (imported inflation).\nPara analis pasar yang telah memprediksi langkah ini sebelumnya menilai bahwa keputusan Bank Indonesia ini sudah tepat. Dengan tidak adanya kejutan, pasar diperkirakan akan bereaksi tenang, dengan nilai tukar Rupiah dan Indeks Harga Saham Gabungan (IHSG) yang diperkirakan akan bergerak stabil dalam jangka pendek. Ke depan, Bank Indonesia akan terus mencermati dinamika data ekonomi domestik dan global untuk merumuskan langkah-langkah kebijakan selanjutnya.',
            foto: 'assets/economy.jpeg',
            gambarHalaman: ["assets/economy1.jpg", "assets/economy2.jpeg", "assets/economy3.jpeg", "assets/economy4.jpeg"],
            categories: ['Ekonomi'],
            rating: [4, 4, 4, 5],
            komentar: [
                {
                    id: 1,
                    userId: 5,
                    isi: 'Langkah yang tepat dari Bank Sentral. Stabilitas nilai tukar Rupiah memang harus jadi prioritas utama saat ini, apalagi kondisi global lagi tidak menentu.',
                    tanggal: new Date('2025-10-02T15:00:00')
                },
                {
                    id: 2,
                    userId: 6,
                    isi: 'Berarti bunga KPR dan cicilan lain nggak akan naik dulu ya dalam waktu dekat? Syukurlah kalau begitu.',
                    tanggal: new Date('2025-10-03T09:20:00')
                },
                {
                    id: 3,
                    userId: 2,
                    isi: 'Ditahan terus, kapan turunnya ya? Sektor riil butuh suku bunga yang lebih rendah biar bisa ekspansi.',
                    tanggal: new Date('2025-10-04T18:00:00')
                }
            ],
            isFavorite: false,
            views: 0
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
            isFavorite: false,
            views: 0
        },
    ];
    getBerita(): Berita[] {
        return this.dataBerita;
    }
     addRating(beritaId: number, ratingValue: number) {
        const beritaItem = this.dataBerita.find(b => b.id === beritaId);
        if (beritaItem) {
            // Tambahkan nilai rating baru ke dalam array
            beritaItem.rating.push(ratingValue);
        }
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
    addComment(beritaId: number, teksKomentar: string){
        const beritaItem = this.dataBerita.find(b=> b.id === beritaId);

        if (beritaItem && teksKomentar.trim() != ''){
            // buat id unik untuk komentar baru 
            const newCommentId = beritaItem.komentar.length+1;

            const newComment: Komentar = {
                id: newCommentId,
                userId: 1,
                isi: teksKomentar,
                tanggal: new Date()
            };

            beritaItem.komentar.unshift(newComment);

        }
    }
    incrementViews(id:number):void{
        const berita = this.dataBerita.find(b=> b.id === id);
        if (berita){
            berita.views++;
    }
}
}
