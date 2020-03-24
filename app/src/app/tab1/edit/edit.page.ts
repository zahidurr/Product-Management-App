import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NavController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute, NavigationExtras} from '@angular/router';
import {FileTransferObject, FileUploadOptions} from '@ionic-native/file-transfer/ngx';
import {File} from '@ionic-native/file/ngx';
import {forEach} from '@angular-devkit/schematics';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  public validationsForm: FormGroup;
  public lid: any = '';

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
      private route: ActivatedRoute,
      private file: File
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.lid = params.l_id;
    });

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

    this.loadData();
  }

  loadData() {
    this.apiService.getData('lists/get_one.php?lid=' + this.lid).then((result) => {
      // @ts-ignore
      const item = result.item[0];

      this.validationsForm.patchValue({
        title: item.title
      });

      this.validationsForm.patchValue({
        sm_title1: item.small_titl1
      });

      this.validationsForm.patchValue({
        sm_tip1: item.small_tip1
      });

      this.validationsForm.patchValue({
        sm_title2: item.small_titl2
      });

      this.validationsForm.patchValue({
        sm_tip2: item.small_tip2
      });

      this.validationsForm.patchValue({
        middle_title: item.middle_title
      });

      const tagsTmp1 = item.tags;
      const tagsTmp = tagsTmp1.split(',');
      if (tagsTmp.length > 1) {
        for (let i = 0; i < tagsTmp.length; i++) {
          this.validationsForm.patchValue({
            [tagsTmp[i]]: true
          });
        }
      }

      if (item.actvie === '1') {
        this.validationsForm.patchValue({
          active: true
        });
      }

      this.validationsForm.patchValue({
        item_type: item.type
      });
    }, (err) => {
      // Connection failed message
      // console.log(err);
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
            lid: this.lid
          }
          , 'lists/edit.php').then((result) => {

        this.navCtrl.navigateBack('tabs/tab1');

        this.apiService.presentToast('Success! new item has been updated');
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
