import { User } from './user.model';

export interface Komentar {
  id: number;
  userId: number;
  isi: string; 
  tanggal: Date; 
}
