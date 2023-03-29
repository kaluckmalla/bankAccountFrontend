import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/class/customer';
import { CustomerService } from 'src/app/services/customer.service';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import { PaginationData } from 'src/app/class/pagination-data';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})

export class CustomerListComponent { 

   pageNumber: number;
   pageSize: number;
   totalCustomerNumber: number;

  customers: any;
  displayedColumns = ["customerId","name","gender","dob","phone","email","nationality","fatherName","motherName","citizenshipNumber",
  "cifId","branch","branchCode","customerAddedDate",
  "profileImagePath","account","customerDetail","customerAction"];
  responseMessage: any;

  constructor(private customerService: CustomerService, private router: Router,public activatedRoute: ActivatedRoute){    
  }
  ngOnInit(): void {
    this.pageNumber=0;
   this.pageSize=3;

   this.getCustomers(); 
  }
  getCustomers(){
    this.customerService.getAllCustomer(this.pageNumber,this.pageSize).subscribe(
      {
        next: (response: PaginationData[]) => {   

         if(response['message']!=null){
          this.responseMessage=response['message'];
        }
        else{

        this.customers=response['customer'];   
              this.totalCustomerNumber=response['totalCustomerNumber'],
        this.pageNumber=response['currentPageNumber']

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

  handlePageEvent(event: PageEvent){
    this.pageNumber=event.pageIndex;
    this.pageSize=event.pageSize;
    this.getCustomers();
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
