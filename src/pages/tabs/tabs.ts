import { Component } from '@angular/core';
//import { ContactPage } from '../contact/contact';
import { PostsPage } from '../posts/posts';
import { MyPostPage } from '../my-post/my-post';
import { AboutPage } from '../about/about';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = PostsPage;
  tab2Root = MyPostPage//AboutPage;
  tab3Root = AboutPage;

  constructor() {

  }
}
