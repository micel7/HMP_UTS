import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class Datauser {
  private datauser: User[] = [
    {
      userId: 1,
      username: "dave",
      password: "dave"
    },
    {
      userId: 2,
      username: "bka",
      password: "bka"
    },
    {
      userId: 3,
      username: "steve",
      password: "steve"
    },
    {
      userId: 4,
      username: "michelle",
      password: "michelle"
    },
  ]

  public loggedInUser: User | null = null;

  constructor() { 
    const savedUsername = localStorage.getItem('UserTerakhir');

    //cek username tersimpan
    if (savedUsername) {
      //filtering apakah benar
      const foundUser = this.datauser.find(u => u.username === savedUsername);

      //kalau ketemu set logged in user
      if (foundUser) {
        this.loggedInUser = foundUser;
      }
    }
  }

  simpanData(uname: string){
    localStorage.setItem('UserTerakhir', uname)
  } //untuk simpan data seperti di session

  login(uname: string, pwd: string): User | boolean {
    const user = this.datauser.find(
      u => u.username === uname && u.password === pwd
    );
    if(user) {
      this.loggedInUser=user; //untuk keperluan melempar username ke component.ts
      this.simpanData(uname);
      return true;
    }
    return false;
  }
  
  logout(){
    localStorage.removeItem('loggedInUser');
    this.loggedInUser = null;
  }

  register(newUser: User): boolean {
    const userExists = this.datauser.some(user => user.username == newUser.username);

    if (userExists) {
      console.error('Username sudah ada, silahkan input username lain');
      return false;
    }

    let newId = 1;
    if (this.datauser.length > 0) {
      newId = Math.max(...this.datauser.map(u => u.userId)) + 1;
    }
    newUser.userId = newId;

    this.datauser.push(newUser);
    return true;
  }
}
