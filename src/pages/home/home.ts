import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { InscriptionPage } from '../inscription/inscription';
import { authService } from '../../service/auth.service';
import { User } from '../../model/user.model';
import { RegisterPage } from '../register/register';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user = { } as User;
  
  constructor(public navCtrl: NavController, public authService:authService,
  public afAuth: AngularFireAuth,public alertCtrl: AlertController) {

  }

  showAlert(titre, message) {
    let alert = this.alertCtrl.create({
      title: titre,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  inscription(){
    this.navCtrl.push(RegisterPage);
  }

  async connexion(user: User){
     try{
       const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
       console.log(result);
     }catch(e){
       this.showAlert('Erreur','Impossible de se connecter à ce compte');
       console.log(e);
       user.email = "";
       user.password = "";
     }
  }

  connexionFacebook(){

  }
  
  loginWithGoogle(){
    this.authService.loginWithGoogle();
  }

}
