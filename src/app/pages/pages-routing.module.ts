import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { ProductsComponent } from './products/products.component';
import { ProductOverviewComponent } from "./products/product-overview/product-overview.component";
import { TransactionsComponent } from './products/product-overview/transactions/transactions.component';
import { InvoicesComponent } from './products/product-overview/transactions/invoices/invoices.component';
import { OrdersComponent } from './products/product-overview/transactions/orders/orders.component';
import { QuotesComponent } from './products/product-overview/transactions/quotes/quotes.component';
import { BillsComponent } from './products/product-overview/transactions/bills/bills.component';
import { OverviewComponent } from './products/product-overview/overview/overview.component';
import { NotesComponent } from './products/product-overview/notes/notes.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
 
    {
      path: 'products',
      // loadChildren: () => import('./products/products.module')
      //   .then(m => m.ProductsModule),
      component: ProductsComponent,

    },
    {
      path: 'products/product_overview/:id', component: ProductOverviewComponent,
      children: [
      {path: 'transactions', component: TransactionsComponent,
        children: [
          {path:'quotes',component:QuotesComponent},
          {path:'invoices',component:InvoicesComponent},
          {path:'orders',component:OrdersComponent},
          {path:'bills',component:BillsComponent},
          {
            path: '',
            redirectTo: 'quotes',
            pathMatch: 'full',
          },
          {
            path: '**',
            component: NotFoundComponent,
          },
        ]
      },
      {path: 'overview', component: OverviewComponent},
      {path: 'notes', component: NotesComponent},
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ]},
    
    {
      path: '',
      redirectTo: 'products',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
