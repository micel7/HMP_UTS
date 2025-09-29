import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BacaberitaPage } from './bacaberita.page';

const routes: Routes = [
  {
    path: '',
    component: BacaberitaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BacaberitaPageRoutingModule {}
