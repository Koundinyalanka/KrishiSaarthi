import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

//Provider
import { CropProvider } from '../../providers/crop/crop';
import { CollaborationProvider } from '../../providers/collaboration/collaboration';

@IonicPage()
@Component({
  selector: 'page-crop-view-modal',
  templateUrl: 'crop-view-modal.html',
})
export class CropViewModalPage {
  cropList: any;
  isHealthy: string;
  cropImage: any;
  categoryList: any;
  categoyTitle: string;
  categorySubtitle: string;
  categoryContent: string;
  loading: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private cropService: CropProvider,
              private loadingCtrl: LoadingController,
              private cService: CollaborationProvider) {
  }

  ionViewDidLoad() {
    this.loadDetection();
    this.loadReccomendation();
  }

  loadDetection(){
    this.presentLoadingCustom();
    let data = this.navParams.get('data');
    this.cropService.getList(data).subscribe(res =>{
      let value; 
      this.cropList = res;
      this.cropImage = data.upload;
      value = JSON.stringify(res[0].label);
      if(value.includes('healthy')){
        this.isHealthy = 'greenColor';
      }else{
        this.isHealthy = 'redColor';
      }
      this.loading.dismiss();
    }, error =>{
      alert(JSON.stringify(error));
    })
  }


  loadReccomendation(){
    this.cService.getCategoryList().subscribe(res =>{
      this.categoryList = res;
    })
  }

  loadReccomm(){
    this.categoryList.forEach(element => {
      if(element.id == this.cropList[0].label){
        this.categoyTitle = element.title;
        this.categorySubtitle = element.subtitle;
        this.categoryContent = element.content;
      }
    });
  }


  presentLoadingCustom() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/imgs/mastek/loader.gif"/>`
    });
  
    this.loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });
  
    this.loading.present();
  }

}
