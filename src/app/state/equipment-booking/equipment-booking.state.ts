import { EquipmentBooking } from '../../models/equipment-booking.model';

export interface EquipmentBookingState {
  allBookings: EquipmentBooking[];
  userBookings: EquipmentBooking[];
  equipmentBookings: EquipmentBooking[];
  pendingBookings: EquipmentBooking[];
  selectedBooking: EquipmentBooking | null;
  loading: boolean;
  error: any;
}

export const initialState: EquipmentBookingState = {
  allBookings: [],
  userBookings: [],
  equipmentBookings: [],
  pendingBookings: [],
  selectedBooking: null,
  loading: false,
  error: null
};
