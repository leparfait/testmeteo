import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SuperTabs } from 'ionic2-super-tabs';
import { PostService } from '../../service/post.service';

/**
 * Generated class for the StartTabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-start-tab',
  templateUrl: 'start-tab.html',
})
export class StartTabPage {
  pages = [
    { pageName: 'PostsPage', title: 'Articles', icon: 'flame', id: 'postsTab'},
    { pageName: 'TrocPage', title: 'Troc', icon: 'flame', id: 'mypostsTab'},
    { pageName: 'DemandePage', title: 'besion', icon: 'flame', id: 'aboutTab'}
  ];
  selectedTab = 0;
 
  @ViewChild(SuperTabs) superTabs: SuperTabs;

  constructor(public navCtrl: NavController, public navParams: NavParams,public postService:PostService) {
  }

  onTabSelect(ev: any) {
      this.selectedTab = ev.index;
      this.superTabs.clearBadge(this.pages[ev.index].id);
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartTabPage');
  }

}
