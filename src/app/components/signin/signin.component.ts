import { Component ,OnInit , OnDestroy} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { Store } from '@ngrx/store';
import {selectAuthError, selectAuthLoading, selectUser} from '../../state/auth/auth.selectors';
import {Router} from "@angular/router";
import {filter, Subject, take, takeUntil} from "rxjs";
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {signin} from "../../state/auth/auth.actions";
import {WebSocketListenerService} from "../../services/websocket-listener.service";

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule , MatSnackBarModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninPageComponent implements OnInit,OnDestroy {
  constructor(private wsListener: WebSocketListenerService ,private fb: FormBuilder , private store: Store , private router: Router , private snackBar: MatSnackBar) { }
   form = this.fb.group({
     email: ['', [Validators.required, Validators.email]],
     password: ['', [Validators.required]]
   });
  private destroy$ = new Subject<void>();
  isLoading$ = this.store.select(selectAuthLoading);
  error$ = this.store.select(selectAuthError);
  ngOnInit(): void {
    this.error$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(errorMsg => {
      if (errorMsg) {
        this.snackBar.open(errorMsg, 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

   onSubmit(): void{
     const email: string = this.form.value.email!;
     const password: string = this.form.value.password!;
     this.store.dispatch(signin({email, password }));
     this.wsListener.initWebSocket();
     this.store.select(selectUser).pipe(
       filter(user => !!user), // wait until user becomes non-null
       take(1) // only take the first valid user
     ).subscribe((user)=>{
       this.router.navigate(['/dashboard']);
     })
   }
}
