import { Kategori } from './../services/kategori';
import { Categories } from '../models/categories.model';
import { Databerita } from '../services/dataBerita';
import { Berita } from '../models/berita.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-category',
  templateUrl: 'category.page.html',
  styleUrls: ['category.page.scss'],
  standalone: false,
})
export class CategoryPage implements OnInit {
  // index = 0;
  jenistampilan = 'forYou';
  daftarKategori: Categories[] = [];
  daftarBerita: Berita[] = [];

  constructor(
    private kategoriService: Kategori,
    public beritaService: Databerita,
    private router: Router,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.beritaService.dataBerita$.subscribe(data => {
      this.daftarBerita = data;
    });
    this.loadKategori();
  }

  ionViewWillEnter() {
    //this.loadBerita();
    this.beritaService.getBerita().subscribe();
    this.loadKategori();
  }

  loadKategori() {
    this.beritaService.getBerita().subscribe();

    // Panggil method dari folder services
    this.kategoriService.getCategories().subscribe(
      (response) => {
        console.log('Data Kategori dari DB:', response);
        this.daftarKategori = response;
      },
      (error) => {
        console.error('Gagal mengambil kategori:', error);
      }
    );
  }

  loadBerita() {
    this.beritaService.getBerita().subscribe(
      (response: any) => {
        console.log('Data Berita dari DB:', response.data);
        this.daftarBerita = response.data.map((b: any) => {return {...b, komentar: b.komentar || []};}); // Pastikan komentar selalu berupa array
      }, (error) => { console.error('Gagal mengambil berita:', error); }
    );
  }

  pilihKategori(Category: Categories) {
    console.log('Kategori dipilih:', Category.nama_kategori);

    // Nanti akan navigasi ke halaman daftar berita
    this.router.navigate(['/daftarberita', Category.nama_kategori]);
  }

  async hapusBeritaIni(berita:any, event: Event) {
    event.stopPropagation(); // Mencegah event bubbling
    
    const alert = await this.alertCtrl.create({
      header: 'Hapus Berita?',
      message: 'Apakah Anda yakin ingin menghapus berita ini?',
      buttons: [ {text: 'Batal', role: 'cancel'}, 
        {
          text: 'Hapus',
          handler: () => {
            this.beritaService.deleteBerita(berita.id).subscribe({next: async (res: any) => {
              if(res.result === 'success') {
                const toast = await this.toastCtrl.create({
                  message: "Berita berhasil dihapus.",
                  duration: 2000,
                  color: "success"
                });
                toast.present();

                this.ionViewWillEnter(); // Refresh daftar berita
              }
            }
          });
        }
      }
    ]
  });
  await alert.present();
}
  /*  Average udah di handle di Querry
  getRataRataRating(rating: number[]): number {
    if (!rating || rating.length === 0) return 0; //kalau tidak ada rating return 0
    //kalau ada rating ditotalkan dulu lalu dibagi sesuai jumlah rating
    let total = 0;
    for (let i = 0; i < rating.length; i++) {
      total += rating[i];
    }
    let avg = total / rating.length
    let avgRounded = parseFloat(avg.toFixed(1)) //parseFloat untuk mengubah ke float karena toFixed(1) membulatkan 1 decimal tetapi berupa string 
    return avgRounded;
  }
  */
  bacaBerita(id: number) {
    // (Fungsi ini tetap sama)
    //this.beritaService.incrementViews(id);
    this.router.navigate(['/bacaberita', id]);
  }

  onToggleFavorite(berita: Berita, event: Event) {
    // Stop event biar tidak memicu klik pada card
    event.stopPropagation();

    // Panggil fungsi 'toggle' dari service dengan mengirim id berita
    this.beritaService.toggleFavoriteStatus(berita.id);
  }
}
