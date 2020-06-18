import { Component, OnInit,ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import { ActivatedRoute } from '@angular/router';
import { IOrderContent } from '../../../data-variables/transactions_data/orders_content';
import { Content } from '../../../data-variables/overview/content';
import { DataClientService } from "../../dataservicesclient.service";
import { DataService } from "../../dataservice.service";

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
  selector: 'ngx-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
 
  ELEMENT_DATA : IOrderContent[];
  displayedColumns : string[] = ['sno','documentSequenceCode','dueDate','totalAmount','receiptStatus','action'];
  dataSource = new MatTableDataSource<IOrderContent>(this.ELEMENT_DATA);

  public ID;
  product_Id
  public invoice_data : IOrderContent[];

  @ViewChild(MatPaginator,{static:true}) paginator : MatPaginator;
  @ViewChild(MatSort,{static:true}) sort : MatSort;

  constructor(private route:ActivatedRoute, private _dataService: DataClientService, private dataService: DataService) { }

  ngOnInit(): void {

    this.route.parent.parent.paramMap.subscribe(params => {
      this.ID = params.get('id');  
    });  

    this._dataService.getData().subscribe(data=> {
      for (let index = 0; index < data.content.length;  index++) {
        if(data.content[index].id == this.ID) {
          this.product_Id = data.content[index].productId;
          this.dataService.getOrders(this.product_Id).subscribe((data)=>{this.dataSource.data = data.content as IOrderContent[];console.log(this.dataSource.data)});
        }
      }
    })

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  Print(element:IOrderContent){
    let product_items :Product_Item[] = [];
    let product_item : Product_Item = new Product_Item();
    for(let i=0;i<element.purchaseOrderItems.length;i++){
        product_item.Name =  element.purchaseOrderItems[i].productCode;
        product_item.Desc = element.purchaseOrderItems[i].productDescription;
        product_item.Quant = String(element.purchaseOrderItems[i].productQuantity);
        product_item.unitPrice = "SGD "+ String(element.purchaseOrderItems[i].unitPrice);
        product_item.Disc = "SGD "+ String(element.purchaseOrderItems[i].discount);
        product_item.Tax = "SGD "+ String(element.purchaseOrderItems[i].taxAmount);
        product_item.Total = "SGD "+ String(element.purchaseOrderItems[i].totalAmount);
        product_items.push(product_item);
    }
    let options = 
    {
      headers: [
        {
          CompanyName: "Admin",
          Address:element.shipTo,
          Date: element.documentDate,
          Phone: "+651234312",
          BillToName: element.contact.name,
          BillToAddr: element.billTo,
          ShipToName: element.contact.name,
          ShipToAddr: element.shipTo,
          ExpiryDate: element.dueDate,
          items: product_items,
          SubTotal: "SGD "+element.totalAmount,
          Discount: "SGD 0.00",
          Tax: "SGD 0.00",
          Total: "SGD "+element.totalAmount,
          paymentsTotal: "",
          pays: [],
          creditsTotal: "",
          creds: [],
          outstandingAmt: "SGD 0.00",
          Memo: element.memo,
          DueDate: element.dueDate,
          BeforeTax: "$ 11.00",
          TotalBase: element.totalAmountInBaseCurrency,
          orderNo: element.documentSequenceCode,
          BillNo: element.documentSequenceCode,
          debitTotal: "",
          OrderNo: "",
          quotationNumber: element.documentSequenceCode
        }
      ],
      documentNumber: element.documentSequenceCode,
      moduleName: "ERP",
      categoryName: "ORDER"
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
  CloseTransaction(element:IOrderContent){
    this.dataService.closeOrder(element.documentSequenceCode).subscribe(
      data=>{
        console.log(data);
        location.reload();
      }
    );
  }
}
