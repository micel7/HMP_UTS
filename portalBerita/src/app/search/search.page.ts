import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Databerita } from '../services/dataBerita';
import { Berita } from '../models/berita.model';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss'],
  standalone: false,
})
export class SearchPage implements OnInit {
  searchQuery: string = '';
  allBerita: Berita[] = [];
  filteredBerita: Berita[] = [];
  isSearching: boolean = false;

  constructor(private dataBerita: Databerita, private router: Router) {}

  ngOnInit() {
    this.allBerita = this.dataBerita.getBerita();
  }

  onSearchChange(event: any) {
    const query = event.target.value;
    this.searchQuery = query;

    if (query && query.trim() !== '') {
      this.isSearching = true;
      this.searchBerita(query);
    } else {
      this.isSearching = false;
      this.filteredBerita = [];
    }
  }

  searchBerita(query: string) {
    const searchTerm = query.toLowerCase().trim();

    this.filteredBerita = this.allBerita.filter((berita) => {
      // Cari di judul
      const matchJudul = berita.judul.toLowerCase().includes(searchTerm);

      // Cari di konten
      const matchKonten = berita.konten.toLowerCase().includes(searchTerm);

      // Cari di kategori
      const matchKategori = berita.categories.some((cat) =>
        cat.toLowerCase().includes(searchTerm)
      );

      return matchJudul || matchKonten || matchKategori;
    });
  }

  onSearchClear() {
    this.searchQuery = '';
    this.filteredBerita = [];
    this.isSearching = false;
  }

  openBerita(berita: Berita) {
    // Navigate ke detail berita
    this.router.navigate(['/bacaberita', { id: berita.id }]);
  }

  // Fungsi hitung rata-rata rating
  getAverageRating(ratings: number[]): number {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((a, b) => a + b, 0);
    return sum / ratings.length;
  }
}
