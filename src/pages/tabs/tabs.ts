import { Component } from '@angular/core';
import { ContactPage } from '../contact/contact';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { PostsPage } from '../posts/posts';
import { InscriptionPage } from '../inscription/inscription';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = PostsPage;
  tab2Root = InscriptionPage//AboutPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
