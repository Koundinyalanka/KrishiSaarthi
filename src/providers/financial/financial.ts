import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//Provider
import { NasscomConfig } from '../config';

@Injectable()
export class FinancialProvider {

  constructor(public http: HttpClient,
              private nConfig: NasscomConfig) {
  }

  loadFinancial(): any{
    return this.http.get('assets/data/financialPlanning.json');
  }

  addFinancial(req){
    return this.http.post(this.nConfig.cropUrl+'AddFinance', req);
  }

  getInsightdata(){
    let req = {
      "FarmerID": 1
    }
    return this.http.post(this.nConfig.cropUrl+'GetFarmerInsights',req)
  }

}
