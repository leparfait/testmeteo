import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Post } from '../../model/post.model';
import { AddPostPage } from '../add-post/add-post';
import { DetailPostsPage } from '../detail-posts/detail-posts';

/**
 * Generated class for the PostsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-posts',
  templateUrl: 'posts.html',
})
export class PostsPage {
  posts : any;//object[] = []; // list d'objets
  userId: string;
  profil : any;
  _chatSubscription : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public afAuth:AngularFireAuth,
              public db: AngularFireDatabase,public modalCtrl: ModalController,public alertCtrl: AlertController) {
    this.afAuth.authState.subscribe(user =>{
      if(user){
        this.userId = user.uid;
         this._chatSubscription = this.db.list('/posts').valueChanges().subscribe(data =>{
          this.posts = data;
        })       
      } 
  });
   
  }
    showAlert(titre, message) {
        let alert = this.alertCtrl.create({
          title: titre,
          subTitle: message,
          buttons: ['OK']
        });
        alert.present();
      }
 /*  $scope = {
    autoplay: 2500,
    loop: false,
    speed: 1000,
    slidesPerView: 1,
    centeredSlides: true
  } */
      addPost() {
        let modal = this.modalCtrl.create(AddPostPage);
        modal.present();
      }

     

    /*   getPostsList(): AngularFireList<Post[]>{
        if(!this.userId) return ;
        this.posts = this.db.list('posts/'+ this.userId);
        return this.posts;
      } */

      getProfil(){
        if(!this.userId) return ;
        this.profil = this.db.list('profileUser/'+ this.userId);
        return this.profil;
      }

      postSelected(post){
       this.navCtrl.push(DetailPostsPage, {post:post})
      }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostsPage');
  }

}
