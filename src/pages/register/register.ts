import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'
import { User } from '../../model/user.model';
import { InscriptionPage } from '../inscription/inscription';
import { authService } from '../../service/auth.service';

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
  userId: string;
  user = {} as User

  constructor(private afauth: AngularFireAuth, public navCtrl: NavController,public authService:authService,
              public navParams: NavParams,public alertCtrl: AlertController,public loadingCtrl:LoadingController,
              public afAuth:AngularFireAuth) {
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
       if(result){
        this.navCtrl.push(InscriptionPage);
      }
    }catch(e){
      this.showAlert('Erreur','Impossible d\'enregistrer ce compte');
      console.error(e);
      user.email = "";
      user.password = "";
    }
  }

  createWithGoogle(){
   //chargement
   let loader = this.loadingCtrl.create({
    content: "Connexion...",
    duration: 3000
  });
   loader.present();

   //connexion
  try{
    const result = this.authService.loginWithGoogle();
    this.afAuth.authState.subscribe(user =>{
      if(user){
        this.userId = user.uid;
        this.navCtrl.push(InscriptionPage);
        loader.dismiss();
   }
  });   
}catch(e){
    this.showAlert('Erreur','Impossible d\'enregistrer ce compte');
    loader.dismiss();
    console.log(e);
    /* user.email = "";
    user.password = ""; */
  }    
}

  createWithFacebook(){
      //chargement
   let loader = this.loadingCtrl.create({
    content: "Connexion...",
    duration: 3000
  });
   loader.present();

   //connexion
  try{
    const result = this.authService.loginWithFacebook();
    this.afAuth.authState.subscribe(user =>{
      if(user){
        this.userId = user.uid;
        this.navCtrl.push(InscriptionPage);
        loader.dismiss();
   }
  });   
}catch(e){
    this.showAlert('Erreur','Impossible d\'enregistrer ce compte');
    loader.dismiss();
    console.log(e);
    /* user.email = "";
    user.password = ""; */
  }    
}

}
