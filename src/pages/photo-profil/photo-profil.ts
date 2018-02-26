import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { tap } from 'rxjs/operators';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
//import { fileSize } from '../../pipes/file-size/file-size';


/**
 * Generated class for the PhotoProfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-photo-profil',
  templateUrl: 'photo-profil.html',
})
export class PhotoProfilPage {

   // Main task 
   task: AngularFireUploadTask;

   // Progress monitoring
   percentage: Observable<number>;
 
   snapshot: Observable<any>;
 
   // Download URL
   downloadURL: Observable<string>;
 
   // State for dropzone CSS toggling
   isHovering: boolean;

  constructor(public storage: AngularFireStorage, public db: AngularFirestore, 
         public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotoProfilPage');
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {
    // The File object
    const file = event.item(0)

    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') { 
      console.error('Choisissez une image svp ! :( ')
      return;
    }

    // The storage path
    const path = `test/${new Date().getTime()}_${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'My AngularFire-powered PWA!' };

    // The main task
    this.task = this.storage.upload(path, file, { customMetadata })

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot   = this.task.snapshotChanges().pipe(
      tap(snap => {
        if (snap.bytesTransferred === snap.totalBytes) {
          // Update firestore on completion
          this.db.collection('photos').add( { path, size: snap.totalBytes })
        }
      })
    )

     // The file's download URL
     this.downloadURL = this.task.downloadURL(); 
  }

 // Determines if the upload task is active
 isActive(snapshot) {
    return snapshot.State === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

}
