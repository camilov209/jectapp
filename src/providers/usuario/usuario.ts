import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

//Storage
import { Storage } from '@ionic/storage';
import { Usuario } from '../../models/usuario.model' ;
import { HttpClient} from "@angular/common/http";
import {URL_SERVICIOS} from "../../config/config.mongodb";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class UsuarioProvider {

  usuario:Usuario[] = [];

  token:string = null;
  isLogin:string = "false";
  user = {
      role: null,
      google: null,
      _id: null,
      nombre: null,
      email: null,
      password: null,
      __v: null,
      img: null
  };



  /*clave:any = null;
  name:any = null;
  username:any = null;
  email:any = null;
  password:any = null;
  logueado:string = null;*/




  constructor(private afDB: AngularFireDatabase,
      			  private storage: Storage,
      			  private platform:Platform,
  private http:HttpClient) {

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
               lng:'-76.6008221',
               zona:zona
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


    createUserRedes(nombres:string, email:string, clave:string){

        let promesa = new Promise ((resolve, reject)=>{
            let dataUser = {
                name: nombres,
                username: '',
                email: email,
                password: clave,
                notificacion: true,
                lat: '2.4464798',
                lng: '-76.6008221',
                zona: ''
            };

            this.afDB.object(`/users/${clave}`).update(dataUser);
            /*this.logueado = "true";
            this.email = email;
            this.clave = clave;
            this.username = clave;
            this.name = nombres;*/

            this.guardarStorage();

            resolve();

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


  login(usuario:Usuario) {

      const url = URL_SERVICIOS + '/login';
      return this.http.post(url, usuario)
          .map((resp: any) => {
              this.token = resp.token;
              this.isLogin = "true";
              this.user = resp.usuario;
              this.guardarStorage();
              return true;
          }).catch(err => {
              return Observable.throw(err);
          });
  }

  guardarStorage(){
  			if (this.platform.is("cordova")) {
  				// Dispositivo Movil...
                this.storage.ready()
                    .then(()=>{
                        this.storage.set("token", this.token);
                        this.storage.set("isLogin", this.isLogin);
                        this.storage.set("user", this.user);
                    }).catch(()=>{
                        alert("Error al guardar los datos ");
                })
  			}else{
  				// Escritorio
                localStorage.setItem('token', this.token);
                localStorage.setItem('isLogin', this.isLogin);
                localStorage.setItem('user', JSON.stringify(this.user));
  			}
  }


  cargarStorage(){  

  	let promesa = new Promise((resolve, reject)=>{

  		if (this.platform.is("cordova")) {
  			// Dispositivo movil...
  			this.storage.ready()
  				.then(()=>{

  					//Leer del storage
                    this.storage.get("token").then(token =>{
                      if (token) {
                        this.token = token;
                      }
                    });

                    this.storage.get("isLogin").then(isLogin =>{
                      if (isLogin) {
                        this.isLogin = isLogin;
                      }
                    });

                    this.storage.get("user").then(user =>{
                      if (user) {
                          this.user= user;
                      }
                        resolve();
                    });

  				})

  		}else{
  			// Escritorio

            if (localStorage.getItem('token')){
                this.token = localStorage.getItem('token');
            }

            if (localStorage.getItem('isLogin')){
                this.isLogin = localStorage.getItem('isLogin');
            }

            if (localStorage.getItem('user')) {
                this.user = JSON.parse(localStorage.getItem('user'));
            }

            resolve();
  		}

  	    });

  	return promesa;
  	
  }

  cerrarSession(){

    let promesa = new Promise ((resolve, reject)=>{

        this.token = null;
        this.isLogin= "false";
        this.user = {
            role: null,
            google: null,
            _id: null,
            nombre: null,
            email: null,
            password: null,
            __v: null,
            img: null
        };
      this.guardarStorage();
      resolve();
    });

    return promesa;   

  }

}
