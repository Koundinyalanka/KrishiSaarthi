import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';

//provider
import { FindResourceProvider } from '../../providers/find-resource/find-resource';

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  list: any;
  loading: any

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private callCtrl: CallNumber,
              private rService: FindResourceProvider) {
  }

  ionViewDidLoad() {
    let data = localStorage.getItem('notification');
    this.getNotification();
  }

  getNotification(){
    this.presentLoadingCustom();
    this.rService.getNotofication().subscribe(res =>{
      this.loading.dismiss();
      this.list = res;
    }, error =>{
      alert(JSON.stringify(error));
    })
  }

  showData(data){
    let content = '';

    content += '<div><span>Sub Resource Type : '+data.Sub_Resource_Type+'</span></div>';
    content += '<div><span>No of Resource : '+data.No_Of_Resources+'</span></div>';
    content += '<div><span>Job type : '+data.Job_Type+'</span></div>';
    content += '<div><span>Start Date : '+data.Start_Date+'</span></div>';
    content += '<div><span>End Date : '+data.End_Date+'</span></div>';
    content += '<div><span>Mobile Number : '+data.Farmer_Mobile_Number+'</span></div>';

    let alert = this.alertCtrl.create({
      title: data.Name,
      subTitle: content,
      buttons: [{
        text: 'ok'
      },{
        text: 'Call',
        handler: () =>{
          this.callNumber(data.ContactNumber)
        }
      }]
    });
    alert.present();

  }

  callNumber(number){
    this.callCtrl.callNumber(number, true).then(res =>{
      console.log(res);
    }).catch(error =>{
      console.log(error);
    })
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
