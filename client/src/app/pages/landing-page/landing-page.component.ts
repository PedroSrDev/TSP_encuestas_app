import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="relative flex min-h-screen w-full flex-col font-display bg-white text-slate-800">
      <div class="flex-grow">
        <main class="grid w-full min-h-screen grid-cols-1 md:grid-cols-2">
          <div class="flex flex-col items-center justify-center bg-[#1E293B] p-8 text-center md:items-start md:p-12 md:text-left">
            <div class="max-w-md">
              <div class="flex items-center gap-2 self-center md:self-start">
                <span class="material-symbols-outlined text-3xl text-primary">bar_chart</span>
                <h1 class="text-xl font-bold text-white">Tu encuesta</h1>
              </div>
              <p class="mt-6 text-3xl font-black leading-tight tracking-[-0.033em] text-white md:text-4xl">Crea encuestas poderosas en minutos</p>
              <ul class="mt-8 space-y-4 text-left">
                <li class="flex items-start gap-3">
                  <span class="material-symbols-outlined mt-0.5 text-lg text-primary">check_circle</span>
                  <div class="text-slate-300">
                    <h3 class="font-semibold text-white">Analiza resultados en tiempo real</h3>
                    <p class="text-sm">Visualiza datos al instante con dashboards interactivos.</p>
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <span class="material-symbols-outlined mt-0.5 text-lg text-primary">check_circle</span>
                  <div class="text-slate-300">
                    <h3 class="font-semibold text-white">Mejora la satisfacción</h3>
                    <p class="text-sm">Identifica áreas de mejora y actúa sobre el feedback de tus clientes y empleados.</p>
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <span class="material-symbols-outlined mt-0.5 text-lg text-primary">check_circle</span>
                  <div class="text-slate-300">
                    <h3 class="font-semibold text-white">Personalización completa</h3>
                    <p class="text-sm">Adapta tus encuestas con tu marca y preguntas específicas.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="flex w-full flex-col items-center justify-center bg-white p-8 md:p-12">
            <div class="w-full max-w-lg">
              <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-12">
                <h2 class="text-xl font-bold text-slate-800">Iniciar Sesión</h2>
                <p class="mt-2 text-sm text-slate-600">Regístrate para empezar a crear y gestionar tus encuestas.</p>
                <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="mt-6 space-y-5">
                  <div>
                    <label class="block text-xs font-medium text-slate-600" for="email">Email</label>
                    <input formControlName="email" class="mt-1 block w-full rounded-lg border-slate-300 py-2.5 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 text-sm" id="email" type="email" placeholder="tu@email.com"/>
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-slate-600" for="password">Contraseña</label>
                    <input formControlName="password" class="mt-1 block w-full rounded-lg border-slate-300 py-2.5 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 text-sm" id="password" type="password" placeholder="••••••••"/>
                  </div>
                  <button [disabled]="loginForm.invalid || isLoading" class="flex h-11 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary text-sm font-bold text-white transition-colors hover:bg-primary/90 disabled:opacity-50" type="submit">
                    <span class="truncate">{{ isLoading ? 'Cargando...' : 'Entrar' }}</span>
                  </button>
                </form>
              </div>
              <p class="mt-6 text-center text-sm font-medium text-slate-500">¿No tienes una cuenta? <a class="font-semibold text-primary underline hover:text-primary/90" routerLink="/register-company">Regístrate como empresa</a></p>
            </div>
          </div>
        </main>
      </div>
    </div>
  `
})
export class LandingPageComponent {
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router 
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required] // ← solo validación visual
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;

      const email = this.loginForm.value.email;

      this.authService.login(email).subscribe({
        next: (res) => {
          console.log('Login success', res);
          this.isLoading = false;

          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Login failed', err);
          this.isLoading = false;
        }
      });
    }
  }
}
