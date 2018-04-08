import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//Provider
import { NasscomConfig } from '../config';

@Injectable()
export class FindResourceProvider {

  constructor(public http: HttpClient,
              private nConfig: NasscomConfig) {
    
  }

  addResource(req){
    return this.http.post(this.nConfig.cropUrl+'AddNotification',req);
  }

  getNotofication(){
    let req = {
      "FarmerID": 2
    }
    return this.http.post(this.nConfig.cropUrl+'GetNotificationData', req);
  }

}
