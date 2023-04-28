import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerAccountService } from 'src/app/services/customer-account.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-add-customer-account',
  templateUrl: './add-customer-account.component.html',
  styleUrls: ['./add-customer-account.component.css']
})
export class AddCustomerAccountComponent implements OnInit{
  customerId: any;
  customerAccountForm=new FormGroup({
    accountType: new FormControl('',Validators.required),
    currency: new FormControl('',[Validators.required]),
    currentBalance: new FormControl('',[Validators.required,Validators.min(1000),Validators.max(1000000000)]),
   
  });
  

  constructor(private customerAccountService: CustomerAccountService , private activatedRoute: ActivatedRoute,private location: Location){

  }
  ngOnInit(): void {
  }
  onSubmit(){

    if(this.customerAccountForm.valid){
      this.customerId = this.activatedRoute.snapshot.params['customerId'];

      this.customerAccountService.save(this.customerId ,this.customerAccountForm.value).subscribe( 
        {
          next: (response) => {        
           alert('Response from api : '+response['message'])         
           
           if(response['message'] === this.customerAccountForm.controls['accountType'].value+" account created successfully"){
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
