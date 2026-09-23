import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ValidatorFn,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

const clavesCoinciden: ValidatorFn = (grupo) => {
  const clave = grupo.get('clave')?.value;
  const confirmacion = grupo.get('confirmaClave')?.value;

  if (!clave || !confirmacion) {
    return null;
  }

  return clave === confirmacion ? null : { clavesDistintas: true };
};
@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss',
})
export class RegistroComponent {
  form = new FormGroup(
    {
      nomyape: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(/\S/)],
      }),

      correo: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),

      telefono: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(11),
          Validators.pattern(/^[0-9]+$/),
        ],
      }),

      clave: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(/[A-Za-z]/),
          Validators.pattern(/[0-9]/),
        ],
      }),

      confirmaClave: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    },
    {
      validators: clavesCoinciden,
    },
  );

  revisarDatos(): void {
    this.form.markAllAsTouched();
  }
}
