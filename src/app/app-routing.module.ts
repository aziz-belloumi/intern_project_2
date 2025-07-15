import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home.component';
import { AboutPageComponent } from './pages/about/about.component';
import { ContactPageComponent } from './pages/contact/contact.component';
import { ServicesPageComponent } from './pages/services/services.component';
import { DashboardPageComponent } from './pages/dashboard/dashboard.component';
import { SigninPageComponent } from './pages/signin/signin.component';
import { SignupPageComponent } from './pages/signup/signup.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout/auth-layout.component';
import { ProfilePageComponent } from './pages/profile/profile.component';
import {DashboardLayoutComponent} from "./layouts/dashboard-layout/dashboard-layout/dashboard-layout.component";


export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'about', component: AboutPageComponent },
      { path: 'services', component: ServicesPageComponent },
      { path: 'contact', component: ContactPageComponent },
      { path: 'home', component: HomePageComponent },
      // all pages that need the navbar go here
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'signin', component: SigninPageComponent },
      { path: 'signup', component: SignupPageComponent },
    ]
  },
  {
    path: '',
    component: DashboardLayoutComponent,  // ← New layout with navbar
    children: [
      { path: 'dashboard', component: DashboardPageComponent },
      { path: 'profile', component: ProfilePageComponent },
    ]
  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
