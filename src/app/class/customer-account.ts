import { Customer } from "./customer";

export interface CustomerAccount {
    customerAccountId: string;
    accountType:string;
    currency:string;
    currentBalance:string;
    accountNumber: string;
    accountOpenDate:string;
    accountUpdatedDate:string;
    customer:Customer;

  
}
