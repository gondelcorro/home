import { Component, DestroyRef, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ValidatorFn,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EMPTY } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { DatosRegistro, RegistroService } from '../_service/registro.service';

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
    MatSnackBarModule,
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss',
})
export class RegistroComponent {
  enviando = false;

  private readonly registroService = inject(RegistroService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly destroyRef = inject(DestroyRef);
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

  registrar(): void {
    if (this.enviando) {
      return;
    }

    this.form.markAllAsTouched();

    if (!this.form.valid) {
      return;
    }

    const valores = this.form.getRawValue();

    const datos: DatosRegistro = {
      nomYApe: valores.nomyape.trim(),
      telefono: valores.telefono,
      correo: valores.correo.trim(),
      clave: valores.clave,
    };

    this.enviando = true;

    this.registroService
      .existeJugador(datos.correo)
      .pipe(
        switchMap((existe) => {
          if (existe === 0) {
            return this.registroService.registrarJugador(datos);
          }

          if (existe === 1) {
            this.mostrarMensaje(
              'Ese correo ya está registrado. Podés iniciar sesión.',
            );
          } else {
            this.mostrarMensaje(
              'La consulta del correo devolvió una respuesta inesperada.',
            );
          }

          return EMPTY;
        }),

        takeUntilDestroyed(this.destroyRef),

        finalize(() => {
          this.enviando = false;
        }),
      )
      .subscribe({
        next: (resultado) => {
          if (resultado === 1) {
            this.mostrarMensaje('Cuenta creada. Ya podés iniciar sesión.');

            void this.router.navigate(['/login']);
          } else {
            this.mostrarMensaje('El servidor no confirmó el registro.');
          }
        },

        error: (error: HttpErrorResponse) => {
          let mensaje = 'No se pudo completar el registro. Intentá nuevamente.';

          if (error.status === 0) {
            mensaje = 'No se pudo completar la comunicación con el servidor.';
          } else if (error.status === 401 || error.status === 403) {
            mensaje = 'El servidor rechazó la autorización del registro.';
          }

          this.mostrarMensaje(mensaje);
        },
      });
  }

  private mostrarMensaje(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 6000,
    });
  }
}
