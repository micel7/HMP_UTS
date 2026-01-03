import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Datauser } from '../services/datauser';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  emailInput: string = '';
  pwdInput: string = '';

  constructor(
    private datauser: Datauser,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) { }

  //KODE LAMA
  // async handleLogin() {
  //   try {
  //     const isLoginTrue = this.datauser.login(this.unameInput, this.pwdInput);

  //     if (isLoginTrue) {
  //       await this.showAlert('Sukses', 'Anda berhasil login.');

  //       this.navCtrl.navigateRoot('/home');

  //     } else {
  //       await this.showAlert('Gagal', 'Username atau password salah.');
  //     }

  //   } catch (error: any) {
  //     await this.showAlert('Gagal', error.message || 'Username atau password salah.');
  //   }
  // }
  handleLogin() {
    if (this.emailInput === '' || this.pwdInput === '') {
      this.showAlert('Gagal', 'Email dan password harus diisi');
      return;
    }

    this.datauser.login(this.emailInput, this.pwdInput)
      .subscribe((response: any) => {

        if (response.result === 'success') {
          this.showAlert('Sukses', 'Anda berhasil login');
          this.navCtrl.navigateRoot('/home');
        } else {
          this.showAlert('Gagal', response.message);
        }

      }, error => {
        this.showAlert('Gagal', 'Terjadi kesalahan koneksi');
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

  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }

  ngOnInit() {
    // this.isAlreadyLogin()
  }

  isAlreadyLogin() {
    if (this.datauser.loggedInUser) {
      console.log('Sudah login')
      this.navCtrl.navigateRoot('/home')
    }
  }

  ionViewWillEnter() {
    if (this.datauser.loggedInUser) {
      this.navCtrl.navigateRoot('/home');
    }
  }

}
