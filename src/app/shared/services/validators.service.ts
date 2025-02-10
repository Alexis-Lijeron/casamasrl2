import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl,ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  public isValidField( formGroup: FormGroup, field: string): boolean | null {
    return formGroup.controls[field].errors && formGroup.controls[field].touched;
  }
  
  public getErrorMessage( formGroup: FormGroup, field: string): string | null {
    const formControl = formGroup.get(field);

    if (!formControl || !formControl.errors) {
      return null;
    }

    // Mapear los errores a los mensajes correspondientes
    const errorMessages: { [key: string ]: string } = {
      required: 'Este campo es requerido',
      passwordComplexity: 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número',
      mustBeEqual: 'Las contraseñas no coinciden',
      emailValid: 'El email ingresado no tiene un formato válido',
      minlength: 'La longitud mínima requerida es de {{requiredLength}} caracteres',
      maxlength: 'La longitud máxima requerida es de {{requiredLength}} caracteres',
      fileExtension: 'El archivo debe ser una imagen con extensión jpg, jpeg o png',
      fileSize: 'El tamaño del archivo no debe superar los {{requiredLength}} bytes',
      min: 'El valor mínimo permitido es {{min}}',
      max: 'El valor máximo permitido es {{max}}',
    };
    
    // Obtener el primer error y devolver su mensaje correspondiente
    const firstErrorKey = Object.keys(formControl.errors)[0];
    const error = formControl.errors[firstErrorKey];
    
    if (firstErrorKey === 'minlength' || firstErrorKey === 'maxlength') {
      return errorMessages[firstErrorKey].replace('{{requiredLength}}', error.requiredLength);
    }
    
    if (firstErrorKey === 'fileSize') {
      return errorMessages[firstErrorKey].replace('{{requiredLength}}', error.requiredLength);
    }
    
    if (firstErrorKey === 'min' || firstErrorKey === 'max') {
      return errorMessages[firstErrorKey].replace('{{min}}', error.min).replace('{{max}}', error.max);
    }
    
    return errorMessages[firstErrorKey] || 'Error desconocido';
  }


  public emailValid(control: AbstractControl): ValidationErrors | null {
    return /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/.test(
      control.value
    )
      ? null
      : { emailValid: true };
  }

  public passwordComplexity(control: AbstractControl): ValidationErrors | null {
    return /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(
      control.value
    )
      ? null
      : { passwordComplexity: true };
  }

  public isInvalidField( formGroup: FormGroup, field: string): boolean | null {
    const control = formGroup.controls[field];
    
    // Verifica si el campo ha sido tocado y tiene errores
    if (control.errors && control.touched) {
      return true; // Devuelve true si el campo tiene errores y ha sido tocado
    } else if (!control.errors && control.touched) {
      return false; // Devuelve false si el campo es no tiene errores y ha sido tocado
    } else {
      return null; // Devuelve null si el campo no ha sido tocado
    }
  }
}
