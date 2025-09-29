import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DaftarberitaPageRoutingModule } from './daftarberita-routing.module';

import { DaftarberitaPage } from './daftarberita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DaftarberitaPageRoutingModule
  ],
  declarations: [DaftarberitaPage]
})
export class DaftarberitaPageModule {}
