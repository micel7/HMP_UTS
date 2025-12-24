import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewcategoryPageRoutingModule } from './newcategory-routing.module';

import { NewcategoryPage } from './newcategory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewcategoryPageRoutingModule
  ],
  declarations: [NewcategoryPage]
})
export class NewcategoryPageModule {}
