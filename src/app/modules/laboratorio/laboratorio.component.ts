import { Component } from '@angular/core';
import { Config } from 'datatables.net';
import { AlertsService } from '../../shared/services/alerts.service';
import { Router } from '@angular/router';
import { PageHeaderComponent } from "../../shared/components/page-header/page-header.component";
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-laboratorio',
  imports: [PageHeaderComponent, DataTablesModule],
  templateUrl: './laboratorio.component.html',
  styleUrl: './laboratorio.component.css'
})
export class LaboratorioComponent {

  data: any = {
      title: 'Laboratorios',
      subtitle: '',
      name: 'Laboratorios'
    };
    
    dtOptions: Config = {};
    
    laboratorios = [
      { id: 1, nombre: 'Laboratorio A' },
      { id: 2, nombre: 'Laboratorio B' },
      { id: 3, nombre: 'Laboratorio C' },
      { id: 4, nombre: 'Laboratorio D' },
      { id: 5, nombre: 'Laboratorio E' },
      { id: 6, nombre: 'Laboratorio F' },
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
    
    async confirmarEliminarLaboratorio(id: number): Promise<void> {
      
      // Buscar la laboratorio por id
      const laboratorio = this.laboratorios.find(laboratorio => laboratorio.id === id);
      
      if (!laboratorio) {
        this.alertsService.alertError('El laboratorio no existe');
        return;
      }
      
      const nombre = laboratorio.nombre;
      const confirmed = await this.alertsService.showConfirmationDialog({
        title: 'Eliminar Laboratorio',
        text: `¿Seguro que deseas eliminar el laboratorio "${nombre}"?`
      });
      
      if (confirmed) {
        this.eliminarLaboratorio(id);
      }
    }
  
    eliminarLaboratorio(id: number): void {
      this.laboratorios = this.laboratorios.filter(laboratorio => laboratorio.id !== id);
      this.alertsService.alertSuccess('El laboratorio se eliminó correctamente');
    }
    
    goToCreateLaboratorio(): void {
      this.router.navigate(['/dashboard/laboratorio/create']);
    }
    
    goToEditLaboratorio(id: number): void {
      this.router.navigate(['/dashboard/laboratorio/edit', id]);
    }
  
}
