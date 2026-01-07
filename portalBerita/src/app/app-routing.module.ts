import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
    // loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'home', 
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    // Rute untuk menampilkan SEMUA berita (tanpa kategori)
    path: 'daftarberita',
    loadChildren: () => import('./daftarberita/daftarberita.module').then(m => m.DaftarberitaPageModule)
  },
  {
    path: 'daftarberita/:kategori', // di sini kategori jadi placeholder untuk kategori misal daftarBerita/Olahraga
    loadChildren: () => import('./daftarberita/daftarberita.module').then( m => m.DaftarberitaPageModule)
  },
  {
    path: 'bacaberita/:id',
    loadChildren: () => import('./bacaberita/bacaberita.module').then( m => m.BacaberitaPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'newcategory',
    loadChildren: () => import('./newcategory/newcategory.module').then( m => m.NewcategoryPageModule)
  },  {
    path: 'newberita',
    loadChildren: () => import('./newberita/newberita.module').then( m => m.NewberitaPageModule)
  },





];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
