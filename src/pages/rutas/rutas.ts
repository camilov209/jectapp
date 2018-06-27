import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {RutasProvider} from "../../providers/rutas/rutas";

//@IonicPage()
@Component({
  selector: 'page-rutas',
  templateUrl: 'rutas.html',
})
export class RutasPage {

  dataRuta: any[] = [];
  id_empresa = null;
  title: string = null;

  statusEmphy: boolean = null;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _ruta: RutasProvider) {

    this.id_empresa = this.navParams.get('_id');
    this.title = this.id_empresa;
  }

  ionViewDidLoad(){
    this.getAllRutas();
  }

  getAllRutas() {
      this._ruta.getAllRoutes().subscribe(
          (resp) => {


          for (let i = 0; i < resp.rutas.length; i++){
              if (resp.rutas[i].empresa.nombre === this.id_empresa){
                  this.dataRuta.push(resp.rutas[i]);
              }
          }
            this.statusEmphy = this.dataRuta.length === 0;

      }, (error => {
          console.log(error);
      }));
  }

    cambioColorRuta(empresa){
        switch (empresa){
            case 'Sotracauca Mettro':
                return 'danger';
            case 'Rápido Tambo':
                return 'secondary';
            case 'Transpubenza':
                return 'primary';
            case 'Translibertad':
                return 'advertence';
        }
    }

}
