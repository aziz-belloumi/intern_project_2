import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home.component';
import { AboutPageComponent } from './pages/about/about.component';
import { ContactPageComponent } from './pages/contact/contact.component';
import { ServicesPageComponent } from './pages/services/services.component';
import { DashboardPageComponent } from './pages/dashboard/dashboard.component';
import { SigninPageComponent } from './pages/signin/signin.component';
import { SignupPageComponent } from './pages/signup/signup.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'services', component: ServicesPageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'signin', component: SigninPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'dashboard', component: DashboardPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
