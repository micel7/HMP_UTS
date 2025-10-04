import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Berita } from '../models/berita.model';
import { DataBerita } from '../services/dataBerita';

@Component({
  selector: 'app-bacaberita',
  templateUrl: './bacaberita.page.html',
  styleUrls: ['./bacaberita.page.scss'],
  standalone:false,
})
export class BacaberitaPage implements OnInit {

    // Properti buat nyimpen detail berita
    selectedBerita: Berita | undefined;
  constructor(private route: ActivatedRoute, // Inject ActivatedROute dipake buat baca URL
  private dataBeritaService: DataBerita) {}

  ngOnInit() {
    // Dengarkan perubahan pada parameter URL
    this.route.paramMap.subscribe(params=> {
      // Ambil id dari parameter URL
      const beritaIdString = params.get('id');

      if (beritaIdString){
        // ubah string 'id' ke number
        const beritaId = +beritaIdString;

        // panggil service untuk mendapatkan detail berita berdasarkan id 
        this.selectedBerita = this.dataBeritaService.getBeritaById(beritaId);
      }
    });
  }

}
