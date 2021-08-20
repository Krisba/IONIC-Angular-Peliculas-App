import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaMDB, Detalles, Creditos } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const URL = environment.url;
const apiKey = environment.apiKey;


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor( private http: HttpClient ) { }

  private ejecutarQuery<T> ( query: string ) {
    query = URL + query;
    query += `&api_key=${ apiKey }&language=es&include_image_language=es`    

    return this.http.get<T>( query );
  }

  getEstrenos() {
    const hoy = new Date();
    const ultimoDia = new Date( hoy.getFullYear(), hoy.getMonth() + 1, 0 ).getDate();
    const mes = hoy.getMonth() + 1
    let mesString; 

    if (mes < 10) {
      mesString = '0' + mes;
    } else {
      mesString = mes;
    }

    const inicio = `${ hoy.getFullYear() }-${ mesString }-01`
    const fin = `${ hoy.getFullYear() }-${ mesString }-${ ultimoDia }`

    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${ inicio }&primary_release_date.lte=${ fin }`);
  }

  getPopulares() {
    const query = '/discover/movie?sort_by=popularity.desc'
    return this.ejecutarQuery<RespuestaMDB>(query);
  }

  getDetalles( id: string ) {
    return this.ejecutarQuery<Detalles>(`/movie/${ id }?a=1`);
  }

  getCast( id: string ) {
    return this.ejecutarQuery<Creditos>(`/movie/${ id }/credits?a=1`);
  }

  buscarPeliculas(texto: string) {
    return this.ejecutarQuery(`/search/movie?query=${ texto }`);
  }


}
