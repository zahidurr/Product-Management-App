import { Component } from '@angular/core';
import {ApiService} from '../services/api.service';
import {Storage} from '@ionic/storage';
import {AlertController, NavController} from '@ionic/angular';
import {NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  items: any = [];

  constructor(
      private apiService: ApiService,
      private storage: Storage,
      public alertCtrl: AlertController,
      public navCtrl: NavController
  ) {
    this.ionViewWillEnter();
  }

  ionViewWillEnter() {
    this.loadData();
    this.initAutoRefresh();
  }

  loadData() {
    this.storage.get('uid').then((val) => {
      this.apiService.getData('lists/show.php?uid=' + val).then((result) => {
        this.items = result['items'];
      }, (err) => {
        // Connection failed message
        // console.log(err);
      });
    });
  }

  edit(lid) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        l_id: lid
      }
    };

    this.navCtrl.navigateForward(['edit'], navigationExtras);
  }

  add() {
    // Redirect to add page
    this.navCtrl.navigateForward('add');
  }

  private initAutoRefresh() {
    setInterval(() => this.loadData(),  1000);
  }

  async delete(lid) {
    const confirm = await this.alertCtrl.create({
      header: 'Are you sure?',
      message: 'Do you want to delete this?',
      buttons: [
        {
          text: 'No',
        },
        {
          text: 'Yes',
          handler: () => {
            this.storage.get('uid').then((val) => {
              this.apiService.getData('lists/delete.php?lid=' + lid + '&uid=' +val).then((result) => {
                this.apiService.presentToast('Deleted!');
                this.loadData();
              }, (err) => {
                // Connection failed message
                // console.log(err);
              });
            });
          }
        }
      ]
    });

    await confirm.present();
  }
}
