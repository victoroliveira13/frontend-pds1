import { Component, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit {
  isCadastro = false;

  loginLabel = 'Entrar'.split('');
  cadastrarLabel = 'Cadastrar'.split('');

  loginData = { login: '', senha: '' };
  registerData = { nome: '', login: '', senha: '', email: '', role: 0 };
  confirmarSenha = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      // Se já existe token, redireciona para dashboard
      this.router.navigate(['/dashboard']);
    }
  }

  alternar() {
    this.isCadastro = !this.isCadastro;
  }

  entrar() {
    this.authService.login(this.loginData).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.registerData.email)) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'E-mail inválido!'
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
      error: (err) => {
        let msg = 'Não foi possível concluir o cadastro.';

        if (err.error) {
          if (typeof err.error === 'string') {
            msg = err.error;
          } else if (typeof err.error === 'object') {
            const firstKey = Object.keys(err.error)[0];
            if (firstKey) msg = err.error[firstKey];
          }
        }

        Swal.fire({
          icon: 'error',
          title: 'Erro no cadastro',
          text: msg
        });
      }

    });
  }
}
