import { Component, OnInit } from '@angular/core';
import { Kategori } from '../services/kategori';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newcategory',
  templateUrl: './newcategory.page.html',
  styleUrls: ['./newcategory.page.scss'],
  standalone: false
})
export class NewcategoryPage implements OnInit {
  nama_baru: string = "";
  icon_baru: string = "";
  color_baru: string = "primary";
  isDropdownIconOpen: boolean = false;

  allIcons: string[] = [
    // Berita umumnya
    'newspaper', 'journal', 'globe', 'megaphone', 'notifications', 'chatbox',
    // Olahraga
    'football', 'basketball', 'tennisball', 'fitness', 'trophy', 'bicycle',
    // Tech
    'hardware-chip', 'laptop', 'phone-portrait', 'flask', 'rocket', 'code-working',
    // Ekonomi
    'business', 'stats-chart', 'cash', 'wallet', 'pie-chart', 'trending-up',
    // Kesehatan
    'medkit', 'heart', 'bandage', 'pulse', 'thermometer', 'water',
    // Entertainment & Game
    'game-controller', 'musical-notes', 'videocam', 'camera', 'tv', 'film',
    // Lifestyle & Travel
    'airplane', 'restaurant', 'fast-food', 'shirt', 'car', 'leaf',
    // Others
    'school', 'briefcase', 'construct', 'flash', 'hammer', 'color-palette',
    // Lifestyle (Artis, Trend, Fashion)
    'sparkles', 'camera', 'cafe', 'body', 'glasses',
    // Percintaan & Hubungan
    'heart', 'heart-half', 'heart-outline', 'infinite', 'people-circle', 'rose',
    // Film & Animasi
    'color-filter', 'brush', 'play-circle', 'ticket',
    // Makanan dan Minuman
    'pizza', 'ice-cream', 'beer', 'nutrition', 'egg', 'wine',
  ];

  filteredIcons: string[] = [];

  constructor(private kategoriService: Kategori, private router: Router) { }

  ngOnInit() {
    this.filteredIcons = [];
  }

  simpanKategori() {
    this.kategoriService.tambahKategori(
      this.nama_baru, 
      this.icon_baru, 
      this.color_baru
    ).subscribe((response: any) => {
      if (response.result === 'success') {
        alert("Kategori Berhasil Ditambah!");
        this.router.navigate(['/home/category']);
      } else {
        alert("Gagal: " + response.message);
      }
    });
  }

  filterIcons(event:any) {
    const query = event.target.value.toLowerCase();
    this.isDropdownIconOpen = true;

    if(query && query.trim() !=='') {
      this.filteredIcons = this.allIcons.filter(icon => icon.toLowerCase().includes(query));
    } else {
      this.filteredIcons = this.allIcons;
    }
  }

  selectIcon(iconName: string) {
    this.icon_baru = iconName;
    this.isDropdownIconOpen = false;
  }

  closeDropdown() {
    setTimeout(() => { this.isDropdownIconOpen = false; }, 200);
  }
}
