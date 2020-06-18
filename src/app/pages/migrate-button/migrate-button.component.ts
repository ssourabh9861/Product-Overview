import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';
import { NbAuthService, NbAuthSimpleToken } from '@nebular/auth';
import { environment } from '../../../environments/environment';
import { ShopifyService } from '../shopify/services/shopify.service';
import { NbToastrService, NbComponentStatus } from '@nebular/theme';
import { ButtonsComponent } from '../forms/buttons/buttons.component';


@Component({
  templateUrl: './migrate-button.component.html',
})
export class MigrateButtonComponent implements OnInit {

    public renderValue;

    @Input() value;
    @Input() rowData: any;
    user: NbAuthSimpleToken;
    hasBeenClicked: boolean = false;
    buttonClicked = false;

    @Output() updateResult = new EventEmitter<any>();

    constructor(
        private http: HttpClient, 
        private shopifyService: ShopifyService,
        private toastrService: NbToastrService,
        private authService: NbAuthService
    ) { 

        this.authService.onTokenChange()
            .subscribe((token: NbAuthSimpleToken) => {

            if (token.isValid()) {
                this.user = token
            }

        });
    }

    ngOnInit() {
        this.renderValue = this.value;
    }

    onMigrateButtonClick(value){
        switch(value){
            case "INVOICE":
            case "PRODUCT":
            case "CONTACT":
                this.migrateDeskeraId();
                break;
        }
    }

    migrateDeskeraId(){
        this.hasBeenClicked = true;
        const body = {
            type: this.value,
            ids: [this.rowData.id]
        }
        this.shopifyService.migrateItem(body).subscribe(
            (data: any) => {
                this.rowData.deskera_id = data.mapping[this.rowData.id]
                this.updateResult.emit(this.rowData);
            },  error => {
                const warningStatus:NbComponentStatus = 'danger';
                const config = {
                    status: warningStatus,
                };
                this.toastrService.show(error.error.message, "", config);
            }
        )
    }

}