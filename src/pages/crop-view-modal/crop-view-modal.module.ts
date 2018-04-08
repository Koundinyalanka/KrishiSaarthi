import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CropViewModalPage } from './crop-view-modal';

@NgModule({
  declarations: [
    CropViewModalPage,
  ],
  imports: [
    IonicPageModule.forChild(CropViewModalPage),
  ],
})
export class CropViewModalPageModule {}
