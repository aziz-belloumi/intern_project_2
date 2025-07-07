import { Component } from '@angular/core';

@Component({
  selector: 'app-ai-recommendations',
  standalone: true,
  templateUrl: './ai-recommendations.component.html',
  styleUrls: ['./ai-recommendations.component.css']
})
export class AiRecommendationsComponent {
  
  constructor() { }

  onViewOptimalTimes() {
    console.log('Viewing optimal time slots...');
  }

  onViewConflicts() {
    console.log('Viewing potential conflicts...');
  }

  onViewUsageInsights() {
    console.log('Viewing usage insights...');
  }
}