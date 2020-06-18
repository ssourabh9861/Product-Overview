/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import { AuthenticationService } from './authentication/services/authentication.service';
import { LocalStorageConstants } from './authentication/authentication.constants';
import { environment } from '../environments/environment';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { debug } from 'util';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit, OnDestroy {

  isLoggedIn = false;
  private unsubscribeAll: Subject<any>;

  constructor(
    private analytics: AnalyticsService, 
    private authenticationService: AuthenticationService,
    private seoService: SeoService
    ) {
      this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.authenticationService.isUserAuthenticated();
    this.authenticationService.userLoggedInObservable.pipe(takeUntil(this.unsubscribeAll)).subscribe((status) => {
      this.navigateToSignInOrDashboard(!!status.isLoggedIn);
    });
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
  }

  navigateToSignInOrDashboard(isLoggedIn: boolean) {
    if (isLoggedIn) {
        this.isLoggedIn = isLoggedIn;
    } else {
        window.location.href = environment.SSO_AUTH_URL + window.location.href;
    }
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
