import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  username? : string;
  userVendor? : any;
  post? : any;
  userId : string;
  currentUser?:any;
  message : string='';
  _chatSubscription: any;
  messages: object[] = [];
  users:any;

  constructor(public db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams,
              public afAuth:AngularFireAuth) {
        this.afAuth.authState.subscribe(user =>{
          if(user) this.userId = user.uid;
            this.userVendor = this.navParams.get('userVendor');
            this.post = this.navParams.get('post');

             this._chatSubscription = this.db.list('/chat/'+this.post.userId+'_'+this.post.chatkey).valueChanges().subscribe(data =>{
      this.messages = data;
      console.log(data);
    });  
  });
   

  /*  firebase.database().ref().child('chat').orderByChild('chatkey').equalTo('W0w4VghcuHefDbwcF4POiRv3Ero26S8KwcuiuOPuOpQZyZz4v1ZcCs83').on('value',snap=>{
                                                  const result = snap.val();
                                                  const keys  = Object.keys(result);
                                                  for(var i=0; i<keys.length ;i++){
                                                      var k= keys[i];
                                                      this.messages = result[k];
                                                      console.log(this.messages);
                                                  }
                                              }); */ 
  
  }

  ionViewWillLeave(){
   console.log('user is about to go');
   /* this._chatSubscription.unsubscribe();
   this.db.list('/chat').push({
    specialMessage : true,
    info : '${this.username} has left the room '
  }) */
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  getProfilUser(){
    firebase.database().ref().child('profileUser').orderByChild('userId').equalTo(this.userId).on('value',snap=>{
      const result = snap.val();
      const keys  = Object.keys(result);
      for(var i=0; i<keys.length ;i++){
          var k= keys[i];
          this.currentUser = result[k];
          //console.log(this.userVendor);
      }
    }); 
  } 

 sendMessage(){
   //this.getProfilUser();
    this.db.list('/chat/'+this.post.userId+'_'+this.post.chatkey).push({
      //username: this.currentUser.nom,
      vendeurId:this.post.userId,
      acheteurId:this.userId,
      chatkey:this.post.userId+this.post.chatkey,
      message : this.message,
    }).then( ()=>{

    })
    this.message = "";
  }

  hack(val){
    return Array.from(val);
    }
}
