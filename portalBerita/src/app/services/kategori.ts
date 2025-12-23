import { Categories } from '../models/categories.model';
import { Databerita } from './dataBerita';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Kategori {
  
  private apiUrl = 'https://ubaya.cloud/hybrid/160423076/projectHMP/categories.php';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Categories[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => {
        if (response.result === 'success') {
          return response.data; // Mengambil array kategori dari dalam object
        } else {
          return [];
        }
      })
    );
  }
}
