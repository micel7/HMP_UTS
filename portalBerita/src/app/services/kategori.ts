import { Categories } from '../models/categories.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Kategori {
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
    return this.dataKategori;
  }
}
