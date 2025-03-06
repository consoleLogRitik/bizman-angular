import { Component, inject } from '@angular/core';
import { BarcodeScannerService } from '../../services/barcode-scanner.service';

@Component({
  selector: 'app-scanner',
  standalone: true,
  template: `
    <div class="scanner-container">
      <button (click)="startScanner()" class="scan-button">
        Start Scanner
      </button>
      @if (scanResult()) {
      <div class="result">Scanned Code: {{ scanResult() }}</div>
      }
    </div>
  `,
  styles: [ ],
})
export class ScannerComponent {
  private readonly scannerService = inject(BarcodeScannerService);
  protected readonly scanResult = this.scannerService.getScanResult();

  async startScanner() {
    await this.scannerService.startScanner();
  }
}