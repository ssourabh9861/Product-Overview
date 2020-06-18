import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NbToastrService, NbComponentStatus} from '@nebular/theme';
import { ActivatedRoute } from '@angular/router';
import { DeskeraService } from './services/deskera.service';

@Component({
  selector: 'deskera',
  styleUrls: ['./deskera.component.scss'],
  templateUrl: './deskera.component.html',
})
export class DeskeraComponent {

  configForm: FormGroup
  connected: boolean = false
  taxes: any;
  taxesLoaded: Promise<boolean>;
  accounts: any;
  accountsLoaded: Promise<boolean>;
  user = {};
  currentStep: number = 0;
  connectForm: FormGroup;
  isSynced: boolean = false;

  constructor(
    private fb: FormBuilder,
    private deskeraService: DeskeraService,
    private toastrService: NbToastrService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe((params:any)=>{
      if(params['hmac']){
        const code = params['code'] 
        + '&hmac=' + params['hmac']
        + '&shop=' + params['shop']
        + '&state=' + params['state']
        + '&timestamp=' + params['timestamp'];
        this.deskeraService.connectByhmac(code).subscribe(
            response => {
              if (response.status === 200) {
                this.setCurrentStep(2)
              }
            }, error => {
              const warningStatus:NbComponentStatus = 'danger';
              const config = {
                  status: warningStatus,
              };
              this.toastrService.show(error.error.message, "", config);
            }
          )
      } else if (params['code']){
        const code = params['code']
        + '&state=' + params['state'];
        this.deskeraService.connectByCode(code).subscribe(
            (response: any) => {
              if (response.status === 200) {
                this.setCurrentStep(1)
              }
            }, error => {
              const warningStatus:NbComponentStatus = 'danger';
              const config = {
                  status: warningStatus,
              };
              this.toastrService.show(error.error.message, "", config);
            }
          )
      }
    })

    this.checkDeskeraConnected();
    this.checkShopifyConnected();
    this.checkDeskeraConfigsSet();
    this.createDeskeraConfigs();
    
  }

  checkDeskeraConfigsSet(){
    this.deskeraService.checkDeskeraConfigsSet().subscribe(
        (data: any) => {
          if(data){
            this.setCurrentStep(3)
          }
        }, error => {
          const warningStatus:NbComponentStatus = 'danger';
          const config = {
              status: warningStatus,
          };
          this.toastrService.show(error.error.message, "", config);
        }
      )
  }

  sync(){
    this.deskeraService.syncData().subscribe(
        (data:any) => {
          this.isSynced = true;
          this.toastrService.show(
            "Successfully Synced",
            `Synced`
            );
        }, error => {
          const warningStatus:NbComponentStatus = 'danger';
          const config = {
              status: warningStatus,
          };
          this.toastrService.show(error.error.message, "", config);
        }
      )
  }

  setCurrentStep(value){
    this.currentStep = value
  }

  createDeskeraConfigs(){
    this.configForm = this.fb.group({
      productWarehouseCode: new FormControl({value: "WH-0000001"}, Validators.required)
    });

    this.deskeraService.fetchTaxes().subscribe(
      (data: any) => {
        this.taxes = data
        this.taxesLoaded = Promise.resolve(true);
        this.addTaxControls();
      }, error => {
        const warningStatus:NbComponentStatus = 'danger';
        const config = {
            status: warningStatus,
        };
        this.toastrService.show(error.error.message, "", config);
      }
    );

    this.deskeraService.fetchAccounts().subscribe(
        (data: any) => {
          this.accounts = data
          this.accountsLoaded = Promise.resolve(true);
          this.addAccountControls();
        }, error => {
          const warningStatus:NbComponentStatus = 'danger';
          const config = {
              status: warningStatus,
          };
          this.toastrService.show(error.error.message, "", config);
        }
      );
  }

  checkShopifyConnected(){
    this.connectForm = this.fb.group({
      shop: ['', Validators.required],
    });
    this.deskeraService.checkShopifyConnected().subscribe(
      (data: any) => {
        if (data.connected) {
          this.setCurrentStep(2)
        }
      }, error => {
        const warningStatus:NbComponentStatus = 'danger';
        const config = {
            status: warningStatus,
        };
        this.toastrService.show(error.error.message, "", config);
      });
  }

  connectShop(){
    const shop = this.connectForm.controls.shop.value
    this.deskeraService.connectShop(shop).subscribe(
      (data: any) => {
        window.open(data.url);
      }, error => {
        const warningStatus:NbComponentStatus = 'danger';
        const config = {
            status: warningStatus,
        };
        this.toastrService.show(error.error.message, "", config);
      });
  }

  checkDeskeraConnected(){
    this.deskeraService.checkDeskeraConnected().subscribe(
      (data: any) => {
        if (data.connected) {
          this.setCurrentStep(1)
        }
      }, error => {
        const warningStatus:NbComponentStatus = 'danger';
        const config = {
            status: warningStatus,
        };
        this.toastrService.show(error.error.message, "", config);
      });
  }

  addTaxControls(){
    const defaultTax = this.taxes[0].code
    this.configForm.addControl("productPurchaseTaxCode", new FormControl({value: defaultTax}, Validators.required))
    this.configForm.addControl("productSalesTaxCode", new FormControl({value: defaultTax}, Validators.required))
  }

  addAccountControls(){
    const defaultAcc = this.accounts[0].code
    this.configForm.addControl("productPurchaseAccountCode", new FormControl({value: defaultAcc}, Validators.required))
    this.configForm.addControl("productSalesAccountCode", new FormControl({value: defaultAcc}, Validators.required))
    this.configForm.addControl("productCostOfGoodsSoldAccountCode", new FormControl({value: defaultAcc}, Validators.required))
    this.configForm.addControl("productInventoryAccountCode", new FormControl({value: defaultAcc}, Validators.required))
    this.configForm.addControl("productStockAdjustmentAccountCode", new FormControl({value: defaultAcc}, Validators.required))
    this.configForm.addControl("contactPayableAccountCode", new FormControl({value: defaultAcc}, Validators.required))
    this.configForm.addControl("contactReceivableAccountCode", new FormControl({value: defaultAcc}, Validators.required))
  }

  ngOnInit() {}

  connectDeskera(){
    this.deskeraService.connectDeskera().subscribe(
      (data: any) => {
        window.open(data.url,'targetWindow',
        `toolbar=no,
        location=no,
        status=no,
        menubar=no,
        scrollbars=yes,
        resizable=0,
        width=450,
        height=450`)
      });
  }

  onConfigSubmit(controls){
    let body = controls
    body.productWarehouseCode = "WH-0000001"
    this.deskeraService.submitConfig(controls).subscribe(
        (data:any) => {
          this.toastrService.show(
            "Configs Updated",
            `Configs`
            );
          this.setCurrentStep(3)
        }, error => {
          const warningStatus:NbComponentStatus = 'danger';
          const config = {
              status: warningStatus,
          };
          this.toastrService.show(error.error.message, "", config);
        });
  }

}
