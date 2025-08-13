export interface AuthState {
  user: any;
  isLoading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};
