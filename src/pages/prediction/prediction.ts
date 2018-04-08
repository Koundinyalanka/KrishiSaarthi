import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

//Plugin
import { Camera, CameraOptions } from '@ionic-native/camera';

//Page
import { ViewCropPage } from '../view-crop/view-crop';
import { CropViewModalPage } from '../crop-view-modal/crop-view-modal';

//Provider
import { CropProvider } from '../../providers/crop/crop';



@IonicPage()
@Component({
  selector: 'page-prediction',
  templateUrl: 'prediction.html',
})
export class PredictionPage {
  cropImage: any;
  categoryList: any;
  selectedCategory: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private camera: Camera,
              private cropService: CropProvider,
              private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.loadCategory();
  }

  loadCategory(){
    this.categoryList = ['apple','cotton','Jowar','Wheat','Soya1'];
  }

  savecategory(data){
    this.selectedCategory = data;
  }

  openCamera(){
    if(this.selectedCategory != undefined){
      const options: CameraOptions = {
        quality: 100,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((imageData) => {
        this.cropImage = imageData;
        this.reqDetection();
       }, (err) => {
        alert(JSON.stringify(err));
       });
    }else{
      
    }

  }

  reqDetection(){
    let data;
    data = {
      upload: this.cropImage,
      category: this.selectedCategory
    }
    this.presentpredictionModal(data);
  }

  presentpredictionModal(value) {
    let profileModal = this.modalCtrl.create(CropViewModalPage, { data: value });
    profileModal.onDidDismiss(data => {
      console.log('on dismiss')
    });
    profileModal.present();
  }

}
