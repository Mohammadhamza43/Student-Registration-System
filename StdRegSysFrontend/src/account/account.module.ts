import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import {AngularMaterialModule} from '../app/angular-material/angular-material.module';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    AngularMaterialModule,
  ]
})
export class AccountModule { }
