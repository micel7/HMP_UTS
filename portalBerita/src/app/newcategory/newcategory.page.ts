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

  constructor(private kategoriService: Kategori, private router: Router) { }

  ngOnInit() {
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
}
