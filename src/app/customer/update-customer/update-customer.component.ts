import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Address } from 'src/app/class/address';
import { AddressService } from 'src/app/services/address.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {
  maxDate= new Date();

  isCompleted=false

  customerId: any;
  customer: any={};//for getting single object i.e. customer
  
  public permanentAddress!: Address[];
  permanentCountries: any;
  permanentStates: any;
  permanentDistricts: any;
  permanentMunicipalities: any; 
  public temporaryAddress!: Address[];
  temporaryCountries: any;
  temporaryStates: any;
  temporaryDistricts: any;
  temporaryMunicipalities: any; 

  customerUpdateForm=new FormGroup({
    name: new FormControl('',Validators.required),
    dob: new FormControl('',[Validators.required]),
    gender: new FormControl('',[Validators.required]),
    phone: new FormControl('',[Validators.required,Validators.pattern('[0-9]{10}')]),
    email: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$')]),

    permanentCountryId: new FormControl('', Validators.required),
    permanentStatesId: new FormControl('', Validators.required),
    permanentDistrictsId: new FormControl('', Validators.required),
    permanentMunicipalitiesId: new FormControl('', Validators.required),
  
    temporaryCountryId: new FormControl('', Validators.required),
    temporaryStatesId: new FormControl('', Validators.required),
    temporaryDistrictsId: new FormControl('', Validators.required),
    temporaryMunicipalitiesId: new FormControl('', Validators.required),

    nationality: new FormControl('',[Validators.required]),
    fatherName: new FormControl('',[Validators.required]),
    motherName: new FormControl('',[Validators.required]),
    grandFatherName: new FormControl('',[Validators.required]),
    citizenshipNumber: new FormControl('',[Validators.required]),
    passportNumber: new FormControl(''),
    branch: new FormControl('',[Validators.required]),
    branchCode: new FormControl('',[Validators.required]),
  });
  
  constructor(private customerService: CustomerService,private addressService: AddressService,private activatedRoute: ActivatedRoute, private router: Router){

  }
  ngOnInit(): void {
    this.getCustomer(); 
    this.getAddress();
    this.addressService.getCountry()!.subscribe((data) => {
      this.permanentCountries = data;
      this.temporaryCountries = data});
    this.addressService.getState()!.subscribe((data) => {this.permanentStates = data;
      this.temporaryStates = data;}
      );  
   

  }
  public getAddress() {
    this.addressService.getAddress().subscribe(
      (response: Address[]) => {
        this.permanentAddress = response;
        this.temporaryAddress = response;
  
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  onChangePermanentCountry(countryId: any) {
    if (countryId) {
      this.addressService.getState().subscribe((data) => {
        this.permanentStates = data;
        this.permanentDistricts = null;
      });
    } else {
      this.permanentStates = null;
      this.permanentDistricts = null;
    }
  }
  onChangePermanentState(id: any) {
    if (id) {
      this.addressService.getDistrict(id).subscribe((data) => {
        this.permanentDistricts = data;
      });
    } else {
      this.permanentDistricts = null;
    }
  }
  
  onChangePermanentDistrict(id: any) {
    if (id) {
      this.addressService
        .getMunicipality(id)
        .subscribe((data) => (this.permanentMunicipalities = data));
    }
  }
  onChangeTemporaryCountry(countryId: any) {
    if (countryId) {
      this.addressService.getState().subscribe((data) => {
        this.temporaryStates = data;
        this.temporaryDistricts = null;
      });
    } else {
      this.temporaryStates = null;
      this.temporaryDistricts = null;
    }
  }
  onChangeTemporaryState(id: any) {
    if (id) {
      this.addressService.getDistrict(id).subscribe((data) => {
        this.temporaryDistricts = data;
      });
    } else {
      this.temporaryDistricts = null;
    }
  }
  
  onChangeTemporaryDistrict(id: any) {
    if (id) {
      this.addressService
        .getMunicipality(id)
        .subscribe((data) => (this.temporaryMunicipalities = data));
    }
  }
  getCustomer() {
    this.isCompleted=true;

    
    this.customerId = this.activatedRoute.snapshot.params['customerId'];

    this.customerService.getCustomer(this.customerId).subscribe(
       {
        next: (response) => {
          if(response)  {
            this.isCompleted=false;
          }
          if(response['message']==null){
            this.customer=response;
          console.log(response)
          this.customerUpdateForm.get('name')?.setValue(this.customer.name);
          this.customerUpdateForm.get('dob')?.setValue(this.customer.dob);
          this.customerUpdateForm.get('gender')?.setValue(this.customer.gender);
          this.customerUpdateForm.get('phone')?.setValue(this.customer.phone);
          this.customerUpdateForm.get('email')?.setValue(this.customer.email);

          this.customerUpdateForm.get('permanentCountryId')?.setValue(this.customer.permanentCountryId);
          this.onChangePermanentCountry(this.customer.permanentCountryId);
          this.customerUpdateForm.get('permanentStatesId')?.setValue(this.customer.permanentStatesId);
          this.onChangePermanentState(this.customer.permanentStatesId);
                    this.customerUpdateForm.get('permanentDistrictsId')?.setValue(this.customer.permanentDistrictsId);
          this.onChangePermanentDistrict(this.customer.permanentDistrictsId);
          this.customerUpdateForm.get('permanentMunicipalitiesId')?.setValue(this.customer.permanentMunicipalitiesId);

          this.customerUpdateForm.get('temporaryCountryId')?.setValue(this.customer.temporaryCountryId);
          this.onChangeTemporaryCountry(this.customer.temporaryCountryId);
          this.customerUpdateForm.get('temporaryStatesId')?.setValue(this.customer.temporaryStatesId);
          this.onChangeTemporaryState(this.customer.temporaryStatesId);
          this.customerUpdateForm.get('temporaryDistrictsId')?.setValue(this.customer.temporaryDistrictsId);
          this.onChangeTemporaryDistrict(this.customer.temporaryDistrictsId);
         this.customerUpdateForm.get('temporaryMunicipalitiesId')?.setValue(this.customer.temporaryMunicipalitiesId);


          this.customerUpdateForm.get('nationality')?.setValue(this.customer.nationality);
          this.customerUpdateForm.get('fatherName')?.setValue(this.customer.fatherName);
          this.customerUpdateForm.get('motherName')?.setValue(this.customer.motherName);
          this.customerUpdateForm.get('grandFatherName')?.setValue(this.customer.grandFatherName);
          this.customerUpdateForm.get('citizenshipNumber')?.setValue(this.customer.citizenshipNumber);
          this.customerUpdateForm.get('passportNumber')?.setValue(this.customer.passportNumber);
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
  this.isCompleted=true;
 
  if(this.customerUpdateForm.valid){
this.customerService.updateCustomer(customerId,this.customerUpdateForm.value).subscribe(
  {
    next: (response) => {    
      if(response)  {
        this.isCompleted=false;
      }    
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
