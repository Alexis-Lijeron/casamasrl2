import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from '../../../shared/services/alerts.service';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { PageHeaderComponent } from "../../../shared/components/page-header/page-header.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-rol',
  imports: [PageHeaderComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './edit-rol.component.html',
  styleUrl: './edit-rol.component.css',
})
export class EditRolComponent {
  rolForm!: FormGroup;

  data: any = {
    title: 'Roles',
    subtitle: 'Editar rol',
    name: 'Roles',
  };

  constructor(
    private router: Router,
    private alertsService: AlertsService,
    private validatorsService: ValidatorsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.rolForm = this.fb.group({
      nombre: ['', [Validators.required]],
    });
  }

  actualizarRol(): void {
    if (this.rolForm.invalid) {
      this.rolForm.markAllAsTouched();
      return;
    }
  }

  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.rolForm, field);
  }

  getMessageError(field: string): string | null {
    return this.validatorsService.getErrorMessage(this.rolForm, field);
  }

  goToRolList(): void {
    this.router.navigate(['/dashboard/rol/list']);
  }
}
