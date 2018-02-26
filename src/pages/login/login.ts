import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ChatPage } from '../chat/chat';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  username:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
     public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  showAlert(title:string, message:string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

loginUser(){
  if(/^[a-zA-Z0-9]+$/.test(this.username)){
    this.navCtrl.push(ChatPage, {
      username : this.username
    });
    this.username = "";
  }else{
    this.showAlert('Erreur','Utilisateur invalide')
    this.username = "";
  }
}

}
