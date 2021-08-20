import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshows-poster',
  templateUrl: './slideshows-poster.component.html',
  styleUrls: ['./slideshows-poster.component.scss'],
})
export class SlideshowsPosterComponent implements OnInit {

  @Input() populares: Pelicula[] = [];

  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    initialSlide: 0,
    autoplay:true,
    speed: 300
  };

  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController
    ) { }

  ngOnInit() {
    this.moviesService.getPopulares()
    .subscribe( resp => {
      this.populares = resp.results;
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
