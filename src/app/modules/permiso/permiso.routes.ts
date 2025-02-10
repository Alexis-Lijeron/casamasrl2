import { Routes } from "@angular/router";
import { PermisoComponent } from "./permiso.component";

export const PermisoRoutes: Routes = [
  {
    path: "list",
    component: PermisoComponent
  },
  {
    path: "**",
    redirectTo: "list",
    pathMatch: "full"
  }
];