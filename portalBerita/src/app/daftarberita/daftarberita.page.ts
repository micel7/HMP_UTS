import { Component, OnInit } from '@angular/core';
import { DataBerita } from '../services/dataBerita'; // ini ambil dari dataBerita
import { Berita } from '../models/berita.model';


@Component({
  selector: 'app-daftarberita',
  templateUrl: './daftarberita.page.html',
  styleUrls: ['./daftarberita.page.scss'],
  standalone:false

})
export class DaftarberitaPage implements OnInit {
  daftarBerita: Berita[] = [];
  constructor(private beritaService: DataBerita) { } // ini harus ambil dari folder services
    
  ngOnInit() {
    // panggil fungsi service trs disimpen hasilnya ke variabel 'daftarBerita'
    this.daftarBerita = this.beritaService.getBerita();

    // 'this.daftarBerita' isinya semua data dari service
    console.log(this.daftarBerita); // bisa cek di console browser
  }

}
