import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-reset',
  templateUrl: 'reset.html',
})
export class ResetPage {

  email:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl:AlertController,private serviceAuth:AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPage');
  }

  resetPassword(){


    if(!this.email){
     console.log("enter email")
   
    }
    else{
      this.serviceAuth.resetPassword(this.email).then(user=>{
         const alert:Alert=this.alertCtrl.create({
           message:"check your email for the reset password link",
           buttons:[{text:'ok',
           role:'cancel',handler:()=>{
             this.navCtrl.pop()
           }
         }]
         })
         alert.present()
      },error=>{
        const errorAlert=this.alertCtrl.create({
         message:error.message,
         buttons:[{text:'ok',
         role:'cancel'}]
        })
        errorAlert.present()
      })
   
    }
  }
    

    back(){
      this.navCtrl.push('LoginPage');
    }
 



}
