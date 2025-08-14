export interface Booking {
  id: number;
  userId: number;
  roomId: number;
  purpose: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  attendees: number;
  isPreferredRoom: boolean;
  isPurposeCompatible: boolean;
  dayOfWeek: number;
  hourOfDay: number;
  month: number;
  isWeekend: boolean;
  capacityUtilization: number;
  isPeakHour: boolean;
  season: number;
  totalPrice: number;
  status: number;
  createdAt: string;
  updatedAt?: string;
}


export enum BookingStatus {
  Pending = 0,
  Confirmed = 1,
  Cancelled = 2,
  Completed = 3
}
