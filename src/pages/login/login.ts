import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { IonicPage, NavController, Slides, LoadingController, AlertController } from 'ionic-angular';

//SERVICIOS
import { UsuarioProvider } from '../../providers/usuario/usuario';

//PAGINAS
import { HomePage } from '../../pages/home/home';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements AfterViewInit {

	@ViewChild(Slides) slides: Slides;
	clave:string = "juan1";

  constructor(	public navCtrl: NavController, 
  				private _up:UsuarioProvider,
  				private loadinCtrl:LoadingController,
  				private alertCtrl:AlertController) {
  }

  	continuar(){
  		let loadind = this.loadinCtrl.create({
  			content:"Cargando ..."
  		});
  		loadind.present();
  		//VERIFICAR CLAVE
  		this._up.verificarUsuario(this.clave)
  			.then((valido)=>{

  				loadind.dismiss();
  				if (valido) {
  					// CONTINUAR A LA SIGUIENTE PANTALLA
  					this.slides.lockSwipes(false);
  					this.slides.slideNext();
  					this.slides.lockSwipes(true);

  				}else{
  					//DATOS INCORRECTOS
  					this.alertCtrl.create({
  						title:"Advertencia",
  						subTitle:"Datos Incorrectos.",
  						buttons:["Aceptar"]
  					}).present();
  				}
  			})
  			.catch(error=>{
  				loadind.dismiss();
  			})
  	}

	ingresar(){
		//CLAVE CORRECTA - IR AL HOME
		this.navCtrl.setRoot(HomePage);

	}

  ngAfterViewInit(){
  	this.slides.lockSwipes(true);
  	this.slides.freeMode = false;
  	this.slides.paginationType = "progress";
  }


  	

}
