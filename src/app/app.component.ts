import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { AngularFireAuth } from 'angularfire2/auth';
import { PostsPage } from '../pages/posts/posts';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  userId : string;
  tabsPage : TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private afAuth:AngularFireAuth) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    
    this.afAuth.authState.subscribe(user =>{
      if(user) {
        this.userId = user.uid;
        this.rootPage = TabsPage;
      }  
  });

  }
  
}
