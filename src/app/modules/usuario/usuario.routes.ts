import { Routes } from "@angular/router";
import { UsuarioComponent } from "./usuario.component";
import { CreateUsuarioComponent } from "./create-usuario/create-usuario.component";
import { EditUsuarioComponent } from "./edit-usuario/edit-usuario.component";

export const UsuarioRoutes: Routes = [
  {
    path: "list",
    component: UsuarioComponent
  },
  {
    path: "create",
    component: CreateUsuarioComponent
  },
  {
    path: "edit/:id",
    component: EditUsuarioComponent
  },
  {
    path: "**",
    redirectTo: "list",
    pathMatch: "full"
  }
];