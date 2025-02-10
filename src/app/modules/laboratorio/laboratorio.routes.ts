import { Routes } from "@angular/router";
import { LaboratorioComponent } from "./laboratorio.component";
import { CreateLaboratorioComponent } from "./create-laboratorio/create-laboratorio.component";
import { EditLaboratorioComponent } from "./edit-laboratorio/edit-laboratorio.component";

export const LaboratorioRoutes: Routes = [
  {
    path: "list",
    component: LaboratorioComponent
  },
  {
    path: "create",
    component: CreateLaboratorioComponent
  },
  {
    path: "edit/:id",
    component: EditLaboratorioComponent
  },
  {
    path: "**",
    redirectTo: "list",
    pathMatch: "full"
  }
];