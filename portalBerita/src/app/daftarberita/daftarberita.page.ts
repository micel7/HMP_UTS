import { Component, OnInit } from '@angular/core';
import { DataBerita } from '../services/dataBerita'; // ini ambil dari dataBerita
import { Berita } from '../models/berita.model';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-daftarberita',
  templateUrl: './daftarberita.page.html',
  styleUrls: ['./daftarberita.page.scss'],
  standalone:false

})
export class DaftarberitaPage implements OnInit {
  daftarBerita: Berita[] = [];
  judulHalaman: string = 'Daftar Berita';
  constructor(
    private beritaService: DataBerita,// ini harus ambil dari folder services
    private router: Router,
    private route: ActivatedRoute ){ } // ini unutk baca URL) 
    
  ngOnInit() {
    // Listen to perubahan parameter yg ad di URL
    this.route.paramMap.subscribe(params => {
      const kategoriTerpilih = params.get('kategori'); // Ambil nilai dari parameter 'kategori' yang kita definisikan di routing
      if (kategoriTerpilih){
        // Misal ada kategori yg dipilih
        this.judulHalaman = `Kategori: ${kategoriTerpilih}`; // harus pake backtick ygy biar kebaca kategorinya
        const semuaBerita = this.beritaService.getBerita();

        // Filter semua berita biar dpt yg cocok sm kategori
        this.daftarBerita = semuaBerita.filter(berita => berita.categories.includes(kategoriTerpilih)
        );

        console.log('Kategori Dipilih:', kategoriTerpilih);
      console.log('Berita yang difilter:', this.daftarBerita);
      }   
  });
}
  bacaBerita(id: number) {
    // (Fungsi ini tetap sama)
    this.router.navigate(['/bacaberita', { id: id }]);
    this.beritaService.incrementViews(id);
  }
  onToggleFavorite(berita: Berita, event: Event) {
    // Stop event biar tidak memicu klik pada card
    event.stopPropagation();
    
    // Panggil fungsi 'toggle' dari service dengan mengirim id berita
    this.beritaService.toggleFavoriteStatus(berita.id);
  }
  getRataRataRating(rating: number[]): number {
    if (!rating || rating.length === 0) return 0;
    const total = rating.reduce((a, b) => a + b, 0);
    return (total / rating.length).toFixed(1) as unknown as number;
  }
  
  chunkArray(arr: any[], chunkSize: number): any[][] {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  }
  
  
}
