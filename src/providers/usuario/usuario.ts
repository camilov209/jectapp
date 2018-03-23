import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

//Storage
import { Storage } from '@ionic/storage';

@Injectable()
export class UsuarioProvider {

	clave:string = null;

  constructor(private afDB: AngularFireDatabase,
  			  private storage: Storage,
  			  private platform:Platform) {

  }

  verificarUsuario(usuario:string, clave:string){

    usuario = usuario.toLowerCase();
  	clave = clave.toLowerCase();

  	let promesa = new Promise((resolve, reject)=>{

  		this.afDB.list('/Usuarios/'+clave).valueChanges().subscribe(data=>{

  			if (data.length === 0) {
  				// DATOS INCORRECTOS
  				resolve(false);
  			}else{
  				//DATOS CORRECTOS
  				this.clave = clave;
  				this.guardarStorage();
  				resolve(true);
  			}

  		});

  	}).catch(error=>{
  		console.log("Error en Promesa Verifica Usuario: "+JSON.stringify(error));
  	})

  	return promesa

  }

  guardarStorage(){


  		let promesa = new Promise((resolve, reject)=>{

  			if (this.platform.is("cordova")) {
  				// Dispositivo Movil...
  				this.storage.set("clave", this.clave);
  			}else{
  				// Escritorio
  				if (this.clave) {
  					// code...
  					localStorage.setItem("clave", this.clave);
  				}else{
  					localStorage.removeItem("clave");
  				}
  				
  			}

  		});

  		return promesa;


  }


  cargarStorage(){

  	let promesa = new Promise((resolve, reject)=>{

  		if (this.platform.is("cordova")) {
  			// Dispositivo movil...
  			this.storage.ready()
  				.then(()=>{

  					//Leer del storage
  					this.storage.get("clave").then(clave=>{
  						this.clave = clave;
  						resolve();
  					});

  				});

  		}else{
  			// Escritorio
  			this.clave = localStorage.getItem("clave");
  			resolve();
  		}

  	});

  	return promesa;
  	
  }

  cerrarSession(){

    this.clave = null;
    this.guardarStorage();

  }

}
