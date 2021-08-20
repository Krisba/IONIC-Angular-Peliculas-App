import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Pelicula } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab-peliculas',
  templateUrl: 'tab-peliculas.page.html',
  styleUrls: ['tab-peliculas.page.scss']
})
export class TabPeliculasPage implements OnInit {

  peliculas: Pelicula[] = [];

  populares: Pelicula[] = [];

 
  constructor(
    private moviesService: MoviesService
    ) { }

  ngOnInit() {
    this.moviesService.getPopulares()
    .subscribe( resp => {
      this.peliculas = resp.results;
    });
  }

}
