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
  public username: string | null = null;

  constructor(private duService: Datauser, private router: Router) {
    this.checkLoginStatus();

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.checkLoginStatus();
    });
  }
  
  checkLoginStatus() {
    if (this.duService.loggedInUser) {
      this.username = this.duService.loggedInUser.username;
    } else {
      this.username = null;
      this.router.navigate(['/login']);
    }
  }

  handleLogout() {
    this.duService.logout();
    this.checkLoginStatus();
    this.router.navigate(['/login']);
  }
}
