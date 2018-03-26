import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

//Paginas
import { RegistroPage } from '../registro/registro';
import { OlvidoPassPage } from '../olvido-pass/olvido-pass';

//Servicio Usuario
import { UsuarioProvider } from '../../providers/usuario/usuario';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  usuario:string = "";
  clave:string = "";

  constructor(	public navCtrl: NavController, 
  				      public navParams: NavParams,
                private usuarioProvider:UsuarioProvider,
                private toastCtrl:ToastController ) {
  }

  ingresar(){

    this.usuarioProvider.login(this.usuario, this.clave).then((respuesta)=>{
      if (respuesta) {
        // code...
      }else{

        let toast = this.toastCtrl.create({
          message: 'Advertencia: Datos Incorrectos',
          duration: 4000
        });

      toast.present();

      }
    });

  }

  crearCuenta(){
    this.navCtrl.push(RegistroPage);
  }

  resetPass(){
  	this.navCtrl.push(OlvidoPassPage);
  }
 

}
