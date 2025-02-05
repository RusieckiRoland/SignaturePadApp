import { Injectable } from '@angular/core';

declare var STPadServerLib: any;  // Deklaracja zewnętrznej biblioteki

@Injectable({
  providedIn: 'root',
})
export class SignatureService {
  private STPadServerLibCommons: any;
  private STPadServerLibApi: any;
  private STPadServerLibDefault :any;

  public isConnected: boolean = false; // Flaga stanu połączenia WebSocket

  // Zmienne do callbacków
  private onOpenCallback: Function | null = null;
  private onCloseCallback: Function | null = null;
  private onErrorCallback: Function | null = null;

  constructor() {
    // Inicjalizacja zmiennych
    this.STPadServerLibCommons = STPadServerLib?.STPadServerLibCommons;
    this.STPadServerLibApi = STPadServerLib?.STPadServerLibApi;
    this.STPadServerLibDefault = STPadServerLib?.STPadServerLibDefault;
  }

  // Rejestracja callbacków z komponentu
  registerCallbacks(onOpen: Function, onClose: Function, onError: Function): void {
    this.onOpenCallback = onOpen;
    this.onCloseCallback = onClose;
    this.onErrorCallback = onError;
  }

  // Metoda do inicjalizacji połączenia
  initConnection(url: string): void {
    if (this.STPadServerLibCommons) {
      this.STPadServerLibCommons.createConnection(url, 
        this.onOpen.bind(this), 
        this.onClose.bind(this), 
        this.onError.bind(this));
    }
  }

  // Metoda do zamykania połączenia
  closeConnection(): void {
    if (this.STPadServerLibCommons) {
      this.STPadServerLibCommons.destroyConnection();
    }
  }

  // Metoda otwierająca Signature Pad (openPad)
  async openPad(): Promise<any> {
    const padConnectionType = "HID";
    if (this.STPadServerLibApi) {
      try {
        // Szukaj dostępnych padów
        const searchForPadsParams = new this.STPadServerLibDefault.Params.searchForPads();
        searchForPadsParams.setPadSubset(padConnectionType);
        const pads = await this.STPadServerLibDefault.searchForPads(searchForPadsParams);

        if (pads.foundPads.length > 0) {
          const padIndex = 0;  // Zakładamy, że używamy pierwszego podłączonego Signature Padu

          // Otwórz Signature Pad z indeksem 0
          const openPadParams = new this.STPadServerLibDefault.Params.openPad(padIndex);
          const padInfo = await this.STPadServerLibDefault.openPad(openPadParams);

          console.log('Signature Pad został otwarty:', padInfo);
          return padInfo;
        } else {
          console.error('Nie znaleziono podłączonych urządzeń.');
          throw new Error('No Signature Pads found.');
        }
      } catch (error) {
        console.error('Błąd podczas otwierania Signature Padu:', error);
        throw error;
      }
    } else {
      console.error('STPadServerLibApi nie jest zainicjalizowane.');
      throw new Error('STPadServerLibApi is not initialized.');
    }
  }

  // Przykładowe metody używające API
  getServerVersion(): Promise<any> {
    return this.STPadServerLibCommons?.getServerVersion();
  }

  // Metody obsługi zdarzeń
  private onOpen(evt: any): void {
    console.log('Connection opened');
    this.isConnected = true;
    if (this.onOpenCallback) {
      this.onOpenCallback(evt);  // Wywołaj callback przekazany z komponentu
    }
  }

  private onClose(evt: any): void {
    console.log('Connection closed');
    this.isConnected = false; 
    if (this.onCloseCallback) {
      this.onCloseCallback(evt);  // Wywołaj callback przekazany z komponentu
    }
  }

  private onError(error: any): void {
    this.isConnected = false; 
    console.error('Connection error', error);
    if (this.onErrorCallback) {
      this.onErrorCallback(error);  // Wywołaj callback przekazany z komponentu
    }
  }

  signature_point_send(x:number, y:number, p:number) {
    

    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#0000FF";
    ctx.lineWidth = 4.5;
    ctx.lineCap = "round";
    if (p == 0) {
        drawStrokeStartPoint(ctx, x * scaleFactorX, y * scaleFactorY);
    }
    else {
        drawStrokePoint(ctx, x * scaleFactorX, y * scaleFactorY);
    }
}

}
