import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
//import { storage } from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { PostsPage } from '../posts/posts';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as firebase from 'firebase';
import { Upload } from '../../model/image.model';
import { UploadService } from '../../service/upload.service';
import { Profil} from '../../model/profil.model'


/**
 * Generated class for the InscriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 
@IonicPage()
@Component({
  selector: 'page-inscription',
  templateUrl: 'inscription.html',
})
export class InscriptionPage {
  imageSrc: string;
  imageUrl: string;
  userId: string;
  profil = { } as Profil;

  private uploadTask : firebase.storage.UploadTask;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,
              public afAuth : AngularFireAuth, public db:AngularFireDatabase,private loadingCtrl:LoadingController,
              private camera: Camera, private uploadService:UploadService) {
                
                this.afAuth.authState.subscribe(user =>{
                  if(user) this.userId = user.uid;
              })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InscriptionPage');
  }

  showAlert(titre, message) {
    let alert = this.alertCtrl.create({
      title: titre,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  saveProfil(profil: Profil){
    let loading = this.loadingCtrl.create({
      content:"Enregistrement..."
    });
    loading.present();
    try{
      if(!this.userId) return ;
      profil.userId = this.userId;
      profil.imageUrl = this.imageUrl;
      this.db.list('profileUser/').push(profil).then( ()=>{
        this.navCtrl.push(PostsPage);
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
          destinationType : this.camera.DestinationType.FILE_URI,
          encodingType : this.camera.EncodingType.JPEG,
          mediaType : this.camera.MediaType.PICTURE,
          sourceType : this.camera.PictureSourceType.CAMERA,
          allowEdit: true,
          targetWidth :320,
          targetHeight: 240
        }
        const options2:CameraOptions = {
         quality:50,
         destinationType : this.camera.DestinationType.FILE_URI,
         encodingType : this.camera.EncodingType.JPEG,
         mediaType : this.camera.MediaType.PICTURE,
         sourceType : this.camera.PictureSourceType.PHOTOLIBRARY,
         allowEdit: true,
         targetWidth :320,
         targetHeight: 240
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
         this.imageSrc = 'data:image/jpeg;base64,'+data; // image format base64     
         this.uploadService.pushUploadString(this.imageSrc);
         this.imageUrl = this.uploadService.pictureUrl;

       }).catch(err=>{
         console.log(err);
       })
   }
}
