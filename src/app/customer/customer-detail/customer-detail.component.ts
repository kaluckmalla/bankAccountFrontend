import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit{
  customerId: any;
  customer: any;
  ngOnInit(): void {
this.getCustomerDetail();

  }
  constructor(private customerService: CustomerService,private activatedRoute: ActivatedRoute, private router: Router,private location: Location){

  }
  getCustomerDetail() {
  
    
    this.customerId = this.activatedRoute.snapshot.params['customerId'];

    this.customerService.getCustomer(this.customerId).subscribe(
       {
        next: (response) => {
          if(response['message']==null){
            this.customer=response;     
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
    goBack(){
      this.location.back();
    }
}
