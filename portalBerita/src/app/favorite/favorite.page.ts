import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Berita } from '../models/berita.model';
import { Databerita } from '../services/dataBerita';

@Component({
  selector: 'app-favorite',
  templateUrl: 'favorite.page.html',
  styleUrls: ['favorite.page.scss'],
  standalone: false,
})
export class FavoritePage implements OnInit {
  favoriteBerita: Berita[] = [];
  constructor(
    private dataService: Databerita,
    private navCtrl: NavController
  ) { }
  ngOnInit(): void {
    this.loadFavBerita();
  }

  ionViewWillEnter() { //untuk memastikan berita favorit terupdate
    this.loadFavBerita();
  }

  loadFavBerita() {
    const semuaBerita = this.dataService.getBerita();
    this.favoriteBerita = semuaBerita.filter( //untuk filtering yang hanya isFavorit=true saja
      (berita: Berita) => berita.isFavorite
    );
  }

  goBacaBerita(id: number) {
    this.navCtrl.navigateForward(['/bacaberita', { id: id }]);
  }
}
