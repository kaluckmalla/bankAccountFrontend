import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  accountNumber: any;
  cifId: any;


  constructor(public activatedRoute: ActivatedRoute, private router: Router ){

  }
   redirectByAccNum =  () =>{
    this.router.navigate(["/customer-by-account-number/"+this.accountNumber])
    
}
redirectByCifId =  () =>{
  if(this.cifId==null){
  alert("Customer information id can't be empty")
}
else{
  this.router.navigate(["/customer-detail-by-cifid/"+this.cifId])

}
}
}