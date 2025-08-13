import { createAction, props } from '@ngrx/store';
import {User} from "../../models/user.model";

export const signin = createAction(
  '[Sign In] Sign In',
  props<{ email: string; password: string }>()
);

export const signinSuccess = createAction(
  '[Sign In] Sign In Success',
  props<{ user: User }>()
);

export const signinFailure = createAction(
  '[Sign In] Sign In Failure',
  props<{ error: string }>()
);

export const logout = createAction(
  '[Auth] Logout'
);
