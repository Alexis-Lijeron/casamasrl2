import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from '../../../shared/services/alerts.service';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { PageHeaderComponent } from "../../../shared/components/page-header/page-header.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-cliente',
  imports: [PageHeaderComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './edit-cliente.component.html',
  styleUrl: './edit-cliente.component.css',
})
export class EditClienteComponent {
  clienteForm!: FormGroup;

  data: any = {
    title: 'Clientes',
    subtitle: 'Editar cliente',
    name: 'Clientes',
  };

  constructor(
    private router: Router,
    private alertsService: AlertsService,
    private validatorsService: ValidatorsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.clienteForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required]],
      genero: ['', [Validators.required]],
    });
  }

  actualizarCliente(): void {
    if (this.clienteForm.invalid) {
      this.clienteForm.markAllAsTouched();
      return;
    }
  }

  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.clienteForm, field);
  }

  getMessageError(field: string): string | null {
    return this.validatorsService.getErrorMessage(this.clienteForm, field);
  }

  goToClienteList(): void {
    this.router.navigate(['/dashboard/cliente/list']);
  }
}
