import { Injectable } from "@angular/core";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from "../model/user.model";


@Injectable()
 export class authService{
     
    constructor(private afAuth: AngularFireAuth){

    }

    loginWithGoogle(){
        this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    async registerEmail( user:User){
        try{
           const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
           console.log(result);
           user.email="";
           user.password="";
        }
        catch(e){
          console.error(e);
        }
      }

      async loginEmail(user:User){
        try{
          const result = this.afAuth.auth.signInWithEmailAndPassword(user.email , user.password);
          console.log(result);
        }
        catch(e){
          console.error(e);
        }
     }
   
 }