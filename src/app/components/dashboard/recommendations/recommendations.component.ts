import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';



export interface Recommendation {
  title: string;
  description: string;
  icon: string;
  type: 'document' | 'image' | 'video' | 'link';
  fileName?: string;
  thumbnail?: string;
}

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './recommendations.component.html' ,
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent {
  @Input() recommendations: Recommendation[] = [
    {
      title: 'Suggested Rooms',
      description: 'Explore these rooms for your next meeting',
      icon: '🏠',
      type: 'document',
      fileName: 'Resource-Guide.pdf'
    },
    {
      title: 'Best Practices',
      description: 'Unlock the resource management system with these best practices',
      icon: '📋',
      type: 'document',
      fileName: 'Usage-Stats.docx'
    },
    {
      title: 'Conference Room',
      description: 'Modern conference room with advanced equipment',
      icon: '🏢',
      type: 'image',
      fileName: 'IMG_001.jpg',
      thumbnail: 'https://via.placeholder.com/280x160/f8f9fa/6c757d?text=Conference+Room'
    },
    {
      title: 'Conference Materials',
      description: 'Latest resources and presentation materials',
      icon: '📄',
      type: 'document',
      fileName: 'Resource-Materials.pdf'
    }
  ];

  getFileIcon(type: string): string {
    switch (type) {
      case 'document': return '📄';
      case 'image': return '🖼️';
      case 'video': return '🎥';
      case 'link': return '🔗';
      default: return '📄';
    }
  }

  openRecommendation(item: Recommendation) {
  }
}
