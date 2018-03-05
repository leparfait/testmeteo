import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { PostsPage } from '../posts/posts';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = PostsPage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
