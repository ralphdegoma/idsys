import { Component } from '@angular/core';
import { AuthenticationService } from './_services';
import { User } from './_models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  	title = 'Id System';

  	currentUser: User;

	constructor(
	    private router: Router,
	    private authenticationService: AuthenticationService
	) {
	    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
	}

}
