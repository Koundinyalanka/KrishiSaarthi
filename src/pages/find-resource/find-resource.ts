import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Network } from '@ionic-native/network';

//provider
import { FindResourceProvider } from '../../providers/find-resource/find-resource';

@IonicPage()
@Component({
  selector: 'page-find-resource',
  templateUrl: 'find-resource.html',
})
export class FindResourcePage {
  tabsArray: any;
  selectedTab: string;
  types: any;
  startDate: any;
  endDate: any;
  selectedType: string;
  notification: any = [];
  jobType: any;
  selectedjobType: string;
  noResource: any;
  loading: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private rService: FindResourceProvider,
              private toastCtrl: ToastController,
              private network: Network,
              private loadingCtrl: LoadingController) {


  }

  ionViewDidLoad() {
    this.loadTabs();
    this.checkNetwork();
  }

  loadTabs(){
    this.tabsArray = ['Equipment', 'Labour'];
    this.loadTypes(this.tabsArray[0]);
  }

  loadTypes(data){
    this.selectedTab = data;
    switch(data){
      case this.tabsArray[0]: {
        this.types = ['tractor', 'Pump'];
        this.jobType = [];
        break;
      }
      case this.tabsArray[1]: {
        this.types = ['Male', 'Female'];
        this.jobType = ['Ploughing', 'Planting', 'weeding', 'Harvesting'];
        break;
      }
    }
  }

  setType(data){
    this.selectedType = data;
  }

  setjobType(data){
    this.selectedjobType = data;
  }

  done(){
    let data;
    let dateObj = new Date(),
        date = dateObj.getDate(),
        month = dateObj.getMonth()+1,
        year = dateObj.getUTCFullYear(),
        publishedDate = year+'-'+month+'-'+date;
        console.log(publishedDate);
    data = {
      string_Json_Data: {
        "ID": 0,
        "FarmerID": 1,
        "Farmer_Mobile_Number": "9619152620",
        "Resource_Type": this.selectedTab,
        "No_Of_Resources": parseInt(this.noResource),
        "Sub_Resource_Type": this.selectedType,
        "Job_Type": this.selectedjobType,
        "Latitude": 72,
        "Longitude": 19.52,
        "Start_Date": this.startDate,
        "End_Date": this.endDate,
        "Published_Date": publishedDate
      }
    }
    this.presentLoadingCustom();
    
    this.rService.addResource(data).subscribe(res =>{
      if(res == null){
        this.loading.dismiss();
        this.presentToast('Added');
      }
    }, error =>{
      alert(JSON.stringify(error));
    });
    this.notification.push(data);
    localStorage.setItem('notification', JSON.stringify(this.notification));
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

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  checkNetwork(){

  }

}
