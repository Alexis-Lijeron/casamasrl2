import { Routes } from "@angular/router";
import { AlmacenComponent } from "./almacen.component";
import { CreateAlmacenComponent } from "./create-almacen/create-almacen.component";
import { EditAlmacenComponent } from "./edit-almacen/edit-almacen.component";

export const AlmacenRoutes: Routes = [
  {
    path: "list",
    component: AlmacenComponent
  },
  {
    path: "create",
    component: CreateAlmacenComponent
  },
  {
    path: "edit/:id",
    component: EditAlmacenComponent
  },
  {
    path: "**",
    redirectTo: "list",
    pathMatch: "full"
  }
];