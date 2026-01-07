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

  }

  simpanBerita(){
    
  }
}
