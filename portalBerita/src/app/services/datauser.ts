import { Injectable } from '@angular/core';
// import { User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Datauser {
  public loggedInUser: any = null;

  private apiLoginUrl = 'https://ubaya.cloud/hybrid/160423076/projectHMP/login.php';
  private apiRegisterUrl = 'https://ubaya.cloud/hybrid/160423076/projectHMP/register.php';


  constructor(private http: HttpClient) {
    const data = localStorage.getItem('UserTerakhir');

    if (data) {
      try {
        this.loggedInUser = JSON.parse(data);
      } catch (e) {
        console.error('LocalStorage UserTerakhir rusak:', data);
        localStorage.removeItem('UserTerakhir');
        this.loggedInUser = null;
      }
    } else {
      this.loggedInUser = null;
    }
  }

  simpanData(unameObj: any) {
    localStorage.setItem('UserTerakhir', JSON.stringify(unameObj))
  } //untuk simpan data seperti di session

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    const body = new URLSearchParams();
    body.set('email', email);
    body.set('password', password);

    return this.http.post(this.apiLoginUrl, body.toString(), { headers }).pipe(
      tap((response: any) => {
        // Jika login sukses, data kesimpen di service & localStorage
        if (response.result === 'success') {
          this.loggedInUser = {
            nama: response.nama,
            email: email
          };
          // Simpan objek user lengkap ke localStorage
          this.simpanData(this.loggedInUser);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('UserTerakhir');
    this.loggedInUser = null;
  }

  register(nama: string, email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    const body = new URLSearchParams();
    body.set('nama', nama);
    body.set('email', email);
    body.set('password', password);

    return this.http.post(this.apiRegisterUrl, body.toString(), { headers });
  }

}
