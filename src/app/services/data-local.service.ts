import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Detalles } from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  
  peliculas: Detalles[] = [];
  
  constructor(
    private storage: Storage,
    private toastCtrl: ToastController
    ) {
      this.init();
    }
    
    async init() {
      await this.storage.create();
    }
    
    async presentToast( mensaje: string ) {
      const toast = await this.toastCtrl.create( {
        message: mensaje,
        duration: 1500,
        cssClass: 'toast',
        color: 'tertiary'
      });
      toast.present();
    }
    
    guardarPelicula( pelicula: Detalles ) {
      let existe = false;
      let mensaje = '';
      
      for ( const peli of this.peliculas ) {
        if ( peli.id === pelicula.id ) {
          existe = true;
          break;
        }
      }
      
      if ( existe ) {
        this.peliculas = this.peliculas.filter( peli => 
          peli.id !== pelicula.id
          );
          mensaje = 'Se ha quitado la película de favoritos'
        } else {
          this.peliculas.push( pelicula );
          mensaje = 'Se ha agregado la película a favoritos'
        }
        
        this.presentToast( mensaje )
        this.storage.set( 'peliculas', this.peliculas ); 

        return !existe
      }
      
      async cargarPelicula() {
        const peliculas = await this.storage.get('peliculas');
        this.peliculas = peliculas || [];
        return this.peliculas;
      }
      
      async checkPelicula( id ) {
        id = Number(id)
        
        await this.cargarPelicula();
        const existe = this.peliculas.find( peli =>
          peli.id === id
          );
          
          if ( existe ) {
            return true
          } else {
            return false
          }
        }
      }
      