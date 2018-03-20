import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UbicacionProvider } from '../../providers/ubicacion/ubicacion';
import { UsuarioProvider } from '../../providers/usuario/usuario';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	usuario:any={};

  constructor(public navCtrl: NavController,
  				    private _ubicacion:UbicacionProvider,
              private _up:UsuarioProvider) {

  	this._ubicacion.iniciarLocalizacion();
  	this._ubicacion.usuario.valueChanges().subscribe((data)=>{
  		this.usuario = data;
  	});

  }

  salir(){
    this._up.cerrarSession();
    this._ubicacion.detenerLocalizacion();
    this.navCtrl.setRoot("LoginPage");
  }

}
