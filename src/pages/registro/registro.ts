import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading, ToastController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//Firebase
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

//Paginas
import { LoginPage } from '../login/login'

@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

	myForm: FormGroup;
	nombres:string = "";
	usuario:string = "";
	zona:string = "";
	email:string = "";
	clave:string = "";
	notificacion:boolean;
	loading: Loading;
	

  constructor(	public navCtrl: NavController, 
  				public navParams: NavParams,
  				private afDB: AngularFireDatabase,
  				private loadingCtrl:LoadingController,
  				private alertCtrl:AlertController,
  				private toastCtrl:ToastController,
  				public formBuilder: FormBuilder) {

  	this.myForm = this.createMyForm();

  }

  	createLoader(message: string = "Cargando...") { 
     this.loading = this.loadingCtrl.create({
       content: message
     });
   }

   saveData(){

	this.nombres 		= 	this.myForm.value.nombre;
	this.usuario 		= 	this.myForm.value.usuario;
	this.zona 			= 	this.myForm.value.zona;
	this.email 			= 	this.myForm.value.email;
	this.clave 			= 	this.myForm.value.password;
	this.notificacion 	= 	this.myForm.value.notificacion;

    this.usuario = this.usuario.toLowerCase();
    this.email = this.email.toLowerCase();

  	let promesa = new Promise((resolve, reject)=>{

  		this.afDB.list('/users/'+this.usuario).valueChanges().subscribe(data=>{

  			if (data.length === 0) {
  				// USERNAME DISPONIBLE
				let usuario = {
			 		name: this.nombres,
			 		username: this.usuario,
			 		email:this.email,
			 		password:this.clave,
			 		notificacion: this.notificacion,
			 	};

			 	this.afDB.object(`/users/${this.usuario}`).update(usuario);
			 	let toast = this.toastCtrl.create({
					      message: 'Usuario creado exitosamente',
					      duration: 4000
					    });
				toast.present();
  				
  			}else{
  				// USERNAME YA EXISTE
  				console.log("USER NAME NO DISPONIBLE");
  			}

  			return promesa;

  		});

  	}).catch(error=>{
  		console.log("Error en Promesa Verifica Usuario: "+JSON.stringify(error));
  	});
  }



private createMyForm(){
    return this.formBuilder.group({
	      nombre: ['', [Validators.required, Validators.minLength(6)]],
	      usuario: ['', [Validators.required, Validators.minLength(6)]],
	      zona: ['', [Validators.required, Validators.minLength(6)]],
	      email: ['', [Validators.required, Validators.email]],
	      password: ['', [Validators.required, Validators.pattern(/^[a-z0-9_-]{6,18}$/)]],
	      notificacion:[true],
    });
  }

private limpiarDatos(){

	this.nombres = "";
	this.usuario = "";
	this.zona = "";
	this.email = "";
	this.clave = "";

	this.myForm.value.nombre 	= "";
	this.myForm.value.usuario 	= "";
	this.myForm.value.zona 		= "";
	this.myForm.value.email 	= "";
	this.myForm.value.password 	= "";
	this.myForm.value.notificacion 	= "";

  	}



}
