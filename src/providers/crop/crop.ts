import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { NasscomConfig } from '../config';


@Injectable()
export class CropProvider {

  constructor(public http: HttpClient,
              private nConfig: NasscomConfig) {

  }

  getList(req){
    return this.http.post(this.nConfig.cropUrl+'index.html', req);
  }

}
