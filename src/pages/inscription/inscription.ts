import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PhotoProfilPage } from '../photo-profil/photo-profil';
import { User } from '../../model/user.model';
import { InscriptionService } from '../../service/inscription.service';

/**
 * Generated class for the InscriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 
@IonicPage()
@Component({
  selector: 'page-inscription',
  templateUrl: 'inscription.html',
})
export class InscriptionPage {

    user : User;
    nom: string;
    login: string;
    email: string;
    password : string;
    ville: string;
    numero: number;
    photo: any;
    isAdmin: boolean; 
 
    result: any;
    

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public inscriptonService : InscriptionService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InscriptionPage');
  }

  onInscription(){
   this.user.nom = this.nom;
   this.user.email = this.email;
   this.user.login = this.login;
   this.user.password = this.password;
   this.user.ville = this.ville;
   this.user.numero = this.numero;
   this.user.isAdmin = false;
  // this.user.photo = this.photo
  try{
      this.result = this.inscriptonService.inscription(this.user);
  }catch(e){
    console.log(e);
  }
   if(this.result)  this.navCtrl.push(PhotoProfilPage);

  }
  
}
