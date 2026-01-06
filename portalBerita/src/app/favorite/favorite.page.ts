import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Berita } from '../models/berita.model';
import { Databerita } from '../services/dataBerita';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorite',
  templateUrl: 'favorite.page.html',
  styleUrls: ['favorite.page.scss'],
  standalone: false,
})
export class FavoritePage implements OnInit {
  favoriteBerita: Berita[] = [];
  private sub: Subscription | undefined;

  constructor(
    private dataService: Databerita,
    private navCtrl: NavController
  ) { }

  ngOnInit(): void {
    this.loadFavBerita();
  }

  ionViewWillEnter(){
    this.dataService.getBerita().subscribe();
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  loadFavBerita() {
    this.sub = this.dataService.dataBerita$.subscribe((semuaBerita:Berita[]) => {
      this.favoriteBerita = semuaBerita.filter( berita => berita.isFavorite );
    });
  }

  goBacaBerita(id: number) {
    //this.dataService.incrementViews(id);
    this.navCtrl.navigateForward(['/bacaberita', id ]); //navigate forward sama seperti router fungsinya, ke halaman selanjutnya
  }
}

/*

  loadFavBerita() {
    const semuaBerita = this.dataService.getBerita();
    this.favoriteBerita = semuaBerita.filter( //untuk filtering yang hanya isFavorit=true saja
      (berita: Berita) => berita.isFavorite
    );
  }

  //gaperlu lagi karena udah pakai Subscription
  ionViewWillEnter() { //untuk memastikan berita favorit terupdate
    this.loadFavBerita();
  }
    
*/