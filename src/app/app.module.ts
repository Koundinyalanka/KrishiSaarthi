import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

//Plugin
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { CallNumber } from '@ionic-native/call-number';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Network } from '@ionic-native/network';

//Component
import { MyApp } from './app.component';

//Page
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { CollaborationPage } from '../pages/collaboration/collaboration';
import { FinancialPage } from '../pages/financial/financial';
import { PredictionPage } from '../pages/prediction/prediction';
import { WeatherPage } from '../pages/weather/weather';
import { ViewCropPage } from '../pages/view-crop/view-crop';
import { ViewSubtypePage } from '../pages/view-subtype/view-subtype';
import { FindResourcePage } from '../pages/find-resource/find-resource';
import { NotificationPage } from '../pages/notification/notification';
import { InsightPage } from '../pages/insight/insight';
import { CropViewModalPage } from '../pages/crop-view-modal/crop-view-modal';

//Provider
import { LoginProvider } from '../providers/login/login';
import { WeatherProvider } from '../providers/weather/weather';
import { CropProvider } from '../providers/crop/crop';
import { NasscomConfig } from '../providers/config';
import { CollaborationProvider } from '../providers/collaboration/collaboration';
import { FinancialProvider } from '../providers/financial/financial';
import { FindResourceProvider } from '../providers/find-resource/find-resource';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    TabsPage,
    CollaborationPage,
    FinancialPage,
    PredictionPage,
    WeatherPage,
    ViewCropPage,
    ViewSubtypePage,
    FindResourcePage,
    InsightPage,
    CropViewModalPage,
    NotificationPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    TabsPage,
    PredictionPage,
    CollaborationPage,
    FinancialPage,
    ViewCropPage,
    WeatherPage,
    FindResourcePage,
    NotificationPage,
    InsightPage,
    CropViewModalPage,
    ViewSubtypePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginProvider,
    WeatherProvider,
    Camera,
    CallNumber,
    Geolocation,
    Network,
    ScreenOrientation,
    CropProvider,
    NasscomConfig,
    CollaborationProvider,
    FinancialProvider,
    FindResourceProvider
  ]
})
export class AppModule {}
