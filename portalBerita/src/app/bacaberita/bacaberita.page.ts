import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Berita } from '../models/berita.model';
import { Databerita } from '../services/databerita';

@Component({
  selector: 'app-bacaberita',
  templateUrl: './bacaberita.page.html',
  styleUrls: ['./bacaberita.page.scss'],
  standalone:false,
})
export class BacaberitaPage implements OnInit {

    // Properti buat nyimpen detail berita
    selectedBerita: Berita | undefined;
  constructor(private route: ActivatedRoute, // Inject ActivatedROute dipake buat baca URL
  private beritaService: Databerita) {}
  userRating: number = 0; // buat simpen rating pilihan user (1-5)
  ratingSubmitted: boolean = false; // buat menandai jika user sudah submit, true = udah | false = belum
  newCommentText: string = '';
  ngOnInit() {
    // Dengarkan perubahan pada parameter URL
    this.route.paramMap.subscribe(params=> {
      // Ambil id dari parameter URL
      const beritaIdString = params.get('id');

      if (beritaIdString){
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

  submitComment(){
    if (this.newCommentText.trim() !== '' && this.selectedBerita) {
      this.beritaService.addComment(this.selectedBerita.id, this.newCommentText);
      // Kosongkan textarea setelah submit
      this.newCommentText = '';
    }
  }
}
