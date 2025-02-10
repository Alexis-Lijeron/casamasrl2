import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsService } from '../../../shared/services/alerts.service';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PageHeaderComponent } from "../../../shared/components/page-header/page-header.component";
import { CommonModule } from '@angular/common';

interface Producto {
  productoId: number;
  productoNombre: string;
  almacenNombre: string;
  cantidad: number;
  productoAlmacenId: number;
}

@Component({
  selector: 'app-edit-ajuste',
  imports: [PageHeaderComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './edit-ajuste.component.html',
  styleUrl: './edit-ajuste.component.css',
})
export class EditAjusteComponent {
  ajusteForm!: FormGroup;

  productos: Producto[] = [];

  almacenes = [
    { id: 1, nombre: 'Almacén A' },
    { id: 2, nombre: 'Almacén B' },
  ];
  productosDisponibles: any[] = [];

  selectedAlmacenId: number | null = null;
  selectedProductoId: number | null = null;
  selectedCantidad: number = 1;

  data: any = {
    title: 'Ajustes de Inventario',
    subtitle: 'Editar ajuste de inventario',
    name: 'Ajustes de Inventario',
  };

  constructor(
    private router: Router,
    private alertsService: AlertsService,
    private validatorsService: ValidatorsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.ajusteForm = this.fb.group({
      fecha: [new Date().toISOString().split('T')[0], Validators.required],
      tipo: ['', Validators.required],
      descripcion: ['', Validators.required],
      productos: [''],
    });
  }

  actualizarAjuste(): void {
    if (this.ajusteForm.invalid) {
      this.ajusteForm.markAllAsTouched();
      return;
    }

    if (this.productos.length === 0) {
      this.alertsService.alertInfo('Agregue al menos un producto al ajuste.');
      return;
    }

    // Crear objeto final para enviar al backend
    const detalleAjuste = {
      ...this.ajusteForm.value, // Obtiene `nombre` y `descripcion`
      productos: this.productos, // Agrega la lista de productos
    };

    console.log('Datos almacenados:', detalleAjuste);
  }

  onAlmacenChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedAlmacenId = selectElement.value
      ? Number(selectElement.value)
      : null;

    if (this.selectedAlmacenId) {
      // Aquí puedes llamar a una función para cargar los productos de este almacén

      // Simular API para obtener productos
      this.productosDisponibles = [
        { producto_id: 101, producto_nombre: 'Paracetamol' },
        { producto_id: 102, producto_nombre: 'Ibuprofeno' },
      ];
    } else {
      this.productosDisponibles = [];
    }
  }

  onProductoChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedProductoId = selectElement.value
      ? Number(selectElement.value)
      : null;
  }

  onCantidadChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.selectedCantidad = inputElement.value ? Number(inputElement.value) : 1;
  }

  // Agregar producto al ajuste
  agregarProducto(): void {
    const almacenId = this.selectedAlmacenId;

    const almacenNombre = this.almacenes.find(
      (a) => a.id === almacenId
    )?.nombre;
    const producto = this.productosDisponibles.find(
      (p) => p.producto_id === this.selectedProductoId
    );
    const cantidad = this.selectedCantidad;

    if (!almacenId || !producto) {
      this.alertsService.alertInfo(
        'Seleccione un almacén y un producto válido.'
      );
      return;
    }

    if (
      this.productos.some(
        (p) =>
          p.productoId === producto.producto_id &&
          p.almacenNombre === almacenNombre
      )
    ) {
      this.alertsService.alertInfo(
        'El producto ya está agregado en este almacén.'
      );
      return;
    }

    this.productos.push({
      productoId: producto.producto_id,
      productoNombre: producto.producto_nombre,
      almacenNombre: almacenNombre!,
      cantidad,
      productoAlmacenId: producto.producto_id,
    });

    this.ajusteForm.patchValue({ productos: JSON.stringify(this.productos) });
  }

  // Aumentar cantidad
  aumentarCantidad(index: number): void {
    this.productos[index].cantidad++;
  }

  // Disminuir cantidad
  disminuirCantidad(index: number): void {
    if (this.productos[index].cantidad > 1) {
      this.productos[index].cantidad--;
    }
  }

  // Eliminar producto
  eliminarProducto(index: number): void {
    this.productos.splice(index, 1);
    this.ajusteForm.patchValue({ productos: JSON.stringify(this.productos) });
  }

  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.ajusteForm, field);
  }

  getMessageError(field: string): string | null {
    return this.validatorsService.getErrorMessage(this.ajusteForm, field);
  }

  goToAjusteList(): void {
    this.router.navigate(['/dashboard/ajuste-inventario/list']);
  }
}
