import { Komentar } from './komentar.model';

export interface Berita {
  id: number;
  judul: string;    
  konten: string;
  foto: string;
  gambarHalaman: string[]; // Minimal 4 gambar untuk halaman baca berita
  categories: string[];
  rating: number[];
  komentar: Komentar[]; // Daftar komentar dari user
  isFavorite: boolean;
}