import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

//Storage
import { Storage } from '@ionic/storage';

@Injectable()
export class UsuarioProvider {

  usuario:any = {};

	clave:string = null;
  name:string = null;
  username:string = null;
  email:string = null;
  password:string = null;
  logueado:string = null;

  constructor(private afDB: AngularFireDatabase,
      			  private storage: Storage,
      			  private platform:Platform) {

  }

  createUser(nombres:string, usuario:string, zona:string, email:string, clave:string, notificacion:boolean){

    let promesa = new Promise ((resolve, reject)=>{

      this.afDB.list('/users/'+usuario).valueChanges().subscribe(data=>{

        if (data.length == 0) {
          // USERNAME DISPONIBLE
            let dataUser = {
               name: nombres,
               username: usuario,
               email:email,
               password:clave,
               notificacion: notificacion,
               lat:'2.4464798',
               lng:'-76.6008221'
             };

              this.afDB.object(`/users/${usuario}`).update(dataUser);
              resolve(true);
          
        }else{
          // USERNAME YA EXISTE
             resolve(false);
        }

      });

    });

    return promesa;

  }

  verifyUser(usuario:string){

     let promesa = new Promise ((resolve, reject)=>{

      this.afDB.list('/users/'+usuario).valueChanges().subscribe(data=>{

        if (data.length == 0) {
          // USERNAME DISPONIBLE
            resolve(false);
          
        }else{
          // USERNAME YA EXISTE
            resolve(true);
        }

      });

    });

    return promesa;

  }

  verifyEmail(email:string){

     let promesa = new Promise ((resolve, reject)=>{

       this.afDB.database.ref('/users').orderByChild('email').equalTo(email).once('value').then((res)=>{
           if (res.val() == null) {
             //Correo disponible
             resolve(false);
           }else{
             //Correo no disponible
             resolve(true);
           }
       });

    });

    return promesa;

  }


  login(usuario:string, clave:string){

    usuario = usuario.toLowerCase();
  	clave = clave.toLowerCase();

    let claveConfirmada;

  	let promesa = new Promise((resolve, reject)=>{

  		this.afDB.list('/users/'+usuario).valueChanges().subscribe(data=>{

  			if (data == null) {
          //DATOS INCORRECTOS
          resolve(false);
        }else{

          claveConfirmada = data[5];

          if (claveConfirmada === clave) {
            // USUARIO Y CLAVE CORRECTA
            this.email = data[0];
            this.name = data[3];
            this.clave = data[5];
            this.username = usuario;
            this.logueado = "true";
            this.usuario = data;
            this.guardarStorage();
            resolve(true);

          }else{

            //DATOS INCORRECTOS
            resolve(false);

          }

        }

  		});

  	}).catch(error=>{
  		console.log("Error en Promesa Verifica Usuario: "+JSON.stringify(error));
  	})

  	return promesa

  }

  guardarStorage(){


  			if (this.platform.is("cordova")) {
  				// Dispositivo Movil...
  				this.storage.set("clave", this.clave);
          this.storage.set("name", this.name);
          this.storage.set("username", this.username);
          this.storage.set("email", this.email);
          this.storage.set("logueado", this.logueado);


  			}else{
  				// Escritorio
  				if (this.clave) {
  					// code...
  					localStorage.setItem("clave", this.clave);
            localStorage.setItem("name", this.name);
            localStorage.setItem("username", this.username);
            localStorage.setItem("email", this.email);
            localStorage.setItem("logueado", this.logueado);


  				}else{
  					localStorage.removeItem("clave");
            localStorage.removeItem("name");
            localStorage.removeItem("username");
            localStorage.removeItem("email");
            localStorage.removeItem("logueado");

  				}
  				
  			}




  }


  cargarStorage(){  

  	let promesa = new Promise((resolve, reject)=>{

  		if (this.platform.is("cordova")) {
  			// Dispositivo movil...
  			this.storage.ready()
  				.then(()=>{

  					//Leer del storage
  					this.storage.get("clave").then(clave=>{
              if(clave){
                      this.clave = clave;
                    }
  					});

            this.storage.get("name").then(name=>{
              if (name) {
                this.name = name;
              }
            });

            this.storage.get("username").then(username=>{
              if (username) {
                this.username = username;
              }
            });

            this.storage.get("email").then(email=>{
              if (email) {
                this.email = email;
              }
            });

            this.storage.get("logueado").then(logueado=>{
              if (logueado) {
                this.logueado = logueado;
              }
              resolve();
            });

  				})

  		}else{
  			// Escritorio
  			this.clave = localStorage.getItem("clave");
        this.name = localStorage.getItem("name");
        this.username = localStorage.getItem("username");
        this.email = localStorage.getItem("email");
        this.logueado = localStorage.getItem("logueado");

  			
  		}
      resolve();

  	});

  	return promesa;
  	
  }

  cerrarSession(){

    let promesa = new Promise ((resolve, reject)=>{

      this.clave = null;
      this.name = null;
      this.username = null;
      this.email = null;
      this.logueado = null;
      this.guardarStorage();
      resolve();
    });

    return promesa;   

  }

}
