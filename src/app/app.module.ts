import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UsuarioProvider } from '../providers/usuario/usuario';

//Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from '../config/firebase.config';

//Storage
import { IonicStorageModule } from '@ionic/storage';

//Geolocation
import { Geolocation } from '@ionic-native/geolocation';
import { UbicacionProvider } from '../providers/ubicacion/ubicacion';
import { AgmCoreModule } from '@agm/core';

//Facebook
import { Facebook } from '@ionic-native/facebook';

//Paginas
import { LoginPage } from '../pages/login/login';
import { RegistroPage } from '../pages/registro/registro';
import { OlvidoPassPage } from '../pages/olvido-pass/olvido-pass';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegistroPage,
    OlvidoPassPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot(),
      AgmCoreModule.forRoot({
        apiKey: 'AIzaSyDn71L32gHGhwYwFNlhWw4FElZWjlZpWcQ'
      })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegistroPage,
    OlvidoPassPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioProvider,
    AngularFireDatabase,
    Geolocation,
    UbicacionProvider,
    Facebook
  ]
})
export class AppModule {}
