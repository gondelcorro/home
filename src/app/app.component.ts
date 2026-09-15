import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  options: AnimationOptions = {
    path: './assets/animations/place1.json',
  };
  options1: AnimationOptions = {
    path: './assets/animations/cancha.json',
  };
  options2: AnimationOptions = {
    path: './assets/animations/calendar.json',
  };

  public url_login = environment.url_login;
  public url_registro = environment.url_registro;

}
