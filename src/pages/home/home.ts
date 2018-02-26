import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InscriptionPage } from '../inscription/inscription';
import { authService } from '../../service/auth.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public authService:authService) {

  }

  inscription(){
    this.navCtrl.push(InscriptionPage);
  }

  connexion(){

  }

  connexionFacebook(){

  }
  
  loginWithGoogle(){
    this.authService.loginWithGoogle();
  }

}
