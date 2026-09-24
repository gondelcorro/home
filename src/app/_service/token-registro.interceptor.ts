import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { TokenRegistroService } from './token-registro.service';

@Injectable()
export class TokenRegistroInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenRegistroService) {}

  intercept(
    peticion: HttpRequest<unknown>,
    siguiente: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const base = environment.url_sejuegasgo;

    const esConsulta =
      peticion.method === 'GET' &&
      peticion.url.startsWith(`${base}/jugador/existe/`);

    const esAlta =
      peticion.method === 'POST' &&
      peticion.url === `${base}/jugador/registrar`;

    if (!esConsulta && !esAlta) {
      return siguiente.handle(peticion);
    }

    return siguiente.handle(this.agregarToken(peticion)).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status !== 401) {
          return throwError(error);
        }

        return this.tokenService
          .generarToken()
          .pipe(switchMap(() => siguiente.handle(this.agregarToken(peticion))));
      }),
    );
  }

  private agregarToken(peticion: HttpRequest<unknown>): HttpRequest<unknown> {
    return peticion.clone({
      setHeaders: {
        Authorization: `Basic ${this.tokenService.getToken()}`,
        'Content-Type': 'application/json',
      },
    });
  }
}
