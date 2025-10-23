import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Berita } from '../models/berita.model';
import { Databerita } from '../services/dataBerita';

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

  ngOnInit() {
    // Dengarkan perubahan pada parameter URL
    this.route.paramMap.subscribe((params) => {
      // Ambil id dari parameter URL
      const beritaIdString = params.get('id');

      if (beritaIdString) {
        // ubah string 'id' ke number
        const beritaId = +beritaIdString;

        // panggil service untuk mendapatkan detail berita berdasarkan id
        this.selectedBerita = this.beritaService.getBeritaById(beritaId);
      }
    });
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
