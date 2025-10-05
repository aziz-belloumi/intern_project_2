import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SocketService } from './socket.service';
import * as RoomActions from '../state/room/room.actions';
import * as RoomAvailabilityActions from '../state/room-availability/room-availability.actions';

@Injectable({ providedIn: 'root' })
export class WebSocketListenerService {
  constructor(private socketService: SocketService, private store: Store) {}

  initWebSocket() {
    this.socketService.connect();

    this.socketService.messages$.subscribe((msg) => {
      switch (msg.action) {
        // 🏠 Room events
        case 'roomCreated':
        case 'roomUpdated':
        case 'roomDeleted':
          this.store.dispatch(RoomActions.loadRooms());
          this.store.dispatch(RoomAvailabilityActions.loadRoomAvailability({
            startTime: new Date().toISOString(),
            endTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
          }));
          console.log("**************************** some rooms changes the websocket detected it !!!!!!");
          break;

        // 🧾 Booking events
        // case 'bookingCreated':
        // case 'bookingUpdated':
        // case 'bookingCancelled':
        //   this.store.dispatch(BookingActions.loadBookings());
        //   break;

        default:
          console.warn('⚠️ Unhandled WebSocket event:', msg);
      }
    });
  }
}
