import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';  // Import MatSnackBar i modułu
import { MatCardModule } from '@angular/material/card';  // Import MatCardModule
import { MatButtonModule } from '@angular/material/button';  // Import MatButtonModule
import { SignatureService } from '../signature.service';
import { CommonModule } from '@angular/common';  // Import CommonModule zamiast BrowserModule


@Component({
  selector: 'app-signature-actions',
  standalone: true,  // Komponent samodzielny
  templateUrl: './signature-actions.component.html',
  styleUrls: ['./signature-actions.component.scss'],
  imports: [
    CommonModule,             // Zamiast BrowserModule, użyj CommonModule
    MatSnackBarModule,        // Import Toast (MatSnackBar)
    MatCardModule,            // Import MatCardModule dla kart
    MatButtonModule          // Import MatButtonModule dla przycisków
       // Wymagane dla animacji Angular Material
  ]
})
export class SignatureActionsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('signatureCanvas', { static: false }) signatureCanvas: ElementRef<HTMLCanvasElement>;
  constructor(private signatureService: SignatureService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    // Zarejestruj callbacki w serwisie
    this.signatureService.registerCallbacks(
      this.onOpen.bind(this),
      this.onClose.bind(this),
      this.onError.bind(this)
    );

    // Inicjuj połączenie przy starcie
    const wsUri = 'wss://local.signotecwebsocket.de:49494';  // Adres WebSocket
    this.signatureService.initConnection(wsUri); 

  }

  ngOnDestroy(): void {
    // Zakończ połączenie przy zamknięciu komponentu
    this.signatureService.closeConnection();
  }

  // Metody obsługi zdarzeń
  private onOpen(evt: any): void {
    console.log('Połączono z ' + evt.target.url);
    
    
    this.signatureService.openPad().then((padInfo) => {
      this.showToast('Signature Pad został pomyślnie otwarty!', 'Zamknij', 'success');
    }).catch((error) => {
      this.showToast(`Błąd podczas otwierania Signature Padu: ${error}`, 'Zamknij', 'error');
    });


  }

  private onClose(evt: any): void {
    console.log('Rozłączono z ' + evt.target.url);
    this.showToast('Rozłączono z urządzeniem Signature Pad', 'Zamknij', 'warn');
  }

  private onError(error: any): void {
    console.error('Błąd połączenia', error);
    this.showToast('Błąd połączenia z urządzeniem Signature Pad', 'Zamknij', 'error');
  }

  private showToast(message: string, action: string, type: 'success' | 'warn' | 'error'): void {
    this.snackBar.open(message, 'Zamknij', {
      duration: 3000  // Prosty toast bez panelClass
    });
    // let panelClass = '';
    // switch (type) {
    //   case 'success':
    //     panelClass = 'mat-toolbar mat-primary';
    //     break;
    //   case 'warn':
    //     panelClass = 'mat-toolbar mat-warn';
    //     break;
    //   case 'error':
    //     panelClass = 'mat-toolbar mat-accent';
    //     break;
    // }

    // this.snackBar.open(message, action, {
    //   duration: 3000,
    //   panelClass: [panelClass]  // Dynamiczny styl toasta w zależności od typu
    // });
  }

}
function ViewChild(arg0: string, arg1: { static: boolean; }): (target: SignatureActionsComponent, propertyKey: "signatureCanvas") => void {
  throw new Error('Function not implemented.');
}

