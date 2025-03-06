// dashboard.component.ts
import { Component, ViewChild, ElementRef, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppwriteService } from '../services/appwrite.service';
import { ScannerComponent } from '../components/scanner/scanner.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule,ScannerComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  @ViewChild('sidebar') sidebarRef!: ElementRef;
  user = { name: "who's there?" };
  isLoggedIn = false;
  isOpen = false;
  isScanning = false;
  private unlistenClick?: () => void;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private appwriteService: AppwriteService
  ) {}

  ngOnInit() {
    this.appwriteService.getCurrentUser().then((user: { name: any }) => {
      this.user.name = user.name;
      console.log(user);
      this.isLoggedIn = true;
    },(error: any) => {
      console.log(error);
    })
    
  }

  toggleSidebar(event:Event) {
    event.stopPropagation(); // Prevent the event from propagating
    this.isOpen = !this.isOpen;
  }

  handleLogout() {
    this.appwriteService.logout().then(() => {
      console.log('User logged out');
      this.router.navigate(['/']);
    });
  }

  ngAfterViewInit() {
    console.log(this.isLoggedIn);
    
    this.unlistenClick = this.renderer.listen('document', 'click', (event) => {
      if (this.isOpen && this.sidebarRef && !this.sidebarRef.nativeElement.contains(event.target)) {
        this.isOpen = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.unlistenClick) {
      this.unlistenClick();
    }
  }
}