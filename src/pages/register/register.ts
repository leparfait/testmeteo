import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'
import { User } from '../../model/user.model';
import { InscriptionPage } from '../inscription/inscription';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User

  constructor(private afauth: AngularFireAuth, public navCtrl: NavController,
     public navParams: NavParams,public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  showAlert(titre, message) {
    let alert = this.alertCtrl.create({
      title: titre,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  async registerEmail( user:User){
    try{
       const result = await this.afauth.auth.createUserWithEmailAndPassword(user.email, user.password);
       console.log(result);
       if(result){
         this.navCtrl.setRoot('InscriptionPage');
       }
    }catch(e){
      this.showAlert('Erreur','Impossible d\'enregistrer ce compte');
      console.error(e);
      user.email = "";
      user.password = "";
    }
  }

}
