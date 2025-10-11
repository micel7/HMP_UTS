  import { Categories } from '../models/categories.model';
import { Databerita } from './databerita';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Kategori {
  constructor(private dataBerita: Databerita){}
  
  private dataKategori: Categories[] = [
    {
      nama: 'Teknologi',
      icon: 'laptop-outline',
      color: 'primary',
      jumlahBerita: 5,
    },
    {
      nama: 'Olahraga',
      icon: 'football-outline',
      color: 'success',
      jumlahBerita: 3,
    },
    {
      nama: 'Ekonomi',
      icon: 'trending-up-outline',
      color: 'warning',
      jumlahBerita: 4,
    },
  ];
  getKategori(): Categories[] {
    const berita = this.dataBerita.getBerita();

    // hitung jumlah berita untuk tiap kategori
    return this.dataKategori.map(kategori => {
      const count = berita.filter(b =>
        b.categories.includes(kategori.nama)
      ).length;
      return { ...kategori, jumlahBerita: count };
    });
  }
}
