import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AddPostPage } from '../add-post/add-post';
import { AngularFireAuth } from 'angularfire2/auth';
import { Post } from '../../model/post.model';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

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
  posts?: any;
  _chatSubscription?: any;
  userId?: string;
  users?: any;
  userVendor?:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,
              public afAuth:AngularFireAuth,public db:AngularFireDatabase) {
                this.afAuth.authState.subscribe(user =>{
                  if(user) this.userId = user.uid;
                  firebase.database().ref().child('profileUser').orderByChild('userId').equalTo(this.userId).on('value',snap=>{
                    const result = snap.val();
                    const keys  = Object.keys(result);
                    for(var i=0; i<keys.length ;i++){
                        var k= keys[i];
                        this.users = result[k];
                        console.log(this.users.nom);
                    }
               });  
                  
            });
              //this.getUserPost();
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
  getUserPost(){
    this.afAuth.authState.subscribe(user =>{
      if(user) this.userId = user.uid;
    firebase.database().ref().child('posts').orderByChild('userId').equalTo(this.userId).on('value',snap=>{
      const result = snap.val();
      const keys  = Object.keys(result);
      for(var i=0; i<keys.length ;i++){
          var k= keys[i];
          this.posts = result[k];
          console.log(this.posts);
      }
 }); 
})
}
}
