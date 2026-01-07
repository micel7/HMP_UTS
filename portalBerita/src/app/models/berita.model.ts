import { Komentar } from './komentar.model';

export interface Berita {
  id: number;
  judul: string;    
  konten: string;
  foto: string;
  gambarHalaman: string[]; // Minimal 4 gambar untuk halaman baca berita
  categories: string[];
  //rating: number[];
  rating: number;
  komentar: Komentar[]; // Daftar komentar dari user
  jumlah_komentar?: number; // Jumlah komentar, opsional
  isFavorite: boolean;
  views: number;
}