import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

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
 
  username : string='';
  message : string='';
  _chatSubscription: any;
  messages: object[] = [];

  constructor(public db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    
    this.username = this.navParams.get('username');
    this._chatSubscription = this.db.list('/chat').valueChanges().subscribe(data =>{
      this.messages = data;
    })
  }

  ionViewWillLeave(){
   console.log('user is about to go');
   this._chatSubscription.unsubscribe();
   this.db.list('/chat').push({
    specialMessage : true,
    info : '${this.username} has left the room '
  })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
    this.db.list('/chat').push({
      specialMessage : true,
      info : '${this.username} has joined the room '
    })
  }

 sendMessage(){
    this.db.list('/chat').push({
      username: this.username,
      message : this.message
    }).then( ()=>{

    })
  }
}
