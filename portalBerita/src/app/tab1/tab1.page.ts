import { Kategori } from './../services/kategori';
import { Category } from './../models/category.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  daftarKategori: Category[] = [];

  constructor(private Kategori: Kategori) { }

  ngOnInit() {
    this.loadKategori();
  }

  loadKategori() {
    this.daftarKategori = this.Kategori.getKategori();
  }

  pilihKategori(Category: Category) {
    console.log('Kategori dipilih:', Category.nama);
    // Nanti akan navigasi ke halaman daftar berita
  }
}

