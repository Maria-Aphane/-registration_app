import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { Alert, IonicPage, NavController, NavParams, AlertController,Loading,LoadingController} from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import {NgZone  } from '@angular/core';
import { Camera ,CameraOptions} from '@ionic-native/camera';
import { ProfileProvider } from './../../providers/profile/profile';
import 'firebase/database';
import firebase from 'firebase/app';
import 'firebase/auth';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private load:Loading;


  pictureData:any;
  mypicref:any;
  base64Image:any;
  photos:any
  pictureUrl :any;
 
 
  email:string;
  password:string;

  firstName:string;
  lastName:string;
  phoneNumber:string;

 


  constructor(public navCtrl: NavController,private navParams:NavParams,public alertCtrl:AlertController,
    public loadingCtrl:LoadingController,public zone:NgZone,
    private camera:Camera,private imagePicker:ImagePicker,private serviceAuth:AuthProvider,private profileService:ProfileProvider) {
      

      this.mypicref=firebase.storage().ref('/');
  
  }

  ChoosePhoto(){
    const options : CameraOptions = {
      quality:50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType:this.camera.PictureSourceType.SAVEDPHOTOALBUM
       
    }
    this.camera.getPicture(options) .then((imageData) => {
        this.pictureData = imageData;
        this.base64Image = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
        console.log(err);
      });
  }


    TakePhoto(){
      const options : CameraOptions = {
        quality:50, 
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        saveToPhotoAlbum:true
      }
      this.camera.getPicture(options) .then((imageData) => {
          this.base64Image = 'data:image/jpeg;base64,' + imageData;
          this.pictureData=this.base64Image
        }, (err) => {
          console.log(err);
        });
    }
    UserId() {
      var d = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
      return uuid;
    }

    SavePicture(){
      let loader = this.loadingCtrl.create({
        content: 'Please wait'
      })
      loader.present();
      this.mypicref.child(this.UserId())
      .putString(this.pictureData,'base64',{contentType:'image/png'})
      .then(savepic=>{
        this.pictureUrl=savepic.downloadURL
        if(this.pictureUrl!==''){
          loader.dismiss().then(()=>{
            alert('Picture was successfully uploaded')
          });
        
        }
      })
    }

    updateNames(firstName,lastName,phoneNumber){
      this.profileService.updateNames(this.firstName,this.lastName,this.phoneNumber);
     
    }

    SaveUserData(){
      if(this.firstName==='' || this.lastName===''){
        const alertName:Alert =this.alertCtrl.create({
          subTitle:'Please provide your names in full',
          buttons:[{
              text:'Cancel',
              role:'cancel'
            },
            {
              text:'ok',
              handler:data=>{
                
              }
            }]
          })
        alertName.present();
      }
      else{
        this.updateNames(this.firstName,this.lastName,this.phoneNumber);
        alert('Thank you! profile successfully setup..');
        
      }
        
    }


}
