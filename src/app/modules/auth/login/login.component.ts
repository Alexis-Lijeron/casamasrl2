import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertsService } from '../../../shared/services/alerts.service';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../service/auth.service';
import { User } from '../../../interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  user!: User;
  errorMessage: string | null = null;
  
  constructor(
    private alertServive: AlertsService,
    private validatorsService: ValidatorsService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          // this.validatorsService.emailValid,
        ],
      ],
      password: [
        '',
        [
          Validators.required,
        ],
      ],
    });
    
    this.user = {
      username: '',
      password: '',
    };
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email , password } = this.loginForm.value;
    
    this.user.username = email;
    this.user.password = password;
    
    this.authService.getToken(this.user).subscribe(
      {
        next: (response: User) => {
          console.log('response:', response);
          sessionStorage.setItem("token", response.token || '');
          sessionStorage.setItem('user', JSON.stringify(response)); // Guardar los datos del usuario en sessionStorage
          sessionStorage.setItem('roles', JSON.stringify(response.roles)); // Guardar roles
          this.redirectToDashboard();
        },
        error: (error) => {
          this.errorMessage = error.message;
          console.error("Error en login", this.errorMessage);
          this.router.navigate(['/auth/login']);
        }
      }
    );
  }
  
  redirectToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  isInvalidField(field: string): boolean | null {
    return this.validatorsService.isInvalidField(this.loginForm, field);
  }

  getMessageError(field: string): string | null {
    return this.validatorsService.getErrorMessage(this.loginForm, field);
  }
}
