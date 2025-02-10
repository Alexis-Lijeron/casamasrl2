import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Config } from 'datatables.net';
import { AlertsService } from '../../../shared/services/alerts.service';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { PageHeaderComponent } from "../../../shared/components/page-header/page-header.component";
import { CommonModule } from '@angular/common';

interface Producto {
  productoId: number;
  productoNombre: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

@Component({
  selector: 'app-edit-venta',
  imports: [PageHeaderComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './edit-venta.component.html',
  styleUrl: './edit-venta.component.css',
})
export class EditVentaComponent {
  ventaForm!: FormGroup;
  productos: Producto[] = [];
  clientes = [
    { id: 1, nombre: 'Juan', apellido: 'Pérez' },
    { id: 2, nombre: 'Ana', apellido: 'López' },
  ];
  productosDisponibles = [
    { id: 101, nombre: 'Paracetamol', precio_venta: 10 },
    { id: 102, nombre: 'Ibuprofeno', precio_venta: 15 },
    { id: 103, nombre: 'Omeprazol', precio_venta: 20 },
    { id: 104, nombre: 'Amoxicilina', precio_venta: 25 },
    { id: 105, nombre: 'Diclofenaco', precio_venta: 30 },
    { id: 106, nombre: 'Loratadina', precio_venta: 35 },
  ];

  data: any = {
    title: 'Ventas',
    subtitle: 'Crear Venta',
    name: 'Ventas',
  };

  dtOptions: Config = {};

  selectedProductoId: number | null = null;
  selectedPrecio: number = 0;
  selectedCantidad: number = 1;
  total: number = 0.0;

  constructor(
    private router: Router,
    private alertsService: AlertsService,
    private validatorsService: ValidatorsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.ventaForm = this.fb.group({
      fecha_venta: [
        new Date().toISOString().split('T')[0],
        [Validators.required],
      ],
      monto_total: [0, [Validators.required]],
      cliente_id: ['', [Validators.required]],
      cantidad: [1],
    });
  }

  actualizarVenta(): void {
    if (this.ventaForm.invalid) {
      this.ventaForm.markAllAsTouched();
      return;
    }

    if (this.productos.length === 0) {
      this.alertsService.alertInfo('Agregue al menos un producto.');
      return;
    }

    // Crear objeto final para enviar al backend
    const detalle = {
      ...this.ventaForm.value, // Obtiene `nombre` y `descripcion`
      productos: this.productos, // Agrega la lista de productos
    };

    console.log('Datos almacenados:', detalle);
  }

  // Cambiar producto seleccionado
  onProductoChange(event: Event): void {
    const productoId = Number((event.target as HTMLSelectElement).value);
    this.selectedProductoId = productoId;
    const producto = this.productosDisponibles.find((p) => p.id === productoId);
    this.selectedPrecio = producto ? producto.precio_venta : 0;
  }

  // Agregar producto a la lista
  agregarProducto(): void {
    if (!this.selectedProductoId) {
      this.alertsService.alertInfo('Seleccione un producto.');
      return;
    }

    this.selectedCantidad = this.ventaForm.get('cantidad')?.value;

    if (this.selectedCantidad <= 0) {
      this.alertsService.alertInfo('La cantidad debe ser mayor a 0.');
      return;
    }

    const productoExistente = this.productos.find(
      (p) => p.productoId === this.selectedProductoId
    );

    if (productoExistente) {
      productoExistente.cantidad += this.selectedCantidad;
      productoExistente.subtotal =
        productoExistente.cantidad * productoExistente.precioUnitario;
      this.actualizarTotal();
      return;
    }

    const producto = this.productosDisponibles.find(
      (p) => p.id === this.selectedProductoId
    );
    if (!producto) return;

    const subtotal = this.selectedCantidad * this.selectedPrecio;

    this.productos.push({
      productoId: producto.id,
      productoNombre: producto.nombre,
      cantidad: this.selectedCantidad,
      precioUnitario: this.selectedPrecio,
      subtotal,
    });

    // this.selectedPrecio = 0;
    // this.selectedProductoId = null;
    this.selectedCantidad = 1;
    this.ventaForm.get('cantidad')?.setValue(1);
    this.actualizarTotal();
  }

  // Eliminar producto de la lista
  eliminarProducto(index: number): void {
    this.productos.splice(index, 1);
    this.actualizarTotal();
  }

  // Actualizar total de la venta
  actualizarTotal(): void {
    this.total = this.productos.reduce(
      (sum, producto) => sum + producto.subtotal,
      0
    );
    this.ventaForm.get('monto_total')?.setValue(this.total);
  }

  // Aumentar cantidad de un producto
  aumentarCantidad(index: number): void {
    this.productos[index].cantidad++;
    this.productos[index].subtotal =
      this.productos[index].cantidad * this.productos[index].precioUnitario;
    this.actualizarTotal();
  }

  // Disminuir cantidad de un producto
  disminuirCantidad(index: number): void {
    if (this.productos[index].cantidad > 1) {
      this.productos[index].cantidad--;
      this.productos[index].subtotal =
        this.productos[index].cantidad * this.productos[index].precioUnitario;
      this.actualizarTotal();
    } else {
      // this.eliminarProducto(index);
    }
  }

  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.ventaForm, field);
  }

  getMessageError(field: string): string | null {
    return this.validatorsService.getErrorMessage(this.ventaForm, field);
  }

  goToVentaList(): void {
    this.router.navigate(['/dashboard/venta/list']);
  }
}
