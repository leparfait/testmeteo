import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { storage } from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { PostsPage } from '../posts/posts';
import { Camera, CameraOptions } from '@ionic-native/camera';

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

  userId: string;
  nom : string='';
  ville : string='';
  numero : number ;
  photo : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,
              public afAuth : AngularFireAuth, public db:AngularFireDatabase,private loadingCtrl:LoadingController,
              private camera: Camera) {
                
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

  saveProfil(){
    let loading = this.loadingCtrl.create({
      content:"Enregistrement..."
    });
    loading.present();
    try{
      if(!this.userId) return ;
      this.db.list('profileUser/').push({
        userId : this.userId,
        nom: this.nom,
        numero : this.numero,
        ville : this.ville,
      }).then( ()=>{
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
         this.photo = 'data:image/jpeg;base64,'+data; // image format base64
         const picture = storage().ref('photoUser');
         picture.putString(data);
       }).catch(err=>{
         console.log(err);
       })
   }
}
