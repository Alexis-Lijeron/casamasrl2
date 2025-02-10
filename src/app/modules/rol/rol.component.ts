import { Component } from '@angular/core';
import { Config } from 'datatables.net';
import { AlertsService } from '../../shared/services/alerts.service';
import { Router } from '@angular/router';
import { PageHeaderComponent } from "../../shared/components/page-header/page-header.component";
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-rol',
  imports: [PageHeaderComponent, DataTablesModule],
  templateUrl: './rol.component.html',
  styleUrl: './rol.component.css'
})
export class RolComponent {
data: any = {
    title: 'Roles',
    subtitle: '',
    name: 'Roles'
  };
  
  dtOptions: Config = {};
  
  roles = [
    { id: 1, nombre: 'Admin' },
    { id: 2, nombre: 'User' },
    { id: 3, nombre: 'Guest'  },
    { id: 4, nombre: 'SuperAdmin' },
    { id: 5, nombre: 'Moderator' },
    { id: 6, nombre: 'Editor' },
  ];
  
  constructor(
    private alertsService: AlertsService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.dtOptions = {
      language: {
        url: '/assets/libs/datatables/spanish.json'
      }
    }
  }
  
  async confirmarEliminarRol(id: number): Promise<void> {
    
    // Buscar la rol por id
    const rol = this.roles.find(rol => rol.id === id);
    
    if (!rol) {
      this.alertsService.alertError('El rol no existe');
      return;
    }
    
    const nombre = rol.nombre;
    const confirmed = await this.alertsService.showConfirmationDialog({
      title: 'Eliminar Rol',
      text: `¿Seguro que deseas eliminar el rol "${nombre}"?`
    });
    
    if (confirmed) {
      this.eliminarRol(id);
    }
  }

  eliminarRol(id: number): void {
    this.roles = this.roles.filter(rol => rol.id !== id);
    this.alertsService.alertSuccess('El rol se eliminó correctamente');
  }
  
  
  
  goToCreateRol(): void {
    this.router.navigate(['/dashboard/rol/create']);
  }
  
  goToEditRol(id: number): void {
    this.router.navigate(['/dashboard/rol/edit', id]);
  }
}
