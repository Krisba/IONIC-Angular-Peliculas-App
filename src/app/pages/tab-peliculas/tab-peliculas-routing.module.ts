import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabPeliculasPage } from './tab-peliculas.page';

const routes: Routes = [
  {
    path: '',
    component: TabPeliculasPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabPeliculasPageRoutingModule {}
