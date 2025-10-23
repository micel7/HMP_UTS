import { Kategori } from './../services/kategori';
import { Categories } from '../models/categories.model';
import { Databerita } from '../services/dataBerita';
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
  jenistampilan = 'forYou';
  daftarKategori: Categories[] = [];
  daftarBerita: Berita[] = [];

  constructor(
    private kategoriService: Kategori,
    private beritaService: Databerita,
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
  bacaBerita(id: number) {
    // (Fungsi ini tetap sama)
    this.beritaService.incrementViews(id);
    this.router.navigate(['/bacaberita', { id: id }]);
  }

  onToggleFavorite(berita: Berita, event: Event) {
    // Stop event biar tidak memicu klik pada card
    event.stopPropagation();

    // Panggil fungsi 'toggle' dari service dengan mengirim id berita
    this.beritaService.toggleFavoriteStatus(berita.id);
  }
}
