import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerAccountService } from 'src/app/services/customer-account.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-update-customer-account',
  templateUrl: './update-customer-account.component.html',
  styleUrls: ['./update-customer-account.component.css']
})
export class UpdateCustomerAccountComponent implements OnInit{
  customerId: any;
  customerAccountId: any;
  customerAccount: any={};//for getting single object i.e. customer
  customerAccountUpdateForm=new FormGroup({
    accountType: new FormControl('',[Validators.required]),
currency: new FormControl('',[Validators.required]),    
currentBalance: new FormControl('',[Validators.required,Validators.min(1000),Validators.max(1000000000)]),
accountNumber: new FormControl('',[Validators.required])
  });
  
  constructor(private customerAccountService: CustomerAccountService,private activatedRoute: ActivatedRoute, private router: Router,private location: Location){

  }
  ngOnInit(): void {
    this.getCustomerSpecificAccount(); 
   

  }
  getCustomerSpecificAccount() {
    this.customerId = this.activatedRoute.snapshot.params['customerId'];

    this.customerAccountId = this.activatedRoute.snapshot.params['customerAccountId'];


    this.customerAccountService.getSpecificAccount(this.customerId,this.customerAccountId).subscribe(
       {
        next: (response) => {
          if(response['message']==null){
          this.customerAccount=response;
          this.customerAccountUpdateForm.get('accountType')?.setValue(this.customerAccount.accountType);
          this.customerAccountUpdateForm.get('currency')?.setValue(this.customerAccount.currency);     
          this.customerAccountUpdateForm.get('currentBalance')?.setValue(this.customerAccount.currentBalance); 
          this.customerAccountUpdateForm.get('accountNumber')?.setValue(this.customerAccount.accountNumber);      
     
      }
        else{
          alert('Response from Api : '+response['message'])
        }        
        },
        error: (error) => {
          alert('Error occor : '+error['message'])
        },
        complete: () => {
          
        }
      });
  
    }
   
onUpdate(customerId : any,customerAccountId: any){

  if(this.customerAccountUpdateForm.valid){
this.customerAccountService.updateAccount(customerId,customerAccountId,this.customerAccountUpdateForm.value).subscribe(
  {
    next: (response) => {        
     alert('Response from api : '+response['message'])
     if(response['message'] === "Customer account updated successfully"){
      this.location.back();
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
  else{
    alert('please fill required field') 

  }
}

}
