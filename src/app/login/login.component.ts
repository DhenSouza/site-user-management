import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(){
    console.log("Login Carregado")
  }

  onSubmit(): void {
    // 1) se o form for inválido, aborta de imediato
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.errorMessage = null;   // limpa mensagem anterior
    const creds = this.loginForm.value;

    this.authService.login(creds).subscribe({
      next: (res) => {
        // 2) garanta que veio o token
        if (!res?.token) {
          this.errorMessage = 'Resposta inesperada do servidor';
          return;
        }

        // 3) armazena e navega
        localStorage.setItem('token', res.token);
        console.log('Login bem-sucedido! Token armazenado.');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Erro ao logar:', err);
        this.errorMessage = 'Email ou senha inválidos';
      }
    });
  }

}
