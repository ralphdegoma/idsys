import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { ProfilesComponent } from './profiles/profiles.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component'; // <-- NgModel lives here
import { DataTablesModule } from 'angular-datatables';
import { AddProfileComponent } from './add-profile/add-profile.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { ImageCropperModule } from 'ngx-image-cropper';
import { RdCropperComponent } from './rd-cropper/rd-cropper.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    SidebarComponent,
    NavbarComponent,
    ProfilesComponent,
    BreadcrumbsComponent,
    LoginComponent,
    HomeComponent,
    AddProfileComponent,
    RdCropperComponent,
    AlertComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    DataTablesModule,
    SignaturePadModule,
    ImageCropperModule

    


  ],
  providers: [{
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
