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
            judul: 'Judul 4',
            konten: 'Lorem Ipsum Dolor SiS Jamet',
            foto: 'assets/mrkrab.jpg',
            gambarHalaman: ["mrkrab.jpg", "mrkrab.jpg", "mrkrab.jpg", "mrkrab.jpg"], // Minimal 4 gambar untuk halaman baca berita
            categories: ['Teknologi'],
            rating: [2, 4, 3],
            komentar: [], // Daftar komentar dari user
            isFavorite: false
        },
        {
            id: 5,
            judul: 'Judul 5',
            konten: 'Lorem Ipsum Dolor SiS Jamet',
            foto: 'assets/mrkrab.jpg',
            gambarHalaman: ["mrkrab.jpg", "mrkrab.jpg", "mrkrab.jpg", "mrkrab.jpg"], // Minimal 4 gambar untuk halaman baca berita
            categories: ['Ekonomi'],
            rating: [5, 4, 3],
            komentar: [], // Daftar komentar dari user
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
}
