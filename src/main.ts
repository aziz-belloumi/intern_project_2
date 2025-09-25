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


bootstrapApplication(AppComponent, {
  providers: [
    provideStore({
      auth: authReducer ,
      room: roomReducer,
      booking: bookingReducer ,
      recommendation: recommendationReducer ,
      roomAvailability: roomAvailabilityReducer,
    }),
    provideEffects([AuthEffects,RoomEffects,BookingEffects,RecommendationEffects]),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
]
});
