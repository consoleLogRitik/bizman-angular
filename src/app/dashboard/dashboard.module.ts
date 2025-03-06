import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BarcodeScannerLivestreamModule } from "ngx-barcode-scanner";
import { DashboardComponent } from "./dashboard.component";

@NgModule({

  imports: [BrowserModule, BarcodeScannerLivestreamModule],
})
export class DemoModule {}