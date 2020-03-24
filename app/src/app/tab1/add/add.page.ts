import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NavController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {ApiService} from '../../services/api.service';
import { FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  public validationsForm: FormGroup;

  validationMessages = {
    title: [
      { type: 'required', message: 'Title is required.' }
    ]
  };

  constructor(
      public navCtrl: NavController,
      private formBuilder: FormBuilder,
      private storage: Storage,
      private apiService: ApiService,
      private transfer: FileTransferObject,
      private file: File
  ) { }

  ngOnInit() {
    this.validationsForm = this.formBuilder.group({
      title: new FormControl('', Validators.compose([
        Validators.required
      ])),
      sm_title1: new FormControl(),
      sm_tip1: new FormControl(),
      sm_title2: new FormControl(),
      sm_tip2: new FormControl(),
      middle_title: new FormControl(),
      item_type: new FormControl(),
      T1: new FormControl(),
      T2: new FormControl(),
      T3: new FormControl(),
      B1: new FormControl(),
      B2: new FormControl(),
      active: new FormControl()
    });

    this.validationsForm.patchValue({
      item_type: 'A1'
    });
  }

  onSubmit(values) {
    this.apiService.showLoader();

    const tags = [];
    if (values.T1) {
      tags.push('T1');
    }
    if (values.T2) {
      tags.push('T2');
    }
    if (values.T3) {
      tags.push('T3');
    }
    if (values.B1) {
      tags.push('B1');
    }
    if (values.B2) {
      tags.push('B2');
    }

    let activeTmp = '0';
    if (values.active) {
      activeTmp = '1';
    }
    console.log(values.active);
    this.uploadImg();

    this.storage.get('uid').then((val) => {
      this.apiService.postData(
        {
          uid: val,
          title: values.title,
          sm_title1: values.sm_title1,
          sm_tip1: values.sm_tip1,
          sm_title2: values.sm_title2,
          sm_tip2: values.sm_tip2,
          middle_title: values.middle_title,
          item_type: values.item_type,
          type: tags,
          is_active: activeTmp,
        }
        , 'lists/add.php').then((result) => {

          this.navCtrl.navigateBack('tabs/tab1');

          this.apiService.presentToast('Success! new item has been added');
          this.apiService.hideLoader();
        // console.log(result);
        }, (err) => {

        });

    });
  }

  uploadImg() {
    const options: FileUploadOptions = {
      fileKey: 'photo',
      fileName: 'test3.jpg',
      mimeType: 'image/jpeg',
      headers: {}
    };

    this.transfer.upload('', 'http://zahidur.wtf/cypheme/server/lists/img_upload.php', options).then(data => {
      // alert(JSON.stringify(data));
    }, error => {
    });
  }
}
