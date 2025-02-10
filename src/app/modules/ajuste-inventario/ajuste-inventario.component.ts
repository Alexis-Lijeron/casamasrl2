import { Component } from '@angular/core';
import { Config } from 'datatables.net';
import { AlertsService } from '../../shared/services/alerts.service';
import { Router } from '@angular/router';
import { PageHeaderComponent } from "../../shared/components/page-header/page-header.component";
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-ajuste-inventario',
  imports: [PageHeaderComponent, DataTablesModule],
  templateUrl: './ajuste-inventario.component.html',
  styleUrl: './ajuste-inventario.component.css',
})
export class AjusteInventarioComponent {
  data: any = {
    title: 'Ajustes de Inventario',
    subtitle: '',
    name: 'Ajustes de Inventario',
  };

  dtOptions: Config = {};

  ajustes = [
    { id: 1, tipo: 'Ingreso', descripcion: 'Ajuste principal', fecha: '2021-10-01' },
    { id: 2, tipo: 'Salida', descripcion: 'Ajuste secundario', fecha: '2021-10-02' },
    { id: 3, tipo: 'Ingreso', descripcion: 'Ajuste de productos', fecha: '2021-10-03' },
    { id: 4, tipo: 'Salida', descripcion: 'Ajuste de materiales', fecha: '2021-10-04' },
    { id: 5, tipo: 'Ingreso', descripcion: 'Ajuste de herramientas', fecha: '2021-10-05' },
    { id: 6, tipo: 'Salida', descripcion: 'Ajuste de repuestos', fecha: '2021-10-06' },
  ];

  constructor(private alertsService: AlertsService, private router: Router) {}

  ngOnInit(): void {
    this.dtOptions = {
      language: {
        url: '/assets/libs/datatables/spanish.json',
      },
    };
  }

  async confirmarEliminarAjuste(id: number): Promise<void> {
    // Buscar la ajuste por id
    const ajuste = this.ajustes.find((ajuste) => ajuste.id === id);

    if (!ajuste) {
      this.alertsService.alertError('El ajuste inventario no existe');
      return;
    }

    const ajusteId = ajuste.id;
    const confirmed = await this.alertsService.showConfirmationDialog({
      title: 'Eliminar Almacen',
      text: `¿Seguro que deseas eliminar el ajuste de inventario con ID "${ajusteId}"?`,
    });

    if (confirmed) {
      this.eliminarAjuste(id);
    }
  }

  eliminarAjuste(id: number): void {
    this.ajustes = this.ajustes.filter((ajuste) => ajuste.id !== id);
    this.alertsService.alertSuccess('El ajuste de inventario se eliminó correctamente');
  }

  goToCreateAjuste(): void {
    this.router.navigate(['/dashboard/ajuste-inventario/create']);
  }

  goToEditAjuste(id: number): void {
    this.router.navigate(['/dashboard/ajuste-inventario/edit', id]);
  }
}
