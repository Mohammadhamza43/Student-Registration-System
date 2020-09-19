import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { RootRoutingModule } from './root-routing.module';
import { RootComponent } from './root.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppHttpInterceptor} from '../app/AppHttpInterceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NotifierModule} from 'angular-notifier';
import {FilterPipeModule} from 'ngx-filter-pipe';



@NgModule({
  declarations: [RootComponent],
  imports: [
    RootRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NotifierModule,
    FilterPipeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [RootComponent]
})
export class RootModule { }
