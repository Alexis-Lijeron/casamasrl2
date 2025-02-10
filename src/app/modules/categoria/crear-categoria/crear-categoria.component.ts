import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from '../../../shared/services/alerts.service';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { PageHeaderComponent } from "../../../shared/components/page-header/page-header.component";
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-create-categoria',
  imports: [PageHeaderComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './crear-categoria.component.html',
  styleUrl: './crear-categoria.component.css',
})
export class CrearCategoriaComponent {
  categoriaForm!: FormGroup;

  data: any = {
    title: 'Categorías',
    subtitle: 'Crear categoría',
    name: 'Categorías',
  };

  constructor(
    private router: Router,
    private alertsService: AlertsService,
    private validatorsService: ValidatorsService,
    private categoriaService: CategoriaService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.categoriaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  // Guardar una nueva categoría
  guardarCategoria(): void {
    if (this.categoriaForm.invalid) {
      this.categoriaForm.markAllAsTouched();
      return;
    }

    const categoria = this.categoriaForm.value;

    this.categoriaService.createCategoria(categoria).subscribe({
      next: () => {
        this.alertsService.alertSuccess('Categoría creada correctamente');
        this.goToCategoriaList();
      },
      error: (err) => {
        console.error('Error al guardar la categoría:', err);
        this.alertsService.alertError('Error al guardar la categoría');
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
