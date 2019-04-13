import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilesComponent }      from './profiles/profiles.component';
import { LoginComponent }      from './login/login.component';
import { HomeComponent }      from './home/home.component';

const routes: Routes = [
	{ 
		path: 'home', component: HomeComponent 
	},
	{ 
		path: 'profiles', component: ProfilesComponent 
	},
	{ 
		path: 'login', component: LoginComponent 
	},

];


@NgModule({
  exports: [ RouterModule ],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}