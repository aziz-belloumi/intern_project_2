import {Injectable} from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as SigninActions from './auth.actions';
import {AuthService} from "../../services/auth.service";
import { catchError, map, mergeMap, of } from 'rxjs';


@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions ,private authService: AuthService) {}


  signin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SigninActions.signin),
      mergeMap(action =>
        this.authService.signIn({email: action.email, password: action.password}).pipe(
          map(()=> {
            const user = this.authService.getUserFromToken(); // decode user from token
            return SigninActions.signinSuccess({ user });
          }),
          catchError((error) => {
            return of(SigninActions.signinFailure({ error: error.error.message}))
          }),
        )
      )
    )
  );
}

