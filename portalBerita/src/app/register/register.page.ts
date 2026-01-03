import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Datauser } from '../services/datauser';
import { User } from '../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {

  nameInput: string = '';
  emailInput: string = '';
  passwordInput: string = '';
  confirmPasswordInput: string = '';

  constructor(
    private dataUserService: Datauser,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }

  handleRegister() {

    // VALIDASI DULU SESUAI KETENTUAN
    // Email tidak boleh sama dengan email yang sudah terdaftar (di php)

    // Harus diisi semua
    if (this.nameInput.trim() === '' || this.emailInput.trim() === '' || this.passwordInput.trim() === '' ||
      this.confirmPasswordInput.trim() === '') {
      this.showAlert('Gagal', 'Semua field wajib diisi');
      return;
    }

    // Nama harus diisi, tidak boleh ada angka
    if (/\d/.test(this.nameInput)) {
      this.showAlert('Gagal', 'Nama tidak boleh mengandung angka');
      return;
    }

    // Password minimal 8 karakter
    if (this.passwordInput.length < 8) {
      this.showAlert('Gagal', 'Password minimal 8 karakter');
      return;
    }

    // Terdapat konfirmasi password yang mencocokan antara password dan konfirmasi password
    if (this.passwordInput !== this.confirmPasswordInput) {
      this.showAlert('Gagal', 'Password dan konfirmasi password tidak sama');
      return;
    }

    // Object user sesuai datauser.ts
    const newUser: User = {
      userId: 0,
      name: this.nameInput,
      email: this.emailInput,
      password: this.passwordInput
    };

    this.dataUserService
      .register(this.nameInput, this.emailInput, this.passwordInput)
      .subscribe((response: any) => {

        if (response.result === 'success') {
          this.showAlert('Sukses', response.message);
          this.navCtrl.navigateBack('/login');
        } else {
          this.showAlert('Gagal', response.message);
        }

      }, () => {
        this.showAlert('Gagal', 'Koneksi ke server gagal');
      });
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }


  // KODE LAMA
  // async handleRegister() {
  //   if (!this.nameInput || !this.passwordInput) {
  //     this.showAlert('Error', 'Username dan password tidak boleh kosong.');
  //     return;
  //   }

  //   // buat objek user baru dari input
  //   const newUser: User = {
  //     userId: 0, // ID nanti akan dibuat oleh service
  //     name: this.nameInput,
  //     email: this.emailInput,
  //     password: this.passwordInput,
  //   };

  //   const success = this.dataUserService.register(newUser);

  //   if (success) {
  //     await this.showAlert('Sukses', 'Akun baru berhasil dibuat. Silakan login.');
  //     this.navCtrl.navigateBack('/login');
  //   } else {
  //     await this.showAlert('Gagal', 'Username sudah digunakan oleh orang lain.');
  //   }
  // }

  // // Helper function untuk menampilkan alert
  // async showAlert(header: string, message: string) {
  //   const alert = await this.alertCtrl.create({
  //     header,
  //     message,
  //     buttons: ['OK'],
  //   });
  //   await alert.present();
  // }
}
