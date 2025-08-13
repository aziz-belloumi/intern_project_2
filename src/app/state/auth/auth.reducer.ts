import {createReducer, on} from "@ngrx/store";
import {initialAuthState, AuthState} from "./auth.state";
import * as AuthActions from "./auth.actions";

export const authReducer =createReducer(
  initialAuthState,
  on(AuthActions.signin , state => ({ ...state , isLoading: true , error: null})),
  on(AuthActions.signinSuccess , (state , {user}) => ({ ...state , isLoading: false ,user: user, error: null})),
  on(AuthActions.signinFailure , (state , {error}) => ({ ...state , isLoading: false , user: null, error: error})),
  on(AuthActions.logout, (): AuthState => initialAuthState,)
)
