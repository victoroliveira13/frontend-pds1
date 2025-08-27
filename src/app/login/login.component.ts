import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isCadastro = false;

  loginLabel = 'Entrar'.split('');
  cadastrarLabel = 'Cadastrar'.split('');

  loginData = { login: '', senha: '' };
  registerData = { nome: '', login: '', senha: '', email: '', role: 0 };
  confirmarSenha = '';

  constructor(private router: Router, private authService: AuthService) {}

  alternar() {
    this.isCadastro = !this.isCadastro;
  }

  entrar() {
    this.authService.login(this.loginData).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        Swal.fire({
          icon: 'success',
          title: 'Bem-vindo!',
          text: `Olá, ${res.login}`
        });
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        // err.error.message vem do backend
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: err.error?.message || 'Erro inesperado.'
        });
      }
    });
  }


  cadastrar() {
    if (!this.registerData.senha || !this.confirmarSenha) {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção',
        text: 'Preencha a senha e a confirmação!'
      });
      return;
    }

    if (this.registerData.senha !== this.confirmarSenha) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'As senhas não coincidem!'
      });
      return;
    }

    this.authService.register(this.registerData).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Cadastro realizado!',
          text: 'Agora você pode fazer login.'
        });
        this.alternar();
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Erro no cadastro',
          text: 'Não foi possível concluir o cadastro.'
        });
      }
    });
  }
}
