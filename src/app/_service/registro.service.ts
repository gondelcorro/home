import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


export interface DatosRegistro {
  nomYApe: string;
  telefono: string;
  correo: string;
  clave: string;
}

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  private readonly http = inject(HttpClient);

  private readonly urlBase = environment.url_sejuegasgo;

  existeJugador(correo: string) {
    const correoCodificado = encodeURIComponent(correo);

    return this.http.get<number>(
      `${this.urlBase}/jugador/existe/${correoCodificado}`,
    );
  }

  registrarJugador(datos: DatosRegistro) {
    return this.http.post<number>(`${this.urlBase}/jugador/registrar`, datos);
  }
}
