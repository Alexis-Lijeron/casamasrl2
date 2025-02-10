import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { RightBarComponent } from "../../components/right-bar/right-bar.component";
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterModule, NavbarComponent, SidebarComponent, RightBarComponent, FooterComponent],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {
  isSidebarCollapsed = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed; // Cambia el estado
  }
  
}
