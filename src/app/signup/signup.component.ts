// filepath: /C:/Users/ritik/bizman-angular/src/app/signup/signup.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AppwriteService } from '../services/appwrite.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  // Custom validator for password matching
  passwordMatchValidator: ValidatorFn = (control: AbstractControl) => {
    const formGroup = control as FormGroup;
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  };

  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required]),
    acceptTerms: new FormControl(false, [Validators.requiredTrue])
  }, { validators: this.passwordMatchValidator });

  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;
  errorMessage = '';

  constructor(private router: Router, private appwriteService: AppwriteService) {}

  onSubmit() {
   
    
    if (this.signupForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      const { name, email, password } = this.signupForm.value;

      this.appwriteService.signup(email, password, name).then(
        () => {
          console.log('here1');
          this.isLoading = false;
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage = error.message;
        }
      );
    }
  }

  togglePasswordVisibility(field: 'password' | 'confirmPassword') {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }
}