import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
import { UsuarioModel } from '../../../model/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  usuario: UsuarioModel
  
  @ViewChild('slides') slides: IonSlides

  @Input() avatarSel: string;

  fullPath: string;
  
  constructor(
    private navCtrl: NavController,
    private usuarioService: UsuarioService,
    ) { }
    
    ngOnInit() {
      this.usuario = new UsuarioModel()
    }
    
    ionViewDidEnter() {
      this.slides.lockSwipes(true);
    }
    
    login(fLogin: NgForm) {
      this.presentAlertCarga()
      Swal.showLoading();    
      if (fLogin.controls['email'].errors) {
        this.presentAlertEmail();
        return;
      } else if (fLogin.controls['password'].errors) {
        this.presentAlertPass();
        return;
      } else if (fLogin.valid) {
        this.usuarioService.logIn(this.usuario).subscribe( res => {
          Swal.close()
          this.navCtrl.navigateForward('main/tabs/tab-peliculas');
        }, (err) => {
          Swal.fire({
            icon: 'error',
            title: '<strong>Error al autenticar</u></strong>',
            html: err.error.error.message,
            backdrop: false,
            background: '#ececec',
            width: 250,
            heightAuto: true,
          })
        });
      } 
      
    }
    
    registro(fRegistro: NgForm) {     
      if (fRegistro.controls['email'].errors) {
        this.presentAlertEmail()
        return;
      } else if (fRegistro.controls['password'].errors) {
        this.presentAlertPass()
        return;
      } else if (fRegistro.controls['nombre'].errors) {
        this.presentAlertNombre()
        return;
      }
      this.presentAlertCarga()
      Swal.showLoading();
      this.usuarioService.registro(this.usuario).subscribe( res => {        
        Swal.close()
        this.back()
      }, (err) => {
        Swal.fire({
          icon: 'error',
          title: '<strong>Error al registrar</u></strong>',
          html: err.error.error.message,
          backdrop: false,
          background: '#ececec',
          width: 250,
          heightAuto: true,
        })
      });
    }
        
    next() {
      this.slides.lockSwipes(false)
      this.slides.slideNext()
      this.slides.lockSwipes(true)
      
    }
    
    back() {
      this.slides.lockSwipes(false)
      this.slides.slidePrev()
      this.slides.lockSwipes(true)
      
    }
    
    presentAlertEmail() {
      {
        Swal.fire({
          icon: 'error',
          title: '<strong>Error</u></strong>',
          html: '<h><big>Por favor, inserte un email válido</big></h>',
          backdrop: false,
          background: '#ececec',
          width: 250,
          heightAuto: true,
        });
      }
    }
    
    presentAlertNombre() {
      {
        Swal.fire({
          icon: 'error',
          title: '<strong>Error</u></strong>',
          html: '<h><big>Por favor, inserte un nombre válido</big></h>',
          backdrop: false,
          background: '#ececec',
          width: 250,
          heightAuto: true,
        });
      }
    }
    
    presentAlertPass() {
      {
        Swal.fire({
          icon: 'error',
          title: '<strong>Error</u></strong>',
          html: '<h><big>Por favor, inserte una contraseña válida</big></h>',
          backdrop: false,
          background: '#ececec',
          width: 250,
          heightAuto: true,
        });
      }
    }
    
    presentAlertCarga() {
      {
        Swal.fire({
          icon: 'info',
          html: '<h><big>Espere un momento por favor</big></h>',
          backdrop: false,
          background: '#ececec',
          width: 250,
          heightAuto: true,
        });
      }
    }

    GetChildData(avatar) {  
      this.usuario.avatar = "/assets/avatars/" + avatar
   }  
  
  }