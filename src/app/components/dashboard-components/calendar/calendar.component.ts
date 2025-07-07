import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar-widget',
  standalone: true,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  currentDate = new Date();
  currentMonth = '';
  currentYear = 0;
  daysInMonth: number[] = [];
  firstDayOfMonth = 0;
  today = new Date().getDate();
  
  selectedDates = [7, 14, 21, 28]; // Example selected dates

  ngOnInit() {
    this.generateCalendar();
  }

  generateCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    
    this.currentMonth = this.currentDate.toLocaleString('default', { month: 'long' });
    this.currentYear = year;
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    this.firstDayOfMonth = firstDay.getDay();
    this.daysInMonth = Array.from({length: lastDay.getDate()}, (_, i) => i + 1);
  }

  previousMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.generateCalendar();
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.generateCalendar();
  }

  isToday(day: number): boolean {
    const today = new Date();
    return day === today.getDate() && 
           this.currentDate.getMonth() === today.getMonth() && 
           this.currentDate.getFullYear() === today.getFullYear();
  }

  isSelected(day: number): boolean {
    return this.selectedDates.includes(day);
  }

  onDateClick(day: number) {
    console.log(`Date clicked: ${day}/${this.currentDate.getMonth() + 1}/${this.currentYear}`);
  }
}