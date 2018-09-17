import { Injectable,NgZone  } from '@angular/core';
import 'firebase/database';
import firebase from 'firebase/app';
import 'firebase/auth';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { GooglePlus} from '@ionic-native/google-plus';

@Injectable()
export class AuthProvider {

  afireauth:any;
  nativepath: any;
  firestore = firebase.storage();
  ;



  constructor(private File:File,private filePath:FilePath,public filechooser:FileChooser,private googlePlus:GooglePlus) {

    
    console.log('Hello AuthProvider Provider');
  }

 

  signIn(email:string,password:string):Promise<any>{
    return firebase.auth().signInWithEmailAndPassword(email,password);
  }


 resetPassword(email:string):Promise<any>{
  return firebase.auth().sendPasswordResetEmail(email);
 }




  signOut():Promise<any>{
    const userId:string = firebase.auth().currentUser.uid;
    firebase.database().ref(`userProfile/${userId}`).off();
    return firebase.auth().signOut();
  }
  

  signUp(email:string,password:string):Promise <any>{
    return firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(newUserCreds=>{
      firebase.database().ref(`/userProfile/${newUserCreds.user.uid}/email`)
    .set(email);
    }).catch(error=>{
      throw new error (error);
    })
  }


 
 
}
