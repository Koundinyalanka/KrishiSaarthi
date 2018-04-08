import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController, LoadingController } from 'ionic-angular';

//Provider
import { FinancialProvider } from '../../providers/financial/financial';

//Modal
import { ViewSubtypePage } from '../view-subtype/view-subtype';
import { InsightPage } from '../insight/insight';

@IonicPage()
@Component({
  selector: 'page-financial',
  templateUrl: 'financial.html',
})
export class FinancialPage {
  tabsArray: any;
  selectedType: string;
  selectedTab: string;
  typesArray: any;
  financeData: any;
  title: any;
  loading: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private fService: FinancialProvider,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.loadTabs();
  }

  loadTabs(){
    this.tabsArray = ['Expense', 'Income'];
    this.loadTypes(this.tabsArray[0]);
  }

  loadTypes(data){
    switch(data){
      case this.tabsArray[0]:{
        this.title = 1;
        this.getExpenselData();
        break;
      }
      case this.tabsArray[1]:{
        this.title = 2;
        this.getIncomeData();
        break;
      }
    }
    this.selectedTab = data;
  }

  getExpenselData(){
    this.fService.loadFinancial().subscribe(res =>{
      this.typesArray = res.expense;
    })
  }

  getIncomeData(){
    this.fService.loadFinancial().subscribe(res =>{
      this.typesArray = res.income;
    })
  }

  loadInsight(){
    this.presentChartModal(null);
  }

  setType(data){
    this.selectedType = data.name;
    this.presentProfileModal(data);
  }

  presentProfileModal(data) {
    let profileModal = this.modalCtrl.create(ViewSubtypePage, { value: data });
    profileModal.onDidDismiss(data => {
      this.financeData = {
        string_Json_Data: {
          "Id" : 0,
          "IsExpense": this.title,
          "FarmerID": 1,
          "Type": this.selectedType,
          "SubType": data.subtype,
          "JobType": data.jobType,
          "Amount": data.amount,
          "Comment": data.comment,
          "CurrentDate": "2018-04-07 09:42:10.998224"
        }

      }
      if(data.dismissType == 'done'){
        this.presentLoadingCustom();
        this.fService.addFinancial(this.financeData).subscribe(res =>{
          if(res == null){
            this.loading.dismiss();
            this.presentToast('Added');
          }
        })
      }
    });
    profileModal.present();
  }

  presentChartModal(data) {
    let profileModal = this.modalCtrl.create(InsightPage, { value: data });
    profileModal.onDidDismiss(data => {
      console.log('on dismiss')
    });
    profileModal.present();
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
