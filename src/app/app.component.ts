import { Component, ViewChild } from '@angular/core';
import {Platform, AlertController, NavController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//PAGINAS
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TurismoPage } from '../pages/turismo/turismo';
import { FavoritosPage } from '../pages/favoritos/favoritos';
import { CompartirPage } from '../pages/compartir/compartir';

//SERVICIOS
import { UsuarioProvider } from '../providers/usuario/usuario';
import { UbicacionProvider } from '../providers/ubicacion/ubicacion';
import {PerfilPage} from "../pages/perfil/perfil";



@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild('NAV') nav:any;

  pagesUsuario: Array<{titulo:string, Component:any, icon:string}>;
  pagesAdmin: Array<{titulo:string, Component:any, icon:string}>;
  
  rootPage:any;
  pagePerfil: any = PerfilPage;

  constructor(	platform: Platform,
        		statusBar: StatusBar,
        		splashScreen: SplashScreen,
        		private _up:UsuarioProvider,
                private _ubicacion:UbicacionProvider,
                private alertCtrl: AlertController) {

    platform.ready().then(() => {

        this._up.cargarStorage().then(()=>{

            statusBar.styleDefault();
            splashScreen.hide();

            console.log(this._up.isLogin);

            if(this._up.isLogin === 'true'){
                this.rootPage = HomePage;
            }else{
                this.rootPage = LoginPage;
            }

        }).catch(()=>{
            alert("Error");
        });


      this.pagesUsuario = [
        {titulo:'TURISMO', Component: TurismoPage, icon:'book'},
        {titulo:'FAVORITOS', Component: FavoritosPage, icon:'heart'},
        {titulo:'COMPARTIR', Component: CompartirPage, icon:'share'}


      ];

      this.pagesAdmin = [
        
      ];

            
    });
  }


   goToPage(page){
    this.nav.setRoot(page);
  }

  salir(){

    let confirm = this.alertCtrl.create({
      title: 'Advertencia',
      message: '¿Seguro que deseas salir?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
              this._up.cerrarSession().then(()=>{
              this._up.cargarStorage();
              //this._ubicacion.detenerLocalizacion();
              this.nav.setRoot(LoginPage);
            });
          }
        }
      ]
    });

    confirm.present();
    
  }
}

