import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController } from 'ionic-angular';

//Plugin
import { Geolocation } from '@ionic-native/geolocation';

//Provider
import { WeatherProvider } from '../../providers/weather/weather';

@IonicPage()
@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html',
})
export class WeatherPage {
  latitude: any;
  longitude: any;
  weatherArr: any;
  atmosphere: any;
  location: string;
  currentTemp: any;
  weatherType: string;
  sunrise: string;
  sunset: string;
  humidity: string;
  visibility: string;
  loading: any;

  temp: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private wService: WeatherProvider,
              private loadingCtrl: LoadingController,
              private geolocation: Geolocation,
              private platform: Platform) {
    this.getCurrentLocation();
  }

  ionViewDidLoad() {
  }

  getCurrentLocation(){
    let data, i, forecast;
    this.weatherArr = [];
    this.platform.ready().then(() =>{
      this.presentLoadingCustom();
      this.geolocation.getCurrentPosition().then((resp) => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
        this.wService.getCurrentWeather(this.latitude, this.longitude).subscribe(res =>{
          this.loading.dismiss();
          data = res;
          this.sunrise = data.query.results.channel.astronomy.sunrise;
          this.sunset = data.query.results.channel.astronomy.sunset;
          this.humidity = data.query.results.channel.atmosphere.humidity;
          this.visibility = data.query.results.channel.atmosphere.visibility;
          this.location = data.query.results.channel.location.city;
          forecast = data.query.results.channel.item.forecast;
          this.currentTemp = data.query.results.channel.item.condition.temp;
          this.currentTemp = Math.round((parseInt(this.currentTemp) - 32)/1.8);
          this.weatherType = data.query.results.channel.item.condition.text;
          console.log(res);
          for(i = 1 ; i < 6 ; i++){
            forecast[i].low = Math.round((parseInt(forecast[i].low) - 32)/1.8);
            forecast[i].high = Math.round((parseInt(forecast[i].high) - 32)/1.8);
            this.weatherArr.push(forecast[i]);
          }
        })
       }).catch((error) => {
         console.log(JSON.stringify(error));
       });
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
