import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Post } from '../../model/post.model';
import { SocialSharing } from '@ionic-native/social-sharing';
import { CallNumber } from '@ionic-native/call-number';
import { User } from 'firebase';
import { ChatPage } from '../chat/chat';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';


/**
 * Generated class for the DetailPostsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-posts',
  templateUrl: 'detail-posts.html',
})
export class DetailPostsPage {
  post? : Post;
  userId: any;
  users? : any;
  userVendor?:any;
  link? : string = null;
  constructor(public navCtrl: NavController, public navParams: NavParams,private socialSharing: SocialSharing,
              private callNumber: CallNumber, public afAuth:AngularFireAuth) {
                this.post = this.navParams.get('post');
                this.afAuth.authState.subscribe(user =>{
                  if(user) this.userId = user.uid;
                  firebase.database().ref().child('profileUser').orderByChild('userId').equalTo(this.post.userId).on('value',snap=>{
                    const result = snap.val();
                    const keys  = Object.keys(result);
                    for(var i=0; i<keys.length ;i++){
                        var k= keys[i];
                        this.users = result[k];
                        console.log(this.users);
                    }
               });  
                  
            });
    console.log(this.post);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPostsPage');
  }

  chatWithVendor(){
   this.navCtrl.push(ChatPage,{post:this.post, userVendor:this.userVendor});
  }

  share(){
   this.socialSharing.share(this.post.nom+':'+this.post.description,this.post.nom+'a vendre',this.post.imageUrl,this.link)
   .then(()=>{

   }).catch(()=>{

   });

  }

  callVendor(){
    this.callNumber.callNumber(this.users.telephone, true)
  .then(() => console.log('Launched dialer!'))
  .catch(() => console.log('Error launching dialer'));
  }
}
