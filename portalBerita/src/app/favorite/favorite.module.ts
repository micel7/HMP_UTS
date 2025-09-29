import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FavoritePage } from './favorite.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { FavoritePageRoutingModule } from './favorite-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    FavoritePageRoutingModule,
  ],
  declarations: [FavoritePage],
})
export class FavoritePageModule {}
