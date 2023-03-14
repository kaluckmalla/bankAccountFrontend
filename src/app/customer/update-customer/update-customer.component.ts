import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {
  customerId: any;
  customer: any={};//for getting single object i.e. customer

  customerUpdateForm=new FormGroup({
    name: new FormControl('',Validators.required),
    dob: new FormControl('',[Validators.required]),
    gender: new FormControl('',[Validators.required]),
    phone: new FormControl('',[Validators.required,Validators.pattern('(\\+977 )[0-9]{10}')]),
    email: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$')]),
    address: new FormControl('',[Validators.required]),
    nationality: new FormControl('',[Validators.required]),
    fatherName: new FormControl('',[Validators.required]),
    motherName: new FormControl('',[Validators.required]),
    grandFatherName: new FormControl('',[Validators.required]),
    citizenshipNumber: new FormControl('',[Validators.required]),
    passportNumber: new FormControl(''),
    imageName: new FormControl('',[Validators.required]),
    branch: new FormControl('',[Validators.required]),
    branchCode: new FormControl('',[Validators.required]),
  });
  
  constructor(private customerService: CustomerService,private activatedRoute: ActivatedRoute, private router: Router){

  }
  ngOnInit(): void {
    this.getCustomer(); 
  }
  getCustomer() {
    this.customerId = this.activatedRoute.snapshot.params['customerId'];

    this.customerService.getCustomer(this.customerId).subscribe(
       {
        next: (response) => {
          if(response['message']==null){
          this.customer=response;

      this.customerUpdateForm=new FormGroup({
        name: new FormControl(this.customer.name),
        dob: new FormControl(this.customer.dob),
        gender: new FormControl(this.customer.gender),
        phone: new FormControl(this.customer.phone),
        email: new FormControl(this.customer.email),
        address: new FormControl(this.customer.address),
        nationality: new FormControl(this.customer.nationality),
        fatherName: new FormControl(this.customer.fatherName),
        motherName: new FormControl(this.customer.motherName),
        grandFatherName: new FormControl(this.customer.grandFatherName),
        citizenshipNumber: new FormControl(this.customer.citizenshipNumber),
        passportNumber: new FormControl(this.customer.passportNumber),
        imageName: new FormControl(this.customer.imageName),
        branch: new FormControl(this.customer.branch),
        branchCode: new FormControl(this.customer.branchCode)
  
        })
      
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
   
onUpdate(customerId : any){
  if(this.customerUpdateForm.valid){
this.customerService.updateCustomer(customerId,this.customerUpdateForm.value).subscribe(
  {
    next: (response) => {        
     alert('Response from api : '+response['message'])
     if(response['message'] === "Customer updated successfully"){
      this.router.navigate(['/']);
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
