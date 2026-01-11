import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Berita } from '../models/berita.model';
import { Databerita } from '../services/dataBerita';
import { Subscription } from 'rxjs';
import { Komentar } from '../models/komentar.model';
import { AlertController, NavController } from '@ionic/angular';

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
    public beritaService: Databerita,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) {}
  userRating: number = 0; // buat simpen rating pilihan user (1-5)
  ratingSubmitted: boolean = false; // buat menandai jika user sudah submit, true = udah | false = belum
  newCommentText: string = '';
  replyingToCommentId: number | null = null; // Menyimpan ID komentar yang sedang dibalas
  replyText: string = ''; // Teks untuk form balasan

  // Simpan langganan agar bisa dimatikan saat pindah halaman (cegah memory leak)
  private dataSub: Subscription | undefined;
  public totalKomentar: number = 0;

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

        this.beritaService.getBeritaById(beritaId).subscribe((res: any) => {
          if(res.result === 'success' && res.data) {
            const dataNews = Array.isArray(res.data) ? res.data[0] : res.data;
            this.selectedBerita = { ...dataNews };

            this.loadComments(beritaId);
          }
        });
      }
    });
  }

  async hapusBeritaIni() {
    if(!this.selectedBerita) return;

    const alert = await this.alertCtrl.create({
      header: 'Konfirmasi',
      message: 'Apakah Anda yakin ingin menghapus berita ini?',
      buttons: [
        { text: 'Batal', role: 'cancel' },
        {
          text: 'Hapus',
          handler: () => {
            this.beritaService.deleteBerita(this.selectedBerita!.id).subscribe((res: any) => {
              if(res.result === 'success') {
                console.log('Berita berhasil dihapus');
                this.beritaService.getBerita().subscribe();
                this.navCtrl.navigateRoot('/home/category');
              } else {
                console.error('Gagal menghapus berita:', res.message);
              }
          }
        )}
      }]
    });
    await alert.present();
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
    event.stopPropagation();

    // biar favoritenya berubah value
    berita.isFavorite = !berita.isFavorite;

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
      const newsId = this.selectedBerita.id;

      this.beritaService.addComment(newsId, this.newCommentText).subscribe({next:(res) => {
        if (res.result === 'OK') {
          console.log('Komentar berhasil ditambahkan');
          this.newCommentText = '';
          this.loadComments(newsId);

          this.beritaService.getBerita().subscribe(); // Refresh data berita setelah penambahan komentar
        }
      }, error: (err) => console.error('Gagal menambahkan komentar:', err)});
    }
  }

  loadComments(newsId: number) {
    this.beritaService.getCommentsFromAPI(newsId).subscribe((comments: any) => {
      if(this.selectedBerita) {
        this.totalKomentar = comments.length;
        this.selectedBerita.komentar = this.buildTree(comments);
      }
    });
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
      const newsId = this.selectedBerita.id;

      this.beritaService.addComment(newsId, this.replyText, parentId).subscribe({next:(res) => {
        if (res.result === 'OK') {
          console.log('Balasan berhasil ditambahkan');
          this.replyingToCommentId = null;
          this.replyText = '';
          this.loadComments(newsId);
        }
      }, error: (err) => console.error('Gagal menambahkan balasan:', err)});
    }
  }
}

/* code lama
  submitComment() {
    this.beritaService.addComment(
        this.selectedBerita.id,
        this.newCommentText
      );
      // Kosongkan textarea setelah submit
      this.newCommentText = '';
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
*/