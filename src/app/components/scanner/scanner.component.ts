import { Component, inject } from '@angular/core';
import { BarcodeScannerService } from '../../services/barcode-scanner.service';

@Component({
  selector: 'app-scanner',
  standalone: true,
  template: `
    <div
     class="w-full my-2 p-4 border-1 border-green-400 shadow-lg h-36
      flex justify-center items-center gap-16 items-center
      md:flex-col md:gap-2 
      ">
    <img (click)="startScanner()" [src]="imgSrc" alt = "scanner-logo" class="animate-pulse w-24 h-24 mr-2"> 
    <p class="text-md flex  justify-center items-center  md:hidden"> 
      <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 12H18M6 12L11 7M6 12L11 17" stroke="red" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Scan a barcode
     </p>
    <p class="hidden lg:block text-xs"> Please switch to mobile device for scaning</p>

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
  imgSrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNNwwYmJqXpNhP8qmCNmQ36vBimXqMdW67aQ&s"

  async startScanner() {
    await this.scannerService.startScanner();
  }
}