import { Dexie, Table } from 'dexie';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavDexie extends Dexie {
  favorites!: Table<FavoriteBerita, number>;

  constructor() {
    super('FavBeritaDatabase');
    this.version(1).stores({
      favorites: 'newsId'
    });
    this.favorites = this.table('favorites');
  }

  //tambah fav berita
  async addFavorite(id: number) { 
    const existing = await this.favorites.get(id);
    if(!existing) {
      await this.favorites.add({ newsId: id });
    }
  }

  //hapus fav berita
  async removeFavorite(id: number) { return await this.favorites.delete(id); }

  //cek apakah sebuah id ada di favorite
  async isFavorite(id: number): Promise<boolean> {
    const fav = await this.favorites.get(id);
    return !!fav;
  }

  //ambil semua daftar id fav
  async getAllFavorites(): Promise<number[]> {
    const allFavs = await this.favorites.toArray();
    return allFavs.map((f: FavoriteBerita) => f.newsId);
  }
}

export interface FavoriteBerita {
  newsId: number;
}