import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCustomerComponent } from './customer/add-customer/add-customer.component';
import { UpdateCustomerComponent } from './customer/update-customer/update-customer.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';





@NgModule({
  declarations: [
    AppComponent,
    AddCustomerComponent,
    UpdateCustomerComponent,
    CustomerListComponent,
    
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    FormsModule,ReactiveFormsModule,
    HttpClientModule, BrowserAnimationsModule,
    MaterialModule

   
          ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
