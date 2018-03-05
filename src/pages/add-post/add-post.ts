import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController, LoadingController} from 'ionic-angular';
import { Post } from '../../model/post.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { PostsPage } from '../posts/posts';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the AddPostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-post',
  templateUrl: 'add-post.html',
})
export class AddPostPage {

  post? = { } as Post;
  userId : string ;

  constructor(public navCtrl: NavController, public navParams: NavParams,public afAuth:AngularFireAuth,
             public alertCtrl:AlertController, public loadingCtrl:LoadingController,public db:AngularFireDatabase) {
        this.afAuth.authState.subscribe(user =>{
          if(user) this.userId = user.uid;
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPostPage');
  }
   
  showAlert(titre, message) {
    let alert = this.alertCtrl.create({
      title: titre,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  addPost(post){
    let loading = this.loadingCtrl.create({
      content:"Enregistrement..."
    });
    loading.present();
    try{
      if(!this.userId) return ;
      post.userId = this.userId;
      this.db.list('posts/').push(post).then( ()=>{
        this.navCtrl.push(PostsPage);
      })
      loading.dismiss();
    }catch(e){
      this.showAlert('Erreur','Impossible de se sauvegarder vos informations');
      console.log(e);
      loading.dismiss();
    }
  }

  cancel(){
    this.navCtrl.push(PostsPage);
  }
}
