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
export class SigninPageComponent {
   email = '' ;
   password = '';
   constructor(private authService: AuthService,private router: Router ) {}
   onSubmit(): void{
      this.authService.signIn({email: this.email,password: this.password}).subscribe({

        next: (res) => {
          //loading page logic
          this.router.navigate(['/dashboard']);
        },
        error: () => alert("Failed to login")
      });
   }
}
