import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DaftarberitaPage } from './daftarberita.page';

const routes: Routes = [
  {
    path: '',
    component: DaftarberitaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DaftarberitaPageRoutingModule {}
