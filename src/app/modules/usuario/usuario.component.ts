import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { AlertsService } from '../../shared/services/alerts.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { DataTablesModule } from 'angular-datatables';
import { User } from '../../interfaces/user.interface';
import { UsuarioService } from './usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario',
  imports: [
    PageHeaderComponent,
    DataTablesModule,
    CommonModule,
    NgxPaginationModule,
  ],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css',
})
export class UsuarioComponent {
  data: any = {
    title: 'Usuarios',
    subtitle: '',
    name: 'Usuarios',
  };

  page: number = 1;
  limit: number = 10;

  errorMessage: string | null = null;
  usuarios: User[] = [];

  constructor(
    private alertsService: AlertsService,
    private router: Router,
    private usuarioService: UsuarioService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // this.usuarioService.usuarios$.subscribe(usuarios => {
    //   this.usuarios = usuarios;
    // });

    this.obtenerUsuarios();
  }

  // Cargar los usuarios
  obtenerUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe(
      (data) => {
        this.usuarios = data;
        this.errorMessage = null;
        this.cdr.markForCheck();
      },
      (error) => {
        this.errorMessage = 'Hubo un error al cargar los usuarios';
        this.cdr.markForCheck();
      }
    );
  }

  // Confirmar la eliminación de un usuario
  async confirmarEliminarUsuario(id: number): Promise<void> {
    const confirmed = await this.alertsService.showConfirmationDialog({
      title: 'Eliminar Cliente',
      text: '¿Seguro que deseas eliminar el usuario?',
    });

    if (confirmed) {
      this.eliminarUsuario(id);
    }
  }

  // Eliminar un usuario
  eliminarUsuario(id: number): void {
    this.usuarioService.deleteUsuario(id).subscribe({
      next: () => {
        this.alertsService.alertSuccess('El usuario se eliminó correctamente');
        this.obtenerUsuarios();
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error al eliminar el usuario:', err);
        this.alertsService.alertError('Error al eliminar el usuario');
      },
    });
  }

  // Cambiar la cantidad de usuarios por página
  changeLimit(event: any): void {
    this.limit = event.target.value;
  }

  // Filtrar usuarios por nombre
  searchTable(event: Event): void {
    const target = event.target as HTMLInputElement;
    const searchTerm = target.value.toLowerCase();

    if (searchTerm === '') {
      // Si el campo de búsqueda está vacío, mostrar todas las productos
      this.obtenerUsuarios();
    } else {
      // Filtrar los usuarios según el nombre
      this.usuarios = this.usuarios.filter(
        (usuario) =>
          // Filtrar por nombre, email y username
          usuario.username?.toLowerCase().includes(searchTerm) ||
          usuario.email?.toLowerCase().includes(searchTerm) ||
          usuario.fullname?.toLowerCase().includes(searchTerm)
      );
    }
    this.page = 1;
  }

  // Ir a la página de creación de usuario
  goToCreateUsuario(): void {
    this.router.navigate(['/dashboard/usuario/create']);
  }

  // Ir a la página de edición de usuario
  goToEditUsuario(id: number): void {
    this.router.navigate(['/dashboard/usuario/edit', id]);
  }
}
