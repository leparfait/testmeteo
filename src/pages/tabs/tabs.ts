import { Component } from '@angular/core';
//import { ContactPage } from '../contact/contact';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { PostsPage } from '../posts/posts';
import { InscriptionPage } from '../inscription/inscription';
import { MyPostPage } from '../my-post/my-post';
import { RegisterPage } from '../register/register';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = PostsPage;
  tab2Root = InscriptionPage//AboutPage;
  tab3Root = MyPostPage;

  constructor() {

  }
}
