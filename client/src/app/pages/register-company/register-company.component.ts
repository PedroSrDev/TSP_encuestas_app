import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-register-company',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="relative flex min-h-screen w-full flex-col font-display bg-white text-slate-800">
      <div class="flex-grow">
        <div class="flex h-full min-h-screen">
          <main class="flex w-full flex-col items-center p-4 md:w-1/2 md:p-8 lg:p-12">
            <div class="flex w-full max-w-md flex-col">
              <header class="flex items-center justify-between py-6">
                <div class="flex items-center gap-4 text-slate-600">
                  <a class="flex items-center gap-2" routerLink="/">
                    <span class="material-symbols-outlined text-3xl text-primary">bar_chart</span>
                    <h1 class="text-xl font-bold text-slate-900">Tu encuesta</h1>
                  </a>
                </div>
                <a class="cursor-pointer text-sm font-bold text-primary hover:underline" routerLink="/">Iniciar Sesión</a>
              </header>
              <div class="my-8">
                <p class="text-3xl font-black leading-tight tracking-[-0.033em] text-[#081f3f]">Crea tu cuenta de empresa</p>
                <p class="mt-2 text-base font-normal leading-normal text-slate-600">Regístrate para empezar a crear y gestionar tus encuestas.</p>
              </div>
              <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-6">
                <div class="space-y-4">
                  <h3 class="text-lg font-bold leading-tight tracking-[-0.015em] text-slate-900">Información de la empresa</h3>
                  <div class="space-y-4">
                    <label class="flex flex-col">
                      <p class="pb-2 text-sm font-medium leading-normal text-slate-700">Nombre de la empresa</p>
                      <input formControlName="companyName" class="form-input flex h-11 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-slate-300 bg-white p-3 text-sm font-normal leading-normal text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/20" placeholder="Tu Empresa S.A."/>
                    </label>
                    <label class="flex flex-col">
                      <p class="pb-2 text-sm font-medium leading-normal text-slate-700">Sitio web (opcional)</p>
                      <input formControlName="website" class="form-input flex h-11 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-slate-300 bg-white p-3 text-sm font-normal leading-normal text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/20" placeholder="https://www.tuempresa.com"/>
                    </label>
                    <label class="flex flex-col">
                      <p class="pb-2 text-sm font-medium leading-normal text-slate-700">Tamaño de la empresa</p>
                      <div class="relative">
                        <select formControlName="companySize" class="form-select w-full appearance-none h-11 min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-slate-300 bg-white p-3 text-sm font-normal leading-normal text-slate-900 focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/20">
                          <option>1-10 empleados</option>
                          <option>11-50 empleados</option>
                          <option>51-200 empleados</option>
                          <option>201-1000 empleados</option>
                          <option>Más de 1000 empleados</option>
                        </select>
                        <span class="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">expand_more</span>
                      </div>
                    </label>
                  </div>
                </div>
                <hr class="border-slate-200"/>
                <div class="space-y-4">
                  <h3 class="text-lg font-bold leading-tight tracking-[-0.015em] text-slate-900">Información del administrador</h3>
                  <div class="space-y-4">
                    <label class="flex flex-col">
                      <p class="pb-2 text-sm font-medium leading-normal text-slate-700">Nombre completo</p>
                      <input formControlName="fullName" class="form-input flex h-11 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-slate-300 bg-white p-3 text-sm font-normal leading-normal text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/20" placeholder="Juan Pérez"/>
                    </label>
                    <label class="flex flex-col">
                      <p class="pb-2 text-sm font-medium leading-normal text-slate-700">Email de trabajo</p>
                      <input formControlName="email" class="form-input flex h-11 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-slate-300 bg-white p-3 text-sm font-normal leading-normal text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/20" placeholder="juan.perez@tuempresa.com" type="email"/>
                    </label>
                    <label class="flex flex-col">
                      <p class="pb-2 text-sm font-medium leading-normal text-slate-700">Contraseña</p>
                      <div class="relative">
                        <input formControlName="password" [type]="showPassword ? 'text' : 'password'" class="form-input flex h-11 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-slate-300 bg-white p-3 pr-10 text-sm font-normal leading-normal text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/20" placeholder="••••••••"/>
                        <button (click)="togglePassword()" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-primary" type="button">
                          <span class="material-symbols-outlined text-xl">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
                        </button>
                      </div>
                    </label>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <input formControlName="terms" class="form-checkbox mt-1 h-4 w-4 rounded border-slate-300 bg-white text-primary focus:ring-primary/50 checked:bg-primary" id="terms" type="checkbox"/>
                  <label class="text-sm text-slate-500" for="terms">
                    Acepto los <a class="font-semibold text-primary hover:underline" href="#">Términos y Condiciones</a> y la <a class="font-semibold text-primary hover:underline" href="#">Política de Privacidad</a>.
                  </label>
                </div>
                <button [disabled]="registerForm.invalid || isLoading" class="flex h-12 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary text-base font-bold text-white transition-colors hover:bg-primary/90 disabled:opacity-50" type="submit">
                  <span class="truncate">{{ isLoading ? 'Creando Cuenta...' : 'Crear Cuenta' }}</span>
                </button>
              </form>
            </div>
          </main>
          <aside class="relative hidden w-1/2 flex-col items-center justify-center bg-[#1E293B] p-12 md:flex">
            <div class="absolute inset-0 bg-primary/10 opacity-10" style="background-image: linear-gradient(to top right, #3b82f61a, transparent 50%), linear-gradient(to bottom left, #3b82f61a, transparent 50%);"></div>
            <div class="relative z-10 w-full max-w-md space-y-8">
              <h2 class="text-4xl font-black text-white">Crea encuestas poderosas en minutos</h2>
              <p class="text-lg text-slate-300">Bienvenido a la plataforma líder para entender a tus clientes y empleados.</p>
              <ul class="space-y-4">
                <li class="flex items-start gap-4">
                  <div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-700 text-slate-300">
                    <span class="material-symbols-outlined text-lg">edit_note</span>
                  </div>
                  <div>
                    <h4 class="font-bold text-white">Crea encuestas personalizadas</h4>
                    <p class="text-sm text-slate-400">Diseña encuestas atractivas con nuestro editor intuitivo.</p>
                  </div>
                </li>
                <li class="flex items-start gap-4">
                  <div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-700 text-slate-300">
                    <span class="material-symbols-outlined text-lg">analytics</span>
                  </div>
                  <div>
                    <h4 class="font-bold text-white">Analiza resultados en tiempo real</h4>
                    <p class="text-sm text-slate-400">Obtén insights valiosos con nuestros dashboards interactivos.</p>
                  </div>
                </li>
                <li class="flex items-start gap-4">
                  <div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-700 text-slate-300">
                    <span class="material-symbols-outlined text-lg">sentiment_satisfied</span>
                  </div>
                  <div>
                    <h4 class="font-bold text-white">Mejora la satisfacción</h4>
                    <p class="text-sm text-slate-400">Toma decisiones informadas para impulsar la lealtad y el compromiso.</p>
                  </div>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  `
})
export class RegisterCompanyComponent {
  registerForm: FormGroup;
  isLoading = false;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      companyName: ['', Validators.required],
      website: [''],
      companySize: ['1-10 empleados', Validators.required],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.authService.registerCompany(this.registerForm.value).subscribe({
        next: (res) => {
          console.log('Registration success', res);
          this.isLoading = false;
          this.alertService.success('Registro Exitoso', 'Tu cuenta de empresa ha sido creada correctamente.');
          this.router.navigate(['/']); // Redirect to login
        },
        error: (err) => {
          console.error('Registration failed', err);
          this.isLoading = false;
          // Error is handled by interceptor, but we can add specific handling if needed
        }
      });
    }
  }
}
