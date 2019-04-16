import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError  } from 'rxjs';
import { map , catchError } from 'rxjs/operators';
import { AlertService } from './alert.service';
import { User } from '../_models';
import { Settings}  from '../settings';   

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private server_url: string
    settings = Settings

    constructor(private http: HttpClient, private alertService: AlertService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        this.server_url = "http://id.local"

    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.log(error);
      }

      return Observable.throw(error);
      
    };


    login(email: string, password: string) {
        return this.http.post<any>(this.settings.server_url+`/api/login`, { email, password })
            .pipe(
                map((user: any) => {
                    if (user && user.hasOwnProperty('token') && user.token != "") {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        this.currentUserSubject.next(user);
                    }

                    return user;
                }),
                catchError(this.handleError)
            )

    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}