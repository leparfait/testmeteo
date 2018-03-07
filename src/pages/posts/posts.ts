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

      addPost() {
        let modal = this.modalCtrl.create(AddPostPage);
        modal.present();
      } 
      getAllProfil(){
          this.afAuth.authState.subscribe(user =>{
            if(user){
              this.userId = user.uid;
               this._chatSubscription = this.db.list('/posts').valueChanges().subscribe(data =>{
                this.posts = data;
              })       
            } 
        });
      }

      getProfil(){
        if(!this.userId) return ;
        this.profil = this.db.list('profileUser/'+ this.userId);
        return this.profil;
      }

      postSelected(post){
       this.navCtrl.push(DetailPostsPage, {post:post})
      }
  
      // fonction de recherche d'une publication
      getPost(event: any){
         // Reset items back to all of the items
        this.getAllProfil();
    
        // set val to the value of the searchbar
        let val = event.target.value;
    
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
          this.posts = this.posts.filter((post) => {
            return (post.nom.toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
        }
     }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostsPage');
  }

}
