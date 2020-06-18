import { NgModule } from '@angular/core';
import { ContactsComponent } from './contacts.component';
import { ThemeModule } from '../../@theme/theme.module';
import {
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbTreeGridModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ContactsComponent
  ],
  providers: [
  ],
})
export class ContactsModule { }
