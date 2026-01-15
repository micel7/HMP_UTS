import { Injectable } from '@angular/core';
import { Berita } from '../models/berita.model';
import { Komentar } from '../models/komentar.model';
import { Datauser } from './datauser';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { FavDexie } from '../fav-dexie';

@Injectable({
  providedIn: 'root'
})
export class Databerita {
  private apiUrlComment = 'https://ubaya.cloud/hybrid/160423076/projectHMP/comment.php';
  private apiUrlNews = 'https://ubaya.cloud/hybrid/160423076/projectHMP/news.php';

  private _dataBeritaSubject: BehaviorSubject<Berita[]>;
  public dataBerita$: Observable<Berita[]>;
  
  private dataBerita: Berita[] = [];
  //public userServiceName:string | null = null;

  constructor(private http: HttpClient, public dataUser: Datauser, private favDexie: FavDexie) {
    this._dataBeritaSubject = new BehaviorSubject<Berita[]>(this.dataBerita);
    this.dataBerita$ = this._dataBeritaSubject.asObservable();
  }
  
/* ================================
                BERITA
    ================================*/
  getBerita(query: string=''): Observable<any> {
    const timestamp = new Date().getTime();
    const baseUrl = query ? `${this.apiUrlNews}?search=${encodeURIComponent(query)}` : this.apiUrlNews;
    const separator = baseUrl.includes('?') ? '&' : '?';
    const url = `${baseUrl}${separator}t=${timestamp}`;

    return this.http.get<any>(url).pipe(
      tap(async (response: any) => {
        // Update dataBerita dan BehaviorSubject saat data diambil dari API
        if(response.result === 'success') {
          const newsFromApi: Berita[] = response.data;
          
          // Cek favorit dari Dexie dan tandai di dataBerita
          const favIds = await this.favDexie.getAllFavorites();

          const mappedNews = newsFromApi.map(berita => ({ ...berita, isFavorite: favIds.includes(Number(berita.id)), komentar: berita.komentar || [] }));

          if(!query) {
            this.dataBerita = mappedNews;
            this._dataBeritaSubject.next(this.dataBerita);
          }
        }
      }),
      catchError(err => {
        console.error('Gagal ambil berita:', err);
        return throwError(() => new Error('Gagal terhubung ke server.'));
      })
    );
  }

  getBeritaById(id: number): Observable<any> {
    const index = this.dataBerita.findIndex(b => b.id === id);
    if(index !== -1) {
      this.dataBerita[index].views++;
      this._dataBeritaSubject.next([...this.dataBerita]); // Update subject agar komponen yg subscribe ter-update
    }

    //cari dan kembalikan berita yg idnya sesuai
    return this.http.get(this.apiUrlNews + '?id=' + id);
  }

  addBerita(judul: string, deskripsi: string, fotoUtama: string, categories: number[], images: string[]): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded',});
    const body = new URLSearchParams();

    body.set('user_id', this.dataUser.loggedInUser?.userId?.toString() || '0');
    body.set('judul', judul);
    body.set('deskripsi', deskripsi);
    body.set('foto_utama', fotoUtama);
    body.set('categories', JSON.stringify(categories));
    body.set('images', JSON.stringify(images));
    
    const urlEncodedData = body.toString();
    return this.http.post('https://ubaya.cloud/hybrid/160423076/projectHMP/add_news.php', urlEncodedData, { headers });
  }

  deleteBerita(newsId: number): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded',});
    const body = new URLSearchParams();

    const currentUserId = this.dataUser.loggedInUser?.userId?.toString() || '0';

    body.set('news_id', newsId.toString());
    body.set('user_id', currentUserId);

    const urlEncodedData = body.toString();
    return this.http.post('https://ubaya.cloud/hybrid/160423076/projectHMP/delete_news.php', urlEncodedData, { headers });
  }

/* ================================
              RATING
  ================================*/
  addRating(newsId: number, ratingValue: number) {
    // Kita buat body pesan sesuai kolom di project_news_ratings.sql
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded',});
    const body = new URLSearchParams();
    body.set('news_id', newsId.toString());
    body.set('user_id', this.dataUser.loggedInUser?.userId?.toString() || '0');
    body.set('rating', ratingValue.toString());
    const urlEncodedData = body.toString();

    this.http.post<any>('https://ubaya.cloud/hybrid/160423076/projectHMP/add_rating.php', urlEncodedData, { headers }).subscribe({
      next: (res) => {
        if (res.result === 'success') {
          console.log('Rating berhasil disimpan ke DB');
          // Setelah sukses di DB, kita refresh data lokal agar UI ter-update
          this.getBerita().subscribe();
        }
      }, error: (err) => console.error('Error koneksi API:', err)
    });
  }

  checkUserRating(newsId: number): Observable<any> {
    const userId = this.dataUser.loggedInUser?.userId || 0;
    return this.http.get(`https://ubaya.cloud/hybrid/160423076/projectHMP/add_rating.php?news_id=${newsId}&user_id=${userId}`);
  }
  
/* ================================
              FAVORITE
  ================================*/ 
  async toggleFavoriteStatus(id: number) {
    // Cari berita yang cocok dengan id yang dikirim
    const beritaItem = this.dataBerita.find(b => b.id === id); // cari berita yg cocok sm id yg dikirim

    // Jika berita ditemukan, balik nilainya
    if (beritaItem) {
      beritaItem.isFavorite = !beritaItem.isFavorite;

      //update ke dexie
      if(beritaItem.isFavorite) {
        await this.favDexie.addFavorite(id);
      } else {
        await this.favDexie.removeFavorite(id);
      }

      this._dataBeritaSubject.next([...this.dataBerita]); // Update subject agar komponen yg subscribe ter-update
    }
  }

  async checkIsFavorite(id: number): Promise<boolean> {
    const favIds = await this.favDexie.getAllFavorites(); // ambil data berita favorites
    return favIds.includes(Number(id));
}

/* ================================
              COMMENT
  ================================*/ 
  // LOGIC COMMENT VERSI DATABASE
  getCommentsFromAPI(newsId: number): Observable<Komentar[]> {
    // PHP menerima news_id lewat GET
    return this.http.get<any>(`${this.apiUrlComment}?news_id=${newsId}`).pipe(
      map(response => {
        if (response.result === 'OK') {
          return response.data; 
        }
        return [];
      }),
      catchError(err => {
        console.error('Gagal ambil komentar:', err);
        return throwError(() => new Error('Gagal terhubung ke server.'));
      })
    );
  }

  addComment(newsId: number, content: string, parentId?: number) {
    // Kita buat body pesan sesuai kolom di project_comments.sql
    const body = new HttpParams()
      .set('news_id', newsId.toString())
      .set('user_id', this.dataUser.loggedInUser?.userId?.toString() || '0')
      .set('content', content)
      .set('parent_id', parentId ? parentId.toString() : '');

    // Mengirim data menggunakan POST ke PHP
    return this.http.post<any>(this.apiUrlComment, body, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
  }

  private refreshCommentsLocal(newsId: number){
    this.getCommentsFromAPI(newsId).subscribe(newComments => {
      const currentList = this._dataBeritaSubject.getValue();
      const berita = currentList?.find(b => b.id === newsId);
      if (berita){
        berita.komentar = newComments;
        this._dataBeritaSubject?.next([...currentList]);
      }
    })
  }
}

  /*

  //add comment nya stip
  .subscribe({
      next: (res) => {
        if (res.result === 'OK') {
          console.log('Komentar berhasil disimpan ke DB');
          // Setelah sukses di DB, kita refresh data lokal agar UI ter-update
          this.refreshCommentsLocal(newsId);
        } else {
          console.error('Server menolak komentar:', res.message);
        }
      },
      error: (err) => console.error('Error koneksi API:', err)
    });

  incrementViews(id: number): void {
    const beritaById = this.dataBerita.find(b => b.id === id);
    if(beritaById) {
      beritaById.views++;
    }
  }

  addRating(beritaId: number, ratingValue: number) {
    const beritaItem = this.dataBerita.find(b => b.id === beritaId);
    if (beritaItem) {
      // Tambahkan nilai rating baru ke dalam array
      beritaItem.rating.push(ratingValue);
    }
  }
  */

  // addComment(beritaId: number, teksKomentar: string, parentId?: number) {
  //   const beritaItem = this.getBeritaById(beritaId);

  //   const userServiceId = this.userService.loggedInUser?.userId
  //   const userServiceName = this.userService.loggedInUser?.username

  //   if (beritaItem && teksKomentar.trim() !== '') {
      
  //     // bikin id baru 
  //     const allComments = this.flattenComments(beritaItem.komentar);
      
  //     // Secara eksplisit memberi tipe (c: Komentar)
  //     const maxId = allComments.length > 0 ? Math.max(...allComments.map((c: Komentar) => c.id)) : 0;
  //     const newCommentId = maxId + 1;

  //     const newComment: Komentar = {
  //       id: newCommentId,
  //       userId: Number(userServiceId), 
  //       username: String(userServiceName),
  //       isi: teksKomentar,
  //       tanggal: new Date(),
  //       replies: [] // Selalu inisialisasi array replies
  //     };

  //     // Selalu cek apakah ini balasan atau komentar baru
  //     if (parentId) {
  //       // Misal parent exist dan ini comment replies, maka
  //       // Cari komentar induknya menggunakan fungsi helper
  //       const parentComment = this.findCommentById(beritaItem.komentar, parentId);
        
  //       if (parentComment) { 
  //         // Pengecekan semisal comment belum ada array untuk replies 
  //         if (!parentComment.replies) {
  //           parentComment.replies = [];
  //         }
  //         // Tambahkan komentar baru sebagai balasan
  //         parentComment.replies.unshift(newComment);
  //       }
  //     } else {
  //       // Kalau misal ini comment utama langsung masuk ke maina rray aja
  //       beritaItem.komentar.unshift(newComment);
  //     }
  //   }
  // }
  
  // private findCommentById(comments: Komentar[], id: number): Komentar | null{
  //   for (const comment of comments){
  //     if (comment.id === id){ // semisal commentnya coock langsung return
  //       return comment;
  //     }
  //     // semisal tidak cocok, cek apakah komentar ini punya balasan.
  //     if (comment.replies && comment.replies.length > 0) {
  //       // misalnya punya, panggil fungsi ini lagi untuk mencari di dalam balasannya (rekursif).
  //       const foundInReply = this.findCommentById(comment.replies, id);
        
  //       // misalnya di dalam balasan, langsung kembalikan hasilnya.
  //       if (foundInReply) {
  //         return foundInReply;
  //       }
  //     }
      
  //   }
  //   return null; // semisal loop selesai dan gada hasil
  // }

  /*
  private flattenComments(comments: Komentar[]): Komentar[] {
    let flat: Komentar[] = [];
    for (const comment of comments) {
      flat.push(comment);
      if (comment.replies && comment.replies.length > 0) {
        // Gabungkan dengan hasil rekursif dari balasannya
        flat = flat.concat(this.flattenComments(comment.replies));
      }
    }
    return flat;
  }
  */

  /*
  private dataBerita: Berita[] = [
    {
      id: 1,
      judul: 'MU kalah lagi ',
      konten: 'MU kalah lagi',
      foto: 'assets/MU.jpg',
      gambarHalaman: ["assets/sports1.jpg", "assets/sports2.jpg", "assets/sports3.jpg", "assets/sports4.jpg"], // Minimal 4 gambar untuk halaman baca berita
      categories: ['Olahraga'],
      rating: [5, 4, 3],
      komentar: [], // Daftar komentar dari user
      isFavorite: true,
      views: 104
    },
    {
      id: 2,
      judul: 'Mr Krab cuci uang',
      konten: 'Mr Krab cuci uang, Mr Krab cuci uang, Mr Krab cuci uang',
      foto: 'assets/mrkrab.jpg',
      gambarHalaman: ["assets/mrkrab.jpg", "assets/mrkrab.jpg", "assets/mrkrab.jpg", "assets/mrkrab.jpg"], // Minimal 4 gambar untuk halaman baca berita
      categories: ['Ekonomi'],
      rating: [5, 4, 3],
      komentar: [], // Daftar komentar dari user
      isFavorite: true,
      views: 25
    },
    {
      id: 3,
      judul: 'Mr Krab mengalami kerugian di Q4',
      konten: 'Mr Krab mengalami kerugian di Q4',
      foto: 'assets/mrkrab.jpg',
      gambarHalaman: ["assets/mrkrab.jpg", "assets/mrkrab.jpg", "assets/mrkrab.jpg", "assets/mrkrab.jpg"], // Minimal 4 gambar untuk halaman baca berita
      categories: ['Ekonomi'],
      rating: [5, 4, 3],
      komentar: [], // Daftar komentar dari user
      isFavorite: false,
      views: 50
    },
    {
      id: 4,
      judul: 'Kalah di Laga Tandang, Pelatih Elang FC Soroti Lini Pertahanan',
      konten: 'Setelah menelan kekalahan pahit 2-1 dari rivalnya, Harimau FC, pelatih kepala Elang FC, Budi Santoso, menyatakan kekecewaannya terhadap kinerja lini belakang tim. "Kami membuat dua kesalahan fatal yang seharusnya tidak terjadi di level ini. Koordinasi antar pemain belakang harus segera kami perbaiki sebelum pertandingan berikutnya," ujarnya dalam konferensi pers pasca-pertandingan.',
      foto: 'assets/elangfc.png',
      gambarHalaman: ["assets/sports1.jpg", "assets/sports2.jpg", "assets/sports3.jpg", "assets/sports4.jpg"],
      categories: ['Olahraga'],
      rating: [4, 3, 4, 3],
      komentar: [],
      isFavorite: false,
      views: 100
    },
    {
      id: 5,
      judul: 'Startup AI Lokal "NusantaraGPT" Raih Pendanaan Seri A',
      konten: 'Startup kecerdasan buatan asal Jakarta, NusantaraGPT, hari ini mengumumkan telah berhasil mengumpulkan pendanaan Seri A sebesar $10 juta. Pendanaan ini dipimpin oleh East Ventures dengan partisipasi dari beberapa investor lainnya. Dana segar ini rencananya akan digunakan untuk ekspansi tim riset dan pengembangan infrastruktur komputasi awan mereka.',
      foto: "assets/gpt.jpg",
      gambarHalaman: ["assets/tech1.jpg", "assets/tech2.jpg", "assets/tech3.jpg", "assets/tech4.jpg"],
      // Berita dengan multi-kategori
      categories: ['Teknologi', 'Ekonomi'],
      rating: [5, 5, 4, 5],
      komentar: [],
      isFavorite: true,
      views: 47
    },
    {
      id: 6,
      judul: 'Bank Sentral Pertahankan Suku Bunga Acuan di Level 5.75%',
      konten: '## Bank Indonesia Pertahankan Suku Bunga Acuan di Level 5.75%, Fokus Jaga Stabilitas Rupiah\nJakarta – Rapat Dewan Gubernur (RDG) Bank Indonesia yang diadakan hari ini, Minggu, 5 Oktober 2025, secara konsisten memutuskan untuk mempertahankan suku bunga acuan atau BI-Rate di level 5.75%. Keputusan ini, yang telah sejalan dengan ekspektasi mayoritas ekonom dan analis pasar, diambil sebagai langkah strategis untuk menjaga stabilitas di tengah kondisi inflasi domestik yang mulai terkendali serta meningkatnya ketidakpastian ekonomi global.\n### Inflasi Domestik Terkendali\nLandasan utama dari keputusan ini adalah kondisi inflasi di dalam negeri yang menunjukkan tren moderat. Data terkini menunjukkan bahwa inflasi Indeks Harga Konsumen (IHK) telah kembali ke jalur target, didukung oleh melandainya inflasi harga pangan bergejolak (volatile food) berkat sinergi kebijakan antara pemerintah pusat dan daerah.\n\n"Inflasi inti tetap terjaga rendah, mengindikasikan bahwa ekspektasi inflasi di masyarakat berjangkar dengan baik dan tekanan dari sisi permintaan domestik tidak berlebihan. Hal ini memberikan ruang bagi Bank Indonesia untuk tidak menaikkan suku bunga lebih lanjut, sehingga dapat menjaga momentum pertumbuhan ekonomi nasional," jelas seorang ekonom dari Universitas Gadjah Mada.\n### Antisipasi Gejolak Global\n\n\nDi sisi eksternal, Bank Indonesia tetap waspada terhadap ketidakpastian yang bersumber dari kebijakan suku bunga bank sentral negara maju, terutama The Federal Reserve AS, yang diperkirakan akan mempertahankan suku bunga tinggi untuk waktu yang lebih lama (higher for longer). Selain itu, eskalasi ketegangan geopolitik di beberapa kawasan turut meningkatkan risiko di pasar keuangan global.\n\n\nLangkah mempertahankan BI-Rate di level 5.75% dipandang sebagai bauran kebijakan yang optimal untuk memperkuat ketahanan eksternal. Suku bunga yang kompetitif diharapkan dapat menjaga daya tarik aset keuangan domestik, sehingga mampu menahan potensi aliran modal keluar (capital outflow) dan menjaga stabilitas nilai tukar Rupiah yang menjadi garda terdepan dalam meredam inflasi barang impor (imported inflation).\nPara analis pasar yang telah memprediksi langkah ini sebelumnya menilai bahwa keputusan Bank Indonesia ini sudah tepat. Dengan tidak adanya kejutan, pasar diperkirakan akan bereaksi tenang, dengan nilai tukar Rupiah dan Indeks Harga Saham Gabungan (IHSG) yang diperkirakan akan bergerak stabil dalam jangka pendek. Ke depan, Bank Indonesia akan terus mencermati dinamika data ekonomi domestik dan global untuk merumuskan langkah-langkah kebijakan selanjutnya.',
      foto: 'assets/economy.jpeg',
      gambarHalaman: ["assets/economy1.jpg", "assets/economy2.jpeg", "assets/economy3.jpeg", "assets/economy4.jpg"],
      categories: ['Ekonomi'],
      rating: [4, 4, 4, 5],
      komentar: [
        {
          id: 1,
          userId: 1,
          username: 'dave',
          isi: 'Langkah yang tepat dari Bank Sentral. Stabilitas nilai tukar Rupiah memang harus jadi prioritas utama saat ini, apalagi kondisi global lagi tidak menentu.',
          tanggal: new Date('2025-10-02T15:00:00'),
          replies:[]
        },
        {
          id: 2,
          userId: 3,
          username: 'steve',
          isi: 'Berarti bunga KPR dan cicilan lain nggak akan naik dulu ya dalam waktu dekat? Syukurlah kalau begitu.',
          tanggal: new Date('2025-10-03T09:20:00'),
          replies:[]
        },
        {
          id: 3,
          userId: 2,
          username: 'bka',
          isi: 'Ditahan terus, kapan turunnya ya? Sektor riil butuh suku bunga yang lebih rendah biar bisa ekspansi.',
          tanggal: new Date('2025-10-04T18:00:00'),
          replies:[]
        }
      ],
      isFavorite: false,
      views: 64
    },
    {
      id: 7,
      judul: 'Tips Menjaga Kesehatan Mata di Era Digital',
      konten: 'Bekerja di depan layar selama berjam-jam dapat menyebabkan ketegangan pada mata. Para ahli kesehatan menyarankan untuk menerapkan aturan 20-20-20: setiap 20 menit, alihkan pandangan Anda untuk melihat sesuatu yang berjarak 20 kaki (sekitar 6 meter) selama 20 detik. Selain itu, pastikan pencahayaan ruangan cukup dan posisi layar sejajar dengan mata.',
      foto: 'assets/health.jpg',
      gambarHalaman: ["assets/health1.jpeg", "assets/health2.jpeg", "assets/health3.jpeg", "assets/health4.jpg"],
      categories: ['Kesehatan'],
      rating: [5, 5, 5],
      komentar: [],
      isFavorite: false,
      views: 78
    },
    {
      id: 8,
      judul: 'Silent Hill F Tembus 1 Juta Penjualan dalam 4 Hari, Berpotensi Mengalahkan Silent Hill 2 Remake',
      konten: 'Silent Hill f langsung melesat baik secara kritis maupun komersial, sebagaimana terlihat dari skor Metacritic serta laporan penjualan terbaru yang dirilis Konami. Dikembangkan oleh NeoBards Entertainment, game horor ini berhasil menghadirkan kembali esensi klasik waralaba dengan menangkap horor psikologis yang menjadi ciri khas Silent Hill.',
      foto: 'assets/game.png',
      gambarHalaman: ["assets/game1.png", "assets/game2.png", "assets/game3.png", "assets/game4.png"],
      categories: ['Game', 'Teknologi'],
      rating: [5, 5, 5],
      komentar: [],
      isFavorite: true,
      views: 96
    },
    {
      id: 9,
      judul: 'Blue Protocol: Star Resonance Resmi Dirilis Global, Hadir di PC dan Mobile',
      konten: 'Setelah penantian panjang, Blue Protocol: Star Resonance akhirnya resmi dirilis secara global pada Kamis (9/10/25) di platform PC (Steam dan Epic Games Store) serta mobile (iOS dan Android). Game MMORPG bergaya anime ini juga dipastikan akan menghadirkan fitur cross-play dan cross-progression penuh.',
      foto: 'assets/bluep.png',
      gambarHalaman: ["assets/bluep1.png", "assets/bluep.png"],
      categories: ['Game', 'Teknologi'],
      rating: [5, 2, 5],
      komentar: [],
      isFavorite: false,
      views: 57
    },
    
  ];
  */
