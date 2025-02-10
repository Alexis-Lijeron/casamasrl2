import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService } from '../../../shared/services/alerts.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../usuario.service';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-edit-usuario',
  imports: [PageHeaderComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './edit-usuario.component.html',
  styleUrl: './edit-usuario.component.css',
})
export class EditUsuarioComponent {
  usuarioForm!: FormGroup;
  usuarioId!: number;

  data: any = {
    title: 'Usuarios',
    subtitle: 'Editar usuario',
    name: 'Usuarios',
  };

  constructor(
    private router: Router,
    private alertsService: AlertsService,
    private route: ActivatedRoute,
    private validatorsService: ValidatorsService,
    private usuarioService: UsuarioService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // Obtener el ID del usuario desde la ruta
    this.usuarioId = Number(this.route.snapshot.params['id']);

    // Inicializar el formulario
    this.usuarioForm = this.fb.group({
      fullname: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    // Cargar los datos del usuario
    if (this.usuarioId) {
      this.obtenerUsuario(this.usuarioId);
    }
  }

  // Actualizar un usuario
  actualizarUsuario(): void {
    if (this.usuarioForm.invalid) {
      this.usuarioForm.markAllAsTouched();
      return;
    }

    const usuario = {
      UserId: this.usuarioId,
      fullname: this.usuarioForm.get('fullname')?.value,
      username: this.usuarioForm.get('username')?.value,
      email: this.usuarioForm.get('email')?.value,
      telefono: this.usuarioForm.get('telefono')?.value,
      password: this.usuarioForm.get('password')?.value,
    };

    console.log('Usuario actualizado:', usuario);

    this.usuarioService.updateUsuario(this.usuarioId, usuario).subscribe({
      next: () => {
        this.alertsService.alertSuccess('Usuario actualizado correctamente');
        this.goToUsuarioList();
      },
      error: () => {
        this.alertsService.alertError('No se pudo actualizar el usuario');
      },
    });
  }

  // Obtener el usuario por ID
  obtenerUsuario(id: number): void {
    this.usuarioService.getUsuarioById(id).subscribe((usuario) => {
      if (usuario) {
        this.usuarioForm.patchValue(usuario);
      } else {
        this.alertsService.alertError('No se pudo obtener el usuario');
      }
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
