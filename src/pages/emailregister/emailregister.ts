import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../model/user.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';


/**
 * Generated class for the EmailregisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-emailregister',
  templateUrl: 'emailregister.html',
})
export class EmailregisterPage {
  
  user = {} as User;
  constructor( private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmailregisterPage');
  }

  async loginEmail(user:User){
     try{
       const result = this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password);
       console.log(result);
       if(result){
         this.navCtrl.push(HomePage);
       }
     }
     catch(e){
       console.error(e);
     }
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }
}
