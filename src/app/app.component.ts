import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { AngularFireAuth } from 'angularfire2/auth';
import { PostsPage } from '../pages/posts/posts';
import { HomePage } from '../pages/home/home';

import { timer } from 'rxjs/Observable/timer';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { CacheService } from "ionic-cache";
import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  userId : string;
  tabsPage : TabsPage;

  showSplash = true;

  constructor(private toast: ToastController, private network: Network,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private afAuth:AngularFireAuth,
              private push: Push,cache: CacheService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      cache.setDefaultTTL(60 * 60 * 12);
 
      // Keep our cached results when device is offline!
      cache.setOfflineInvalidate(false);
      
      statusBar.styleDefault();
      splashScreen.hide();
      timer(3000).subscribe(()=>this.showSplash = false)
    });

    
    this.afAuth.authState.subscribe(user =>{
      if(user) {
        this.userId = user.uid;
        this.rootPage = TabsPage;
      }  
  });
     
    this.pushSetup();
  }

  displayNetworkUpdate(connectionState: string){
    let networkType = this.network.type;
    this.toast.create({
      message: `You are now ${connectionState} via ${networkType}`,
      duration: 3000
    }).present();
  }
  
  ionViewDidEnter() {
    this.network.onConnect().subscribe(data => {
      console.log(data)
      this.displayNetworkUpdate(data.type);
    }, error => console.error(error));
   
    this.network.onDisconnect().subscribe(data => {
      console.log(data)
      this.displayNetworkUpdate(data.type);
    }, error => console.error(error));
  }
  
  pushSetup(){
    const options: PushOptions = {
      android: {
        senderID:'135274673331'
      },
      ios: {
          alert: 'true',
          badge: true,
          sound: 'false'
      }
   };
   
   const pushObject: PushObject = this.push.init(options);
   
   
   pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
   
   pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
   
   pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }
}
