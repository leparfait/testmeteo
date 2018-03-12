import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController, LoadingController, DateTime} from 'ionic-angular';
import { Post } from '../../model/post.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { PostsPage } from '../posts/posts';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Upload } from '../../model/image.model';
import { UploadService } from '../../service/upload.service';

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
  userVendor? : any;
  selectedFiles ?: FileList;
  currentUpload? : Upload;

  constructor(public navCtrl: NavController, public navParams: NavParams,public afAuth:AngularFireAuth,
              public uploadService:UploadService, public alertCtrl:AlertController, public loadingCtrl:LoadingController,
              public db:AngularFireDatabase) {
        this.afAuth.authState.subscribe(user =>{
          this.user = user ;
          if(user) this.userId = user.uid;
           firebase.database().ref().child('profileUser').orderByChild('ville').equalTo('douala').on('value',snap=>{
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPostPage');
  }
   
  showAlert(titre, message) {
    let alert = this.alertCtrl.create({
      title: titre,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  //selection de l'image de la publication
  selectImagePost(event: any){
    this.selectedFiles = event.target.files;
    let file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    this.uploadService.pushUpload(this.currentUpload);
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
      post.dateCreation = new Date("MMM d, y h:mm:ss a");
      //this.showAlert('test',this.currentUpload.url);
      post.imageUrl = this.currentUpload.url;
      this.db.list('posts/').push(post).then( ()=>{
        this.navCtrl.push(PostsPage,{user:this.user, userVendor:this.userVendor});
      })
      loading.dismiss();
    }catch(e){
      this.showAlert('Erreur','Impossible de se sauvegarder vos informations');
      console.log(e);
      loading.dismiss();
    }
  }

  cancel(){
    this.navCtrl.push(PostsPage);
  }
}
