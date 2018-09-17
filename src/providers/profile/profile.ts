import { Injectable } from '@angular/core';
import firebase, { User} from 'firebase/app';

import 'firebase/database';



@Injectable()
export class ProfileProvider {

  userProfile:firebase.database.Reference;
  currentUser:User;

  constructor() {

    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        this.currentUser=user;
        this.userProfile=firebase.database().ref(`/userProfile/${user.uid}`)
      }
    })
  }
  getUser():firebase.database.Reference{
    return this.userProfile;
  }

  updateNames(firstName:string,lastName:string,phoneNumber:string):Promise<any>{
     return this.userProfile.update({firstName,lastName,phoneNumber})
  }

 
}
