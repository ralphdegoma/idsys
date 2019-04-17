import { Component, OnInit, ViewChild  } from '@angular/core';
import * as $ from "jquery";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map , catchError } from 'rxjs/operators';
import { Subject, BehaviorSubject, Observable, throwError } from 'rxjs';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { RdCropperComponent}  from '../rd-cropper/rd-cropper.component';   
import { AlertComponent}  from '../alert/alert.component';   

import { Settings}  from '../settings';   


@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.css']
})



export class AddProfileComponent implements OnInit {

	
	@ViewChild(SignaturePad) signaturePad: SignaturePad;
	@ViewChild(RdCropperComponent) rdCropper:RdCropperComponent;
	@ViewChild(AlertComponent) alert:AlertComponent;

	settings = Settings
	onDraw : boolean

	constructor(private http: HttpClient) {
		this.onDraw = false
		console.log(this.settings)
	}	

	formData: any = {};

	public signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
		'minWidth': 5,
		'canvasWidth': 500,
		'canvasHeight': 300
	};

	ngAfterViewInit() {

		console.log(this.signaturePad)
		// this.signaturePad is now available
		var canvas = $(this.signaturePad).find("canvas")
		$("canvas").css("border", "1px solid #ccc")
		this.signaturePad.set('minWidth', 1); // set szimek/signature_pad options at runtime
		this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
	}

	drawComplete() {
		this.onDraw = true
	}

	drawStart() {
		// will be notified of szimek/signature_pad's onBegin event
		console.log('begin drawing');
	}

	ngOnInit() {

	}

	clearCanvas() {
		this.signaturePad.clear();
	}


	handleError(error: HttpErrorResponse) {
		if (error.error instanceof ErrorEvent) {
			// A client-side or network error occurred. Handle it accordingly.
			console.error('An error occurred:', error.error.message);
		} else {
			// The backend returned an unsuccessful response code.
			// The response body may contain clues as to what went wrong,
		}

		return Observable.throw(error);

    };


	saveProfile() {
		
		if(this.onDraw == true) {
			this.formData.signature = this.signaturePad.toDataURL();
		}

		if(this.rdCropper.newCapture == true) {
			this.formData.thumbnail = this.rdCropper.croppedImage
		}

		console.log(this.formData)
	
        this.http.post<any>(this.settings.server_url+`/api/profile`, this.formData)
            .pipe(
                map((resp: any) => {
                    console.log(resp)

                    if(resp.status == "200") {
                    	this.alert.messageData.message_type = "alert-success"
                    	this.formData = {}
                    	this.rdCropper.croppedImage = this.rdCropper.defaultImage
                    }else{
                    	this.alert.messageData.message_type = "alert-danger"
                    }
                    
                    this.alert.messageData.message = resp.message
                })
            ).subscribe();

    }


}
