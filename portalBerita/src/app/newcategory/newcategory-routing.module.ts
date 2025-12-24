import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewcategoryPage } from './newcategory.page';

const routes: Routes = [
  {
    path: '',
    component: NewcategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewcategoryPageRoutingModule {}
