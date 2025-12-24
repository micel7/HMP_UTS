import { Categories } from '../models/categories.model';
import { Databerita } from './dataBerita';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Kategori {
  
  private apiUrl = 'https://ubaya.cloud/hybrid/160423076/projectHMP/categories.php';
  private apiAddUrl = 'https://ubaya.cloud/hybrid/160423076/projectHMP/add_category.php';

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

  tambahKategori(nama: string, icon: string, color: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    const body = new URLSearchParams();
    body.set('nama', nama); 
    body.set('icon', icon);
    body.set('color', color);
    return this.http.post(this.apiAddUrl, body.toString(), { headers });
  }
}
