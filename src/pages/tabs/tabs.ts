import { Component } from '@angular/core';
import { PostsPage } from '../posts/posts';
import { MyPostPage } from '../my-post/my-post';
import { AboutPage } from '../about/about';
import { StartTabPage } from '../start-tab/start-tab';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = StartTabPage;
  tab2Root = MyPostPage//AboutPage;
  tab3Root = AboutPage;

  constructor() {

  }
}
