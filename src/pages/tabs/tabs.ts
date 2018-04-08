import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PredictionPage } from '../prediction/prediction';
import { CollaborationPage } from '../collaboration/collaboration';
import { WeatherPage } from '../weather/weather';
import { FinancialPage } from '../financial/financial';
import { NotificationPage } from '../notification/notification';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root = PredictionPage;
  tab2Root = CollaborationPage;
  tab3Root = NotificationPage;
  tab4Root = WeatherPage;
  tab5Root = FinancialPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
