import { Component, OnInit } from '@angular/core';
import { Databerita } from '../services/dataBerita';
import { Kategori } from '../services/kategori';
import { Datauser } from '../services/datauser';
import { Categories } from '../models/categories.model';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-newberita',
  templateUrl: './newberita.page.html',
  styleUrls: ['./newberita.page.scss'],
  standalone: false,
})
export class NewberitaPage implements OnInit {
  judul: string = "";
  deskripsi: string = "";
  foto_utama: string = "";
  daftarKategori: Categories[] = [];
  kategoriTerpilih: number[] = [];
  gambarTambahan: string = "";
  listGambar: string[] = [];

  constructor(
    private beritaService: Databerita,
    private katService: Kategori,
    private userService: Datauser,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.katService.getCategories().subscribe(res => {
      this.daftarKategori = res;
    });
  }


  tambahGambar(){
    if(this.gambarTambahan.trim() !== "") {
      this.listGambar.push(this.gambarTambahan.trim());
      this.gambarTambahan = "";
    }
  }

  async simpanBerita(){
    if(!this.judul || !this.deskripsi || !this.foto_utama || this.kategoriTerpilih.length === 0) {
      const toast = await this.toastCtrl.create({
        message: "Harap lengkapi semua data (judul, konten, foto utama, dan kategori)!",
        duration: 2000,
        color: "warning"
      });
      toast.present();
      return;
    }

    const beritaData = {
      judul: this.judul,
      deskripsi: this.deskripsi,
      foto_utama: this.foto_utama,
      kategori_id: this.kategoriTerpilih,
      gambar_tambahan: this.listGambar
    };

    //panggil addBerita dari service
    this.beritaService.addBerita(this.judul, this.deskripsi, this.foto_utama, this.kategoriTerpilih, this.listGambar).subscribe({next: async (res: any) => {
      if(res.result === 'success') {
        this.beritaService.getBerita().subscribe(); // Refresh data berita setelah penambahan

        const toast = await this.toastCtrl.create({
          message: "Berita berhasil disimpan!",
          duration: 2000,
          color: "success"
        });
        toast.present();
        this.navCtrl.navigateRoot('/home/category');
      } else {
        const toast = await this.toastCtrl.create({
          message: "Gagal menyimpan berita!" + res.message,
          duration: 2000,
          color: "danger"
        });
        toast.present();
      }
    }, error: async (err) => {
        console.error('Error saat menyimpan berita:', err);
        const toast = await this.toastCtrl.create({
          message: "Terjadi kesalahan koneksi ke server.",
          duration: 2000,
          color: "danger"
        });
        toast.present();
      }
    });
  }
}