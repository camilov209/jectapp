import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { UsuarioProvider } from '../../providers/usuario/usuario';


@Injectable()
export class UbicacionProvider {

	 usuario: AngularFireObject<any>;
	 user:string = null;
	 private watch:any;

  constructor(	private geolocation:Geolocation,
  				private afDB: AngularFireDatabase,
  				private _up:UsuarioProvider) {

  	}

  iniciarLocalizacion(username:string){

    this.usuario = this.afDB.object('/users/'+username);

  	this.watch = this.geolocation.watchPosition()
		.subscribe((data) => {		

			 	console.log(data);

			 	this.usuario.update({
			 		lat:data.coords.latitude,
			 		lng:data.coords.longitude
			 	});
			 
		});

  }

  detenerLocalizacion(){
  	this.watch.unsubscribe();
  }

}
