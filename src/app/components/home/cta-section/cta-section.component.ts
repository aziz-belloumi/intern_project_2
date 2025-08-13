import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router , } from '@angular/router';

@Component({
  selector: 'app-cta-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cta-section.component.html',
  styleUrls: ['./cta-section.component.css']
})
export class CtaSectionComponent {
  constructor(private router: Router) {}
  onCtaClick() {
    this.router.navigate(['/signup'])
  }
}
