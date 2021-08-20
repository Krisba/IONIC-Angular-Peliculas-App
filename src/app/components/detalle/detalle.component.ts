import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Detalles, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id: any;

  detalles: Detalles = {};

  actores: Cast[];

  oculto = 120;

  agregada = false;

  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  };

  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController,
    private dataLocal: DataLocalService,
  ) { }

  async ngOnInit() {

    const existe = await this.dataLocal.checkPelicula( this.id );
    if ( existe ) {
      this.agregada = true;
    } else {
      this.agregada = false
    }

    this.moviesService.getDetalles( this.id )
    .subscribe( resp => {
      this.detalles = resp;
    });

    this.moviesService.getCast( this.id )
    .subscribe( resp => {
      this.actores = resp.cast;
    });
  }

  back() {
    this.modalCtrl.dismiss();
  }

  favorito() {
    const existe = this.dataLocal.guardarPelicula( this.detalles );
    if ( existe ) {
      this.agregada = true;
    } else {
      this.agregada = false
    }
  }

}
