import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PostosService, Posto } from '../../services/postos.service';

@Component({
  selector: 'app-lista-precos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './lista-precos.component.html',
  styleUrls: ['./lista-precos.component.css']
})
export class ListaPrecosComponent implements OnInit {
  filtro: string = '';
  postos: Posto[] = [];
  tiposCombustivel: string[] = [];

  constructor(private postosService: PostosService) {}

  ngOnInit(): void {
    this.carregarPostos();
  }

  carregarPostos() {
    this.postosService.listar().subscribe({
      next: data => {
        this.postos = data;
        this.definirTiposCombustivel();
      },
      error: err => console.error('Erro ao carregar postos:', err)
    });
  }

  definirTiposCombustivel() {
    const tiposSet = new Set<string>();
    this.postos.forEach(p => {
      p.combustiveis?.forEach(c => tiposSet.add(c.tipo));
    });
    this.tiposCombustivel = Array.from(tiposSet);
  }

  get postosFiltrados() {
    const texto = this.filtro.trim().toLowerCase();
    if (!texto) return this.postos;
    return this.postos.filter(p =>
      p.razaoSocial.toLowerCase().includes(texto)
    );
  }

  formatEndereco(p: Posto): string {
    return `${p.logradouro}, ${p.numero}, ${p.cidade}`;
  }

  getPreco(posto: Posto, tipo: string): string {
    const c = posto.combustiveis?.find(c => c.tipo === tipo);
    return c ? `R$ ${c.preco.toFixed(2)}` : ' - ';
  }

}
