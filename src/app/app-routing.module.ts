import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
const routes: Routes = [
  // rutas publicas
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // Paths publicas
  { path: 'login', loadChildren: () => import('./pages/public/login/login.module').then(m => m.LoginModule) },
  {
    path: 'cambiar-password',
    loadChildren: () => import('./pages/public/change-password/change-password.module').then(m => m.ChangePasswordModule)
  },


  // Paths logueadas
  {
    path: 'logged',
    canActivate: [AuthService],
    children: [
      {
        path: 'home',
        loadChildren: () => import('./pages/logged/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'listado-tareas',
        loadChildren: () => import('./pages/logged/listado-tareas/listado-tareas.module').then(m => m.ListadoTareasModule)
      },
      {
        path: 'perfil/:id',
        loadChildren: () => import('./pages/logged/perfil/perfil.module').then(m => m.PerfilModule)
      },
      {
        path: 'ver-tarea/:id',
        loadChildren: () => import('./pages/logged/ver-tarea/ver-tarea.module').then(m => m.VerTareaModule)
      },
      {
        path: 'imprimir-estado/:id',
        loadChildren: () => import('./pages/logged/imprimir-estados/imprimir-estados.module').then(m => m.ImprimirEstadosModule)
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
