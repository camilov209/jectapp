import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-olvido-pass',
  templateUrl: 'olvido-pass.html',
})
export class OlvidoPassPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OlvidoPassPage');
  }

}
