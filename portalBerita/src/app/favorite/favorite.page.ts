import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Berita } from '../models/berita.model';
import { Databerita } from '../services/databerita';

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
  ) {}
  ngOnInit(): void {
    this.loadFavBerita()
  }


  loadFavBerita() {
    const semuaBerita = this.dataService.getBerita();
    this.favoriteBerita = semuaBerita.filter((berita: Berita) => berita.isFavorite);
  }

  getAverageRating(berita: Berita): string {
    if (!berita.rating || berita.rating.length === 0) {
      return 'N/A';
    }
    const sum = berita.rating.reduce((a, b) => a + b, 0);
    const average = sum / berita.rating.length;
    return average.toFixed(1);
  }

  goToDetail(id: number) {
    this.navCtrl.navigateForward(['/bacaberita', { id: id }]);
  }


}
