import { Component, OnInit,ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import { ActivatedRoute } from '@angular/router';
import { Content } from '../../../data-variables/overview/content';
import { DataClientService } from "../../dataservicesclient.service";
import { DataService } from "../../dataservice.service";
import { IInvoiceContent } from '../../../data-variables/transactions_data/invoice_content';

class Product_Item {
  Name: string;
  Desc: string;
  Quant: string;
  unitPrice: string;
  Disc: string;
  Tax: string;
  Total: string
}

@Component({
  selector: 'ngx-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  ELEMENT_DATA : IInvoiceContent[];
  displayedColumns : string[] = ['sno','salesInvoiceCode','salesInvoiceDueDate','totalAmount','fulfillmentStatus','paymentStatus','action'];
  dataSource = new MatTableDataSource<IInvoiceContent>(this.ELEMENT_DATA);

  public ID;
  product_Id;
  //public contact_data:any;

  constructor(private route:ActivatedRoute, private _dataService: DataClientService, private dataService: DataService) { }

   @ViewChild(MatPaginator,{static:true}) paginator : MatPaginator;
   @ViewChild(MatSort,{static:true}) sort : MatSort;
   ngOnInit(): void {

    this.route.parent.parent.paramMap.subscribe(params => {
      this.ID = params.get('id');  
    });

    this._dataService.getData().subscribe(data=> {
      for (let index = 0; index < data.content.length;  index++) {
        if(data.content[index].id == this.ID) {
          this.product_Id = data.content[index].productId;
          this.dataService.getInvoices(this.product_Id).subscribe((data)=>{this.dataSource.data = data.content as IInvoiceContent[];console.log(this.dataSource.data)});
        }
      }
    })
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  Print(element:IInvoiceContent){
    let product_items :Product_Item[] = [];
    let product_item : Product_Item = new Product_Item();
    for(let i=0;i<element.salesInvoiceItems.length;i++){
        product_item.Name =  element.salesInvoiceItems[i].productCode;
        product_item.Desc = element.salesInvoiceItems[i].productDescription;
        product_item.Quant = String(element.salesInvoiceItems[i].productQuantity);
        product_item.unitPrice = "SGD "+ String(element.salesInvoiceItems[i].unitPrice);
        product_item.Disc = "SGD "+ String(element.salesInvoiceItems[i].discount);
        product_item.Tax = "SGD "+ String(element.salesInvoiceItems[i].taxAmount);
        product_item.Total = "SGD "+ String(element.salesInvoiceItems[i].totalAmount);
        product_items.push(product_item);
    }
    let options = 
    {
      headers: [
        {
          CompanyName: "Admin",
          Address:element.shipTo,
          Date: element.salesInvoiceDate,
          Phone: "+651234312",
          BillToName: element.contact.name,
          BillToAddr: element.billTo,
          ShipToName: element.contact.name,
          ShipToAddr: element.shipTo,
          ExpiryDate: element.salesInvoiceDueDate,
          items: product_items,
          SubTotal: "SGD 11.00",
          Discount: "SGD 0.00",
          Tax: "SGD " + element.taxAmount,
          Total: "SGD "+element.totalAmount,
          paymentsTotal: "",
          pays: [],
          creditsTotal: "",
          creds: [],
          outstandingAmt: "SGD "+element.dueAmount,
          Memo: element.memo,
          DueDate: element.salesInvoiceDueDate,
          BeforeTax: "$ 11.00",
          TotalBase: element.totalAmountInBaseCurrency,
          orderNo: element.salesInvoiceCode,
          BillNo: element.salesInvoiceCode,
          debitTotal: "",
          OrderNo: element.purchaseOrderRefNo,
          quotationNumber: element.documentSequenceCode
        }
      ],
      documentNumber: element.documentSequenceCode,
      moduleName: "ERP",
      categoryName: "INVOICE"
    }
    this.dataService.printRequest(options).subscribe(
      (res) => {
        this.showpdf(res);
      },
      response => {
        console.log("POST in error", response);
      },
      () => {
        console.log("POST observable is now completed.");
      }
    )};
  showpdf(response:ArrayBuffer) {
    var file = new Blob([response], {type: 'application/pdf'});
    var fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  }
  CloseTransaction(element:IInvoiceContent){
    this.dataService.closeInvoice(element.id).subscribe(
      data=>{
        console.log(data);
        location.reload();
      }
    );
  }
}
