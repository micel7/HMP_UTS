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
    this.dataBerita.incrementViews(berita.id);
    this.router.navigate(['/bacaberita', { id: berita.id }]);
  }

  // Fungsi hitung rata-rata rating
  getRataRataRating(rating: number[]): number {
    if (!rating || rating.length === 0) return 0; //kalau tidak ada rating return 0
    //kalau ada rating ditotalkan dulu lalu dibagi sesuai jumlah rating
    let total = 0;
    for (let i = 0; i < rating.length; i++) {
      total += rating[i];
    }
    let avg = total/rating.length
    let avgRounded = parseFloat(avg.toFixed(1)) //parseFloat untuk mengubah ke float karena toFixed(1) membulatkan 1 decimal tetapi berupa string 
    return avgRounded;
  }
}
