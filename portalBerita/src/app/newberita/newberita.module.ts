import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewberitaPageRoutingModule } from './newberita-routing.module';

import { NewberitaPage } from './newberita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewberitaPageRoutingModule
  ],
  declarations: [NewberitaPage]
})
export class NewberitaPageModule {}
