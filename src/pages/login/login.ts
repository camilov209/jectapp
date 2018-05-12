import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';

//Paginas
import { RegistroPage } from '../registro/registro';
import { OlvidoPassPage } from '../olvido-pass/olvido-pass';
import { HomePage } from '../home/home';

import { Facebook } from "@ionic-native/facebook";
import firebase from 'firebase';
import { GooglePlus } from "@ionic-native/google-plus";

//Servicio Usuario
import { UsuarioProvider } from '../../providers/usuario/usuario';

//Modelo
import {Usuario} from '../../models/usuario.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

    usuario: Usuario[] = [];

    email: string = "";
    password: string = "";
    homePage = HomePage;

    loading;

  constructor(	public navCtrl: NavController, 
  				public navParams: NavParams,
                private usuarioProvider:UsuarioProvider,
                private toastCtrl:ToastController,
                public facebook: Facebook,
                public googlePlus: GooglePlus,
                private loadingCtrl: LoadingController,
                private alertCtrl: AlertController ) {
  }

    ingresar() {

      this.presentLoadingCustom();

      let newUsuario = new Usuario(null, this.email, this.password );

      this.usuarioProvider.login(newUsuario).subscribe((resp)=>{
          this.dismissLoadingCustom();
          this.navCtrl.setRoot(HomePage);
          this.usuarioProvider.cargarStorage();
      }, (error)=>{
          this.dismissLoadingCustom();
          this.presentAlert();
      });

    }

    crearCuenta() {
        this.navCtrl.push(RegistroPage);
    }

    resetPass() {
        this.navCtrl.push(OlvidoPassPage);
    }

    fbLogin(){
      this.facebook.login(['email']).then(res=>{
          const fc = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
          firebase.auth().signInWithCredential(fc).then(fs =>{
              this.usuarioProvider.createUserRedes(fs.displayName, fs.email, fs.uid)
          .then(()=>{
                this.navCtrl.setRoot(HomePage);
                this.usuarioProvider.cargarStorage();
              }).catch(()=>{
                  alert("Errir");
              })
          }).catch(ferr => {
              alert("Error al iniciar sesión");

          })

      }).catch(err=>{
            alert(JSON.stringify(err));
      });
    }

    googlePlusLogin(){
        this.googlePlus.login({
            'webClientId':'546951244739-sbg6m9m88joe1pr0s7l3nrjqoh6c08ak.apps.googleusercontent.com',
            'offline': true
        }).then(res=>{
            firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
                .then(suc=>{
                    alert("Login Succesfull");
                }).catch(ns=>{
                    alert("Not Successfull " + JSON.stringify(ns));
            })
        })
    }

    presentLoadingCustom() {
        this.loading = this.loadingCtrl.create({
            content: 'Iniciando sesión, por favor espere ...'
        });

        this.loading.present();
    }

    dismissLoadingCustom(){
        this.loading.dismiss();
    }

    presentAlert() {
        let alert = this.alertCtrl.create({
            title: 'Error al iniciar sesión',
            subTitle: 'Tus crendenciales no son correctas.',
            buttons: ['Aceptar']
        });
        alert.present();
    }
}


