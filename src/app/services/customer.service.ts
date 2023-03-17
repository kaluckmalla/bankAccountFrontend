import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Customer } from '../class/customer';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = "http://localhost:8080/customer/";

  constructor(private http: HttpClient) { }
  save(customerData: any){
    return this.http.post(`${this.baseUrl}add`, customerData);
  }
  getAllCustomer():Observable<Customer[]>{
    return this.http.get<Customer[]>(`${this.baseUrl}findAll`);


  }
  getCustomer(customerId: any): Observable<Customer[]>{
    return this.http.get<Customer[]>(`${this.baseUrl}find/${customerId}`);
  }
  deleteOneCustomer(customerId: any){
    return this.http.delete(`${this.baseUrl}delete/${customerId}`);

  }
  updateCustomer(customerId: any, customerUpdateData: any){
    return this.http.put(`${this.baseUrl}update/${customerId}`,customerUpdateData);
  }
}
