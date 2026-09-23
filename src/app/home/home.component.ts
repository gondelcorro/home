import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MatButtonModule, LottieComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  options: AnimationOptions = {
    path: './assets/animations/place1.json',
  };

  options1: AnimationOptions = {
    path: './assets/animations/cancha.json',
  };

  options2: AnimationOptions = {
    path: './assets/animations/calendar.json',
  };
  public url_registro = environment.url_registro;
}
