import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

//Paginas
import { RegistroPage } from '../registro/registro';
import { OlvidoPassPage } from '../olvido-pass/olvido-pass';
import { HomePage } from '../home/home';

import { Facebook } from "@ionic-native/facebook";
import firebase from 'firebase';
import { GooglePlus } from "@ionic-native/google-plus";

//Servicio Usuario
import { UsuarioProvider } from '../../providers/usuario/usuario';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

    usuario: string = "";
    clave: string = "";
    homePage = HomePage;

  constructor(	public navCtrl: NavController, 
  				      public navParams: NavParams,
                private usuarioProvider:UsuarioProvider,
                private toastCtrl:ToastController,
                public facebook: Facebook,
                public googlePlus: GooglePlus ) {
  }

    ingresar() {

      this.usuarioProvider.login(this.usuario, this.clave).then((respuesta)=>{
      if (respuesta === false) {
          let toast = this.toastCtrl.create({
            message: 'Advertencia: Datos Incorrectos',
            duration: 4000
          });
        toast.present();
      }else{
        this.navCtrl.setRoot(HomePage);
        this.usuarioProvider.cargarStorage();
      }
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
}
