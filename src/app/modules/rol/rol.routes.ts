import { Routes } from "@angular/router";
import { RolComponent } from "./rol.component";
import { CreateRolComponent } from "./create-rol/create-rol.component";
import { EditRolComponent } from "./edit-rol/edit-rol.component";

export const RolRoutes: Routes = [
  {
    path: "list",
    component: RolComponent
  },
  {
    path: "create",
    component: CreateRolComponent
  },
  {
    path: "edit/:id",
    component: EditRolComponent
  },
  {
    path: "**",
    redirectTo: "list",
    pathMatch: "full"
  }
];