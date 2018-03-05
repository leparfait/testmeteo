import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../../model/profil.model';

/**
 * Generated class for the UserSettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-setting',
  templateUrl: 'user-setting.html',
})
export class UserSettingPage {
   //userData: firebaseObjet<Profile>;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public afAuth : AngularFireAuth, public db:AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserSettingPage');
  }

}
