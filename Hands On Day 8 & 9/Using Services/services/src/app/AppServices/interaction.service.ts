import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class InteractionService {
  
  userDataServices = new BehaviorSubject<any>([]);
  percentageServices = new BehaviorSubject<any>([]);


  castUserData = this.userDataServices.asObservable();
  castPercentage = this.percentageServices.asObservable();
  constructor(private http: HttpClient) {}
  

   editUser(newUser: any){
       this.userDataServices.next(newUser);
   }
   
 
   url:string;

   userFetch():Observable<any>{

      return this.http.get(this.url);
   }
}
