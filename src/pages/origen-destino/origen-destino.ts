import { Component, NgZone, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';

import { FormControl } from "@angular/forms";
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';

@Component({
  selector: 'page-origen-destino',
  templateUrl: 'origen-destino.html',
})
export class OrigenDestinoPage {

	public latitude: number;
  	public longitude: number;
  	public searchControl: FormControl;
  	public zoom: number;

  	LatitudOrigen:number;
  	LatitudDestino:number;

  	LongitudOrigen:number;
  	LongitudDestino:number;

  	origen:string = "";
  	destino:string = "";



  	@ViewChild("search")
  	public searchElementRef;

  constructor(	public navCtrl: NavController, 
  				public navParams: NavParams,
  				private viewCtrl: ViewController,
  				private mapsAPILoader: MapsAPILoader,
                private ngZone: NgZone,
                private alertCtrl:AlertController) {

  	this.searchControl = new FormControl();
  }

  ionViewDidLoad() {

      //create search FormControl
      this.searchControl = new FormControl();

      //load Places Autocomplete
      this.mapsAPILoader.load().then(() => {
          let nativeHomeInputBox = document.getElementById('txtOrigen').getElementsByTagName('input')[0];
          let autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox, {
              types: ["address"]
          });
          autocomplete.addListener("place_changed", () => {
              this.ngZone.run(() => {
                  //get the place result
                  let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                  //verify result
                  if (place.geometry === undefined || place.geometry === null) {
                      return;
                  }

                  //set latitude, longitude and zoom
                  this.latitude = place.geometry.location.lat();
                  this.longitude = place.geometry.location.lng();

                  this.LatitudOrigen = this.latitude;
                  this.LongitudOrigen = this.longitude;

                  this.origen = "Correcto";


                  
              });
          });
      });


      this.mapsAPILoader.load().then(() => {
          let nativeHomeInputBox = document.getElementById('txtDestino').getElementsByTagName('input')[0];
          let autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox, {
              types: ["address"]
          });
          autocomplete.addListener("place_changed", () => {
              this.ngZone.run(() => {
                  //get the place result
                  let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                  //verify result
                  if (place.geometry === undefined || place.geometry === null) {
                      return;
                  }

                  //set latitude, longitude and zoom
                  this.latitude = place.geometry.location.lat();
                  this.longitude = place.geometry.location.lng();

                  this.LatitudDestino = this.latitude;
                  this.LongitudDestino = this.longitude;

                  this.destino = "Correcto";
            
              });
          });
      });
  }

  confirmar(){

  	if (this.LatitudOrigen === this.LatitudDestino || this.LongitudOrigen === this.LongitudDestino) {
  		console.log("UBICACIÓN ORIGEN ES IGUAL A LA UBICACIÓN DESTINO");

  		 let alert = this.alertCtrl.create({
		      title: 'Error',
		      subTitle: '¡La ubicación origen es igual a la ubicación destino!',
		      buttons: ['Aceptar']
		    });
		    alert.present();

			this.destino = "";

  	}else{

  		console.log("LAT ORIGEN: "+this.LatitudOrigen);
        console.log("LNG ORIGEN: "+this.LongitudOrigen);

        console.log("LAT DESTINO: "+this.LatitudDestino);
        console.log("LNG DESTINO: "+this.LongitudDestino);  	

    }

  }



}
