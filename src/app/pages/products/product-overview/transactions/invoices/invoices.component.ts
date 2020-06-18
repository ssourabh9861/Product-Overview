import { Component, OnInit,ViewChild, TemplateRef } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import { ActivatedRoute } from '@angular/router';
import { Content } from '../../../data-variables/overview/content';
import { DataClientService } from "../../dataservicesclient.service";
import { DataService } from "../../dataservice.service";
import { IInvoiceContent } from '../../../data-variables/transactions_data/invoice_content';
import { NbWindowService } from '@nebular/theme';
import { EmailComponent } from "./email/email.component";


@Component({
  selector: 'ngx-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  ELEMENT_DATA : IInvoiceContent[];
  displayedColumns : string[] = ['sno','documentSequenceCode','salesInvoiceDueDate','totalAmount','fulfillmentStatus','paymentStatus','action'];
  dataSource = new MatTableDataSource<IInvoiceContent>(this.ELEMENT_DATA);

  public ID;
  product_Id;
  //public contact_data:any;

  constructor( private windowService: NbWindowService, private route:ActivatedRoute, private _dataService: DataClientService, private dataService: DataService) { }

   @ViewChild(MatPaginator,{static:true}) paginator : MatPaginator;
   @ViewChild(MatSort,{static:true}) sort : MatSort;
   @ViewChild('contentTemplate', {static: false}) contentTemplate: TemplateRef<any>;
   ngOnInit(): void {

    this.route.parent.parent.paramMap.subscribe(params => {
      this.ID = params.get('id');  
    });

    this._dataService.getData().subscribe(data=> {
      for (let index = 0; index < data.content.length;  index++) {
        if(data.content[index].id == this.ID) {
          this.product_Id = data.content[index].productId;
          this.dataService.getInvoices(this.product_Id).subscribe((data)=>{
            this.dataSource.data = data.content as IInvoiceContent[];
            this.ELEMENT_DATA = data.content;
          });
        }
      }
    })
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openWindow(element: IInvoiceContent) {
    this.windowService.open(EmailComponent, { title: `Send Email` });
  }


}
