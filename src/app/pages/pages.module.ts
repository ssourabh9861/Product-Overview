import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { ProductsModule } from './products/products.module';
import { ProductOverviewComponent } from './products/product-overview/product-overview.component';
import { OverviewComponent } from './products/product-overview/overview/overview.component';
import { TransactionsComponent } from './products/product-overview/transactions/transactions.component';
import { NotesComponent } from './products/product-overview/notes/notes.component';
import { InvoicesComponent } from './products/product-overview/transactions/invoices/invoices.component';
import { OrdersComponent } from './products/product-overview/transactions/orders/orders.component';
import { BillsComponent } from './products/product-overview/transactions/bills/bills.component';
import { QuotesComponent } from './products/product-overview/transactions/quotes/quotes.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatCardModule} from '@angular/material/card';
import {
  NbIconModule,
} from '@nebular/theme';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbIconModule,
    MiscellaneousModule,
    ProductsModule,
    MatToolbarModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatIconModule
  ],
  declarations: [
    PagesComponent,
    ProductOverviewComponent,
    OverviewComponent,
    TransactionsComponent,
    NotesComponent,
    InvoicesComponent,
    OrdersComponent,
    BillsComponent,
    QuotesComponent
  ],
  providers: [],
})
export class PagesModule {
}
