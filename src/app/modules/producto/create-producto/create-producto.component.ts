import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from '../../../shared/services/alerts.service';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-producto',
  imports: [PageHeaderComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './create-producto.component.html',
  styleUrl: './create-producto.component.css',
})
export class CreateProductoComponent {
  productoForm!: FormGroup;

  data: any = {
    title: 'Productos',
    subtitle: 'Crear producto',
    name: 'Productos',
  };

  categorias = [
    { id: 1, nombre: 'Analgésicos' },
    { id: 2, nombre: 'Antibióticos' },
  ];
  laboratorios = [
    { id: 1, nombre: 'Laboratorio A' },
    { id: 2, nombre: 'Laboratorio B' },
  ];
  selectedImage: string | ArrayBuffer | null = null;
  mostrarOtraVia: boolean = false;

  constructor(
    private router: Router,
    private alertsService: AlertsService,
    private validatorsService: ValidatorsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.productoForm = this.fb.group({
      nombre: ['', [Validators.required]],
      categoria_id: ['', Validators.required],
      laboratorio_id: ['', Validators.required],
      stock_minimo: [0, [Validators.required, Validators.min(1)]],
      precio_venta: [0, [Validators.required, Validators.min(0.01)]],
      via_administracion: ['', Validators.required],
      otra_via_administracion: [''],
      descripcion: [''],
      contraindicaciones: [''],
      principio_activo: [''],
      accion_terapeutica: [''],
      efectos_secundarios: [''],
      imagen: [null], // Se usará para cargar el archivo
    });

    // Escuchar cambios en "via_administracion" para mostrar el campo "otra_via_administracion"
    this.productoForm
      .get('via_administracion')
      ?.valueChanges.subscribe((value) => {
        this.mostrarOtraVia = value === 'otro';
      });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImage = e.target?.result || null;
      };
      reader.readAsDataURL(file);
      this.productoForm.patchValue({ imagen: file });
    } else {
      this.selectedImage = null;
    }
  }

  guardarProducto(): void {
    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      return;
    }

    // Si la vía de administración es "otro", tomar el valor del campo de texto
    if (this.productoForm.value.via_administracion === 'otro') {
      this.productoForm.patchValue({
        via_administracion: this.productoForm.value.otra_via_administracion,
      });
    }

    const formData = new FormData();
    Object.keys(this.productoForm.value).forEach((key) => {
      console.log('key:', key);
      if (key !== 'otra_via_administracion') {
        formData.append(key, this.productoForm.value[key]);
      }
    });

    console.log('Formulario enviado:', this.productoForm.value);
    // Aquí puedes enviar `formData` a una API con HttpClient.
  }

  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.productoForm, field);
  }

  getMessageError(field: string): string | null {
    return this.validatorsService.getErrorMessage(this.productoForm, field);
  }

  goToProductoList(): void {
    this.router.navigate(['/dashboard/producto/list']);
  }
}
