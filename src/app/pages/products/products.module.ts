import { NgModule } from '@angular/core';
import { ProductsComponent } from './products.component';
import { ThemeModule } from '../../@theme/theme.module';
import {
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbTreeGridModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {MatIconModule} from '@angular/material/icon';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";



@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    Ng2SmartTableModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  declarations: [
    ProductsComponent,

  ],
  providers: [
  ],
})
export class ProductsModule { }
