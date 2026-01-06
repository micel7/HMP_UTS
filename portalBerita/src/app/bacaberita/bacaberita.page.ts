import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Berita } from '../models/berita.model';
import { Databerita } from '../services/dataBerita';
import { Subscription } from 'rxjs';
import { Komentar } from '../models/komentar.model';

@Component({
  selector: 'app-bacaberita',
  templateUrl: './bacaberita.page.html',
  styleUrls: ['./bacaberita.page.scss'],
  standalone: false,
})
export class BacaberitaPage implements OnInit {
  // Properti buat nyimpen detail berita
  selectedBerita: Berita | undefined;
  constructor(
    private route: ActivatedRoute, // Inject ActivatedROute dipake buat baca URL
    private beritaService: Databerita
  ) {}
  userRating: number = 0; // buat simpen rating pilihan user (1-5)
  ratingSubmitted: boolean = false; // buat menandai jika user sudah submit, true = udah | false = belum
  newCommentText: string = '';
  replyingToCommentId: number | null = null; // Menyimpan ID komentar yang sedang dibalas
  replyText: string = ''; // Teks untuk form balasan

  // Simpan langganan agar bisa dimatikan saat pindah halaman (cegah memory leak)
  private dataSub: Subscription | undefined;

  ngOnInit() {
    // Dengarkan perubahan pada parameter URL
    this.route.paramMap.subscribe((params) => {
      // Ambil id dari parameter URL
      const beritaIdString = params.get('id');

      if (beritaIdString) {
        // ubah string 'id' ke number
        const beritaId = +beritaIdString;

        //cek apakah sudah rating atau blom
        this.beritaService.checkUserRating(beritaId).subscribe((res: any) => {
          if(res.result === 'success' && res.has_rated > 0) {
            this.ratingSubmitted = true;
            this.userRating = res.nilai;
          } else {
            this.ratingSubmitted = false;
            this.userRating = 0;
          }
        });

        this.dataSub = this.beritaService.dataBerita$.subscribe(list => {
          const found = list.find(b => b.id === beritaId);
          if (found) {
            // Kita buat salinan objek agar tidak merusak data asli di service
            this.selectedBerita = { ...found };
            
            // KONVERSI: Ubah daftar komentar lurus dari DB menjadi struktur pohon (replies)
            if(found.komentar) {
              this.selectedBerita.komentar = this.buildTree(found.komentar);
            } 
          }
          else {
            this.beritaService.getBeritaById(beritaId).subscribe((res: any) => {
              if(res.result === 'success' && res.data) {
                const dataNews = Array.isArray(res.data) ? res.data[0] : res.data;

                if (dataNews) {
                  this.selectedBerita = dataNews;

                  if(dataNews.has_rated > 0) {
                    this.ratingSubmitted = true;
                    this.userRating = dataNews.user_rating;
                  }

                  // KONVERSI: Ubah daftar komentar lurus dari DB menjadi struktur pohon (replies)
                  this.selectedBerita!.komentar = this.buildTree(dataNews.komentar || []);
                }
              }
            });
          }
        });
      }
    });
  }

  private buildTree(flatComments: Komentar[]): Komentar[] {
    if (!flatComments || !Array.isArray(flatComments)) return [];

    const map = new Map<number, Komentar>();
    const roots: Komentar[] = [];

    // Inisialisasi map dan pastikan array replies ada
    flatComments.forEach(c => {
      const id = Number(c.id);
      map.set(id, { ...c, id:id, replies: [] });
    });

    map.forEach(c => {
      const parentId = c.parent_id ? Number(c.parent_id) : null;

      if (parentId && parentId !== 0) {
        const parent = map.get(parentId);
        if (parent) {
          parent.replies!.push(c);
        } else {
          // Jika parent tidak ditemukan, anggap sebagai root
          roots.push(c);
        }
      } else {
        roots.push(c);
      }
    });

    return roots;
  }


  onToggleFavorite(berita: Berita, event: Event) {
    // Stop event biar tidak memicu klik pada card
    event.stopPropagation();

    // Panggil fungsi 'toggle' dari service dengan mengirim id berita
    this.beritaService.toggleFavoriteStatus(berita.id);
  }
  // buat pilih bintang
  rate(starIndex: number) {
    // Jika belum pernah submit, user bisa mengubah ratingnya
    if (!this.ratingSubmitted) {
      this.userRating = starIndex;
    }
  }

  // buat ngirim rating
  submitRating() {
    if (this.userRating > 0 && this.selectedBerita) {
      this.beritaService.addRating(this.selectedBerita.id, this.userRating);
      this.ratingSubmitted = true; // Tandai sudah submit
    }
  }

  submitComment() {
    if (this.newCommentText.trim() !== '' && this.selectedBerita) {
      this.beritaService.addComment(
        this.selectedBerita.id,
        this.newCommentText
      );
      // Kosongkan textarea setelah submit
      this.newCommentText = '';
    }
  }

  toggleReplyForm(commentId: number) {
    if (this.replyingToCommentId === commentId) {
      // Jika form untuk komentar ini sudah terbuka, tutup formnya.
      this.replyingToCommentId = null;
    } else {
      // Jika belum, buka form balasan untuk komentar ini.
      this.replyingToCommentId = commentId;
      this.replyText = ''; // Kosongkan input field
    }
  }

  submitReply(parentId: number) {
    if (this.selectedBerita && this.replyText.trim() !== '') {
      // Panggil service addComment dengan menyertakan parentId
      this.beritaService.addComment(
        this.selectedBerita.id,
        this.replyText,
        parentId
      );

      // Reset dan tutup form balasan setelah berhasil dikirim
      this.replyingToCommentId = null;
      this.replyText = '';
    }
  }


}
