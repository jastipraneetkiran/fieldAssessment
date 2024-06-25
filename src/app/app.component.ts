import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import {DynamicFormsComponent } from "./components/dynamic-forms/dynamic-forms.component"

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DynamicFormsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fieldAssessment';
}
