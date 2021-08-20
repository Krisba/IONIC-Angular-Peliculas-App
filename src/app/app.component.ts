import { Component } from '@angular/core';
import { Router, NavigationStart  } from '@angular/router';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  showHead: boolean = false;
  
  constructor(
    private router: Router,
    private usuarioService: UsuarioService
    ) {
      router.events.forEach((event) => {
        if (event instanceof NavigationStart) {
          if (event['url'] == '/login') {
            this.showHead = false;
          } else {
            this.showHead = true;
          }
        }
      });
     }

    navigate( page: string ) {
      this.router.navigate([page]);
    }
    
    logout() {
      this.usuarioService.logOut();
      this.router.navigate(['/login']);
    }

  }
  