import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PhotoProfilPage } from '../photo-profil/photo-profil';
import { User } from '../../model/user.model';
import { InscriptionService } from '../../service/inscription.service';
import { Profile } from '../../model/profil.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { PostsPage } from '../posts/posts';

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

  profile = { } as Profile;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public afAuth : AngularFireAuth, public db:AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InscriptionPage');
  }

  saveProfil(){
    this.afAuth.authState.take(1).subscribe(auth =>{
      this.db.object('user-profile/${auth.uid}').set(this.profile)
      .then(()=> this.navCtrl.setRoot(PostsPage));
    })
  }
  
}
