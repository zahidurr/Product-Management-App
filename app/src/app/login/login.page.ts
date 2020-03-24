import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {NavController} from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('Email', {static: false}) myEmailInput;
  @ViewChild('Password', {static: false}) myPasswordInput;

  public validationsForm: FormGroup;
  public responseData: any;

  public validationMessages = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    password: [
      { type: 'required', message: 'Password is required.' }
    ]
  };

  constructor(
      public navCtrl: NavController,
      private formBuilder: FormBuilder,
      private storage: Storage,
      private apiService: ApiService
  ) { }

  ngOnInit() {
    this.validationsForm = this.formBuilder.group({
      email: [null, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      password: [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  loginSubmit(values) {
      if (this.validationsForm.valid) {
        if (this.apiService.showLoader()) {
          this.apiService.postData(
              {
                email: values.email,
                password: values.password
              }
              , 'login/').then((result) => {

            this.responseData = result;

            if (this.responseData.success === 'true') {
              // set a user id
              this.storage.set('uid', this.responseData.uid);

              // Redirect to list page
              this.navCtrl.navigateRoot('tabs/tab1');
            } else {
              this.apiService.presentToast(this.responseData.message);
            }

            this.apiService.hideLoader();
          }, (err) => {
            this.apiService.hideLoader();
            // Connection failed message
            this.apiService.presentToast('Error');
          });
        }
      } else {
        if (this.validationsForm.value.email.length < 1) {
          this.myEmailInput.setFocus();
        } else if (this.validationsForm.value.password.length < 1) {
          this.myPasswordInput.setFocus();
        }
      }
  }

  goToRegister() {
    // Redirect to register page
    this.navCtrl.navigateForward('register');
  }

}
