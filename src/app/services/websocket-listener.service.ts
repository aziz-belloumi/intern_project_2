import {Injectable} from '@angular/core';
import { Store } from '@ngrx/store';
import { SocketService } from './socket.service';
import * as RoomActions from '../state/room/room.actions';
import * as BookingActions from '../state/booking/booking.actions';
import * as EquipmentActions from '../state/equipment/equipment.actions';
import * as EquipmentBookingActions from '../state/equipment-booking/equipment-booking.actions';
import * as RoomAvailabilityActions from '../state/room-availability/room-availability.actions';
import * as AuthSelectors from "../state/auth/auth.selectors";

@Injectable({ providedIn: 'root' })
export class WebSocketListenerService{
  constructor(private socketService: SocketService, private store: Store) {}

  currentUserId!: number;

  initWebSocket() {
    this.socketService.connect();
    this.store.select(AuthSelectors.selectUser).subscribe(user => {
      if (user) {
        this.currentUserId = user.id;
      }
    });

    this.socketService.messages$.subscribe((msg) => {
      switch (msg.action) {
        // 🏠 Room events
        case 'roomCreated':
        case 'roomUpdated':
        case 'roomDeleted':
          this.store.dispatch(RoomActions.loadRooms());
          this.store.dispatch(RoomActions.loadUserRooms({ userId: this.currentUserId }));
          this.store.dispatch(RoomAvailabilityActions.loadRoomAvailability({
            startTime: new Date().toISOString(),
            endTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
          }));
          console.log("Rooms changes detected through WebSocket!");
          break;
        //Booking events
        case 'bookingCreated':
        case 'bookingConfirmed':
        case 'bookingCancelled':
          if (this.currentUserId) {
            this.store.dispatch(RoomAvailabilityActions.loadRoomAvailability({
              startTime: new Date().toISOString(),
              endTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
            }));
            this.store.dispatch(BookingActions.loadPendingBookings({ userId: this.currentUserId }));
            this.store.dispatch(BookingActions.loadUserBookings({ userId: this.currentUserId, lastBookingId: 0 }));
            this.store.dispatch(BookingActions.loadUserStatistics({ userId: this.currentUserId }));
            this.store.dispatch(BookingActions.loadUserRecentBookings({ userId: this.currentUserId }));
            console.log("📅 Booking change detected through WebSocket!");
          } else {
            console.warn('⚠️ Booking event received but userId is undefined.');
          }
          break;

        case 'equipmentCreated':
        case 'equipmentUpdated':
        case 'equipmentDeleted':
          if (this.currentUserId) {
            this.store.dispatch(EquipmentActions.loadUserEquipment({ userId: this.currentUserId }));
            this.store.dispatch(EquipmentActions.loadAllEquipment());
            console.log("🛠 Equipment changes detected through WebSocket!");
          }
          break;
        // 🎛 Equipment booking events
        case 'equipmentBookingCreated':
        case 'equipmentBookingConfirmed':
        case 'equipmentBookingCancelled':
          if (this.currentUserId) {
            this.store.dispatch(EquipmentBookingActions.loadPendingBookings({ userId: this.currentUserId }));
            console.log("📦 Equipment booking change detected through WebSocket!");
          }
          break;

        default:
          console.warn('⚠️ Unhandled WebSocket event:', msg)
      }
    });
  }

  disconnect(): void {
    if (this.socketService) {
      this.socketService.close();
      console.log('WebSocket disconnected');
    }
  }
}
