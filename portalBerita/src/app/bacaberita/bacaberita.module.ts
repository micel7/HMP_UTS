import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BacaberitaPageRoutingModule } from './bacaberita-routing.module';

import { BacaberitaPage } from './bacaberita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BacaberitaPageRoutingModule
  ],
  declarations: [BacaberitaPage]
})
export class BacaberitaPageModule {}
