import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface FeatureCard {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-feature-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-card.component.html',
  styleUrls: ['./feature-card.component.css']
})
export class FeatureCardComponent {
  @Input() feature!: FeatureCard;

}
