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

  constructor(public activatedRoute: ActivatedRoute, private router: Router ){

  }
   redirectByAccNum =  () =>{
    this.router.navigate(["/customer-by-account-number/"+this.accountNumber])
    
}

}