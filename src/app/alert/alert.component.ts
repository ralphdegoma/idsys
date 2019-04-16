import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {


	messageData: any = {};

  	constructor() {
  		this.messageData.message = "";
  		this.messageData.message_type = "";
  	}
  	


	ngOnInit() {
	}

}
