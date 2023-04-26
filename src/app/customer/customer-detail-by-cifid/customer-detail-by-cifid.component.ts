import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/class/customer';
import { CustomerAccount } from 'src/app/class/customer-account';
import { CustomerCustomerAccount } from 'src/app/class/customer-customer-account';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-detail-by-cifid',
  templateUrl: './customer-detail-by-cifid.component.html',
  styleUrls: ['./customer-detail-by-cifid.component.css']
})
export class CustomerDetailByCifidComponent implements OnInit{
  cifId: any;
  customer: Customer;
  customerAccounts: CustomerAccount[];
  citizenshipFrontImg: any;
  citizenshipBackImg: any;
  passportImg: any;
  profileImg: any;
  ngOnInit(): void {
    this.cifId = this.activatedRoute.snapshot.params['cifId'];

    this.getCustomerByCifID();
  }
  constructor(private customerService: CustomerService,private activatedRoute: ActivatedRoute, private router: Router,private sanitizer: DomSanitizer){

  }
  getCustomerByCifID(){
    let params = new HttpParams().set("cifId",this.cifId);
this.customerService.getByCifID(params).subscribe(
  {
   next: (response: CustomerCustomerAccount[]) => {
     if(response['message']==null){
       this.customer=response["customerDto"];        
       this.customerAccounts=response["customerAccountDtoList"];         
       this.citizenshipFrontImg=this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64, ${this.customer.citizenshipFrontEncodedImage}`); 
       this.citizenshipBackImg=this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64, ${this.customer.citizenshipBackEncodedImage}`); 
       this.passportImg=this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64, ${this.customer.passportEncodedImage}`); 
       this.profileImg=this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64, ${this.customer.profileEncodedImage}`); 

         
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


}
