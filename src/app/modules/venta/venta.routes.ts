import { Routes } from "@angular/router";
import { VentaComponent } from "./venta.component";
import { CreateVentaComponent } from "./create-venta/create-venta.component";
import { EditVentaComponent } from "./edit-venta/edit-venta.component";

export const VentaRoutes: Routes = [
  {
    path: "list",
    component: VentaComponent
  },
  {
    path: "create",
    component: CreateVentaComponent
  },
  {
    path: "edit/:id",
    component: EditVentaComponent
  },
  {
    path: "**",
    redirectTo: "list",
    pathMatch: "full"
  }
];