import { Injectable, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { DataOverview } from '../data-variables/overview/data-overview';
import { Content } from "../data-variables/overview/content";
import { Observable, of } from 'rxjs';
import { DataClientService } from "./dataservicesclient.service";
import { IInvoice } from "../data-variables/transactions_data/invoices";
import { IOrders } from "../data-variables/transactions_data/orders";
import { IQuotes } from "../data-variables/transactions_data/quotes";
import { IBills } from "../data-variables/transactions_data/bills";
import { map, filter, concatMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  contents: Content;
  products: DataOverview;
  constructor(private dataClientService : DataClientService,private http : HttpClient) { }
  
  // ngOnInit(): void {


  //   this.dataClientService.getData().subscribe(data=> {
  //     this.products = data;
  //   })
  //     // this.data_product=data.content );
  // }

  // getData(productId: string):Observable<Content>{
  //   for (let index = 0; index < this.products.content.length;  index++) {
  //     if(this.products.content[index].productId == productId) {
  //       return of(this.products.content[index]);
  //     }
      
  //   }
  // }
  getProductFromId(ID):Observable<Content>{
    return this.dataClientService.getProductList().pipe(map(arrs =>{
      let fl = arrs.filter(arr => arr.id === ID);
      return (fl.length > 0) ? fl[0] : null;
    }));
    
  }

  getOrders(productId: string):Observable<IOrders>{
    return this.http.get<IOrders>("https://api-dev.deskera.xyz/v1/orders/purchase?limit=100&page=0&query=status%3DOPEN%2CpurchaseOrderItems.productCode%3D"+ productId +"&sort=createdAt&sortDir=desc");
  }

  getInvoices(productId: string):Observable<IInvoice>{
    return this.http.get<IInvoice>("https://api-dev.deskera.xyz/v1/invoices/sales?limit=100&page=0&query=status%3DOPEN%2CsalesInvoiceItems.productCode%3D"+ productId +"&sort=createdDate&sortDir=DESC");
  }
  getQuotes(productId: string):Observable<IQuotes>{
    return this.http.get<IQuotes>("https://api-dev.deskera.xyz/v1/quotations?limit=100&page=0&query=status%3DOPEN%2CquotationItemList.productCode%3D"+ productId +"&sort=createdAt&sortDir=desc");
  }
  getBills(productId: string):Observable<IBills>{
    return this.http.get<IBills>("https://api-dev.deskera.xyz/v1/invoices/purchase?limit=100&page=0&query=status%3DOPEN%2CpurchaseInvoiceProducts.productCode%3D"+ productId +"&sort=createdDate&sortDir=DESC");
  }

  getLastPurchase(productId: string):Observable<any>{
    return this.http.get("https://api-dev.deskera.xyz/v1/invoices/purchase?limit=1&page=0&query=status%3DOPEN%2CpurchaseInvoiceProducts.productCode%3D"+ productId +"&sort=updatedDate&sortDir=desc");
  }
  getLastSales(productId: string):Observable<any>{
    return this.http.get("https://api-dev.deskera.xyz/v1/invoices/sales?limit=1&page=0&query=status%3DOPEN%2CsalesInvoiceItems.productCode%3D"+ productId + "&sort=updatedDate&sortDir=desc");
  }
  pushQuantityQuotes(productId: string): Observable<any>{
    let option = {productVariantCodes: [productId], status: ["UNFULFILLED"], warehouseCode: "string"};
    return this.http.post("https://api-dev.deskera.xyz/v1/quotations/quotes-quantity", option);
  }
  pushQuantityOrder(productId: string): Observable<any>{
    let option = {productVariantCodes: [productId], status: [""], warehouseCode: "string"};
    return this.http.post("https://api-dev.deskera.xyz/v1/orders/purchase/orderStockQuantities", option);
  }

  printRequest(payload:any):Observable<any>{
    return this.http.post("https://api-dev.deskera.xyz/v1/template/exportDocument",payload,{responseType:'arraybuffer' as 'json'});
  }
  closeInvoice(id:number){
    return this.http.patch("https://api-dev.deskera.xyz/v1/invoices/sales/"+id,{status:"CLOSED"});
  }
  closeQuote(id:number){
    return this.http.patch('https://api-dev.deskera.xyz/v1/quotations/'+id,{status:"CLOSED"});
  }
  closeOrder(code:string){
    return this.http.patch("https://api-dev.deskera.xyz/v1/orders/purchase?orderCode="+code,{status:"CLOSED"});
  }
  closeBill(id:number){
    return this.http.patch("https://api-dev.deskera.xyz/v1/invoices/purchase/"+id,{status:"CLOSED"});
  }
}


