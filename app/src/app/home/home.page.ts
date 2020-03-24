import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
      private storage: Storage,
      public navCtrl: NavController
  ) { }

  ngOnInit() {
    // Redirect to RecentalertsPage if logged in
    this.storage.get('uid').then((val) => {
      if (val !== null) {
        this.navCtrl.navigateRoot('tabs/tab1');
      } else {
        this.navCtrl.navigateRoot('login');
      }
    });
  }

}
