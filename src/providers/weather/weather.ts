import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WeatherProvider {
  weatherList: any;

  constructor(public http: HttpClient) {
    
  }

  getCurrentWeather(lat, lng){
    return this.http.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22('+ lat +'%2C%20'+ lng +')%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys');
  }

}
