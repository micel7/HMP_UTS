import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class Pengguna {

//MASIH ERROR
  
  // private dataUser: User[] = [
  //   {
  //     userId: 1,
  //     username: "dave",
  //     password: "dave",
  //   },
  //   {
  //     userId: 2,
  //     username: "brian",
  //     password: "brian",
  //   },
  //   , {
  //     userId: 3,
  //     username: "michelle",
  //     password: "michelle",
  //   },
  //   {
  //     userId: 4,
  //     username: "stephen",
  //     password: "stephen",
  //   }
  // ];

  // constructor() { }

  // // 2. Fungsi untuk memeriksa kredensial saat login
  // login(username: string, password: string): User | undefined {
  //   // Cari user yang username dan password-nya cocok
  //   const user = this.dataUser.find(
  //     u => u.username === username && u.password === password
  //   );
  //   return user;
  // }

  // // 3. Fungsi untuk mendapatkan semua data user
  // getAllUsers(): User[] {
  //   return this.dataUser;
  // }
}
