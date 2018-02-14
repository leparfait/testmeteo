import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EmailregisterPage } from '../pages/emailregister/emailregister';
import { FacebookRegisterPage } from '../pages/facebook-register/facebook-register';
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';
import { ChatPage } from '../pages/chat/chat';
import { PostsPage } from '../pages/posts/posts';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';



var config = {
  apiKey: "AIzaSyCEZVWh4AGBG1uTFbJQFQxekvfTjb6e258",
  authDomain: "blackmarket-3477c.firebaseapp.com",
  databaseURL: "https://blackmarket-3477c.firebaseio.com",
  projectId: "blackmarket-3477c",
  storageBucket: "blackmarket-3477c.appspot.com",
  messagingSenderId: "135274673331"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,LoginPage,RegisterPage,EmailregisterPage,FacebookRegisterPage,ChatPage,PostsPage,
    ContactPage,
    HomePage,
    TabsPage,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config),
    IonicModule.forRoot(MyApp),    
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,LoginPage,RegisterPage,EmailregisterPage,FacebookRegisterPage,ChatPage,PostsPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}