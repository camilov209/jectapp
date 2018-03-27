import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//Paginas
import { HomePage } from '../home/home';

@Component({
  selector: 'page-turismo',
  templateUrl: 'turismo.html',
})
export class TurismoPage {

  constructor(	public navCtrl: NavController, 
  				public navParams: NavParams) {
  }


  home(){
  	this.navCtrl.setRoot(HomePage);
  }



}
