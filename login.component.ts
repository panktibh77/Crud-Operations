import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  passwordHidden = true;
  isLoading = false;
  isError = false;
  button = 'Sign In';
  errorMessage = '';
  userAuthSubscription: Subscription;
  lastLoginSubscription: Subscription;

  constructor(private fb: FormBuilder) {
      this.userSignInForm.get('email').setValue(null);
      this.userSignInForm.get('password').setValue(null);
  }
  userSignInForm = this.fb.group({
    email: [null, [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
    password: [null, Validators.required],
  });
  
  ngOnInit(): void {
  }

  signIn = () => {
    this.userSignInForm.markAllAsTouched();
    this.isError = false;
    this.errorMessage = '';

    if (this.userSignInForm.valid) {
      this.authService.userSignin(this.userSignInForm.value).subscribe((res:any) => {
        if (res) {
          
        }
        else{
          if(res.success.success === false){
            this.isError = true;
            this.errorMessage = 'Invalid Login!';
          }
        }
      },
      (error: HttpErrorResponse) => {
        console.log('Error....', error)
          if (error) {
            this.isError = true;
            this.errorMessage = 'Invalid Login!';
          }
      }
      )
    } else {
      return false;
    }
  };

  togglePassword = () => {
    this.passwordHidden = !this.passwordHidden;
  }

  ngOnDestroy(){
    this.userAuthSubscription?.unsubscribe();
    this.lastLoginSubscription?.unsubscribe();
  }

}
