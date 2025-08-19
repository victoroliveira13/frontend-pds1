import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isCadastro = false;

  loginLabel = 'Entrar'.split('');
  cadastrarLabel = 'Cadastrar'.split('');

  constructor(private router: Router) {}

  alternar() {
    this.isCadastro = !this.isCadastro;
  }

  entrar() {
    // lógica de login poderia ir aqui
    this.router.navigate(['/dashboard']);
  }

  cadastrar() {
    // lógica de cadastro poderia ir aqui
    this.router.navigate(['/dashboard']);
  }
}
