import { Component, OnInit,ViewChild, TemplateRef} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import { ActivatedRoute } from '@angular/router';
import { IQuoteContent } from '../../../data-variables/transactions_data/quotes_content';
import { Content } from '../../../data-variables/overview/content';
import { DataClientService } from "../../dataservicesclient.service";
import { DataService } from "../../dataservice.service";
import { NbWindowService, NbWindowRef } from '@nebular/theme';

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
  selector: 'ngx-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {

  ELEMENT_DATA : IQuoteContent[];
  displayedColumns : string[] = ['sno','documentSequenceCode','validTillDate','totalAmount','fulfillmentStatus','action'];
  dataSource = new MatTableDataSource<IQuoteContent>(this.ELEMENT_DATA);

  public ID;
  product_Id;
  public Code;
  windowRef : NbWindowRef;

  @ViewChild(MatPaginator,{static:true}) paginator : MatPaginator;
  @ViewChild(MatSort,{static:true}) sort : MatSort;

  constructor(private windowService: NbWindowService, private route:ActivatedRoute, private _dataService: DataClientService, private dataService: DataService) {}

  ngOnInit(): void {

    this.route.parent.parent.paramMap.subscribe(params => {
      this.ID = params.get('id');  
    });

    this._dataService.getData().subscribe(data=> {
      for (let index = 0; index < data.content.length;  index++) {
        if(data.content[index].id == this.ID) {
          this.product_Id = data.content[index].productId;
          this.dataService.getQuotes(this.product_Id).subscribe((data)=>{this.dataSource.data = data.content as IQuoteContent[];console.log(this.dataSource.data)});
        }
      }
    })

    //this._transactionService.getData().subscribe(data=>this.dataSource.data=data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  Print(element:IQuoteContent){
    let product_items :Product_Item[] = [];
    let product_item : Product_Item = new Product_Item();
    for(let i=0;i<element.quotationItemDtoList.length;i++){
        product_item.Name =  element.quotationItemDtoList[i].productName;
        product_item.Desc = element.quotationItemDtoList[i].productDescription;
        product_item.Quant = String(element.quotationItemDtoList[i].productQuantity);
        product_item.unitPrice = "SGD "+ String(element.quotationItemDtoList[i].unitPrice);
        product_item.Disc = "SGD "+ String(element.quotationItemDtoList[i].discount);
        product_item.Tax = "SGD "+ String(element.quotationItemDtoList[i].taxAmount);
        product_item.Total = "SGD "+ String(element.quotationItemDtoList[i].amount);
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
          ExpiryDate: element.validTillDate,
          items: product_items,
          SubTotal: "SGD "+element.quotationItemDtoList[0].unitPrice,
          Discount: "SGD "+element.quotationItemDtoList[0].discount,
          Tax: "SGD " + element.quotationItemDtoList[0].taxAmount,
          Total: "SGD "+element.totalAmount,
          paymentsTotal: "",
          pays: [],
          creditsTotal: "",
          creds: [],
          outstandingAmt: "SGD 0.00",
          Memo: element.memo,
          DueDate: element.validTillDate,
          BeforeTax: "$ 11.00",
          TotalBase: element.totalAmountInBaseCurrency,
          orderNo: element.quotationCode,
          BillNo: element.quotationCode,
          debitTotal: "",
          OrderNo: "",
          quotationNumber: element.documentSequenceCode
        }
      ],
      documentNumber: element.documentSequenceCode,
      moduleName: "ERP",
      categoryName: "QUOTE"
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

  CloseTransaction(element:IQuoteContent){
    this.dataService.closeQuote(element.id).subscribe(
      data=>{
        console.log(data);
        location.reload();
      }
    );
  }
}
