import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Post } from '../../model/post.model';
import { AddPostPage } from '../add-post/add-post';
import { DetailPostsPage } from '../detail-posts/detail-posts';
import * as firebase from 'firebase';
import { Network } from '@ionic-native/network';



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
  posts : Array<any> = [];
  userId: string;
  profil : any;
  userVendor : any;
  _chatSubscription : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public afAuth:AngularFireAuth,
              public modalCtrl: ModalController,public alertCtrl: AlertController,
              private toast: ToastController, private network: Network,) {

    this.userVendor =  this.navParams.get('userVendor');
    this.afAuth.authState.subscribe(user =>{
      if(user){
        this.userId = user.uid;
        this.getAllPost();
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

/*       recuperation de tous les publications valides
 */    
      getAllPost(){
        firebase.database().ref().child('posts').orderByChild('status').equalTo(true).on('value',snap=>{
          const result = snap.val();
          const keys  = Object.keys(result);
           for(var i=0; i<keys.length ;i++){
              var k= keys[i];
              this.posts[i] = result[k];
              }
         });     
      }

      postSelected(post){
       this.navCtrl.push(DetailPostsPage, {post:post})
      }
  
      // fonction de recherche d'une publication
      searchPost(event: any){
         // Reset items back to all of the items
        this.getAllPost();
    
        // set val to the value of the searchbar
        let val = event.target.value;
    
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
          this.posts = this.posts.filter((post) => {
            return (post.categorie.toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
        }
     }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostsPage');
    let networkType = this.network.type;
    this.toast.create({
      message: 'Vous etes',
      cssClass:'toast',
      showCloseButton:true,
      position:"top",
      duration: 8000,
    }).present();
  
  }

  displayNetworkUpdate(connectionState: string){
    let networkType = this.network.type;
    this.toast.create({
      message: 'Vous etes',
      cssClass:'toast',
      showCloseButton:true,
      position:"top",
      duration: 8000,
    }).present();
  }
  
  ionViewDidEnter() {
    this.network.onConnect().subscribe(data => {
      console.log(data)
      this.displayNetworkUpdate(data.type);
    }, error => console.error(error));
   
    this.network.onDisconnect().subscribe(data => {
      console.log(data)
      this.displayNetworkUpdate(data.type);
    }, error => console.error(error));
  }

}
