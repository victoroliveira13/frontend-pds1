import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private router: Router) {}

  logout() {
    console.log('Logout clicado'); // só pra testar se entra
    localStorage.removeItem('token');
    this.router.navigateByUrl('/'); // força a navegação
  }
}
