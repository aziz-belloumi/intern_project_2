// components/resource-table/resource-table.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ResourceItem {
  id: string;
  name: string;
  type: 'room' | 'equipment' | 'other';
  icon: string;
  capacity: string;
  availability: 'available' | 'individual' | 'group' | 'reserved';
  lastUpdated: Date;
  assignedTo?: string;
}

@Component({
  selector: 'app-resource-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resource-table.component.html',
  styleUrls: ['./resource-table.component.css']
})
export class ResourceTableComponent {
  @Input() resources: ResourceItem[] = [
    {
      id: '1',
      name: 'Conference Room A',
      type: 'room',
      icon: '🏢',
      capacity: '20 people',
      availability: 'available',
      lastUpdated: new Date('2024-08-24T09:00:00'),
    },
    {
      id: '2',
      name: 'Projector',
      type: 'equipment',
      icon: '📽️',
      capacity: '1 unit',
      availability: 'individual',
      lastUpdated: new Date('2024-08-24T10:00:00'),
    },
    {
      id: '3',
      name: 'Whiteboard',
      type: 'equipment',
      icon: '⬜',
      capacity: '3 units',
      availability: 'group',
      lastUpdated: new Date('2024-08-23T14:30:00'),
    },
    {
      id: '4',
      name: 'Meeting Room 2',
      type: 'room',
      icon: '🏠',
      capacity: '1 set',
      availability: 'individual',
      lastUpdated: new Date('2024-08-23T13:00:00'),
    },
    {
      id: '5',
      name: 'AV Equipment',
      type: 'equipment',
      icon: '🎥',
      capacity: '5 sets',
      availability: 'reserved',
      lastUpdated: new Date('2024-08-22T11:00:00'),
      assignedTo: 'Ms Alex'
    }
  ];

  getStatusIcon(availability: string): string {
    switch (availability) {
      case 'available': return '✅';
      case 'individual': return '👤';
      case 'group': return '👥';
      case 'reserved': return '⛔';
      default: return '❓';
    }
  }

  getStatusText(availability: string): string {
    switch (availability) {
      case 'available': return 'Available';
      case 'individual': return 'Individually Used';
      case 'group': return 'Group Used';
      case 'reserved': return 'Reserved';
      default: return 'Unknown';
    }
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  }

  reserveResource(resource: ResourceItem): void {
    console.log(`Reserving resource: ${resource.name}`);
    // You can integrate real reservation logic here later
  }
}
