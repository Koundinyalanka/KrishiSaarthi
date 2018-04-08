import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';


import * as HighCharts from 'highcharts';

//Provider
import { FinancialProvider } from '../../providers/financial/financial';

@IonicPage()
@Component({
  selector: 'page-insight',
  templateUrl: 'insight.html',
})
export class InsightPage {
  insightObj: any;
  loading: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private fService: FinancialProvider,
              private loadingCtrl: LoadingController,
              private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    this.loadFinancial();
  }

  loadFinancial(){
    this.presentLoadingCustom();
    this.fService.getInsightdata().subscribe(res =>{
      this.insightObj = res;
      this.loading.dismiss();
      this.loadChart(this.insightObj[0]);
    }, error =>{
      console.log(JSON.stringify(error))
    })
  }

  loadChart(data){
    var myChart = HighCharts.chart('container', {
      chart: {
      type: 'bar'
      },
      title: {
      text: 'Spend Analytics'
      },
      xAxis: {
      categories: ['Labour', 'Material', 'Utilities']
      },
      yAxis: {
      title: {
      text: 'Spend Values'
      }
      },
      series: [{
      name: 'Your spend',
      data: [data.Farmer_Labour_Average, data.Farmer_Material_Average, data.Farmer_Utilities_Average]
      }, {
      name: 'Local Average',
      data: [data.Labour_Average, data.Material_Average, data.Utilities_Average]
      }]
      });
  }

  dismiss(){
    this.viewCtrl.dismiss();
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
