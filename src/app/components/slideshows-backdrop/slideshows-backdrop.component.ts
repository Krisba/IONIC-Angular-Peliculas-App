import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MoviesService } from 'src/app/services/movies.service';
import { Pelicula } from '../../interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshows-backdrop',
  templateUrl: './slideshows-backdrop.component.html',
  styleUrls: ['./slideshows-backdrop.component.scss'],
})
export class SlideshowsBackdropComponent implements OnInit {
  
  @Input() peliculas: Pelicula[] = [];
  
  slideOpts = {
    slidesPerView: 1.1,
    freeMode: true,
  };
  
  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController
    ) { }
  
  ngOnInit() {
    this.moviesService.getEstrenos()
    .subscribe( resp => {
      this.peliculas = resp.results;
    }); 
  }

  async verDetalles ( id: string ) { 
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();
  }
  
}
