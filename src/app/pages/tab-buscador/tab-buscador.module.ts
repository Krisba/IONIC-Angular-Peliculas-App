import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabBuscadorPage } from './tab-buscador.page';

import { TabBuscadorPageRoutingModule } from './tab-buscador-routing.module';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabBuscadorPageRoutingModule,
    PipesModule,
    ComponentsModule
  ],
  declarations: [TabBuscadorPage]
})
export class TabBuscadorPageModule {}
