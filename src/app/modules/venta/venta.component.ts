import { Component } from '@angular/core';
import { Config } from 'datatables.net';
import { AlertsService } from '../../shared/services/alerts.service';
import { Router } from '@angular/router';
import { PageHeaderComponent } from "../../shared/components/page-header/page-header.component";
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-venta',
  imports: [PageHeaderComponent, DataTablesModule],
  templateUrl: './venta.component.html',
  styleUrl: './venta.component.css',
})
export class VentaComponent {
  data: any = {
    title: 'Ventas',
    subtitle: '',
    name: 'Ventas',
  };

  dtOptions: Config = {};

  ventas = [
    { id: 1, cliente: 'Cliente 1', total: 100, fecha: '2021-10-01', estadoPago: true },
    { id: 2, cliente: 'Cliente 2', total: 200, fecha: '2021-10-02', estadoPago: true },
    { id: 3, cliente: 'Cliente 3', total: 300, fecha: '2021-10-03', estadoPago: false },
    { id: 4, cliente: 'Cliente 4', total: 400, fecha: '2021-10-04', estadoPago: true },
    { id: 5, cliente: 'Cliente 5', total: 500, fecha: '2021-10-05', estadoPago: false },
    { id: 6, cliente: 'Cliente 6', total: 600, fecha: '2021-10-06', estadoPago: true },
  ];

  constructor(private alertsService: AlertsService, private router: Router) {}

  ngOnInit(): void {
    this.dtOptions = {
      language: {
        url: '/assets/libs/datatables/spanish.json',
      },
    };
  }

  async confirmarEliminarVenta(id: number): Promise<void> {
    // Buscar la venta por id
    const venta = this.ventas.find((venta) => venta.id === id);

    if (!venta) {
      this.alertsService.alertError('La venta no existe');
      return;
    }

    const ventaId = venta.id;
    const confirmed = await this.alertsService.showConfirmationDialog({
      title: 'Eliminar Almacen',
      text: `¿Seguro que deseas eliminar la venta con ID "${ventaId}"?`,
    });

    if (confirmed) {
      this.eliminarVenta(id);
    }
  }

  eliminarVenta(id: number): void {
    this.ventas = this.ventas.filter((venta) => venta.id !== id);
    this.alertsService.alertSuccess(
      'La venta se eliminó correctamente'
    );
  }

  goToCreateVenta(): void {
    this.router.navigate(['/dashboard/venta/create']);
  }

  goToEditVenta(id: number): void {
    this.router.navigate(['/dashboard/venta/edit', id]);
  }
}
