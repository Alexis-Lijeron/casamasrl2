import { Routes } from "@angular/router";
import { ClienteComponent } from "./cliente.component";
import { CreateClienteComponent } from './create-cliente/create-cliente.component';
import { EditClienteComponent } from "./edit-cliente/edit-cliente.component";

export const ClienteRoutes: Routes = [
  {
    path: "list",
    component: ClienteComponent
  },
  {
    path: "create",
    component: CreateClienteComponent
  },
  {
    path: "edit/:id",
    component: EditClienteComponent
  },
  {
    path: "**",
    redirectTo: "list",
    pathMatch: "full"
  }
];