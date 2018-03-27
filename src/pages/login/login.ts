import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

//Paginas
import { RegistroPage } from '../registro/registro';
import { OlvidoPassPage } from '../olvido-pass/olvido-pass';
import {Facebook} from "@ionic-native/facebook";
import firebase from 'firebase';
import {GooglePlus} from "@ionic-native/google-plus";

//Servicio Usuario
import { UsuarioProvider } from '../../providers/usuario/usuario';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

    usuario: string = "";
    clave: string = "";

<<<<<<< HEAD
    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public facebook: Facebook,
                public googlePlus: GooglePlus) {
    }
=======
  constructor(	public navCtrl: NavController, 
  				      public navParams: NavParams,
                private usuarioProvider:UsuarioProvider,
                private toastCtrl:ToastController ) {
  }
>>>>>>> JuanManuel

    ingresar() {
    }

<<<<<<< HEAD
    crearCuenta() {
        this.navCtrl.push(RegistroPage);
    }

    resetPass() {
        this.navCtrl.push(OlvidoPassPage);
    }
=======
    this.usuarioProvider.login(this.usuario, this.clave).then((respuesta)=>{
      if (respuesta) {
        // code...
      }else{

        let toast = this.toastCtrl.create({
          message: 'Advertencia: Datos Incorrectos',
          duration: 4000
        });

      toast.present();

      }
    });
>>>>>>> JuanManuel

    fbLogin(){
      this.facebook.login(['email']).then(res=>{
          const fc = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
          firebase.auth().signInWithCredential(fc).then(fs =>{
              alert("firebase sec");
          }).catch(ferr => {
              alert("firebase error ");
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
