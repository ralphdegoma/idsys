import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from '../_services';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
    ) {
        // redirect to home if already logged in
        console.log(this.authenticationService.currentUserValue)
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/home']);
        }
    }

  ngOnInit() {
  }

}
