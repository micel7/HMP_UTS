import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    children: [
      {
        path: 'category',
        loadChildren: () =>
          import('../category/category.module').then((m) => m.CategoryPageModule),
      },
      {
        path: 'favorite',
        loadChildren: () =>
          import('../favorite/favorite.module').then((m) => m.FavoritePageModule),
      },
      {
        path: 'search',
        loadChildren: () =>
          import('../search/search.module').then((m) => m.SearchPageModule),
      },
      {
        path: '',
        redirectTo: '/home/category',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/home/category',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class HomePageRoutingModule {}
