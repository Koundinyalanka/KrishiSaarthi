import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Provider
import { CollaborationProvider } from '../../providers/collaboration/collaboration';


@IonicPage()
@Component({
  selector: 'page-view-crop',
  templateUrl: 'view-crop.html',
})
export class ViewCropPage {
  cropImage: any;
  text: string;
  cropList: any;
  isHealthy: boolean;
  categoryList: any;
  categoyTitle: string;
  categorySubtitle: string;
  categoryContent: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private cService: CollaborationProvider) {

  }

  ionViewDidLoad() {
    let data = this.navParams.get('data');
    this.cropImage = data.image;
    this.cropList = data.list;
    this.isHealthy = data.isHealthy;
    this.loadReccomendation();
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

}
