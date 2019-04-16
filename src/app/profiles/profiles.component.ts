import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map , catchError } from 'rxjs/operators';
import { Settings}  from '../settings';   

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements  OnInit {

	dtOptions: DataTables.Settings = {};
	persons = []
	settings = Settings
	defaultImage: string

	// We use this trigger because fetching the list of persons can be quite long,
	// thus we ensure the data is fetched before rendering
	dtTrigger: Subject<any> = new Subject();

	constructor(private http: HttpClient) {
		this.defaultImage = "../assets/images/users/thumb.png"
	}

	getThumbnail(person) {
		return this.settings.server_url+"/api/storage/"+person.thumbnail;
	}

	ngOnInit(): void {
	    this.dtOptions = {
	      pagingType: 'full_numbers',
	      pageLength: 2
	    };

		this.dtTrigger.next();
	    this.http.get<any>(this.settings.server_url+`/api/profile`)
        .pipe(
            map((persons: any) => {
                this.persons = persons;
                console.log(this.persons)
		        // Calling the DT trigger to manually render the table
		        this.dtTrigger.next();
            })
            //catchError(this.handleError)
        ).subscribe();

	}


}
