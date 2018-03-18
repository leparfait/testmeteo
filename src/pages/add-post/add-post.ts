import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController, LoadingController, DateTime} from 'ionic-angular';
import { Post } from '../../model/post.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { PostsPage } from '../posts/posts';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Upload } from '../../model/image.model';
import { UploadService } from '../../service/upload.service';
import {Camera ,CameraOptions } from '@ionic-native/camera';
import { TabsPage } from '../tabs/tabs';
import { UidService } from '../../service/uid.service';

/**
 * Generated class for the AddPostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-post',
  templateUrl: 'add-post.html',
})
export class AddPostPage {

  post? = { } as Post;
  userId : string ;
  user? : any;
  imageUrl:any;
  imageSrc: string;
  userVendor? : any;


  constructor(public navCtrl: NavController, public navParams: NavParams,public afAuth:AngularFireAuth,
              public uploadService:UploadService, public alertCtrl:AlertController, public loadingCtrl:LoadingController,
              public db:AngularFireDatabase, public camera:Camera,public uidService:UidService) {
                
              this.getUsers();
         }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPostPage');
  }

   getUsers(){
    this.afAuth.authState.subscribe(user =>{
      this.user = user ;
      if(user) this.userId = user.uid;
       firebase.database().ref().child('profileUser').orderByChild('userId').equalTo(this.userId).on('value',snap=>{
           const result = snap.val();
           const keys  = Object.keys(result);
                          //console.log(keys);
           for(var i=0; i<keys.length ;i++){
               var k= keys[i];
               this.userVendor = result[k];
               console.log(this.userVendor);
           }
      })                      
  });
 }

  showAlert(titre, message) {
    let alert = this.alertCtrl.create({
      title: titre,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  // ajout d'une nouvelle publication
  addPost(post :Post){
    let loading = this.loadingCtrl.create({
      content:"Enregistrement..."
    });
    loading.present();
    try{
      if(!this.userId) return ;
      post.userId = this.userId;
      post.status = true;
      post.dateCreation = new Date().getTime();
      post.chatKey = this.uidService.uid();
      //this.showAlert('test',this.currentUpload.url);
      post.imageUrl = this.imageUrl;
      this.db.list('posts/').push(post).then( ()=>{
        this.navCtrl.push(PostsPage,{userVendor:this.userVendor});
      })
      loading.dismiss();
    }catch(e){
      this.showAlert('Erreur','Impossible de se sauvegarder vos informations');
      console.log(e);
      loading.dismiss();
    }
  }

  async onTakePicture(){
    try{
          const options1:CameraOptions = {
          quality:50,
          destinationType : this.camera.DestinationType.DATA_URL,
          encodingType : this.camera.EncodingType.JPEG,
          mediaType : this.camera.MediaType.PICTURE,
          sourceType : this.camera.PictureSourceType.CAMERA,
          allowEdit: true,
          targetWidth :320,
          targetHeight: 240
        }
        const options2:CameraOptions = {
         quality:50,
         destinationType : this.camera.DestinationType.DATA_URL,
         encodingType : this.camera.EncodingType.JPEG,
         mediaType : this.camera.MediaType.PICTURE,
         sourceType : this.camera.PictureSourceType.PHOTOLIBRARY,
         allowEdit: true,
       };
     
       let alert = this.alertCtrl.create({
         title:"Source",
         subTitle : "Choisir la source de l'image",
         buttons:[
           {text:'Camera',handler:()=>{this.takePicture(options1);}},
           {text:'Gallery',handler:()=>{this.takePicture(options2);}}
         ]
       })
        alert.present();
    }catch(e){
        console.log(e);
    }
    
   }
   
   takePicture(options){
     this.camera.getPicture(options).then(data=>{
     this.imageSrc = data;
     const storageRef = firebase.storage().ref();
     storageRef.child('/uploads/'+this.uidService.uid()).child('pink.JPEG').putString(this.imageSrc,'base64',{contentType:'image/JPEG'})
    .then(data=>{
      this.imageUrl = data.downloadURL;
   });                  

       }).catch(err=>{
         console.log(err);
       })
   } 


  cancel(){
    this.navCtrl.push(TabsPage);
  }
}
