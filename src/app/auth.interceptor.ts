import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Subject, BehaviorSubject, Observable, throwError } from 'rxjs';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  user: any = {}
  token: string
  construct() {

    this.token = null
    
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.user = JSON.parse(localStorage.getItem('currentUser'))

    console.log(this.user)
    if(this.user != null) {
      this.token = this.user.token
    }

    console.log(this.user)
    req = req.clone({
      setHeaders: {
        'Content-Type' : 'application/json; charset=utf-8',
        'Accept'       : 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
    });

    return next.handle(req);
  }
}