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

  usernameInput: string = '';
  emailInput: string = '';
  passwordInput: string = '';

  constructor(
    private dataUserService: Datauser,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }

  async handleRegister() {
    if (!this.usernameInput || !this.passwordInput) {
      this.showAlert('Error', 'Username dan password tidak boleh kosong.');
      return;
    }

    // buat objek user baru dari input
    const newUser: User = {
      userId: 0, // ID nanti akan dibuat oleh service
      name: this.usernameInput,
      email: this.emailInput,
      password: this.passwordInput,
    };

    const success = this.dataUserService.register(newUser);

    if (success) {
      await this.showAlert('Sukses', 'Akun baru berhasil dibuat. Silakan login.');
      this.navCtrl.navigateBack('/login');
    } else {
      await this.showAlert('Gagal', 'Username sudah digunakan oleh orang lain.');
    }
  }
  
  // Helper function untuk menampilkan alert
  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
