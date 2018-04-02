import { Component } from '@angular/core';
import { NavController, ModalController  } from 'ionic-angular';
import { UbicacionProvider } from '../../providers/ubicacion/ubicacion';
import { UsuarioProvider } from '../../providers/usuario/usuario';

//Paginas
import { LoginPage } from '../login/login';
import { OrigenDestinoPage } from '../origen-destino/origen-destino';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	usuario:any={};

  constructor(	public navCtrl: NavController,
  				      private _ubicacion:UbicacionProvider,
              	private _up:UsuarioProvider,
                private modalCtrl: ModalController) {

    this._ubicacion.iniciarLocalizacion(this._up.username);
    this._ubicacion.usuario.valueChanges().subscribe(data=>{
    	this.usuario = data;
    });
  }

  abrirPage(){

    let modal = this.modalCtrl.create(OrigenDestinoPage);
    modal.present();

  }

}
