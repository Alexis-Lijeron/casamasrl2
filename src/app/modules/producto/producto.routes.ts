import { Routes } from "@angular/router";
import { ProductoComponent } from "./producto.component";
import { CreateProductoComponent } from "./create-producto/create-producto.component";
import { EditProductoComponent } from "./edit-producto/edit-producto.component";

export const ProductoRoutes: Routes = [
  {
    path: "list",
    component: ProductoComponent
  },
  {
    path: "create",
    component: CreateProductoComponent
  },
  {
    path: "edit/:id",
    component: EditProductoComponent
  },
  {
    path: "**",
    redirectTo: "list",
    pathMatch: "full"
  }
];