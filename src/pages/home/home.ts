import { Component } from '@angular/core';
import { NavController, ModalController  } from 'ionic-angular';

//Servicios
import { UbicacionProvider } from '../../providers/ubicacion/ubicacion';
import { UsuarioProvider } from '../../providers/usuario/usuario';

//Paginas
import { OrigenDestinoPage } from '../origen-destino/origen-destino';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	usuario:any={};

	location:any = {};
	lat: number = null;
	lng: number = null;

	styles = [
        {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        }
    ];

    markers: any[] = [
        {
            lat: 2.449655133356457,
            lng: -76.60494089126587,
            label:'Puente el Humilladero',
            description: 'El Puente del Humilladero, que con sus dos arcos cruza el río Molino, ' +
            'es una construcción de mampostería levantada en 1873 por Fray Serafín Barbetti. ',
            icon: 'assets/recursos/paradero_bus.png',
            img :
                [
                    'http://www.fronteras.com.co/sites/default/files/imagecache/Medium_600X450/sitio/Humilladero-4.jpg',
                    'http://www.fronteras.com.co/sites/default/files/imagecache/Medium_600X450/sitio/Humilladero-2.jpg',
                    'https://upload.wikimedia.org/wikipedia/commons/b/b2/Puente_del_Humilladero%2C_Popayán2.jpg',
                    'https://igx.4sqi.net/img/general/960x720/44252915_K_s1-RN08uXeRE9x1aZzKq4yeu3O1Y1Zr7WrYEVdliE.jpg'
                ]
        },
        {
            lat: 2.447768582456268,
            lng: -76.60758018493652,
            label:'Teatro Guillermo León Valencia',
            description: 'A una cuadra del Parque de Caldas, está el teatro Guillermo Valencia, inaugurado el 22 de ' +
            'Diciembre de 1927 con la presentación del Trovador de Verdi por la Compañía de Opera de Adolfo Bracale, ' +
            'y el tenor Hipólito Lázaro, es una de las joyas de la ciudad.',
            icon: 'assets/recursos/turismo.png',
            img :
                [
                    'http://popayanmas.co/sites/default/files/styles/lugares_w500_h350/public/lugares/teatroguillermovalencia_0.jpg?itok=sFAJhpVY',
                    'http://artemisa.unicauca.edu.co/~sicolpav/TeatroMun.jpg',
                    'data:image/jpeg;base64,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',
                    'https://photo620x400.mnstatic.com/0f44f05e1d6868ff0f4a6bd9da3488f3/teatro-guillermo-valencia.jpg'
                ]
        },
        {
            lat: 2.446632363019113,
            lng: -76.60517692565918,
            label:'Point 3',
            description: 'Descripcion del Hola',
            icon: 'assets/recursos/paradero_bus.png'
        },
        {
            lat: 2.448540353600142,
            lng: -76.60371780395508,
            label:'Point 4',
            description: 'Descripcion del Hola',
            icon: 'assets/recursos/paradero_bus.png'
        },
    ];

  constructor(	public navCtrl: NavController,
                private _ubicacion:UbicacionProvider,
              	private _up:UsuarioProvider,
                private modalCtrl: ModalController) {

  }

  ionViewDidLoad(){
      this._ubicacion.iniciarLocalizacion()
          .then(resp =>{

              console.log(resp);
              this.lat = resp.coords.latitude;
              this.lng = resp.coords.longitude;

              //this.markers.push({lat : this.lat, lng: this.lng, label: 'position', description: 'Aqui estoy'});
              this.markers.push({lat : this.lat, lng: this.lng, label: 'position', description: 'Aqui estoy'});

          })
          .catch(err => {
              console.log(err);
          })
  }

  abrirPage(){

    let modal = this.modalCtrl.create(OrigenDestinoPage);
    modal.present();

  }

    /*mapClicked($event) {
      console.log(event);
        this.markers.push({
            lat: $event.coords.lat,
            lng: $event.coords.lng,
            label: 'A',
            description: 'Hola'
        });

        console.log(this.markers);
    }*/

    clickedMarker(label: string, index: number) {
        console.log(`clicked the marker: ${label || index}`)

    }

    markerDragEnd(m, $event: MouseEvent) {
        console.log('dragEnd', m, $event);
    }







}
