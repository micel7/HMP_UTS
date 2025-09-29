import { Kategori } from './../services/kategori';
import { Categories } from '../models/categories.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: 'category.page.html',
  styleUrls: ['category.page.scss'],
  standalone: false,
})
export class CategoryPage {
  index = 0;
  daftarKategori: Categories[] = [];

  constructor(private Kategori: Kategori) {}

  ngOnInit() {
    this.loadKategori();
  }

  loadKategori() {
    this.daftarKategori = this.Kategori.getKategori();
  }

  pilihKategori(Category: Categories) {
    console.log('Kategori dipilih:', Category.nama);
    // Nanti akan navigasi ke halaman daftar berita
  }
}
