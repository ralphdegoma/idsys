import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageCroppedEvent,ImageCropperComponent } from 'ngx-image-cropper';
import { Croppie } from "croppie";

@Component({
  selector: 'app-rd-cropper',
  templateUrl: './rd-cropper.component.html',
  styleUrls: ['./rd-cropper.component.css']
})
export class RdCropperComponent implements OnInit {

    @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;

 	video : any
 	onCamera : boolean
 	newCapture : boolean
 	cropping: boolean
 	video_canvas_context: any
 	video_canvas: any
 	imageChangedEvent: any = '';
    croppedImage: any = '';
    imageBase64:any

    defaultImage: string
    
    constructor() {
		// no-op
		this.cropping = false
		this.defaultImage = "../assets/images/users/thumb.png"

		if(this.croppedImage == "") {
			this.croppedImage = "../assets/images/users/thumb.png";
		}
	}	

    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
    }
    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
        this.newCapture = true
        console.log("test")
    }
    imageLoaded(event: any) {
        // show cropper
        console.log(event)
    }
    cropperReady() {
    	this.cropping = true
        // cropper ready
    }
    loadImageFailed() {
        // show message
    }

	openFileBrowser(event : any) {
		console.log(event)
	    $(".camera_src").trigger("click");
	}


	runCamera() {
		

		var video = document.getElementById('video');
		this.video = document.getElementById('video');
		// Get access to the camera!
		if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			this.onCamera = true
			this.newCapture = false
		    navigator.mediaDevices.getUserMedia({ video: true }).then(this.handleVideo);
		}

	}

	handleVideo = (stream) => {
	    this.video.srcObject = stream;
        this.video.play();
	}

	stopCamera() {
		console.log(this.video)
		$(this.video).trigger('pause');
		var video = document.getElementById('video');
		this.video.srcObject.getTracks().forEach(function(track) { track.stop(); })

	}

	cropImage() {
		this.newCapture = true
		var cropped = this.imageCropper.crop("base64")

		if(cropped.hasOwnProperty("base64")) {
			this.croppedImage = cropped.base64
		}
		this.imageBase64 = ""
		this.imageChangedEvent=""
		this.cropping = false
	}

	canvasToImage() {
		var image = new Image();
		image.id = "pic"
		this.cropping = true
		image.src = this.video_canvas.toDataURL();
		this.imageBase64 = image.src

	}

	captureCamera() {
		this.video_canvas = document.getElementById('video_canvas');
		this.video_canvas_context = this.video_canvas.getContext('2d');
		this.video_canvas_context.drawImage(this.video, 0, 0, 300, 245);
		this.newCapture = true
		this.onCamera = false
		this.canvasToImage()
		this.stopCamera();

	}



	ngOnInit() {

		this.onCamera = false
		
		
	}

}
