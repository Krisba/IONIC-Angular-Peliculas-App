import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabPeliculasPage } from './tab-peliculas.page';

import { TabPeliculasPageRoutingModule } from './tab-peliculas-routing.module';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabPeliculasPageRoutingModule,
    PipesModule,
    ComponentsModule,
  ],
  declarations: [TabPeliculasPage]
})
export class TabPeliculasPageModule {}
