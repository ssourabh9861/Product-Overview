import { Injectable } from '@angular/core';
import { Subject, Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment';



@Injectable({
    providedIn: 'root',
})
export class DeskeraService {
    userLoggedInSubject = new Subject<any>();
    userLoggedInObservable: Observable<any>;

    constructor(
        private http: HttpClient,
        private cookieService: CookieService,
        private router: Router,
    ) {
    }

    checkDeskeraConnected() {
        return this.http.get(environment.apiUrl + "/shopdesk/deskera/redirecturl");
    }

    checkShopifyConnected() {
        return this.http.get(environment.apiUrl + "/shopdesk/shopify/redirecturl");
    }

    connectDeskera() {
        return this.http.get(environment.apiUrl + "/shopdesk/deskera/redirecturl");
    }

    connectShop(shop) {
        return this.http.get(environment.apiUrl + "/shopdesk/shopify/redirecturl?shop=" + shop);
    }

    submitConfig(controls) {
        return this.http.post(environment.apiUrl + "/shopdesk/deskera/accounts", controls);
    }

    fetchAccounts() {
        return this.http.get(environment.apiUrl + "/shopdesk/deskera/accounts");
    }

    fetchTaxes() {
        return this.http.get(environment.apiUrl + "/shopdesk/deskera/taxes");
    }

    syncData() {
        return this.http.get(environment.apiUrl +"/shopdesk/deskera/sync");
    }

    checkDeskeraConfigsSet() {
        return this.http.get(environment.apiUrl + "/shopdesk/deskera/configs");
    }

    connectByhmac(code) {
        return this.http.get(environment.apiUrl + '/shopdesk/shopify/connect?code='
        + code, { observe: 'response' });
    }

    connectByCode(code) {
        return this.http.get(environment.apiUrl + '/shopdesk/deskera/connect?code='+code)
    }
}
