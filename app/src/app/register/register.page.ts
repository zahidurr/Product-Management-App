import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {NavController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {ApiService} from '../services/api.service';
import {PasswordValidator} from '../validators/password.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public validationsForm: FormGroup;
  public matchingPasswordsGroup: FormGroup;

  validationMessages = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    name: [
      { type: 'required', message: 'Name is required.' }
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 6 characters long.' },
      { type: 'maxlength', message: 'Password cannot be more than 13 characters long.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
    ],
    confirm_password: [
      { type: 'required', message: 'Confirm password is required' }
    ],
    matching_passwords: [
      { type: 'areEqual', message: 'Password does not match' }
    ]
  };

  constructor(
      public navCtrl: NavController,
      private formBuilder: FormBuilder,
      private storage: Storage,
      private apiService: ApiService
  ) { }

  ngOnInit() {
    this.matchingPasswordsGroup = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.maxLength(13),
        Validators.minLength(6),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    this.validationsForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),

      name: new FormControl('', Validators.compose([
        Validators.required
      ])),

      matching_passwords: this.matchingPasswordsGroup,
    });
  }

  onSubmit(values) {
      this.apiService.showLoader();

      this.apiService.postData(
          {
            email: values.email,
            password: values.matching_passwords.confirm_password,
            name: values.name
          }
          , 'signup/index.php').then((result) => {

        this.apiService.hideLoader();
        // console.log(result);
        // @ts-ignore
        if (result.success === 'true') {
          this.navCtrl.navigateRoot('/');
          this.apiService.presentToast('Success! account has been created. Now you can sign in');
        } else {
          // @ts-ignore
          this.apiService.presentToast(result.message);
        }
      }, (err) => {
        this.apiService.hideLoader();
        this.apiService.presentToast('Error! Please try again');
        // console.log(err);
      });
  }
}
