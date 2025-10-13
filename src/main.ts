import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing.module';
import {provideHttpClient } from '@angular/common/http';
import {provideStore} from "@ngrx/store";
import {authReducer} from "./app/state/auth/auth.reducer";
import {provideEffects} from "@ngrx/effects";
import {AuthEffects} from "./app/state/auth/auth.effects";
import { provideAnimations } from '@angular/platform-browser/animations';
import {RoomEffects} from "./app/state/room/room.effects";
import {roomReducer} from "./app/state/room/room.reducer";
import {bookingReducer} from "./app/state/booking/booking.reducer";
import {BookingEffects} from "./app/state/booking/booking.effects";
import {recommendationReducer} from "./app/state/recommendation/recommendation.reducer";
import {RecommendationEffects} from "./app/state/recommendation/recommendation.effects";
import {roomAvailabilityReducer} from "./app/state/room-availability/room-availability.reducer";
import {RoomAvailabilityEffects} from "./app/state/room-availability/room-availability.effects";
import {equipmentReducer} from "./app/state/equipment/equipment.reducer";
import {EquipmentEffects} from "./app/state/equipment/equipment.effects";
import {equipmentBookingReducer} from "./app/state/equipment-booking/equipment-booking.reducer";
import {EquipmentBookingEffects} from "./app/state/equipment-booking/equipment-booking.effects";


bootstrapApplication(AppComponent, {
  providers: [
    provideStore({
      auth: authReducer ,
      room: roomReducer,
      booking: bookingReducer ,
      recommendation: recommendationReducer ,
      roomAvailability: roomAvailabilityReducer,
      equipment: equipmentReducer,
      equipmentBooking: equipmentBookingReducer,
    }),
    provideEffects([AuthEffects,RoomEffects,BookingEffects,RecommendationEffects,RoomAvailabilityEffects,EquipmentEffects,EquipmentBookingEffects]),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
]
});
