import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerAccount } from 'src/app/class/customer-account';
import { CustomerAccountService } from 'src/app/services/customer-account.service';

@Component({
  selector: 'app-customer-account-list',
  templateUrl: './customer-account-list.component.html',
  styleUrls: ['./customer-account-list.component.css']
})
export class CustomerAccountListComponent implements OnInit {
  customerId: any;
  customerAccounts: CustomerAccount[];//for getting array of object i.e. customer-accounts
  displayedColumns = ["customerAccountId","customerId","name", "accountNumber","accountType", "currency", "currentBalance", "accountOpenDate", "accountUpdatedDate","accountAction"];
responseMessage: any;




  constructor(private customerAccountService: CustomerAccountService,public activatedRoute: ActivatedRoute, private router: Router){

  }
  ngOnInit(): void {
    this.getCustomerAccounts();
  }
  getCustomerAccounts(){
    this.customerId = this.activatedRoute.snapshot.params['customerId'];

    this.customerAccountService.getAccounts(this.customerId).subscribe(
      {
        next: (response: CustomerAccount[]) => {  
          
         if(response['message']!=null){
        this.responseMessage=response['message'];
        }
        else{
          this.customerAccounts=response;     

        }
        },
        error: (error) => {
          alert('Error occor : '+error['message'])
        },
        complete: () => {
          
        }
      }
    );
  }
}
