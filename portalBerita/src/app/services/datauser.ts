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

  login(uname: string, pwd: string): User | undefined {
    const user = this.datauser.find(
      u => u.username === uname && u.password === pwd
    );
    return user;
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
