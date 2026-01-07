import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewberitaPage } from './newberita.page';

const routes: Routes = [
  {
    path: '',
    component: NewberitaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewberitaPageRoutingModule {}
