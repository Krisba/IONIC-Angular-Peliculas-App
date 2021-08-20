import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab-peliculas',
        loadChildren: () => import('../tab-peliculas/tab-peliculas.module').then(m => m.TabPeliculasPageModule)
      },
      {
        path: 'tab-buscador',
        loadChildren: () => import('../tab-buscador/tab-buscador.module').then(m => m.TabBuscadorPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab-peliculas',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab-peliculas',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
