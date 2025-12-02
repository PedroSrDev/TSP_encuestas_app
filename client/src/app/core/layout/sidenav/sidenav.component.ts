import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <aside class="flex h-full w-64 flex-col justify-between bg-slate-800 p-4 text-white">
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-3 px-3 py-2 text-white">
          <span class="material-symbols-outlined text-2xl">bar_chart</span>
          <h2 class="text-lg font-bold tracking-tight">Tu encuesta</h2>
        </div>
        <div class="mb-4 border-t border-white/20 px-3 pt-4 text-sm font-medium">POLI ENCUESTAS</div>
        <nav class="flex flex-col gap-2">
          <a routerLink="/dashboard" routerLinkActive="bg-slate-900 text-white" [routerLinkActiveOptions]="{exact: true}" class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium leading-normal text-slate-300 transition-colors hover:bg-slate-700 hover:text-white">
            <span class="material-symbols-outlined text-xl">dashboard</span>
            Dashboard
          </a>
          <a routerLink="/users" routerLinkActive="bg-slate-900 text-white" class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium leading-normal text-slate-300 transition-colors hover:bg-slate-700 hover:text-white">
            <span class="material-symbols-outlined text-xl">group</span>
            Usuarios
          </a>
          <a routerLink="/surveys" routerLinkActive="bg-slate-900 text-white" class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium leading-normal text-slate-300 transition-colors hover:bg-slate-700 hover:text-white">
            <span class="material-symbols-outlined text-xl">assignment</span>
            Mis Encuestas
          </a>
          <a routerLink="/analytics" routerLinkActive="bg-slate-900 text-white" class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium leading-normal text-slate-300 transition-colors hover:bg-slate-700 hover:text-white">
            <span class="material-symbols-outlined text-xl">analytics</span>
            Análisis de Resultados
          </a>
          <a routerLink="/templates" routerLinkActive="bg-slate-900 text-white" class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium leading-normal text-slate-300 transition-colors hover:bg-slate-700 hover:text-white">
            <span class="material-symbols-outlined text-xl">grid_view</span>
            Plantillas
          </a>
        </nav>
      </div>
      <div class="flex flex-col gap-1 border-t border-white/20 pt-4">
        <a routerLink="/profile" routerLinkActive="bg-slate-900 text-white" class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium leading-normal text-white transition-colors hover:bg-slate-700">
          <span class="material-symbols-outlined text-xl">account_circle</span>
          Perfil de Usuario
        </a>
        <a routerLink="/" class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium leading-normal text-white transition-colors hover:bg-slate-700">
          <span class="material-symbols-outlined text-xl">logout</span>
          Cerrar Sesión
        </a>
      </div>
    </aside>
  `
})
export class SidenavComponent { }
