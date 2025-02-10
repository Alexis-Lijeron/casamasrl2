import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './shared/layouts/dashboard-layout/dashboard-layout.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.routes').then((m) => m.AuthRoutes),
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'categoria',
        loadChildren: () =>
          import('./modules/categoria/categoria.routes').then(
            (m) => m.CategoriaRoutes
          ),
      },
      {
        path: 'rol',
        loadChildren: () =>
          import('./modules/rol/rol.routes').then((m) => m.RolRoutes),
      },
      {
        path: 'permiso',
        loadChildren: () =>
          import('./modules/permiso/permiso.routes').then(
            (m) => m.PermisoRoutes
          ),
      },
      {
        path: 'cliente',
        loadChildren: () =>
          import('./modules/cliente/cliente.routes').then(
            (m) => m.ClienteRoutes
          ),
      },
      {
        path: 'laboratorio',
        loadChildren: () =>
          import('./modules/laboratorio/laboratorio.routes').then(
            (m) => m.LaboratorioRoutes
          ),
      },
      {
        path: 'almacen',
        loadChildren: () =>
          import('./modules/almacen/almacen.routes').then(
            (m) => m.AlmacenRoutes
          ),
      },
      {
        path: 'producto',
        loadChildren: () =>
          import('./modules/producto/producto.routes').then(
            (m) => m.ProductoRoutes
          ),
      },
      {
        path: 'venta',
        loadChildren: () =>
          import('./modules/venta/venta.routes').then((m) => m.VentaRoutes),
      },
      {
        path: 'ajuste-inventario',
        loadChildren: () =>
          import('./modules/ajuste-inventario/ajuste.routes').then(
            (m) => m.AjusteRoutes
          ),
      },
      {
        path: 'usuario',
        loadChildren: () =>
          import('./modules/usuario/usuario.routes').then(
            (m) => m.UsuarioRoutes
          ),
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./modules/home/home.routes').then((m) => m.HomeRoutes),
      },
      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full',
      }
    ],
  },
  {
    path: '**',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];
