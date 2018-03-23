import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//Paginas
import { RegistroPage } from '../registro/registro';
import { OlvidoPassPage } from '../olvido-pass/olvido-pass';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  usuario:string = "";
  clave:string = "";

  constructor(	public navCtrl: NavController, 
  				      public navParams: NavParams) {
  }

  ingresar(){



  }

  crearCuenta(){
    this.navCtrl.push(RegistroPage);
  }

  resetPass(){
  	this.navCtrl.push(OlvidoPassPage);
  }
 

}
