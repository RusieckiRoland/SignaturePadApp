import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-signature-actions',
  standalone: true,
  imports: [MatButtonModule],  // Import modułu przycisków Material
  templateUrl: './signature-actions.component.html',
  styleUrls: ['./signature-actions.component.scss']
})
export class SignatureActionsComponent { }
