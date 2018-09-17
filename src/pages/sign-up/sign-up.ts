import { HomePage } from './../home/home';
import { ImgHandlerProvider } from './../../providers/img-handler/img-handler';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { Alert, IonicPage, NavController, NavParams, AlertController,Loading,LoadingController} from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import {NgZone  } from '@angular/core';
import { Camera ,CameraOptions} from '@ionic-native/camera';
import 'firebase/database';
import firebase from 'firebase/app';
import 'firebase/auth';


@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  private load:Loading;
  afireauth:any;

  pictureData:any;
  mypicref:any;
  base64Image:any;
  photos:any
  pictureUrl :any;
 
 
  email:string;
  password:string;
 

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl:AlertController,
    public loadCtrl:LoadingController,public zone:NgZone,
    private camera:Camera,private imagePicker:ImagePicker,private serviceAuth:AuthProvider) {

      this.mypicref=firebase.storage().ref('/');
  
      
  }

  signUp(){
    if(!this.email && !this.password){
    console.log('Enter email and password')
    }else{
      this.serviceAuth.signUp(this.email, this.password)
      .then(authData=>{
        this.load.dismiss().then(()=>{
          this.navCtrl.push(HomePage)
        })
      },error=>{
        this.load.dismiss().then(()=>{
          const alert :Alert = this.alertCtrl.create({
            message:error.message,
            buttons:[{text:'ok',role: 'cancel'}]
          })
          alert.present();
        })
      })
      this.load=this.loadCtrl.create();
      this.load.present()
      }
      }


    
      back(){
        this.navCtrl.setRoot('LoginPage');
      }

    

  }

