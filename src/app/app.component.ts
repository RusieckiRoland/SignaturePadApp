import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignatureActionsComponent } from './signature-actions/signature-actions.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SignatureActionsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
 
})
export class AppComponent {
  title = 'SignaturePadApp';
}
