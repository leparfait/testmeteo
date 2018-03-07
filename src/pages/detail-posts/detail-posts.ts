import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Post } from '../../model/post.model';
import { SocialSharing } from '@ionic-native/social-sharing';
import { CallNumber } from '@ionic-native/call-number';
import { User } from 'firebase';


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
  user? : any;
  link? : string = null;
  constructor(public navCtrl: NavController, public navParams: NavParams,private socialSharing: SocialSharing,
              private callNumber: CallNumber) {
    this.post = this.navParams.get('post');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPostsPage');
  }

  chatWithVendor(){

  }

  share(){
   this.socialSharing.share(this.post.nom+':'+this.post.description,this.post.nom+'a vendre',this.post.imageUrl,this.link)
   .then(()=>{

   }).catch(()=>{

   });

  }

  callVendor(){
    this.callNumber.callNumber("18001010101", true)
  .then(() => console.log('Launched dialer!'))
  .catch(() => console.log('Error launching dialer'));
  }
}
