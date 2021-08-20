import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Detalles } from '../../interfaces/interfaces';
import { DataLocalService } from '../../services/data-local.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-pelicula-editable',
  templateUrl: './pelicula-editable.component.html',
  styleUrls: ['./pelicula-editable.component.scss'],
})
export class PeliculaEditableComponent implements OnInit {
  
  @Input() peliculaEditable: Detalles

  peliculas: Detalles[] = [];

  peliculasEditadas: Detalles[] = [];
  
  constructor(
    private modalCtrl: ModalController,
    private dataLocal: DataLocalService,
    private storage: Storage,

    ) { 
    }
    
    async ngOnInit() {
      this.peliculas = await this.dataLocal.cargarPelicula()
    }
    
    back() {
      this.modalCtrl.dismiss();
    }
    
    guardar () { 

      this.peliculas.filter(obj => {
         if (obj.id === this.peliculaEditable.id) {
           obj = this.peliculaEditable
         }
         this.peliculasEditadas.push(obj)
      })

      this.storage.set( 'peliculas', this.peliculasEditadas ); 
      this.modalCtrl.dismiss();
    }
    
  }
  