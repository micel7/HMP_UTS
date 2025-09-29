import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },  {
    path: 'daftarberita',
    loadChildren: () => import('./daftarberita/daftarberita.module').then( m => m.DaftarberitaPageModule)
  },
  {
    path: 'bacaberita',
    loadChildren: () => import('./bacaberita/bacaberita.module').then( m => m.BacaberitaPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
