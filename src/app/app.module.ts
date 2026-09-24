import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideLottieOptions } from 'ngx-lottie';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { TokenRegistroInterceptor } from './_service/token-registro.interceptor';

@NgModule({
  declarations: [AppComponent],

  imports: [BrowserModule, AppRoutingModule],

  providers: [
    provideHttpClient(withInterceptorsFromDi()),

    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenRegistroInterceptor,
      multi: true,
    },

    provideLottieOptions({
      player: () => import('lottie-web'),
    }),
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
