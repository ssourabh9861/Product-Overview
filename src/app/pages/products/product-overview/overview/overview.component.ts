import { Component, OnInit } from '@angular/core';
import { Content } from "../../data-variables/overview/content";
import { ActivatedRoute } from '@angular/router';
import { DataClientService } from "../dataservicesclient.service";
import { Account } from "../../data-variables/overview/account";
import { Tax } from "../../data-variables/overview/tax";
import { Observable, of } from 'rxjs';
import { DataService } from "../dataservice.service";
import { map, filter, concatMap } from 'rxjs/operators';

@Component({
  selector: 'ngx-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  id;
  product_Id;
  productId;
  cont: Content;
  image_path: string;
  image_add;
  prod_type = false;
  sales_tax = false;
  purchase_tax = false;
  purchaseAccount: Observable<string>;
  salesAccount: Observable<string>;
  trackedCost: Observable<string>;
  trackedInventory: Observable<string>;
  trackedStock: Observable<string>;
  tax_sales: Observable<string>;
  tax_purchase: Observable<string>;
  purhase_account: string;
  lastSales: Observable<number>;
  lastPur: Observable<number>;
  content: Observable<Content>;
  commitedQuotes: Observable<number>;
  quantityOrder: Observable<number>;

  constructor(private _dataClientService: DataClientService, private _dataService: DataService,  private route: ActivatedRoute ) { }

  ngOnInit(): void {
    
    //getting product id parameter
    this.route.parent.paramMap.subscribe(params => {
      this.id = params.get('id');  
    });
    // getting content of selected product
    this.content = this._dataService.getProductFromId(this.id);
    
    //getting required parameter
    this.content.subscribe(data=> {
      this.productId = data.productId;
      // this.image_path = data.images[0];
      this._dataClientService.getImage(data.images[0]).subscribe(img=>{
        this.image_add=img; } 
      );
    })
    
    // getting image address
    // this._dataClientService.getImage(this.image_path).subscribe(img=>{
    //   this.image_add=img; } 
    // );

    this._dataClientService.getData().subscribe(data=> {
      for (let index = 0; index < data.content.length;  index++) {
        if(data.content[index].id == this.id) {
          this.cont = data.content[index];
          this.image_path= data.content[index].images[0];
          this.product_Id = data.content[index].productId;
          if (data.content[index].type=="TRACKED") {
            this.prod_type=true;
          }
          if (data.content[index].salesPriceTaxInclusive) {
            this.sales_tax=true;
          }
          if (data.content[index].purchasePriceTaxInclusive) {
            this.purchase_tax=true;
          }
          
          if(this.cont.inventory) {
            this.trackedCost = this._dataClientService.pushAccountTracked(this.cont.purchaseAccountCode, this.cont.salesAccountCode, this.cont.inventory.costOfGoodsSoldAccountCode, this.cont.inventory.inventoryAccountCode, this.cont.inventory.stockAdjustmentAccountCode).pipe(map(arrs =>{
              let fl = arrs.filter(arr => arr.code === this.cont.inventory.costOfGoodsSoldAccountCode);
              return (fl.length > 0) ? fl[0].name : null;
            }));
            this.trackedInventory = this._dataClientService.pushAccountTracked(this.cont.purchaseAccountCode, this.cont.salesAccountCode, this.cont.inventory.costOfGoodsSoldAccountCode, this.cont.inventory.inventoryAccountCode, this.cont.inventory.stockAdjustmentAccountCode).pipe(map(arrs =>{
              let fl = arrs.filter(arr => arr.code === this.cont.inventory.inventoryAccountCode);
              return (fl.length > 0) ? fl[0].name : null;
            }));
            this.trackedStock = this._dataClientService.pushAccountTracked(this.cont.purchaseAccountCode, this.cont.salesAccountCode, this.cont.inventory.costOfGoodsSoldAccountCode, this.cont.inventory.inventoryAccountCode, this.cont.inventory.stockAdjustmentAccountCode).pipe(map(arrs =>{
              let fl = arrs.filter(arr => arr.code === this.cont.inventory.stockAdjustmentAccountCode);
              return (fl.length > 0) ? fl[0].name : null;
            }));
            this.purchaseAccount = this._dataClientService.pushAccountTracked(this.cont.purchaseAccountCode, this.cont.salesAccountCode, this.cont.inventory.costOfGoodsSoldAccountCode, this.cont.inventory.inventoryAccountCode, this.cont.inventory.stockAdjustmentAccountCode).pipe(map(arrs =>{
              let fl = arrs.filter(arr => arr.code === this.cont.purchaseAccountCode);
              return (fl.length > 0) ? fl[0].name : null;
            }));
            this.salesAccount = this._dataClientService.pushAccountTracked(this.cont.purchaseAccountCode, this.cont.salesAccountCode, this.cont.inventory.costOfGoodsSoldAccountCode, this.cont.inventory.inventoryAccountCode, this.cont.inventory.stockAdjustmentAccountCode).pipe(map(arrs =>{
              let fl = arrs.filter(arr => arr.code === this.cont.salesAccountCode);
              return (fl.length > 0) ? fl[0].name : null;
            }));

        }
        else {
          this.purchaseAccount = this._dataClientService.pushAccountNonTracked(this.cont.purchaseAccountCode, this.cont.salesAccountCode).pipe(map(arrs =>{
            let fl = arrs.filter(arr => arr.code === this.cont.purchaseAccountCode);
            return (fl.length > 0) ? fl[0].name : null;
          }));
          this.salesAccount = this._dataClientService.pushAccountNonTracked(this.cont.purchaseAccountCode, this.cont.salesAccountCode).pipe(map(arrs =>{
            let fl = arrs.filter(arr => arr.code === this.cont.salesAccountCode);
            return (fl.length > 0) ? fl[0].name : null;
          }));
        }

        this.tax_purchase = this._dataClientService.pushTax(this.cont.purchaseTaxCode,this.cont.salesTaxCode).pipe(map(arrs =>{
          let fl = arrs.filter(arr => arr.type === "PURCHASE");
          return (fl.length > 0) ? fl[0].taxCode : null;
        }));

        this.tax_sales = this._dataClientService.pushTax(this.cont.purchaseTaxCode,this.cont.salesTaxCode).pipe(map(arrs =>{
          let fl = arrs.filter(arr => arr.type === "SALES");
          return (fl.length > 0) ? fl[0].taxCode : null;
        }));

        this.lastSales = this._dataService.getLastSales(this.product_Id).pipe(map(res=>((res.content)[0].salesInvoiceItems)[0].totalAmount));
        this.lastPur = this._dataService.getLastPurchase(this.product_Id).pipe(map(res=>((res.content)[0].purchaseInvoiceProducts)[0].totalAmount));
        this.commitedQuotes = this._dataService.pushQuantityQuotes(this.product_Id).pipe(map(res=>(res.productStockInfo)[0].receiptQuantity));
        this.quantityOrder = this._dataService.pushQuantityOrder(this.product_Id).pipe(map(res=>(res.productStockInfo)[0].pendingQuantity));
        }
      }
    });
   
  }

}

