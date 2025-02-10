import { Routes } from "@angular/router";
import { AjusteInventarioComponent } from "./ajuste-inventario.component";
import { CreateAjusteComponent } from "./create-ajuste/create-ajuste.component";
import { EditAjusteComponent } from "./edit-ajuste/edit-ajuste.component";

export const AjusteRoutes: Routes = [
  {
    path: "list",
    component: AjusteInventarioComponent
  },
  {
    path: "create",
    component: CreateAjusteComponent
  },
  {
    path: "edit/:id",
    component: EditAjusteComponent
  },
  {
    path: "**",
    redirectTo: "list",
    pathMatch: "full"
  }
];