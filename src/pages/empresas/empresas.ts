import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {RutasPage} from "../rutas/rutas";
import {EmpresaProvider} from "../../providers/empresa/empresa";
import {URL_SERVICIOS} from "../../config/config.mongodb";
import {HomePage} from "../home/home";

//@IonicPage()
@Component({
  selector: 'page-empresas',
  templateUrl: 'empresas.html',
})
export class EmpresasPage {

    dataEmpresa: any[] = [];
    url = URL_SERVICIOS + '/imagenes/empresa/';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _empresas: EmpresaProvider) {
  }

    ionViewDidLoad() {
        this.getAllEmpresas();
    }

    goToInfo(nombre_empresa){
        this.navCtrl.push(RutasPage, {_id : nombre_empresa});
    }

    getAllEmpresas(){
        this._empresas.getAllEmpresas().subscribe(resp=>{
            
            for (let i = 0; i < resp.empresas.length; i++){
                if (resp.empresas[i].tipo === 'TRANSPORT'){
                    this.dataEmpresa.push(resp.empresas[i]);
                }
            }
            console.log(this.dataEmpresa);
        }, (error =>{
            console.log(error);
        }));
    }

    home(){
        this.navCtrl.setRoot(HomePage);
    }

}
