import { Component } from '@angular/core';
import {ApiService} from '../services/api.service';
import {Storage} from '@ionic/storage';
import {AlertController, NavController} from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public email: any;
  public name: any;

  constructor(
      private apiService: ApiService,
      private storage: Storage,
      public alertCtrl: AlertController,
      public navCtrl: NavController
  ) {
    this.storage.get('uid').then((val) => {
      this.apiService.getData('users/profile.php?uid=' + val).then((result) => {
        this.email = result['email'];
        this.name = result['name'];

      }, (err) => {
        // Connection failed message
        // console.log(err);
      });
    });
  }

  async logOut() {

    const confirm = await this.alertCtrl.create({
      header: 'Are you sure?',
      message: 'Do you want to logout?',
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'OK',
          handler: () => {
            // Remove local storage
            this.storage.remove('uid');
            // Clean storage
            localStorage.clear();

            // Navigate to login
            this.navCtrl.navigateRoot('login');
          }
        }
      ]
    });

    await confirm.present();
  }

}
