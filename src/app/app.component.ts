import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase'



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
     
      statusBar.styleDefault();
      splashScreen.hide();
    });

    const unsubscribe= firebase.auth().onAuthStateChanged(user=>{
      if(!user){
        this.rootPage='LoginPage';
        unsubscribe();
      } else{
        this.rootPage='HomePage';
        unsubscribe();
      }
    })

  }
}

