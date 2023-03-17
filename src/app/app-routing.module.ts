import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCustomerAccountComponent } from './customer-account/add-customer-account/add-customer-account.component';
import { CustomerAccountListComponent } from './customer-account/customer-account-list/customer-account-list.component';
import { UpdateCustomerAccountComponent } from './customer-account/update-customer-account/update-customer-account.component';
import { AddCustomerComponent } from './customer/add-customer/add-customer.component';
import { UpdateCustomerComponent } from './customer/update-customer/update-customer.component';

const routes: Routes = [{path: 'add-customer',title: 'Add Customer',component: AddCustomerComponent},{path: 'update-customer/:customerId',title: 'Update Customer',component: UpdateCustomerComponent},
{path:'customer-account-list/:customerId',title: 'Customer Account List',component: CustomerAccountListComponent,
children: [{path:'add-customer-account/:customerId',title: 'Add Customer Account',component: AddCustomerAccountComponent},{path: 'update-customer-account/:customerId/:customerAccountId',title: 'Update Customer Account',component: UpdateCustomerAccountComponent}]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
