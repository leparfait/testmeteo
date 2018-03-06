import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController, LoadingController} from 'ionic-angular';
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
  user : any;
  selectedFiles: FileList;
  currentUpload: Upload;

  constructor(public navCtrl: NavController, public navParams: NavParams,public afAuth:AngularFireAuth,
              public uploadService:UploadService, public alertCtrl:AlertController, public loadingCtrl:LoadingController,
              public db:AngularFireDatabase) {
        this.afAuth.authState.subscribe(user =>{
          this.user = user ;
          if(user) this.userId = user.uid;
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
      this.showAlert('test',this.currentUpload.url);
      //post.imageUrl = this.currentUpload.url;
      //post.imageUrl = 'https://firebasestorage.googleapis.com/v0/b/blackmarket-3477c.appspot.com/o/uploads%2F6156sZYXnuL._SL1100_.jpg?alt=media&token=64a397f4-ce27-436b-9a25-5ec1b3dc7e20';
      this.db.list('posts/').push(post).then( ()=>{
        this.navCtrl.push(PostsPage,{user:this.user});
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
