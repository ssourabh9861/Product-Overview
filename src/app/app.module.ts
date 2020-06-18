/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbChatModule,
  NbDatepickerModule,
  NbCardModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { AuthGuard } from './auth-guard.service';
import { MigrateButtonComponent } from './pages/migrate-button/migrate-button.component';
import { CommonInterceptor } from './common-utils/http/common.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NoteEditComponent } from "./pages/products/product-overview/notes/note-edit/note-edit.component";
import { EmailComponent } from "./pages/products/product-overview/transactions/invoices/email/email.component";

@NgModule({
  declarations: [AppComponent, MigrateButtonComponent, EmailComponent, NoteEditComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ThemeModule.forRoot(),
    NbEvaIconsModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    NbCardModule,
    NbWindowModule.forRoot(),
    CoreModule.forRoot(),
  ],
  entryComponents: [MigrateButtonComponent, EmailComponent, NoteEditComponent,],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CommonInterceptor,
      multi: true
    },
    CookieService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
