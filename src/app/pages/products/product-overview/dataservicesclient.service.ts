import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { DataOverview } from '../data-variables/overview/data-overview';
import { Content } from "../data-variables/overview/content";
import { Observable } from 'rxjs/Observable';
import { concatMap, map,filter, catchError } from 'rxjs/operators';
import { Account } from "../data-variables/overview/account";
import { Tax } from "../data-variables/overview/tax";
import { IInvoiceContent } from "../data-variables/transactions_data/invoice_content";

@Injectable({
  providedIn: 'root'
})
export class DataClientService {

  constructor(private http : HttpClient) { }

  getData():Observable<DataOverview>{
    return this.http.get<DataOverview>("https://api-dev.deskera.xyz/v1/products?search=&SKIP_REQUEST_INTERCEPTOR=true&limit=10&page=0");
  }
  getProductList():Observable<Content[]>{
    return this.http.get<DataOverview>("https://api-dev.deskera.xyz/v1/products?search=&SKIP_REQUEST_INTERCEPTOR=true&limit=10&page=0").pipe(map(res=>res.content));
  }

  getImage(id: string):Observable<any>{
    return this.http.get("https://api-dev.deskera.xyz/v1/file/upload?relativeFilePath="+id, {responseType: 'text'}) ;
  }

  patchStatus(id: number, status: boolean):Observable<any>{
    let options = {active: status};
     return this.http.patch("https://api-dev.deskera.xyz/v1/products/"+ id.toString() ,options) ;
  }

  pushAccountTracked(purchaseAccount: string, salesAccount: string, costOfGoodsSoldAccount : string, inventoryAccount: string, stockAdjustmentAccount: string):Observable<Account[]>{
    let option = [purchaseAccount, salesAccount, costOfGoodsSoldAccount, inventoryAccount, stockAdjustmentAccount];
    return this.http.post<Account[]>("https://api-dev.deskera.xyz/v1/account/sequencecodes",option) ;
  }

  pushAccountNonTracked(purchaseAccount: string, salesAccount: string):Observable<Account[]>{
    let option = [purchaseAccount, salesAccount];
    return this.http.post<Account[]>("https://api-dev.deskera.xyz/v1/account/sequencecodes",option) ;
  }

  pushTax(purchaseTax: string, salesTax):Observable<Tax[]>{
    let option = {taxCodeList: [purchaseTax, salesTax]};
    return this.http.post<Tax[]>("https://api-dev.deskera.xyz/v1/taxes/codes",option) ;
  }

  pushEmail(invoice: IInvoiceContent){
    let option = {
      application: "ERP",
      body: "%3Cp%3EHi,%3C/p%3E%0A%20%20%20%20%20%20%20%20%3C/br%3E%3Cp%3EThank%20you%20for%20reaching%20out%20to%20us.%20Please%20find%20the%20INVOICE%20%5BAC-0014%5D%20attached%20with%20this%20mail,%20in%20response%20to%20your%20inquiry.%20Kindly%20review%20the%20same%20and%20contact%20us%20for%20any%20further%20queries%20or%20details.%3C/p%3E%0A%20%20%20%20%20%20%20%20%3Cp%3E%3C/br%3E%0A%20%20%20%20%20%20%20%20We%20look%20forward%20to%20doing%20business%20with%20you.%0A%20%20%20%20%20%20%20%20%3C/p%3E%0A%20%20%20%20%20%20%20%20%3Cp%3E%3C/br%3E%0A%20%20%20%20%20%20%20%20Thanks%20&%20Regards,%0A%20%20%20%20%20%20%20%20%3C/p%3E%0A%20%20%20%20%20%20%20%20%5Bdev211%5D",
      category: "INVOICE",
      exportDocumentRequest: {
        documentNumber: invoice.documentSequenceCode,
        moduleName: "ERP",
        categoryName: "INVOICE",
        headers: [{
          Address: "",
          BeforeTax: "$ 1,368.00",
          BillNo: invoice.salesInvoiceCode,
          BillToAddr: invoice.billTo.address1+ "," + invoice.billTo.state+","+ invoice.billTo.city+","+ invoice.billTo.country+","+ invoice.billTo.postalCode,
          BillToName: invoice.contact.name,
          CompanyName: "dev211",
          Date: invoice.salesInvoiceDate,
          Discount: "SGD 0.00",
          DueDate: invoice.salesInvoiceDueDate,
          ExpiryDate: invoice.salesInvoiceDueDate,
          Memo: invoice.memo,
          OrderNo: "",
          Phone: "+651234312",
          ShipToAddr: invoice.shipTo.address1 +  "," + invoice.shipTo.state+","+ invoice.shipTo.city+","+ invoice.shipTo.country+","+ invoice.shipTo.postalCode,
          ShipToName: invoice.contact.name,
          SubTotal: "SGD 1,368.00",
          Tax: "SGD 95.76",
          Total: "SGD 1,463.76",
          TotalBase: 1463.76,
          creditsTotal: "",
          creds: [],
          debitTotal: "",
          invoiceNumber: "AC-0014",
          items: [{
            Desc: "Cricket ball used in the match.",
            Disc: "SGD 0",
            Name: "Cricket Ball",
            Quant: "3",
            Tax: "SGD 95.76",
            Total: "SGD 1,463.76",
            unitPrice: "SGD 456.00",
          }],
          orderNo: invoice.salesInvoiceCode,
          outstandingAmt: "SGD 1,463.76",
          paymentsTotal: "",
          pays: [],
      }]},
      subject: "Invoice AC-0014 from dev211",
      to: "sourabh.kumar@deskera.org"
    }
  }
  

}
