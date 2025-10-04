import { Kategori } from './../services/kategori';
import { Categories } from '../models/categories.model';
import { DataBerita } from '../services/dataBerita';
import { Berita } from '../models/berita.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-category',
  templateUrl: 'category.page.html',
  styleUrls: ['category.page.scss'],
  standalone: false,
})
export class CategoryPage implements OnInit {
  index = 0;
  jenistampilan="forYou"
  daftarKategori: Categories[] = [];
  daftarBerita: Berita[] = [];

  constructor(
    private kategoriService: Kategori,
    private beritaService: DataBerita,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadKategori();
  }

  loadKategori() {
    this.daftarKategori = this.kategoriService.getKategori();
    this.daftarBerita = this.beritaService.getBerita();
  }

  pilihKategori(Category: Categories) {
    console.log('Kategori dipilih:', Category.nama);

    // Nanti akan navigasi ke halaman daftar berita
    this.router.navigate(['/daftarberita', Category.nama]);
  }

  getRataRataRating(rating: number[]): number {
    if (!rating || rating.length === 0) return 0;
    const total = rating.reduce((a, b) => a + b, 0);
    return (total / rating.length).toFixed(1) as unknown as number;
  }
}
