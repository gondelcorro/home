import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TokenRegistroService {
  private readonly http = inject(HttpClient);

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  generarToken() {
    const datos = new HttpParams()
      .set('username', environment.client_id)
      .set('password', environment.client_secret)
      .set('grant_type', 'password');

    return this.http
      .post<{ access_token: string }>(environment.url_oauth_spring, datos, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .pipe(
        tap((respuesta) => {
          localStorage.setItem('token', respuesta.access_token);
        }),
      );
  }
}
