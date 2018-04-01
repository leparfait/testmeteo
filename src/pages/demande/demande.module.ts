import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DemandePage } from './demande';

@NgModule({
  declarations: [
    DemandePage,
  ],
  imports: [
    IonicPageModule.forChild(DemandePage),
  ],
})
export class DemandePageModule {}
