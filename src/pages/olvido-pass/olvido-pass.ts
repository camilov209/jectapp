import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';


@Component({
  selector: 'page-olvido-pass',
  templateUrl: 'olvido-pass.html',
})
export class OlvidoPassPage {

	email: string;

  constructor(public navCtrl: NavController, 
  			public navParams: NavParams,
				public _usuarioService: UsuarioProvider,
				public alertCtrl: AlertController) {
  }


  recordarPass(email){
  	console.log(email);
  	this._usuarioService.rememberPass(email).subscribe(resp => {
  		console.log(resp);
  	}, error =>{
  		this.showAlert();
  	})	
	}
	
	showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: 'Correo no inválido o no registrado!',
      buttons: ['Aceptar']
    });
    alert.present();
  }





}
