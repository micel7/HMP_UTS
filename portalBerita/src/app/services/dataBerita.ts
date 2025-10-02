import { Berita } from '../models/berita.model';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class DataBerita {
    private dataBerita: Berita[] = [
        {
            id: 1,
            judul: 'Judul 1',
            konten: 'Lorem Ipsum Dolor SiS Jamet',
            foto: 'assets/mrkrab.jpg',
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
    ];
    getBerita(): Berita[] {
        return this.dataBerita;
    }
}
