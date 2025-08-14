import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-custom-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-popup.component.html' ,
  styleUrls: ['./custom-popup.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      state('out', style({ opacity: 0 })),
      transition('out => in', animate('300ms ease-in')),
      transition('in => out', animate('200ms ease-out'))
    ])
  ]
})
export class CustomPopupComponent {
  @Input() roomType: string = '';
  @Input() capacity: number = 0;
  @Input() location: string = '';
  @Input() pricePerMinute: string = '';
  @Input() hasProjector: boolean = false;
  @Input() hasWhiteboard: boolean = false;
  @Input() description: string = '';
  @Input() closeButtonText: string = 'Close';
  @Input() isVisible: boolean = false;
  @Input() autoCloseDelay: number = 0;

  @Output() closed = new EventEmitter<void>();

  private autoCloseTimeout?: any;

  ngOnChanges() {
    if (this.isVisible && this.autoCloseDelay > 0) {
      this.setAutoClose();
    } else {
      this.clearAutoClose();
    }
  }

  ngOnDestroy() {
    this.clearAutoClose();
  }

  close() {
    this.isVisible = false;
    this.clearAutoClose();
    this.closed.emit();
  }

  onOverlayClick(event: Event) {
    // Close when clicking outside the popup
    this.close();
  }

  private setAutoClose() {
    this.clearAutoClose();
    this.autoCloseTimeout = setTimeout(() => {
      this.close();
    }, this.autoCloseDelay);
  }

  private clearAutoClose() {
    if (this.autoCloseTimeout) {
      clearTimeout(this.autoCloseTimeout);
      this.autoCloseTimeout = undefined;
    }
  }
}
