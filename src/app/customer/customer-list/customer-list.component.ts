import { Component } from '@angular/core';
import { Customer } from 'src/app/class/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent {
  customers: Customer[];
  
  constructor(private customerService: CustomerService){    
  }
  ngOnInit(): void {
   this.getCustomers(); 
  }
  getCustomers(){
    this.customerService.getAllCustomer().subscribe((response : Customer[])=>{
      this.customers=response;
    });
  }
  deleteCustomer(customerId: string){
    this.customerService.deleteOneCustomer(customerId).subscribe(
      {
        next: (response) => {
        
         alert('Response from api : '+response['message'])
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
