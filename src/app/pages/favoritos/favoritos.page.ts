import { Component } from '@angular/core';
import { Detalles } from '../../interfaces/interfaces';
import { DataLocalService } from '../../services/data-local.service';
import { IonItemSliding, ModalController } from '@ionic/angular';
import { PeliculaEditableComponent } from '../../components/pelicula-editable/pelicula-editable.component';


@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage {
  
  peliculas: Detalles[] = [];
  
  detalles: Detalles = {};
  
  agregada = false;
  
  
  constructor(
    private dataLocal: DataLocalService,
    private modalCtrl: ModalController
    ) { }
    
    async ionViewWillEnter() {
      this.cargarPeliculas()
    }
    
    async cargarPeliculas() {
      this.peliculas = await this.dataLocal.cargarPelicula()
    }
    
    async verDetalles ( peliculaEditable: Object, slidingItem: IonItemSliding ) { 
      const modal = await this.modalCtrl.create({
        component: PeliculaEditableComponent,
        componentProps: {
          peliculaEditable
        }
      });
      modal.onDidDismiss().then(() => {
        this.cargarPeliculas()
      });
      modal.present();
      slidingItem.close()
    }
  }
  
  