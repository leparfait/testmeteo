import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Post } from '../../model/post.model';
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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.post = this.navParams.get('post');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPostsPage');
  }

  chatWithVendor(){

  }
}
