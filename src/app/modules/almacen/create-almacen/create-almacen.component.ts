import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { Router } from '@angular/router';
import { AlertsService } from '../../../shared/services/alerts.service';
import { ValidatorsService } from '../../../shared/services/validators.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Producto {
  productoId: number;
  productoNombre: string;
}

@Component({
  selector: 'app-create-almacen',
  imports: [
    PageHeaderComponent,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './create-almacen.component.html',
  styleUrl: './create-almacen.component.css',
})
export class CreateAlmacenComponent {
  almacenForm!: FormGroup;

  productos: Producto[] = [];
  selectedProductoId: number = 0;

  data: any = {
    title: 'Almacenes',
    subtitle: 'Crear almacen',
    name: 'Almacenes',
  };

  productosDisponibles: any[] = [
    { id: 1, nombre: 'Producto 1' },
    { id: 2, nombre: 'Producto 2' },
    { id: 3, nombre: 'Producto 3' },
    { id: 4, nombre: 'Producto 4' },
    { id: 5, nombre: 'Producto 5' },
  ];

  constructor(
    private router: Router,
    private alertsService: AlertsService,
    private validatorsService: ValidatorsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.almacenForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    });
  }

  guardarAlmacen(): void {
    if (this.almacenForm.invalid) {
      this.almacenForm.markAllAsTouched();
      return;
    }

    // Crear objeto final para enviar al backend
    const datosAlmacen = {
      ...this.almacenForm.value, // Obtiene `nombre` y `descripcion`
      productos: this.productos, // Agrega la lista de productos
    };

    console.log('Datos almacenados:', datosAlmacen);
  }

  agregarProducto(): void {
    if (!this.selectedProductoId) {
      this.alertsService.alertInfo('Seleccione un producto.');
      return;
    }

    const productoExistente = this.productos.find(
      (p) => p.productoId === this.selectedProductoId
    );

    if (productoExistente) {
      this.alertsService.alertInfo('El producto ya está agregado.');
      return;
    }

    const productoId = Number(this.selectedProductoId); // Convertir a número
    const productoNombre =
      this.productosDisponibles.find((p) => p.id === productoId)?.nombre || '';

    this.productos.push({
      productoId: this.selectedProductoId,
      productoNombre,
    });

    // Reiniciar selección
    this.selectedProductoId = 0;
  }

  eliminarProducto(index: number): void {
    this.productos.splice(index, 1);
  }

  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.almacenForm, field);
  }

  getMessageError(field: string): string | null {
    return this.validatorsService.getErrorMessage(this.almacenForm, field);
  }

  goToAlmacenList(): void {
    this.router.navigate(['/dashboard/almacen/list']);
  }
}
