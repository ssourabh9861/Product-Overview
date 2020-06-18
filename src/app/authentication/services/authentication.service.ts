import { Injectable } from '@angular/core';
import { Subject, Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { LocalStorageConstants } from '../authentication.constants';
import { CookieService } from 'ngx-cookie-service';
import * as jwt_decode from "jwt-decode";

const authenticationAPIEndPoint = {
   
};

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    userLoggedInSubject = new Subject<any>();
    userLoggedInObservable: Observable<any>;

    constructor(
        private http: HttpClient,
        private cookieService: CookieService,
        private router: Router,
    ) {
        this.userLoggedInObservable = this.userLoggedInSubject.asObservable();
    }

    isUserAuthenticated() {
        this.http.get(environment.SSO_LOGGED_IN_STATUS_URL).subscribe(
            (response) => {
                if (response) {
                    this.setAuthStorageData(response);
                    this.setCookies();
                    let userDetails = jwt_decode(response['idToken']);
                } else {
                    this.clearSession();
                    this.userLoggedInSubject.next({ isLoggedIn: false });
                }
            },
            (error) => {
                this.clearSession();
                this.userLoggedInSubject.next({ isLoggedIn: false });
            }
        );
    }

    setAuthStorageData(data) {
        let userDetails = jwt_decode(data.idToken);
        localStorage.setItem(LocalStorageConstants.TENANT_ID, userDetails['tenantId']);
        localStorage.setItem(LocalStorageConstants.TENANT_NAME, userDetails['website']);
        localStorage.setItem(LocalStorageConstants.EMAIL, userDetails['email']);
        localStorage.setItem(LocalStorageConstants.CONTACT, userDetails['phone_number']);
        localStorage.setItem(LocalStorageConstants.USER_NAME, userDetails['user_name']);
        localStorage.setItem(LocalStorageConstants.FULL_NAME, userDetails['name']);

        localStorage.setItem(LocalStorageConstants.ACCESS_TOKEN, data['accessToken']);
        localStorage.setItem(LocalStorageConstants.REFRESH_TOKEN, data['refreshToken']);
        localStorage.setItem(LocalStorageConstants.ID_TOKEN, data['idToken']);
        localStorage.setItem(LocalStorageConstants.EXPIRES_IN, data['expiresIn']);
        localStorage.setItem(LocalStorageConstants.TOKEN_TYPE, data['tokenType']);
    }

    setCookies() {
        this.cookieService.set('project', this.router.url, 3600, '/', environment.COOKIE);
        this.cookieService.set('project', this.router.url, 3600, '/', environment.COOKIE);
    }

    clearSession() {
        localStorage.clear();
        this.cookieService.deleteAll('/', environment.COOKIE);
        this.cookieService.deleteAll('/', window.location.hostname);
    }
}
