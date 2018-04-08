import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class CollaborationProvider {

  constructor(public http: HttpClient) {
    
  }

  getfarmerList(): any{
    return this.http.get('assets/data/collaboration.json');
  }

  getCategoryList(): any{
    return this.http.get('assets/data/reccomendation.json');
  }

}
