import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//PAGINAS
import { HomePage } from '../pages/home/home';

//SERVICIOS
import { UsuarioProvider } from '../providers/usuario/usuario';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(	platform: Platform, 
  				statusBar: StatusBar, 
  				splashScreen: SplashScreen,
  				private _up:UsuarioProvider) {

    platform.ready().then(() => {

    	this._up.cargarStorage().then(()=>{

    		if (this._up.clave) {
    			// code...
    			this.rootPage = HomePage;
    		}else{
    			this.rootPage ="LoginPage";
    		}

    		statusBar.styleDefault();
      		splashScreen.hide();

    	});
      
      

      
    });
  }
}

