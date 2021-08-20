import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { SlideshowsBackdropComponent } from './slideshows-backdrop/slideshows-backdrop.component';
import { PipesModule } from '../pipes/pipes.module';
import { SlideshowsPosterComponent } from './slideshows-poster/slideshows-poster.component';
import { DetalleComponent } from './detalle/detalle.component';
import { IonicRatingModule } from 'ionic-rating';
import { PeliculaEditableComponent } from './pelicula-editable/pelicula-editable.component';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';


@NgModule({
  entryComponents:[
    DetalleComponent,
    PeliculaEditableComponent
  ],
  declarations: [
    SlideshowsBackdropComponent,
    SlideshowsPosterComponent,
    DetalleComponent,
    PeliculaEditableComponent,
    AvatarSelectorComponent
  ],
  exports: [
    SlideshowsBackdropComponent,
    SlideshowsPosterComponent,
    DetalleComponent,
    PeliculaEditableComponent,
    AvatarSelectorComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    IonicRatingModule,
    FormsModule
  ]
})
export class ComponentsModule { }
