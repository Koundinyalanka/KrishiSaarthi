import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';

//Page
import { FindResourcePage } from '../find-resource/find-resource';

//Provider
import { CollaborationProvider } from '../../providers/collaboration/collaboration';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-collaboration',
  templateUrl: 'collaboration.html',
})
export class CollaborationPage {


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private cService: CollaborationProvider,
              private callCtrl: CallNumber,
              private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.getLocation();
  }

  getLocation(){
    this.cService.getfarmerList().subscribe(res =>{
      this.initMap(res, 8);
    }, error =>{
      alert(error);
    })
  }

  initMap(location, zoomLevel){
    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: zoomLevel,
      center: location[0]
    });
    this.createMarker(location,map)
  }

  createMarker(location, map){
    let marker;

    location.forEach(element => {
      //Adding Marker
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(element.lat, element.lng),
        map: map,
        icon: {
          url : 'assets/icon/'+element.Crop1+'.svg',
          scaledSize: new google.maps.Size(30, 30)
        }
      })

      //Marker click
      google.maps.event.addListener(marker, "click", () =>{
        this.presentAlert(element);
      });  
    });
   
  }

  presentAlert(data) {
    let content = '';

    content += '<div><span>Crop Name : '+data.Crop1+'</span></div>';
    content += '<div><span (click)="callNumber()">Mobile : '+data.ContactNumber+'</span></div>';
    content += '<div><span>Crop Disease : '+data.Crop1Disease+'</span></div>';

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

  findResourse(){
    this.navCtrl.push(FindResourcePage);
  }

  callNumber(number){
    this.callCtrl.callNumber(number, true).then(res =>{
      console.log(res);
    }).catch(error =>{
      console.log(error);
    })
  }

}
