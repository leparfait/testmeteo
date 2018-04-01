import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StartTabPage } from './start-tab';
import { SuperTabsModule } from 'ionic2-super-tabs';

@NgModule({
  declarations: [
    StartTabPage,
  ],
  imports: [
    IonicPageModule.forChild(StartTabPage),
    SuperTabsModule,
  ],
})
export class StartTabPageModule {}
