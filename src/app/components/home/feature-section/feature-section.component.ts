import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureCard, FeatureCardComponent } from "../feature-card/feature-card.component";

@Component({
  selector: 'app-feature-section',
  standalone: true,
  imports: [CommonModule, FeatureCardComponent],
  templateUrl: './feature-section.component.html',
  styleUrls: ['./feature-section.component.css']
})
export class FeatureSectionComponent {
  features: FeatureCard[] = [
    {
      icon: 'assets/manage_rooms.png',
      title: 'Manage Rooms',
      description: 'Efficiently organize and track room availability, capacity, and usage across your facility with real-time updates.'
    },
    {
      icon: 'assets/track_equipment.png',
      title: 'Track Equipment',
      description: 'Monitor equipment status, maintenance schedules, and availability to ensure optimal resource utilization.'
    },
    {
      icon: 'assets/schedule_time_slots.png',
      title: 'Schedule Time Slots',
      description: 'Create and manage time slots for resources, preventing conflicts and maximizing productivity.'
    }
  ];
}
