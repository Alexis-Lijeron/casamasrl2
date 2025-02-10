import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from '../../../shared/services/alerts.service';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { PageHeaderComponent } from "../../../shared/components/page-header/page-header.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-laboratorio',
  imports: [PageHeaderComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './edit-laboratorio.component.html',
  styleUrl: './edit-laboratorio.component.css',
})
export class EditLaboratorioComponent {
  laboratorioForm!: FormGroup;

  data: any = {
    title: 'Laboratorios',
    subtitle: 'Editar laboratorio',
    name: 'Laboratorios',
  };

  constructor(
    private router: Router,
    private alertsService: AlertsService,
    private validatorsService: ValidatorsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.laboratorioForm = this.fb.group({
      nombre: ['', [Validators.required]],
    });
  }

  actualizarLaboratorio(): void {
    if (this.laboratorioForm.invalid) {
      this.laboratorioForm.markAllAsTouched();
      return;
    }
  }

  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.laboratorioForm, field);
  }

  getMessageError(field: string): string | null {
    return this.validatorsService.getErrorMessage(this.laboratorioForm, field);
  }

  goToLaboratorioList(): void {
    this.router.navigate(['/dashboard/laboratorio/list']);
  }
}
