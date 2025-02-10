import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertsService } from '../../../shared/services/alerts.service';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { CommonModule } from '@angular/common';
import { CategoriaService, Categoria } from '../categoria.service';

@Component({
  selector: 'app-editar-categoria',
  imports: [PageHeaderComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './editar-categoria.component.html',
  styleUrl: './editar-categoria.component.css',
})
export class EditarCategoriaComponent {
  categoriaForm!: FormGroup;
  categoriaId!: number;

  data: any = {
    title: 'Categorías',
    subtitle: 'Editar categoría',
    name: 'Categorías',
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertsService: AlertsService,
    private validatorsService: ValidatorsService,
    private categoriaService: CategoriaService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    // Obtener el ID de la categoría desde la URL
    this.categoriaId = Number(this.route.snapshot.paramMap.get('id'));

    // Inicializar el formulario
    this.categoriaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
    });

    // Cargar los datos de la categoría si el ID es válido
    if (this.categoriaId) {
      this.obtenerCategoria(this.categoriaId);
    }
  }

  // Obtener la categoría por ID
  obtenerCategoria(id: number): void {
    this.categoriaService.getCategoriaById(id).subscribe({
      next: (categoria) => {
        if (categoria) {
          this.categoriaForm.patchValue(categoria);
        } else {
          this.alertsService.alertError('No se pudo obtener la categoría');
        }
      },
      error: () => {
        this.alertsService.alertError('Error al cargar la categoría');
      },
    });
  }

  // Actualizar la categoría
  actualizarCategoria(): void {
    if (this.categoriaForm.invalid) {
      this.categoriaForm.markAllAsTouched();
      return;
    }

    const categoria: Categoria = {
      id: this.categoriaId,
      nombre: this.categoriaForm.get('nombre')?.value,
    };

    this.categoriaService.updateCategoria(this.categoriaId, categoria).subscribe({
      next: () => {
        this.alertsService.alertSuccess('Categoría actualizada correctamente');
        this.goToCategoriaList();
      },
      error: () => {
        this.alertsService.alertError('No se pudo actualizar la categoría');
      },
    });
  }

  // Validar si un campo es válido
  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.categoriaForm, field);
  }

  // Obtener el mensaje de error de un campo
  getMessageError(field: string): string | null {
    return this.validatorsService.getErrorMessage(this.categoriaForm, field);
  }

  // Redirigir a la lista de categorías
  goToCategoriaList(): void {
    this.router.navigate(['/dashboard/categoria/list']);
  }
}
