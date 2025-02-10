import { Component } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { AlertsService } from '../../shared/services/alerts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-almacen',
  imports: [PageHeaderComponent, DataTablesModule],
  templateUrl: './almacen.component.html',
  styleUrl: './almacen.component.css',
})
export class AlmacenComponent {
  data: any = {
    title: 'Almacenes',
    subtitle: '',
    name: 'Almacenes',
  };

  dtOptions: Config = {};

  almacenes = [
    { id: 1, nombre: 'Almacén 1', descripcion: 'Almacén principal' },
    { id: 2, nombre: 'Almacén 2', descripcion: 'Almacén secundario' },
    { id: 3, nombre: 'Almacén 3', descripcion: 'Almacén de productos' },
    { id: 4, nombre: 'Almacén 4', descripcion: 'Almacén de materiales' },
    { id: 5, nombre: 'Almacén 5', descripcion: 'Almacén de herramientas' },
    { id: 6, nombre: 'Almacén 6', descripcion: 'Almacén de repuestos' },
  ];

  constructor(private alertsService: AlertsService, private router: Router) {}

  ngOnInit(): void {
    this.dtOptions = {
      language: {
        url: '/assets/libs/datatables/spanish.json',
      },
    };
  }

  async confirmarEliminarAlmacen(id: number): Promise<void> {
    // Buscar la almacen por id
    const almacen = this.almacenes.find((almacen) => almacen.id === id);

    if (!almacen) {
      this.alertsService.alertError('La almacen no existe');
      return;
    }

    const nombre = almacen.nombre;
    const confirmed = await this.alertsService.showConfirmationDialog({
      title: 'Eliminar Almacen',
      text: `¿Seguro que deseas eliminar el almacen "${nombre}"?`,
    });

    if (confirmed) {
      this.eliminarAlmacen(id);
    }
  }

  eliminarAlmacen(id: number): void {
    this.almacenes = this.almacenes.filter(
      (almacen) => almacen.id !== id
    );
    this.alertsService.alertSuccess('El almacen se eliminó correctamente');
  }

  goToCreateAlmacen(): void {
    this.router.navigate(['/dashboard/almacen/create']);
  }

  goToEditAlmacen(id: number): void {
    this.router.navigate(['/dashboard/almacen/edit', id]);
  }
}
