import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home/home.component';
import { AboutPageComponent } from './components/about/about.component';
import { ContactPageComponent } from './components/contact/contact.component';
import { ServicesPageComponent } from './components/services/services.component';
import { DashboardPageComponent } from './components/dashboard/dashboard.component';
import { SigninPageComponent } from './components/signin/signin.component';
import { SignupPageComponent } from './components/signup/signup.component';
import { ProfilePageComponent } from './components/profile/profile.component';
import {MainLayoutComponent} from "./layouts/main-layout/main-layout.component";
import {AuthLayoutComponent} from "./layouts/auth-layout/auth-layout.component";
import {DashboardLayoutComponent} from "./layouts/dashboard-layout/dashboard-layout.component";
import {ExplorePageComponent} from "./components/explore/explore.component";
import {AddRoomPageComponent} from "./components/add-room/add-room.component";
import {EquipmentPageComponent} from "./components/equipment/equipment.component";
import {SettingsPageComponent} from "./components/settings/settings.component";


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
      { path: 'explore', component: ExplorePageComponent },
      { path: 'add-room', component: AddRoomPageComponent },
      { path: 'equipment', component: EquipmentPageComponent },
      { path: 'settings', component: SettingsPageComponent },
    ]
  },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
