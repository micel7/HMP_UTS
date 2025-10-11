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
}
