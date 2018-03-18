import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { AngularFireModule  } from 'angularfire2';
import { Upload } from '../model/image.model';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';


@Injectable()
export class UploadService {

  constructor(private afm: AngularFireModule, private db: AngularFireDatabase) { }

  uploads: AngularFireList<Upload[]>;
  pictureUrl:string;
  private uploadTask : firebase.storage.UploadTask;

  pushUpload(upload: Upload) {
    let storageRef = firebase.storage().ref();
    this.uploadTask = storageRef.child('/uploads/'+upload.file.name).put(upload.file);

    this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
       (snapshot) =>  {
        // upload in progress
        upload.progress = (this.uploadTask.snapshot.bytesTransferred / this.uploadTask.snapshot.totalBytes) * 100;
      }, 
      (error) => {
        // upload failed
        console.log(error)
      },
      () => {
        // upload success
        upload.url = this.uploadTask.snapshot.downloadURL;
        upload.name = upload.file.name;
      }
    );
  }

  pushUploadString(imageSrc: string) {
     let storageRef = firebase.storage().ref();
     storageRef.child('/uploads/'+imageSrc).putString(imageSrc,'base64',{contentType:'image/JPEG'})
    .then(data=>{
      this.pictureUrl = data.downloadURL;
   });
  }

  // Writes the file details to the realtime db
   saveFileData(upload: Upload) {
    this.db.list('postImage/').push(upload);
  }
}