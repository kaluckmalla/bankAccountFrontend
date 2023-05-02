import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/app/class/address';
import { AddressService } from 'src/app/services/address.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css'],
})
export class AddCustomerComponent implements OnInit {
  maxDate = new Date();
  passportCheckBox = false;
  submitted = false;
  isCompleted = false;
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

  selectedCitizenshipFrontImg: any;
  citizenshipFrontImgName: any;
  citizenshipFrontEncodedImg: any;

  selectedCitizenshipBackImg: any;
  citizenshipBackImgName: any;
  citizenshipBackEncodedImg: any;

  selectedPassportImg: any;
  passportImgName: any;
  passportEncodedImg: any;

  selectedProfileImg: any;
  profileImgName: any;
  profileEncodedImg: any;

  customerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    dob: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),
    email: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z0-9_+&*-]+(?:.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+.)+[a-zA-Z]{2,7}$')]),

    permanentCountryId: new FormControl('', Validators.required),
    permanentStatesId: new FormControl('', Validators.required),
    permanentDistrictsId: new FormControl('', Validators.required),
    permanentMunicipalitiesId: new FormControl('', Validators.required),

    temporaryCountryId: new FormControl('', Validators.required),
    temporaryStatesId: new FormControl('', Validators.required),
    temporaryDistrictsId: new FormControl('', Validators.required),
    temporaryMunicipalitiesId: new FormControl('', Validators.required),

    nationality: new FormControl('', [Validators.required]),
    fatherName: new FormControl('', [Validators.required]),
    motherName: new FormControl('', [Validators.required]),
    grandFatherName: new FormControl('', [Validators.required]),
    citizenshipNumber: new FormControl('', [Validators.required]),

    citizenshipFrontImageName: new FormControl(''),
    citizenshipFrontEncodedImage: new FormControl(''),
    citizenshipBackImageName: new FormControl(''),
    citizenshipBackEncodedImage: new FormControl(''),
    passportImageName: new FormControl(''),
    passportEncodedImage: new FormControl(''),
    profileImageName: new FormControl(''),
    profileEncodedImage: new FormControl(''),

    passportNumber: new FormControl(''),
    branch: new FormControl('', [Validators.required]),
    branchCode: new FormControl('', [Validators.required]),
  });

  constructor(
    private customerService: CustomerService,
    private addressService: AddressService,
    private router: Router
  ) {}
  ngOnInit() {
    // called after the constructor and called  after the first ngOnChanges()
    this.getAddress();
    this.addressService.getCountry()!.subscribe((data) => {
      this.permanentCountries = data;
      this.temporaryCountries = data;
    });
    this.addressService.getState()!.subscribe((data) => {
      this.permanentStates = data;
      this.temporaryStates = data;
    });
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
  onChangePermanentAddress(e) {
    let countryId: any = this.customerForm.value.permanentCountryId;
    let statesId: any = this.customerForm.value.permanentStatesId;
    this.onChangeTemporaryState(statesId);
    let districtsId: any = this.customerForm.value.permanentDistrictsId;
    this.onChangeTemporaryDistrict(districtsId);
    let municipalitiesId: any =
      this.customerForm.value.permanentMunicipalitiesId;
    this.customerForm.get('temporaryCountryId')?.setValue(countryId);
    this.customerForm.get('temporaryStatesId')?.setValue(statesId);
    this.customerForm.get('temporaryDistrictsId')?.setValue(districtsId);
    this.customerForm
      .get('temporaryMunicipalitiesId')
      ?.setValue(municipalitiesId);
    e.preventDefault();
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
  onSubmit() {
    this.submitted = true;
    this.isCompleted = true;

    this.customerForm.controls['citizenshipFrontImageName'].setValue(
      this.citizenshipFrontImgName
    );
    var cfeiImg = this.customerForm.controls['citizenshipFrontEncodedImage'];
    cfeiImg.setValue(this.citizenshipFrontEncodedImg);

    this.customerForm.controls['citizenshipBackImageName'].setValue(
      this.citizenshipBackImgName
    );
    var cbeiImg = this.customerForm.controls['citizenshipBackEncodedImage'];
    cbeiImg.setValue(this.citizenshipBackEncodedImg);

    this.customerForm.controls['passportImageName'].setValue(
      this.passportImgName
    );
    var pImg = this.customerForm.controls['passportEncodedImage'];
    pImg.setValue(this.passportEncodedImg);

    this.customerForm.controls['profileImageName'].setValue(
      this.profileImgName
    );
    var prImg = this.customerForm.controls['profileEncodedImage'];
    prImg.setValue(this.profileEncodedImg);

    if (this.customerForm.valid) {
      this.customerService.save(this.customerForm.value).subscribe({
        next: (response) => {
          if (response) {
            this.isCompleted = false;
          }
          alert('Response from api : ' + response['message']);
          if (response['message'] === 'Customer added successfully') {
            this.router.navigate(['/']);

            //reseting validators
          }
        },
        error: (error) => {
          this.isCompleted = false;

          alert('Error occor : ' + error['message']);
        },
        complete: () => {},
      });
    } else {
      alert('please fill required field');
    }
  }
  //for front select
  selectCitizenshipFrontImg(event) {
    var files = event.target.files;
    this.selectedCitizenshipFrontImg = event.target.files;
    var file = files[0];
    this.citizenshipFrontImgName = files[0].name;

    if (files && file) {
      var reader = new FileReader();

      reader.onload = this.handleFrontImg.bind(this);

      reader.readAsBinaryString(file);
    }
  }
  handleFrontImg(event) {
    var binaryString = event.target.result;
    this.citizenshipFrontEncodedImg = window.btoa(binaryString);
  }

  //for back select
  selectCitizenshipBackImg(event) {
    var files = event.target.files;
    this.selectedCitizenshipBackImg = event.target.files;
    var file = files[0];
    this.citizenshipBackImgName = files[0].name;

    if (files && file) {
      var reader = new FileReader();

      reader.onload = this.handleBackImg.bind(this);

      reader.readAsBinaryString(file);
    }
  }
  handleBackImg(event) {
    var binaryString = event.target.result;
    this.citizenshipBackEncodedImg = window.btoa(binaryString);
  }
  //for passport select
  selectPassportImg(event) {
    var files = event.target.files;
    this.selectedPassportImg = event.target.files;
    var file = files[0];
    this.passportImgName = files[0].name;

    if (files && file) {
      var reader = new FileReader();

      reader.onload = this.handlePassportImg.bind(this);

      reader.readAsBinaryString(file);
    }
  }
  handlePassportImg(event) {
    var binaryString = event.target.result;
    this.passportEncodedImg = window.btoa(binaryString);
  }
  //for profile select
  selectProfileImg(event) {
    var files = event.target.files;
    this.selectedProfileImg = event.target.files;
    var file = files[0];
    this.profileImgName = files[0].name;

    if (files && file) {
      var reader = new FileReader();

      reader.onload = this.handleProfileImg.bind(this);

      reader.readAsBinaryString(file);
    }
  }
  handleProfileImg(event) {
    var binaryString = event.target.result;
    this.profileEncodedImg = window.btoa(binaryString);
  }
  //when clicked on checked box

  passportCheckBoxFunction = (event) => {
    this.passportCheckBox = event.target.checked;
  };

  onBranchChange(selectedBranch: string) {
    let branchCode = '';
    switch (selectedBranch) {
      case 'branch1': {
        branchCode = '11001290';
        break;
      }
      case 'branch2': {
        branchCode = '11001293';
        break;
      }
      case 'branch3': {
        branchCode = '11001300';
        break;
      }
    }
    console.log('called');
    this.customerForm.get('branchCode')?.setValue(branchCode);
  }
}
