import { Component } from '@angular/core';
import { Config } from 'datatables.net';
import { PageHeaderComponent } from "../../shared/components/page-header/page-header.component";
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-permiso',
  imports: [PageHeaderComponent, DataTablesModule],
  templateUrl: './permiso.component.html',
  styleUrl: './permiso.component.css'
})
export class PermisoComponent {
data: any = {
    title: 'Permisos',
    subtitle: '',
    name: 'Permisos'
  };
  
  dtOptions: Config = {};
  
  permisos = [
    { id: 1, nombre: 'Crear', descripcion: 'Crear registros' },
    { id: 2, nombre: 'Leer', descripcion: 'Leer registros' },
    { id: 3, nombre: 'Actualizar', descripcion: 'Actualizar registros' },
    { id: 4, nombre: 'Eliminar', descripcion: 'Eliminar registros' },
    { id: 5, nombre: 'Listar', descripcion: 'Listar registros' },
    { id: 6, nombre: 'Otros', descripcion: 'Otros permisos' },
  ];
  
  constructor(
  ) {}
  
  ngOnInit(): void {
    this.dtOptions = {
      language: {
        url: '/assets/libs/datatables/spanish.json'
      }
    }
  }
  
}
