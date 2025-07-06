import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  // email = '' ;
  // password = '';
  // constructor(private authService: AuthService,private router: Router ) {}
  // onSubmit(): void{
  //    this.authService.signIn(this.email,this.password).subscribe({
  //      next: result => {
  //        //localStorage.setItem('token', result.accessToken);
  //        this.router.navigate(['/home']);
  //      },
  //      error: () => alert("Failed to login")
  //    });
  // }
}
