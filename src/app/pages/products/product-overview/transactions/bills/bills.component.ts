
import { Component, OnInit,ViewChild } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Content } from '../../../data-variables/overview/content';
import { DataClientService } from "../../dataservicesclient.service";
import { DataService } from "../../dataservice.service";
import { IBillContent } from '../../../data-variables/transactions_data/bills_content';

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
  selector: 'ngx-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit {

  ELEMENT_DATA : IBillContent[];
  displayedColumns : string[] = ['sno','documentSequenceCode','purchaseInvoiceDueDate','totalAmount','receiveGoodsStatus','paymentStatus','action'];
  dataSource = new MatTableDataSource<IBillContent>(this.ELEMENT_DATA);

  constructor(private route:ActivatedRoute, private _dataService: DataClientService, private dataService: DataService) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  public ID;
  product_Id;

  ngOnInit(): void {

    this.route.parent.parent.paramMap.subscribe(params => {
      this.ID = params.get('id');  
    });

    this._dataService.getData().subscribe(data=> {
      for (let index = 0; index < data.content.length;  index++) {
        if(data.content[index].id == this.ID) {
          this.product_Id = data.content[index].productId;
          this.dataService.getBills(this.product_Id).subscribe((data)=>{this.dataSource.data = data.content as IBillContent[];console.log(this.dataSource.data)});
        }
      }
    })
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  Print(element:IBillContent){
    let product_items :Product_Item[] = [];
    let product_item :Product_Item = new Product_Item();
    for(let i=0;i<element.purchaseInvoiceProducts.length;i++){
        product_item.Name =  element.purchaseInvoiceProducts[i].productCode;
        product_item.Desc = element.purchaseInvoiceProducts[i].productDescription;
        product_item.Quant = String(element.purchaseInvoiceProducts[i].productQuantity);
        product_item.unitPrice = "SGD "+ String(element.purchaseInvoiceProducts[i].unitPrice);
        product_item.Disc = "SGD "+ String(element.purchaseInvoiceProducts[i].discount);
        product_item.Tax = "SGD "+ String(element.purchaseInvoiceProducts[i].taxAmount);
        product_item.Total = "SGD "+ String(element.purchaseInvoiceProducts[i].totalAmount);
        product_items.push(product_item);
    }
    let options = 
    {
      headers: [
        {
          CompanyName: "Admin",
          Address:element.shipTo,
          Date: element.purchaseInvoiceDate,
          Phone: "+651234312",
          BillToName: element.contact.name,
          BillToAddr: element.billTo,
          ShipToName: element.contact.name,
          ShipToAddr: element.shipTo,
          ExpiryDate: element.purchaseInvoiceDueDate,
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
          DueDate: element.purchaseInvoiceDueDate,
          BeforeTax: "$ 11.00",
          TotalBase: element.totalAmountInBaseCurrency,
          orderNo: element.purchaseInvoiceCode,
          BillNo: element.purchaseInvoiceCode,
          debitTotal: "",
          OrderNo: element.purchaseOrderRefNo,
          quotationNumber: element.documentSequenceCode
        }
      ],
      documentNumber: element.documentSequenceCode,
      moduleName: "ERP",
      categoryName: "BILLS"
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

  CloseTransaction(element:IBillContent){
    this.dataService.closeBill(element.id).subscribe(
      data=>{
        console.log(data);
        location.reload();
      }
    );
  }
}
