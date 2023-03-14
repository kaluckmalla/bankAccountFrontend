import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';



@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent  implements OnInit{
  
customerForm=new FormGroup({
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


  constructor(private customerService: CustomerService , private router: Router){
  }ngOnInit() {
    // called after the constructor and called  after the first ngOnChanges() 
   
}
 
onSubmit(){
if(this.customerForm.valid){
  this.customerService.save(this.customerForm.value).subscribe( 
    {
      next: (response) => {        
       alert('Response from api : '+response['message'])
       if(response['message'] === "Customer added successfully"){
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
