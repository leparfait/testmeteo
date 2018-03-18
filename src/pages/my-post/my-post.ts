import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,ActionSheetController  } from 'ionic-angular';
import { AddPostPage } from '../add-post/add-post';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { ChatPage } from '../chat/chat';

/**
 * Generated class for the MyPostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-post',
  templateUrl: 'my-post.html',
})
export class MyPostPage {
  posts : Array<any> = [];
  _chatSubscription?: any;
  userId?: string;
  users?: any;
  userVendor?:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,
              public afAuth:AngularFireAuth,public db:AngularFireDatabase,public actionSheetCtrl: ActionSheetController) {
            this.afAuth.authState.subscribe(user =>{
                if(user) this.userId = user.uid;
                 firebase.database().ref().child('profileUser').orderByChild('userId').equalTo(this.userId).on('value',snap=>{
                    const result = snap.val();
                    const keys  = Object.keys(result);
                    for(var i=0; i<keys.length ;i++){
                        var k= keys[i];
                        this.users = result[k];
                        console.log(this.users);
                    }
               });  
                  
            });

          this.afAuth.authState.subscribe(user =>{
            if(user) this.userId = user.uid;
            firebase.database().ref().child('posts').orderByChild('userId').equalTo(this.userId).on('value',snap=>{
            const result = snap.val();
            const keys  = Object.keys(result);
             for(var i=0; i<keys.length ;i++){
                var k= keys[i];
                this.posts[i] = result[k];
                }
            console.log(this.posts);
           }); 
        })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPostPage');
  }

  addPost() {
    let modal = this.modalCtrl.create(AddPostPage);
    modal.present();
  } 

  changeStatus(post){

  }

  hack(val){
    for(var i=0; i<val.length ;i++){
      return val[i];
      }
  //return Array.from(val);
  }
  
  postSelected(post){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Actions',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Déja vendu',
          role: 'destructive',
          icon: 'md-checkmark-circle',
          cssClass: 'VenduIcon',
          handler: () => {
            this.db.list('posts/').update(post.status,'false');
            console.log('Delete clicked');
          }
        },
        {
          text: 'voir les messages',
          role: 'edit',
          icon: 'ios-chatbubbles',
          cssClass: 'EditionIcon',
          handler: () => {
            console.log('Share clicked');
            this.navCtrl.push(ChatPage,{post:post});
          }
        },
        {
          text: 'Quitter',
          role: 'cancel',
          icon: 'md-close',
          cssClass: 'EditionIcon',
          handler: () => {
            console.log('action cancel');
          }
        }

      ]
    });
    actionSheet.present();
  }

  deletePosts(posts){

  }

}
