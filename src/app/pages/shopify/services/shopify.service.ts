import { Injectable } from '@angular/core';
import { Subject, Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ShopifyService {
    userLoggedInSubject = new Subject<any>();
    userLoggedInObservable: Observable<any>;
    constructor(
        private http: HttpClient
    ) {
    }

    checkShopifyConnected() {
        return this.http.get(environment.apiUrl + "/shopdesk/shopify/redirecturl");
    }

    connectShop(shop) {
        return this.http.get(environment.apiUrl + "/shopdesk/shopify/redirecturl?shop=" + shop);
    }

    migrateItem(body) {
        return this.http.post(environment.apiUrl + '/shopdesk/shopify/migrate', body)
    }

}
