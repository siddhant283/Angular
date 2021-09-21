import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { delay } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  url: string;
  verifyAdmin: boolean = false;
  verifyUser: boolean = false;
  loggedInChange: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) {}
  
  toggleLogoutButton(){
    this.loggedInChange.next(this.verifyUser);
  }

  userFetch(): Observable<any> {

    return this.http.get(this.url);
  }

  allUsers: any[] = JSON.parse(localStorage.getItem("users"));

  getByEmail(email: string): Observable<any> {
    const user = this.allUsers?.find(user => user.email === email);
    return of(user).pipe(delay(500));
  }

  getByPhone(phone: string): Observable<any> {
    const user = this.allUsers?.find(user => user.phone === phone);
    return of(user).pipe(delay(500));
  }

  getByUsername(username: string): Observable<any> {
    const user = this.allUsers?.find(user => user.username === username);
    return of(user).pipe(delay(500));
  }

}
