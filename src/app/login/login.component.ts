import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import decode from 'jwt-decode';

import { LoginService } from '../_service/login.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  hide = true;
  usuario: string = "";
  clave: string = "";
  url_registro: string;
  url_recuperarClave: string;

  constructor(
    private loginService: LoginService,
    private snackBar: MatSnackBar,
  ) {
    this.url_registro = environment.url_registro;
    this.url_recuperarClave = environment.url_recuperarClave;
  }

  iniciarSesion() {
    if (this.usuario.trim() === "") {
      this.snackBar.open("Ingresá tu usuario.", "Cerrar", { duration: 4000 });
      return;
    }

    if (this.clave === "") {
      this.snackBar.open("Ingresá tu contraseña.", "Cerrar", {
        duration: 4000,
      });
      return;
    }
    this.loginService.login(this.usuario, this.clave).subscribe(
      (data) => {
        if (data) {
          const token = JSON.stringify(data); // CONVIERTO LA RESP JSON EN UN STRING
          const tk = JSON.parse(token);
          const decodedToken = decode(tk.access_token); // DECODIFICO EL access_token
          const rol = decodedToken.authorities[0]; // EXTRAIGO EL ROL
          if (rol === "ADMIN") {
            document.location.href =
              environment.url_gestionComplejos + "?token=" + token;
          } else {
            document.location.href =
              environment.url_reservaCancha + "?token=" + token;
          }
        }
      },
      (err) => {
        if (err.status == 400 || err.status == 401 || err.status == 403) {
          // ERROR DE SEGURIDAD
          this.snackBar.open("Credenciales incorrectas", "Aviso", {
            duration: 3000,
          });
        } else {
          // ERROR DE CONEXION CON EL BACKEND
          this.snackBar.open("Error de conexión", "Aviso", { duration: 3000 });
        }
      },
    );
  }
}
