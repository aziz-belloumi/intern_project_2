export enum EquipmentBookingStatus {
  Pending = 0,
  Confirmed = 1,
  Cancelled = 2,
  Completed = 3
}

export interface EquipmentBooking {
  id?: number;
  equipmentId: number;
  userId: number;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  status: EquipmentBookingStatus;
  createdAt?: string;
  updatedAt?: string;
}
