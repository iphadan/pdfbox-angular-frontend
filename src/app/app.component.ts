import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FillableEditorComponent } from './fillable-editor/fillable-editor.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FillableEditorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pdfbox-frontend';
}
