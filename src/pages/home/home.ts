import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { User } from '../../model/user.model';
import { RegisterPage } from '../register/register';
import { AngularFireAuth } from 'angularfire2/auth';
import { PostsPage } from '../posts/posts';
import { authService } from '../../service/auth.service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user? = {} as User;
  userId : string;
  
  constructor(public navCtrl: NavController, public authService:authService,public loadingCtrl:LoadingController,
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
    //chargement 
    let loader = this.loadingCtrl.create({
      content: "Connexion...",
      duration: 3000
    });
     loader.present();
     // connexion
     try{
       const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
       this.afAuth.authState.subscribe(user =>{
        if(user){
          this.userId = user.uid;
          this.navCtrl.push(PostsPage);
          loader.dismiss();
     }
    });
     }catch(e){
       this.showAlert('Erreur','Impossible de se connecter à ce compte');
       loader.dismiss();
       console.log(e);
       /* user.email = "";
       user.password = ""; */
     }
  }

  //connexion avec une adresse gmail
  loginWithGoogle(){

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
          this.navCtrl.push(PostsPage);
          loader.dismiss();
     }
    });   
  }catch(e){
      this.showAlert('Erreur','Impossible de se connecter à ce compte');
      loader.dismiss();
      console.log(e);
      /* user.email = "";
      user.password = ""; */
    }    
}

  connexionFacebook(){

  }

}
