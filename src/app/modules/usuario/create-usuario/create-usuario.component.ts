import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from '../../../shared/services/alerts.service';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { PageHeaderComponent } from "../../../shared/components/page-header/page-header.component";
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-create-usuario',
  imports: [PageHeaderComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './create-usuario.component.html',
  styleUrl: './create-usuario.component.css',
})
export class CreateUsuarioComponent {
  usuarioForm!: FormGroup;

  data: any = {
    title: 'Usuarios',
    subtitle: 'Crear usuario',
    name: 'Usuarios',
  };

  constructor(
    private router: Router,
    private alertsService: AlertsService,
    private validatorsService: ValidatorsService,
    private usuarioService: UsuarioService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      fullname: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  // Guardar un nuevo usuario
  guardarUsuario(): void {
    if (this.usuarioForm.invalid) {
      this.usuarioForm.markAllAsTouched();
      return;
    }
    
    const usuario = this.usuarioForm.value;
    
    this.usuarioService.createUsuario(usuario).subscribe({
      next: () => {
        this.alertsService.alertSuccess('Usuario creado correctamente');
        this.goToUsuarioList();
      },
      error: (err) => {
        console.error('Error al guardar el usuario:', err);
        this.alertsService.alertError('Error al guardar el usuario');
      },
    });
  }

  // Validar si un campo es válido
  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.usuarioForm, field);
  }

  // Obtener el mensaje de error de un campo
  getMessageError(field: string): string | null {
    return this.validatorsService.getErrorMessage(this.usuarioForm, field);
  }

  // Redirigir a la lista de usuarios
  goToUsuarioList(): void {
    this.router.navigate(['/dashboard/usuario/list']);
  }
}
