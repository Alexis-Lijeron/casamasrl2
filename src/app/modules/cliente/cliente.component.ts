import { Component } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { AlertsService } from '../../shared/services/alerts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente',
  imports: [PageHeaderComponent, DataTablesModule],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css',
})
export class ClienteComponent {
  data: any = {
    title: 'Clientes',
    subtitle: '',
    name: 'Clientes',
  };

  dtOptions: Config = {};

  clientes = [
    {
      id: 1,
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'juan@gmail.com',
      telefono: '1234567890',
      genero: 'M',
    },
    {
      id: 2,
      nombre: 'María',
      apellido: 'López',
      email: 'juan@gmail.com',
      telefono: '0987654321',
      genero: 'F',
    },
    {
      id: 3,
      nombre: 'Carlos',
      apellido: 'Ramírez',
      email: 'juan@gmail.com',
      telefono: '1230984567',
      genero: 'M',
    },
    {
      id: 4,
      nombre: 'Ana',
      apellido: 'Martínez',
      email: 'juan@gmail.com',
      telefono: '0981234567',
      genero: 'F',
    },
    {
      id: 5,
      nombre: 'Pedro',
      apellido: 'Gómez',
      email: 'juan@gmail.com',
      telefono: '1234560987',
      genero: 'M',
    },
    {
      id: 6,
      nombre: 'Laura',
      apellido: 'Torres',
      email: 'juan@gmail.com',
      telefono: '0987651098',
      genero: 'F',
    },
  ];

  constructor(private alertsService: AlertsService, private router: Router) {}

  ngOnInit(): void {
    this.dtOptions = {
      language: {
        url: '/assets/libs/datatables/spanish.json',
      },
    };
  }

  async confirmarEliminarCliente(id: number): Promise<void> {
    // Buscar la cliente por id
    const cliente = this.clientes.find((cliente) => cliente.id === id);

    if (!cliente) {
      this.alertsService.alertError('El cliente no existe');
      return;
    }

    const nombre = cliente.nombre;
    const confirmed = await this.alertsService.showConfirmationDialog({
      title: 'Eliminar Cliente',
      text: `¿Seguro que deseas eliminar el cliente "${nombre}"?`,
    });

    if (confirmed) {
      this.eliminarCliente(id);
    }
  }

  eliminarCliente(id: number): void {
    this.clientes = this.clientes.filter((cliente) => cliente.id !== id);
    this.alertsService.alertSuccess('El cliente se eliminó correctamente');
  }

  goToCreateCliente(): void {
    this.router.navigate(['/dashboard/cliente/create']);
  }

  goToEditCliente(id: number): void {
    this.router.navigate(['/dashboard/cliente/edit', id]);
  }
}
