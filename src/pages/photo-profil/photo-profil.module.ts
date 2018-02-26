import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhotoProfilPage } from './photo-profil';

@NgModule({
  declarations: [
    PhotoProfilPage,
  ],
  imports: [
    IonicPageModule.forChild(PhotoProfilPage),
  ],
})
export class PhotoProfilPageModule {}
