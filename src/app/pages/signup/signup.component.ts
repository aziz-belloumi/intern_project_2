import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupPageComponent {
  firstName = '';
  lastName = '';
  email = '';
  phone = '';
  password = '';
  confirmPassword = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {

    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    this.authService.signUp({ email: this.email, password: this.password, phoneNumber: Number(this.phone), firstName: this.firstName, lastName: this.lastName }).subscribe({
      next: (res) => {
        alert(res.message);
        this.router.navigate(['/signin']);
      },
      error: () => alert('Registration failed')
    });
  }
}
