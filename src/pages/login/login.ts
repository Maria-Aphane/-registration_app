import { HomePage } from './../home/home';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { Alert,IonicPage, NavController, NavParams, Loading, AlertController, LoadingController } from 'ionic-angular';
import 'firebase/database';
import firebase from 'firebase/app';
import 'firebase/auth';
import { GooglePlus} from '@ionic-native/google-plus';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {


  
  private load:Loading;
  email:string;
  password:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
     public alertCtrl:AlertController,public loadCtrl:LoadingController,private serviceAuth:AuthProvider ,private googlePlus:GooglePlus) {

     }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }




  SignUp(){

    this.navCtrl.setRoot('SignUpPage');
  }

  loginWithGoogle(){

    this.googlePlus.login({
      'webClientId':'442090555486-jspjo6nfant09pv17tado60lfle5g2ds.apps.googleusercontent.com',
      'offline':true

    }).then(res=>{
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken)).then(suc=>{
        alert("Login success");
        this.navCtrl.push(HomePage);
        
      }).catch(ns=>{
        alert("Not success")
      })
    })
  }
  signIn(){
    if(!this.email && !this.password){
      
        }
        else{
          this.serviceAuth.signIn(this.email,this.password).then(authData=>{
            this.load.dismiss().then(()=>{

              this.navCtrl.push(HomePage)
            })
          },error=>{
             this.load.dismiss().then(()=>{
           const alert :Alert =this.alertCtrl.create({
             message:error.message,
             buttons:[{ text:'ok',role:'cancel'}]
           })
           alert.present()
          })
      })
       this.load=this.loadCtrl.create();
       this.load.present()
        }
   }

  
   forgotPassword(){
    
     this.navCtrl.setRoot('ResetPage');
     
   }

}
