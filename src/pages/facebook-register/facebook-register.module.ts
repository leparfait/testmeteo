import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FacebookRegisterPage } from './facebook-register';

@NgModule({
  declarations: [
    FacebookRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(FacebookRegisterPage),
  ],
})
export class FacebookRegisterPageModule {}
