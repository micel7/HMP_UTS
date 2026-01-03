import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Datauser } from './services/datauser';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  public name: string | null = null;

  constructor(private duService: Datauser, private router: Router) {
    this.checkLoginStatus();

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.checkLoginStatus();
    });
  }
  
  checkLoginStatus() {
    if (this.duService.loggedInUser) {
      this.name = this.duService.loggedInUser.nama;
    } else {
      this.name = null;
      
      // Cek URL saat ini. Jika user sudah ada di halaman 'login' atau 'register', 
      // JANGAN paksa redirect lagi. Biarkan user di sana.
      const currentUrl = this.router.url;
      
      if (!currentUrl.includes('/login') && !currentUrl.includes('/register')) {
        this.router.navigate(['/login']);
      }
    }
  }

  // checkLoginStatus() {
  //     // Cek URL, IF sedang di page register atau login, jangan paksa redirect
  //     const currentUrl = this.router.url;
      
  //     // includes() untuk mengantisipasi jika ada query params atau slash di akhir
  //     if (!currentUrl.includes('/login') && !currentUrl.includes('/register')) {
  //       this.router.navigate(['/login']);
  //     }
  // }

  handleLogout() {
    this.duService.logout();
    this.checkLoginStatus();
    this.router.navigate(['/login']);
  }
}
