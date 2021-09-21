import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval } from 'rxjs';
import { take } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class InteractionServiceService {

  userDataServices = new BehaviorSubject<any>([]);
  percentageServices = new BehaviorSubject<any>([]);


  castUserData = this.userDataServices.asObservable();
  castPercentage = this.percentageServices.asObservable();

  numbers = interval(1000);

  changingData = this.numbers.pipe(take(30));

  constructor(private http: HttpClient) {}
  

   editUser(newUser: any){
       this.userDataServices.next(newUser);
   }
   
 
   url:string;

   userFetch():Observable<any>{

      return this.http.get(this.url);
   }
}
