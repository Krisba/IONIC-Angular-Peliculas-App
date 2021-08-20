import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from 'src/model/usuario.model';
import { map } from 'rxjs/operators'
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts';
  
  private apiKey = 'AIzaSyCyqPebJL-OCRHvJKifBVwyLGO2uxCYsyo'
  
  userToken: string;
  
  constructor(
    private http: HttpClient,
    private navCtrl: NavController
    ) {
    this.leerToken();
    this.isAuth();
   }
    
   
    registro(usuario: UsuarioModel) {
      const authData = {
        ...usuario,
        returnSecureToken: true
      };
      
      return this.http.post(
        `${this.url}:signUp?key=${this.apiKey}`,
        authData).pipe( map( res => {
          this.guardarToken( res['idToken'])  
          return res;  
        }))
      }
      
      logIn(usuario: UsuarioModel) {
        const authData = {
          ...usuario,
          returnSecureToken: true
        };
        
        return this.http.post(
          `${this.url}:signInWithPassword?key=${this.apiKey}`,
          authData).pipe( map( res => {
            this.guardarToken( res['idToken'] );
            return res;  
          }))
        }
        
        private guardarToken(idToken: string) {
          this.userToken = idToken;
          localStorage.setItem('token', idToken)

          let hoy = new Date();
          hoy.setSeconds( 3600 );

          localStorage.setItem('expira', hoy.getTime().toString())
        }
        
        leerToken() {
          if (localStorage.getItem('token')) {
            this.userToken = localStorage.getItem('token');
          } else {
            this.userToken = '';
          }
          return this.userToken;
        }

        isAuth() : boolean {
          const expira = Number(localStorage.getItem('expira'));
          const expiraDate = new Date();
          expiraDate.setTime(expira);

          if ( localStorage.getItem('token') && expiraDate > new Date() ) {
            return true;
          } else {
            this.navCtrl.navigateRoot('/login');
            return false;
          }  
        }
        
        logOut() {
          localStorage.removeItem('token');
          localStorage.removeItem('expira');
        }
        
      }
      
      
      