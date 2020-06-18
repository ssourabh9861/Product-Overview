import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { DataOverview } from '../data-variables/overview/data-overview';
import { Content } from "../data-variables/overview/content";
import { Observable } from 'rxjs/Observable';
import { concatMap, map,filter, catchError } from 'rxjs/operators';
import { Account } from "../data-variables/overview/account";
import { Tax } from "../data-variables/overview/tax";
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

}
