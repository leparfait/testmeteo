import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyPostPage } from './my-post';

@NgModule({
  declarations: [
    MyPostPage,
  ],
  imports: [
    IonicPageModule.forChild(MyPostPage),
  ],
})
export class MyPostPageModule {}
