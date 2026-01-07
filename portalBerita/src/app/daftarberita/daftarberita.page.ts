import { Component, OnInit } from '@angular/core';
import { Databerita } from '../services/dataBerita';
import { Berita } from '../models/berita.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-daftarberita',
  templateUrl: './daftarberita.page.html',
  styleUrls: ['./daftarberita.page.scss'],
  standalone: false,
})
export class DaftarberitaPage implements OnInit {
  daftarBerita: Berita[] = [];
  judulHalaman: string = 'Daftar Berita';
  private routeSub: Subscription | undefined;

  constructor(
    private beritaService: Databerita, // ini harus ambil dari folder services
    private router: Router,
    private route: ActivatedRoute
  ) { } // ini unutk baca URL)

  ngOnInit() {
    this.routeSub = this.route.paramMap.subscribe(params => {
      // Cek parameter di URL
      const kategoriTerpilih = params.get('kategori');

      this.beritaService.dataBerita$.subscribe(semuaBerita => {
        if(kategoriTerpilih) {
          this.judulHalaman = `Kategori: ${kategoriTerpilih}`;
          this.daftarBerita = semuaBerita.filter(berita => berita.categories && berita.categories.includes(kategoriTerpilih));
        } else {
          this.judulHalaman = 'Semua Berita';
          this.daftarBerita = semuaBerita;
        }
      });
      this.beritaService.getBerita().subscribe();
    });
  }

  ngOnDestroy() {
    if (this.routeSub) this.routeSub.unsubscribe();
  }

  bacaBerita(id: number) {
    // (Fungsi ini tetap sama)
    // this.beritaService.incrementViews(id);
    this.router.navigate(['/bacaberita', id]);
  }

  onToggleFavorite(berita: Berita, event: Event) {
    // Stop event biar tidak memicu klik pada card
    event.stopPropagation();

    // Panggil fungsi 'toggle' dari service dengan mengirim id berita
    this.beritaService.toggleFavoriteStatus(berita.id);
  }

  formatRating(rating: any): string {
    const val = parseFloat(rating);
    return isNaN(val) ? '0.0' : val.toFixed(1);
  }
  
}

/*
  // code sebelum ada API

  // loadData(kategori: string | null) {
  //   this.beritaService.getBerita().subscribe((res: any) => {
  //     if(res.result === 'success') {
  //       const semuaBerita:Berita[] = res.data;
        
  //       if(kategori) {
  //         this.judulHalaman = `Kategori: ${kategori}`;
  //         this.daftarBerita = semuaBerita.filter(berita => berita.categories && berita.categories.includes(kategori));
  //       } else {
  //         this.judulHalaman = 'Semua Berita';
  //         this.daftarBerita = semuaBerita;
  //       }
  //     }
  //   });
  // }

   //this.loadData(kategoriTerpilih);

  ngOnInit() {
    // Cek parameter di URL
    const kategoriTerpilih = this.route.snapshot.paramMap.get('kategori');
    if (kategoriTerpilih) {
      // Misal ada kategori jadi difilter
      this.judulHalaman = `Kategori: ${kategoriTerpilih}`;
      this.daftarBerita = semuaBerita.filter(berita =>
        berita.categories.includes(kategoriTerpilih)
      );
    } else {
      // Kalo gaada tampilin semua
      this.judulHalaman = 'Semua Berita';
      this.daftarBerita = semuaBerita;
    }
  }

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

  chunkArray(arr: any[], chunkSize: number): any[][] {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  }

*/