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


bootstrapApplication(AppComponent, {
  providers: [
    provideStore({ auth: authReducer , room: roomReducer }),
    provideEffects([AuthEffects,RoomEffects]),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
]
});
