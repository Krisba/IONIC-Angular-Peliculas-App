import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from '../../interfaces/interfaces';
import { MoviesService } from '../../services/movies.service';
import { DetalleComponent } from '../../components/detalle/detalle.component';


@Component({
  selector: 'app-tab-buscador',
  templateUrl: 'tab-buscador.page.html',
  styleUrls: ['tab-buscador.page.scss']
})
export class TabBuscadorPage {

  textoBusqueda = '';

  recomendaciones : string[] = ['Free guy', 'El escuadrón suicida', 'Cruella', 'Viuda negra', 'My hero academia'];

  peliculas: Pelicula[] = [];

  buscando = false;

  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController
  ) { }

  busqueda( event ) {
    const valor = event.detail.value

    if (valor.length === 0) {
      this.buscando = false
      this.peliculas = []
      return;
    }

    this.buscando = true;
    this.moviesService.buscarPeliculas(valor)
    .subscribe( resp => {
      this.peliculas = resp['results'];
      this.buscando = false;
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
