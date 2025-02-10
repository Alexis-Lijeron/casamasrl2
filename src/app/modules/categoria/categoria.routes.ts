import { Routes } from "@angular/router";
import { CategoriaComponent } from "./categoria.component";
import { CrearCategoriaComponent } from "./crear-categoria/crear-categoria.component";
import { EditarCategoriaComponent } from "./editar-categoria/editar-categoria.component";

export const CategoriaRoutes: Routes = [
  {
    path: "list",
    component: CategoriaComponent
  },
  {
    path: "create",
    component: CrearCategoriaComponent
  },
  {
    path: "edit/:id",
    component: EditarCategoriaComponent
  },
  {
    path: "**",
    redirectTo: "list",
    pathMatch: "full"
  }
];