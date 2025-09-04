import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PostosService, Posto } from '../../services/postos.service';
import { HistoricoService, Historico } from '../../services/historico.service'; 

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

  // --- Propriedades para o Modal de Histórico ---
  historicoCompleto: Historico[] = [];
  historicoDoPosto: Historico[] = [];
  postoSelecionado: Posto | null = null;
  // --- Fim das propriedades do Modal ---

  constructor(
    private postosService: PostosService,
    private historicoService: HistoricoService 
  ) {}

  ngOnInit(): void {
    this.carregarPostos();
    // Carrega o histórico completo na inicialização do componente
    this.carregarHistorico(); 
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
  
  // --- Métodos para o Modal de Histórico ---

  carregarHistorico() {
    this.historicoService.getHistoricoCompleto().subscribe({
      next: data => this.historicoCompleto = data,
      error: err => console.error('Erro ao carregar histórico:', err)
    });
  }

  abrirModalHistorico(posto: Posto): void {
    this.postoSelecionado = posto;
    
    // Filtra e ordena o histórico para o posto selecionado
    this.historicoDoPosto = this.historicoCompleto
      .filter(h => h.postoId === posto.id) // Supondo que 'posto' tenha um 'id'
      .sort((a, b) => new Date(b.dataAlteracao).getTime() - new Date(a.dataAlteracao).getTime());
  }

  fecharModal(): void {
    this.postoSelecionado = null;
  }

  getCombustivelNome(combustivelId: string): string {
    const todosCombustiveis = this.postos.flatMap(p => p.combustiveis || []);
    const combustivel = todosCombustiveis.find(c => c.id === combustivelId); // Supondo que 'combustivel' tenha um 'id'
    return combustivel?.tipo || 'Desconhecido';
  }
  // --- Fim dos métodos do Modal ---

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