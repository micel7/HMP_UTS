import { User } from './user.model';

export interface Komentar {
  id: number;
  userId: number;
  username?: string;
  isi: string; 
  tanggal: string | Date; 
  parent_id?: number | null; 
  replies: Komentar[]; // biar ga wajib ngisi replynya
}
