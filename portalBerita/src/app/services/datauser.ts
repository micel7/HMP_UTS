import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
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
    const savedUsername = localStorage.getItem('UserTerakhir');

    //cek username tersimpan
    if (savedUsername) {
      //filtering apakah benar
      this.loggedInUser = JSON.parse(savedUsername);
    }
  }

  simpanData(unameObj: any){
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
  
  logout(){
    localStorage.removeItem('UserTerakhir');
    this.loggedInUser = null;
  }

  register(newUser: User): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    
    const body = new URLSearchParams();
    body.set('username', newUser.name); 
    body.set('password', newUser.password); 
    body.set('email', newUser.email);

    return this.http.post(this.apiRegisterUrl, body.toString(), { headers });
  }
}
