import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

//Storage
import { Storage } from '@ionic/storage';

@Injectable()
export class UsuarioProvider {

	clave:any = null;
  name:any = null;
  username:any = null;
  email:any = null;
  password:any = null;
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

        console.log(data);

  			if (data == null) {
          //DATOS INCORRECTOS
          resolve(false);
        }else{

          claveConfirmada = data[3];

          if (claveConfirmada === clave) {
            // USUARIO Y CLAVE CORRECTA
            this.email = data[0];
            this.name = data[1];
            this.clave = data[3];
            this.username = usuario;
            this.logueado = "true";

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


  		let promesa = new Promise((resolve, reject)=>{

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

            this.storage.get("name").then(name=>{
              this.name = name;
              resolve();
            });

            this.storage.get("username").then(username=>{
              this.username = username;
              resolve();
            });

            this.storage.get("email").then(email=>{
              this.email = email;
              resolve();
            });

            this.storage.get("logueado").then(logueado=>{
              this.logueado = logueado;
              resolve();
            });

  				});

  		}else{
  			// Escritorio
  			this.clave = localStorage.getItem("clave");
        this.clave = localStorage.getItem("name");
        this.clave = localStorage.getItem("username");
        this.clave = localStorage.getItem("email");
        this.clave = localStorage.getItem("logueado");


  			resolve();
  		}

  	});

  	return promesa;
  	
  }

  cerrarSession(){

    this.clave = null;
    this.name = null;
    this.username = null;
    this.email = null;
    this.logueado = null;
    this.guardarStorage();

  }

}
