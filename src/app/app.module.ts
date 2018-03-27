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
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';
import { ChatPage } from '../pages/chat/chat';
import { PostsPage } from '../pages/posts/posts';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth'
import { InscriptionPage } from '../pages/inscription/inscription';
import { authService } from '../service/auth.service';
import { PostService } from '../service/post.service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AddPostPage } from '../pages/add-post/add-post';
import { DetailPostsPage } from '../pages/detail-posts/detail-posts';
import { UploadService } from '../service/upload.service';
import { SocialSharing } from '@ionic-native/social-sharing';
import { CallNumber } from '@ionic-native/call-number';
import { MyPostPage } from '../pages/my-post/my-post';
import { Push } from '@ionic-native/push';
import { CacheModule } from 'ionic-cache';
import { Network } from '@ionic-native/network';



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
    AboutPage,LoginPage,RegisterPage,MyPostPage,
    ChatPage,PostsPage,InscriptionPage,AddPostPage,DetailPostsPage,
    ContactPage,
    HomePage,
    TabsPage,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config),
    IonicModule.forRoot(MyApp),
    CacheModule.forRoot(),    
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,LoginPage,RegisterPage,ChatPage,
    PostsPage,InscriptionPage,AddPostPage,DetailPostsPage,MyPostPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,Push,Network,
    SplashScreen,authService,PostService,Camera,UploadService,SocialSharing,CallNumber,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
