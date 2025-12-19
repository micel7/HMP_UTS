import { Categories } from '../models/categories.model';
import { Databerita } from './dataBerita';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Kategori {
  
  private apiUrl = 'https://hybrid/160423076/projectHMP/categories.php';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>(this.apiUrl);
  }
}
