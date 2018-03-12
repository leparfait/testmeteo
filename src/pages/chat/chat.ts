import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
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
  userVendor : any;
  userId : string;
  message : string='';
  _chatSubscription: any;
  messages: object[] = [];
  users:any;

  constructor(public db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams,
              public afAuth:AngularFireAuth) {
        this.afAuth.authState.subscribe(user =>{
          if(user) this.userId = user.uid;
      });
    this.userVendor = this.navParams.get('userVendor');
  /*   this._chatSubscription = firebase.database().ref().child('chat').orderByChild('userId').equalTo(this.userVendor.userId,this.userId)
                              .on('value',snap=>{
                                const result = snap.val();
                                const keys  = Object.keys(result);
                                for(var i=0; i<keys.length ;i++){
                                    var k= keys[i];
                                    this.messages = result[k];
                                    console.log(this.messages);
                                }
   }); */ 
    this._chatSubscription = this.db.list('/chat').valueChanges().subscribe(data =>{
      this.messages = data;
    })
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
    /* this.db.list('/chat').push({
      specialMessage : true,
      info : '${this.username} has joined the room '
    }) */
  }

 sendMessage(){
    this.db.list('/chat').push({
      //username: this.username,
      message : this.message
    }).then( ()=>{

    })
    this.message = "";
  }
}
