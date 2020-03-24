import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';
import 'rxjs';

// API URL
const apiUrl = 'http://example.com/test/server/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public loader: HTMLIonLoadingElement;

  constructor(
      public http: HttpClient,
      public toastCtrl: ToastController,
      public loadingCtrl: LoadingController,
      public alertCtrl: AlertController,
  ) {
  }

  postData(credentials, type) {

    return new Promise((resolve, reject) => {

      this.http.post(apiUrl + type, credentials,
          {
            headers: { 'Content-Type': 'application/json' }
          }).
      subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });

    });

  }

  getData(type) {
    return new Promise((resolve, reject) => {

      this.http.get(apiUrl + type).
      subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });

    });
  }

  async showLoader() {
    if (!this.loader) {
      this.loader = await this.loadingCtrl.create({ message: 'Loading' });
    }
    await this.loader.present();
  }

  async hideLoader() {
    if (this.loader) {
      await this.loader.dismiss();
      this.loader = null;
    }
  }

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message:  msg,
      position: 'top',
      color: 'danger',
      duration: 3000
    });
    toast.present();
  }

  async presentAlert(headMsg, msg) {
    const alert = await this.alertCtrl.create({
      header: headMsg,
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
}



