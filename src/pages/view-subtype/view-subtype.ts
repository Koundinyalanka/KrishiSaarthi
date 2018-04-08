import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-view-subtype',
  templateUrl: 'view-subtype.html',
})
export class ViewSubtypePage {
  title: string;
  subtypes: any;
  selectedSubType: string;
  enteredAmount: any;
  comment: string;
  jobType: any;
  selectedJobType: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    this.loadPageData();
  }

  loadPageData(){
    this.title = this.navParams.get('value').name;
    this.subtypes = this.navParams.get('value').subtypes;
    if(this.title == 'Labour'){
      this.jobType = ['Ploughing', 'Planting', 'weeding', 'Harvesting'];
    }
  }

  setSubtype(data){
    this.selectedSubType = data.name;
  }

  dismiss(type){
    let value = {
      "subtype": this.selectedSubType,
      "amount": this.enteredAmount,
      "comment": this.comment,
      "jobType": this.selectedJobType,
      "dismissType": type
    }
    this.viewCtrl.dismiss(value);
  }

  setJobType(data){
    console.log(data);
    this.selectedJobType = data;
  }
  

}
