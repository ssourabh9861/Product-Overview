import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NbAuthService, NbAuthSimpleToken } from '@nebular/auth';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { ShopifyService } from './services/shopify.service';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'shopify',
  styleUrls: ['./shopify.component.scss'],
  templateUrl: './shopify.component.html',
})
export class ShopifyComponent {

  connectForm: FormGroup
  connected: boolean = false;
  user: NbAuthSimpleToken;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastrService: NbToastrService,
    private authService: NbAuthService,
    private shopifyService: ShopifyService,
    private activatedRoute: ActivatedRoute
  ) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthSimpleToken) => {

        if (token.isValid()) {
          this.user = token
        }

    });

    this.activatedRoute.queryParams.subscribe((params:any)=>{
      if(params['code']){
        this.http.get(environment.apiUrl + '/shopdesk/shopify/connect?code=' 
        + params['code'] 
        + '&hmac=' + params['hmac']
        + '&shop=' + params['shop']
        + '&state=' + params['state']
        + '&timestamp=' + params['timestamp']).subscribe(
          (response) => {
            console.log(response)
            this.connected = true;
          }
        )
      }
    })
  }

  ngOnInit() {
    this.connectForm = this.fb.group({
      shop: ['', Validators.required],
    });
    this.shopifyService.checkShopifyConnected().subscribe(
        (data: any) => {
          console.log(data.connected)
          this.connected = data.connected
        }, error => {
          const warningStatus:NbComponentStatus = 'danger';
          const config = {
              status: warningStatus,
          };
          this.toastrService.show(error.error.message, "", config);
        }
      )
  }

  connectShop(){
    const shop = this.connectForm.controls.shop.value
    this.shopifyService.connectShop(shop).subscribe(
      (data: any) => {
        console.log(data.connected)
        this.connected = data.connected
      }, error => {
        const warningStatus:NbComponentStatus = 'danger';
        const config = {
            status: warningStatus,
        };
        this.toastrService.show(error.error.message, "", config);
      }
    )
  }

}
