import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading, ToastController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//Firebase
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

//Paginas
import { LoginPage } from '../login/login'

//Servicio Usuario
import { UsuarioProvider } from '../../providers/usuario/usuario';

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
	existe:boolean = false;
	

  constructor(	public navCtrl: NavController, 
  				public navParams: NavParams,
  				private afDB: AngularFireDatabase,
  				private loadingCtrl:LoadingController,
  				private alertCtrl:AlertController,
  				private toastCtrl:ToastController,
  				public formBuilder: FormBuilder,
  				private usuarioProvider:UsuarioProvider) {

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

    this.usuarioProvider.createUser(this.nombres, this.usuario, this.zona, this.email, this.clave, this.notificacion).then((respuesta)=>{
    	if (respuesta) {
			let toast = this.toastCtrl.create({
		      message: 'Usuario creado',
		      duration: 3000
		    });
		  toast.present();
		  this.myForm.reset();

    	}else{
    		let toast = this.toastCtrl.create({
		      message: 'Usuario no disponible',
		      duration: 3000
		    });
		  toast.present();
		  this.existe = true;


    	}
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

}
