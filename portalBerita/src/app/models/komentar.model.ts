import { User } from './user.model';

export interface Komentar {
  id: number;
  userId: number;
  username: string;
  isi: string; 
  tanggal: Date; 
  replies: Komentar[]; // biar ga wajib ngisi replynya
}
