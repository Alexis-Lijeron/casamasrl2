import { ChangeDetectorRef, Component } from '@angular/core';
import { AlertsService } from '../../shared/services/alerts.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { DataTablesModule } from 'angular-datatables';
import { CategoriaService, Categoria } from './categoria.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categoria',
  imports: [
    PageHeaderComponent,
    DataTablesModule,
    CommonModule,
    NgxPaginationModule,
  ],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css',
})
export class CategoriaComponent {
  data: any = {
    title: 'Categorías',
    subtitle: '',
    name: 'Categorías',
  };

  page: number = 1;
  limit: number = 10;
  errorMessage: string | null = null;
  categorias: Categoria[] = [];

  constructor(
    private alertsService: AlertsService,
    private router: Router,
    private categoriaService: CategoriaService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  // Cargar las categorías
  obtenerCategorias(): void {
    this.categoriaService.getCategorias().subscribe(
      (data) => {
        this.categorias = data;
        this.errorMessage = null;
        this.cdr.markForCheck();
      },
      (error) => {
        this.errorMessage = 'Hubo un error al cargar las categorías';
        this.cdr.markForCheck();
      }
    );
  }

  // Confirmar la eliminación de una categoría
  async confirmarEliminarCategoria(id: number): Promise<void> {
    const confirmed = await this.alertsService.showConfirmationDialog({
      title: 'Eliminar Categoría',
      text: '¿Seguro que deseas eliminar esta categoría?',
    });

    if (confirmed) {
      this.eliminarCategoria(id);
    }
  }

  // Eliminar una categoría
  eliminarCategoria(id: number): void {
    this.categoriaService.deleteCategoria(id).subscribe({
      next: () => {
        this.alertsService.alertSuccess('La categoría se eliminó correctamente');
        this.obtenerCategorias();
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error al eliminar la categoría:', err);
        this.alertsService.alertError('Error al eliminar la categoría');
      },
    });
  }

  // Cambiar la cantidad de categorías por página
  changeLimit(event: any): void {
    this.limit = event.target.value;
  }

  // Filtrar categorías por nombre
  searchTable(event: Event): void {
    const target = event.target as HTMLInputElement;
    const searchTerm = target.value.toLowerCase();

    if (searchTerm === '') {
      this.obtenerCategorias(); // Si el campo de búsqueda está vacío, mostrar todas las categorías
    } else {
      this.categorias = this.categorias.filter((categoria) =>
        categoria.nombre.toLowerCase().includes(searchTerm)
      );
    }
    this.page = 1;
  }

  // Ir a la página de creación de categoría
  goToCreateCategoria(): void {
    this.router.navigate(['/dashboard/categoria/create']);
  }

  // Ir a la página de edición de categoría
  goToEditCategoria(id: number): void {
    this.router.navigate(['/dashboard/categoria/edit', id]);
  }
}
