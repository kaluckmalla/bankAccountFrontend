import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { FormControl, FormGroup,Validators } from '@angular/forms';

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
          
          this.customerUpdateForm.get('name')?.setValue(this.customer.name);
          this.customerUpdateForm.get('dob')?.setValue(this.customer.dob);
          this.customerUpdateForm.get('gender')?.setValue(this.customer.gender);
          this.customerUpdateForm.get('phone')?.setValue(this.customer.phone);
          this.customerUpdateForm.get('email')?.setValue(this.customer.email);
          this.customerUpdateForm.get('address')?.setValue(this.customer.address);
          this.customerUpdateForm.get('nationality')?.setValue(this.customer.nationality);
          this.customerUpdateForm.get('fatherName')?.setValue(this.customer.fatherName);
          this.customerUpdateForm.get('motherName')?.setValue(this.customer.motherName);
          this.customerUpdateForm.get('grandFatherName')?.setValue(this.customer.grandFatherName);
          this.customerUpdateForm.get('citizenshipNumber')?.setValue(this.customer.citizenshipNumber);
          this.customerUpdateForm.get('passportNumber')?.setValue(this.customer.passportNumber);
          this.customerUpdateForm.get('imageName')?.setValue(this.customer.imageName);
          this.customerUpdateForm.get('branch')?.setValue(this.customer.branch);
          this.customerUpdateForm.get('branchCode')?.setValue(this.customer.branchCode);

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
  console.log(this.customerUpdateForm.value.name);
 
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
