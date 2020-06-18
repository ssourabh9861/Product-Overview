import { NgModule } from '@angular/core';
import { ShopifyComponent } from './shopify.component';
import { ThemeModule } from '../../@theme/theme.module';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbThemeModule,
} from '@nebular/theme';
import { FormsModule as ngFormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    ThemeModule,
    NbThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    ngFormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ShopifyComponent
  ],
  providers: [
  ],
})
export class ShopifyModule { }
