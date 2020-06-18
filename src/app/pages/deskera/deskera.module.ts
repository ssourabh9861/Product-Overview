import { NgModule } from '@angular/core';
import { DeskeraComponent } from './deskera.component';
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
  NbStepperModule,
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
    NbStepperModule,
  ],
  declarations: [
    DeskeraComponent
  ],
  providers: [
  ],
})
export class DeskeraModule { }
